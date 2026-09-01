// ─────────────────────────────────────────────────────────────────────────
//  Which tips this person should read first, and why.
//
//  The tips tab showed all eight, in the order they were written, to
//  everybody. That is a leaflet, not an app: the one about coffee is the
//  only one that matters to somebody whose log is two thirds coffee, and it
//  was fifth.
//
//  So the tips are scored against the profile — the triggers actually
//  logged, the hour the day starts smoking, whether the daily target is
//  being met, how the urges that got sat with actually ended — and the top
//  few are shown with the fact that put them there. The reason is the
//  point. "Try this" is advice; "9 of your last fortnight's cigarettes came
//  with coffee, try this" is an observation, and it is checkable, which is
//  the standard the rest of this app holds itself to.
//
//  Three things this deliberately is not:
//
//    • Random. Same data in, same order out, every render. A list that
//      reshuffles itself is a list nobody can find anything in twice.
//    • Confident about a thin record. Under a few days or a handful of
//      entries there is no pattern to find, only a Tuesday, so the scoring
//      steps aside and the written order stands.
//    • Willing to argue. A tip somebody has marked as not working for them
//      goes to the bottom and stays there. They tried it; we did not.
//
//  Nothing here writes anything. It reads a profile and some feedback, and
//  returns an order.
// ─────────────────────────────────────────────────────────────────────────

import { TIPS } from "../data/tips.js";
import { formatHour } from "./insights.js";

/** How many tips are worth calling "for you" before it is just the list again. */
export const FOR_YOU_LIMIT = 3;

/**
 * The reason sentences, as English strings used directly as translation
 * keys — the same trade the rest of the app makes. They live in one
 * exported table rather than inline because sqT() is called on them through
 * a variable, and scripts/check-i18n.mjs reads this table by name to know
 * they need Hebrew.
 */
export const REASONS = {
  triggerShare: "{n} of the cigarettes you logged in the last two weeks came with {trigger}.",
  triggerRising: "{trigger} is behind more of your cigarettes than it was a fortnight ago.",
  // "{part} ones" rather than "in the {part}", because "in the night" is
  // not a thing anybody says and the four words have to fit one sentence.
  partHeavy: "Most of your cigarettes lately are {part} ones.",
  earlyFirst: "Your first cigarette of the day is usually around {hour}.",
  urgesLost: "Most of the urges you sat with lately ended in a cigarette anyway.",
  urgesWon: "You rode out {held} of the {faced} urges you sat with in the last two weeks.",
  targetMissed: "You were over your daily target on {n} of the last {days} days.",
  moneyAdding: "That is about {n} cigarettes you did not smoke in the last two weeks.",
  worked: "You marked this one as something that works for you.",
};

/** The quarters of the day, as words that go after "in the". */
export const PART_WORDS = ["morning", "afternoon", "evening", "night"];

/**
 * What each tip is for.
 *
 * Keyed by tip id, kept here rather than in data/tips.js so that file stays
 * pure content — every string in it is a string somebody reads, which is
 * what lets the translation check treat it simply.
 *
 * `triggers` is the main lever: a tip that names a trigger gets that
 * trigger's share of the recent fortnight. The flags are for the tips that
 * answer something other than a trigger.
 */
const RULES = {
  wave: { triggers: ["Craving", "Stress", "Habit"], losingUrges: true },
  delay: { triggers: ["Craving", "Habit"] },
  hands: { triggers: ["Habit", "Boredom"] },
  water: { triggers: ["Craving", "After a meal"] },
  pairings: { triggers: ["Coffee", "After a meal", "Social"] },
  inconvenient: { triggers: ["Habit", "Boredom"] },
  breathe: { triggers: ["Stress"], losingUrges: true },
  reward: { triggers: [], money: true },
  lastofnight: { triggers: [], parts: ["evening", "night"] },
  firstofday: { triggers: [], earlyFirst: true },
  targetfit: { triggers: [], targetMissed: true },
  social: { triggers: ["Social"] },
  bankwins: { triggers: [], winningUrges: true },
};

// The weights. They only ever matter relative to each other, and they are
// spelled out so that changing one's mind about, say, how much a missed
// target should outrank a common trigger is one number rather than an
// archaeology expedition.
const W = {
  triggerShare: 60, // × that trigger's share of the fortnight
  triggerRising: 15,
  part: 45,
  earlyFirst: 40,
  losingUrges: 35,
  winningUrges: 40,
  targetMissed: 50,
  money: 30,
  worked: 500, // pinned to the top
  didnt: -1000, // and to the bottom
};

// Thresholds, so a rule fires on something worth saying out loud rather
// than on any non-zero number at all.
const PART_SHARE = 0.35; // a quarter of the day carrying a third of the total
const EARLY_HOUR = 8; // "the first thing I do" territory
const MIN_URGES = 3; // below this a success rate is one bad afternoon
const MIN_TARGET_DAYS = 5;
const MONEY_CIGARETTES = 20; // a pack's worth avoided before we mention money

/**
 * The tips, best first, each with the fact that earned it its place.
 *
 * @param {object} profile   from domain/profile.js
 * @param {object} feedback  tip id → {verdict: "worked"|"didnt"}
 * @returns {Array<{tip: object, score: number, reason: {key: string, params: object}|null,
 *                  verdict: "worked"|"didnt"|null}>}
 */
export function rankTips(profile, feedback) {
  const scored = TIPS.map((tip, index) => {
    const verdict = feedback?.[tip.id]?.verdict ?? null;
    // Written order is the tiebreaker and the whole answer for a new
    // account: a descending fraction, too small to outrank any real signal.
    let score = (TIPS.length - index) / 1000;
    let reason = null;

    if (profile?.enoughData) {
      for (const rule of applicable(tip.id, profile)) {
        score += rule.score;
        // The first rule to fire is the strongest one, because they are
        // evaluated in the order they are worth reading.
        reason ??= rule.reason;
      }
    }

    if (verdict === "worked") {
      score += W.worked;
      reason = { key: REASONS.worked, params: {} };
    }
    if (verdict === "didnt") score += W.didnt;

    return { tip, score, reason, verdict, index };
  });

  // The index is kept on the way out: it is the written order, which is
  // what the library below the recommendations still sorts by.
  return scored.sort((a, b) => b.score - a.score || a.index - b.index);
}

/**
 * The ones worth putting under "for you".
 *
 * A tip with nothing to say about this person is not a recommendation, it
 * is just the top of a list — so anything without a reason is left in the
 * library below rather than promoted with an empty space where the fact
 * should be.
 */
export function pickForYou(ranked, limit = FOR_YOU_LIMIT) {
  return ranked.filter((entry) => entry.reason && entry.verdict !== "didnt").slice(0, limit);
}

/** Every scoring rule that fires for one tip, strongest reason first. */
function applicable(id, profile) {
  const rule = RULES[id];
  if (!rule) return [];
  const hits = [];

  // ── The trigger this tip is about, if the person has one ──────────────
  const matches = (profile.triggerRank ?? []).filter((rank) =>
    rule.triggers.includes(rank.trigger),
  );
  const best = matches[0] ?? null; // triggerRank is already worst-first
  if (best) {
    hits.push({
      score: W.triggerShare * best.share,
      reason: { key: REASONS.triggerShare, params: { n: best.count, trigger: best.trigger } },
    });
    if (best.trend === 1) {
      hits.push({
        score: W.triggerRising,
        reason: { key: REASONS.triggerRising, params: { trigger: best.trigger } },
      });
    }
  }

  // ── Missing the target is the loudest thing the app knows ─────────────
  const target = profile.target ?? {};
  if (
    rule.targetMissed &&
    target.target != null &&
    target.metRate != null &&
    target.metRate < 0.5 &&
    target.daysMet + target.daysMissed >= MIN_TARGET_DAYS
  ) {
    hits.push({
      score: W.targetMissed,
      reason: {
        key: REASONS.targetMissed,
        params: { n: target.daysMissed, days: target.daysMet + target.daysMissed },
      },
    });
  }

  // ── When the cigarettes happen ────────────────────────────────────────
  const peak = profile.peakPart ?? {};
  if (rule.parts && peak.part && rule.parts.includes(peak.part) && peak.share >= PART_SHARE) {
    hits.push({
      score: W.part,
      reason: { key: REASONS.partHeavy, params: { part: peak.part } },
    });
  }
  if (rule.earlyFirst && profile.firstOfDayHour != null && profile.firstOfDayHour <= EARLY_HOUR) {
    hits.push({
      score: W.earlyFirst,
      reason: { key: REASONS.earlyFirst, params: { hour: formatHour(profile.firstOfDayHour) } },
    });
  }

  // ── How the urges that were sat with actually went ────────────────────
  const cravings = profile.cravings ?? {};
  if (cravings.rate != null && cravings.faced >= MIN_URGES) {
    if (rule.losingUrges && cravings.rate < 0.5) {
      hits.push({ score: W.losingUrges, reason: { key: REASONS.urgesLost, params: {} } });
    }
    if (rule.winningUrges && cravings.rate >= 0.5) {
      hits.push({
        score: W.winningUrges,
        reason: {
          key: REASONS.urgesWon,
          params: { held: cravings.held, faced: cravings.faced },
        },
      });
    }
  }

  // ── Money, once there is enough of it to be worth the sentence ────────
  const money = profile.money ?? {};
  if (rule.money && money.avoided != null && money.avoided >= MONEY_CIGARETTES) {
    hits.push({
      score: W.money,
      reason: { key: REASONS.moneyAdding, params: { n: Math.round(money.avoided) } },
    });
  }

  return hits;
}

/**
 * Two devices' worth of "this helped" / "this didn't", combined.
 *
 * One entry per tip, so the later verdict wins — somebody who tried a tip
 * again and changed their mind is the newer fact, wherever they were sitting
 * when they said so.
 */
export function mergeFeedback(mine, theirs) {
  const merged = { ...(mine ?? {}) };
  for (const [id, thatOne] of Object.entries(theirs ?? {})) {
    if (!merged[id] || (Number(thatOne?.at) || 0) > (Number(merged[id]?.at) || 0)) {
      merged[id] = thatOne;
    }
  }
  return merged;
}
