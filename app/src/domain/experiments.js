// ─────────────────────────────────────────────────────────────────────────
//  A habit swap, turned into something that can be right or wrong.
//
//  The habits tab was six cards of advice. Good advice — cue, routine,
//  reward is how habits actually come apart — but nobody could tell you
//  whether any of it had worked for them, because nothing was ever
//  measured. "Switch to tea for a week so the pairing breaks" is a
//  hypothesis, and the app was already holding the data that settles it.
//
//  So a swap becomes an experiment: this cue, this substitute, starting
//  today, against how many that cue was costing before. From then on the
//  answer comes out of the ordinary log — the trigger is already recorded
//  on every cigarette, so there is nothing extra to tick and no way for the
//  measurement to disagree with the record.
//
//  Two decisions worth defending:
//
//  THE BASELINE IS PHOTOGRAPHED AT THE START AND KEPT. The obvious
//  alternative — recompute "before" as the fortnight preceding today — has
//  the before window sliding forward into the experiment itself, so the
//  comparison quietly eats its own result and every experiment tends
//  towards "no change". Storing the number at the moment somebody commits
//  is both more honest and what they actually agreed to be judged against.
//
//  AN EXPERIMENT IS NEVER SILENTLY A SUCCESS. Under a few days there is no
//  verdict at all, only "too early" — because three good days after a
//  decision is what every one of these looks like, including the ones that
//  fall over on day five.
// ─────────────────────────────────────────────────────────────────────────

import { swapForTrigger, TRIGGER_TO_CUE } from "../data/habits.js";
import { entriesOn } from "./entries.js";
import { dayKey, dayKeysBetween } from "../lib/dates.js";

/**
 * @typedef {object} Experiment
 * @property {string} id            `${trigger}:${startedAt}` — see newId
 * @property {string} trigger       the logged trigger this is aimed at
 * @property {string} cue           the habit cue it maps to, for display
 * @property {string} swap          the substitute being tried
 * @property {string} startedAt     day key
 * @property {string|null} endedAt  day key, or null while it is running
 * @property {number} baselinePerDay  cigarettes a day on this trigger before
 */

/** How long "give it a try" means, in days. */
export const TRIAL_DAYS = 7;

/** Before this there is no verdict, only a few days of good intentions. */
export const MIN_DAYS_TO_JUDGE = 3;

/** How much has to move before it counts as movement rather than a quiet week. */
export const MEANINGFUL_CHANGE = 0.25;

/**
 * The id of an experiment.
 *
 * Derived from what it is rather than randomly generated, so that two
 * devices starting the same swap on the same day produce one experiment
 * instead of two — the store merges these by key, and a random id would
 * make every offline start a duplicate.
 */
export const newId = (trigger, startedAt) => `${trigger}:${startedAt}`;

/** The running ones, oldest first. */
export const activeExperiments = (habits) =>
  Object.values(habits ?? {})
    .filter((experiment) => experiment && !experiment.endedAt)
    .sort((a, b) => String(a.startedAt).localeCompare(String(b.startedAt)));

/** The finished ones, most recently stopped first. */
export const pastExperiments = (habits) =>
  Object.values(habits ?? {})
    .filter((experiment) => experiment?.endedAt)
    .sort((a, b) => String(b.endedAt).localeCompare(String(a.endedAt)));

/**
 * What is worth trying, given what this person actually smokes.
 *
 * Comes off the trigger ranking, so the top suggestion is the cue costing
 * the most cigarettes a day right now — not the first card somebody wrote.
 * Triggers with no swap to offer are skipped: Craving and Habit describe
 * the urge itself rather than a situation, so there is no routine to
 * substitute and pretending otherwise would be filler.
 */
export function suggestExperiments(profile, habits) {
  const taken = new Set(activeExperiments(habits).map((experiment) => experiment.trigger));
  return (profile?.triggerRank ?? [])
    .filter((rank) => !taken.has(rank.trigger) && TRIGGER_TO_CUE[rank.trigger])
    .map((rank) => ({
      trigger: rank.trigger,
      cue: TRIGGER_TO_CUE[rank.trigger],
      swap: swapForTrigger(rank.trigger)?.swap ?? null,
      count: rank.count,
      perDay: rank.recentPerDay,
      peakHour: rank.peakHour,
      part: rank.part,
    }))
    .filter((candidate) => candidate.swap);
}

/**
 * Commits to one, with the number it is being measured against baked in.
 * Starting one that is already running changes nothing.
 */
export function startExperiment(habits, candidate, today = dayKey()) {
  const id = newId(candidate.trigger, today);
  if (habits?.[id] && !habits[id].endedAt) return habits ?? {};
  return {
    ...habits,
    [id]: {
      id,
      trigger: candidate.trigger,
      cue: candidate.cue,
      swap: candidate.swap,
      startedAt: today,
      endedAt: null,
      baselinePerDay: candidate.perDay ?? 0,
    },
  };
}

/** Stops one, keeping it and its result. Nothing here is ever deleted. */
export function stopExperiment(habits, id, today = dayKey()) {
  const experiment = habits?.[id];
  if (!experiment || experiment.endedAt) return habits ?? {};
  return { ...habits, [id]: { ...experiment, endedAt: today } };
}

/**
 * How one experiment is going, read straight out of the log.
 *
 * @returns {{daysIn: number, daysLeft: number, since: number, sincePerDay: number,
 *            baselinePerDay: number, changePct: number|null, cleanDays: number,
 *            verdict: "early"|"working"|"no-change"|"worse"}}
 */
export function experimentProgress(experiment, logs, now = Date.now()) {
  const lastDay = experiment.endedAt ?? dayKey(now);
  const days = dayKeysBetween(experiment.startedAt, lastDay);
  const daysIn = days.length;

  let since = 0;
  let cleanDays = 0;
  for (const key of days) {
    const onThisCue = countTriggerOn(logs, key, experiment.trigger);
    since += onThisCue;
    if (onThisCue === 0) cleanDays += 1;
  }

  const baselinePerDay = Number(experiment.baselinePerDay) || 0;
  const sincePerDay = since / Math.max(daysIn, 1);
  const changePct = changeAgainst(baselinePerDay, sincePerDay);

  return {
    daysIn,
    daysLeft: Math.max(0, TRIAL_DAYS - daysIn),
    since,
    sincePerDay,
    baselinePerDay,
    changePct,
    cleanDays,
    verdict: verdictFor(daysIn, changePct),
  };
}

/** How many cigarettes on one day carried one trigger. */
export function countTriggerOn(logs, key, trigger) {
  return entriesOn(logs, key).filter((entry) => entry.trigger === trigger).length;
}

/**
 * The change as a fraction of what it was, or null when there is nothing to
 * be a fraction of — starting from zero and staying at zero is not an
 * improvement of any percentage, and starting from zero and going up is not
 * an infinite one.
 */
function changeAgainst(before, after) {
  if (before > 0) return (after - before) / before;
  return after > 0 ? null : 0;
}

function verdictFor(daysIn, changePct) {
  if (daysIn < MIN_DAYS_TO_JUDGE) return "early";
  if (changePct == null) return "worse";
  if (changePct <= -MEANINGFUL_CHANGE) return "working";
  if (changePct >= MEANINGFUL_CHANGE) return "worse";
  return "no-change";
}

/**
 * Two devices' experiments, combined.
 *
 * Union by id, and where both hold the same one, a stopped experiment beats
 * a running one — stopping is a decision somebody made, and the other device
 * has merely not heard about it yet. Same reasoning as the tombstones in
 * domain/entries.js, minus the need to keep a corpse around: the experiment
 * itself is the record, so ending it loses nothing.
 */
export function mergeExperiments(mine, theirs) {
  const merged = { ...(mine ?? {}) };
  for (const [id, thatOne] of Object.entries(theirs ?? {})) {
    const thisOne = merged[id];
    if (!thisOne) merged[id] = thatOne;
    else if (!thisOne.endedAt && thatOne.endedAt) merged[id] = thatOne;
  }
  return merged;
}
