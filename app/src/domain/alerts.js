// ─────────────────────────────────────────────────────────────────────────
//  What is worth interrupting somebody for, and when.
//
//  This app already knew, in domain/profile.js, that a particular person
//  smokes most between four and seven, has not logged anything today, is on
//  a five-day run, and went over their target an hour ago. It said none of
//  it unless they opened the app and found the right tab. An app that only
//  speaks when spoken to is a filing cabinet.
//
//  So: one pure function that reads the profile and returns the things worth
//  saying right now, worst-first. It follows domain/coach.js exactly —
//  scored against real facts, deterministic, and returning {key, params}
//  rather than sentences, because the moment a phrase is built in here it
//  has to be built twice, once per language, and the thing becomes
//  untestable without a locale.
//
//  Two rules this file lives by, and they are the reason it looks the way
//  it does:
//
//    IT TOUCHES NOTHING. No React, no window, no sqT(), no formatHour().
//    `now` is a parameter. That is not fastidiousness — the plan is for a
//    server to run this same file on a schedule and send a push, and a
//    server has no SQ_LANG and no clock it shares with the reader. Raw hour
//    NUMBERS go out in params; whoever renders them decides what to call
//    them. (coach.js calls formatHour() inside its own reason table, which
//    is why TipsTab has to carry `lang` in its memo deps. Not repeated here.)
//
//    IT NEVER SAYS ANYTHING IT CANNOT SHOW. Every alert carries the fact
//    that earned it. An app whose whole promise is an honest record cannot
//    afford one flattering sentence, and there is exactly one place here
//    where that was easy to get wrong — see the note on streaks below.
// ─────────────────────────────────────────────────────────────────────────

import { countryFor } from "../data/countries.js";
import { atHour, dayKey, hoursUntilHour } from "../lib/dates.js";
import { countOn, TOMBSTONE_DAYS } from "./entries.js";
import { PER_PACK } from "./money.js";

/**
 * The four kinds, and the order they interrupt in.
 *
 * Higher wins, because only one is ever shown. A person who has just gone
 * over their target does not also need to be told to log something, and
 * being congratulated on a streak in the same breath as being warned about
 * one would read as the app not knowing which it meant.
 */
export const PRIORITY = { target: 90, milestone: 70, risk: 50, reminder: 30 };

/**
 * Everything anybody reads, as English strings used directly as translation
 * keys — the same trade the rest of the app makes.
 *
 * These three tables are read BY NAME by scripts/check-i18n.mjs (see the
 * DYNAMIC list there), because they reach sqT() through a variable. So they
 * must hold user-facing strings and nothing else: an id or a tab name
 * dropped in here would be collected too, demanded in Hebrew, and then sit
 * in he.js as a translation of something nobody ever sees.
 */
export const TITLES = {
  reminder: "Nothing logged today",
  risk: "Your heavy stretch is coming up",
  riskFirst: "Your first one usually lands around now",
  smokeFreeOne: "A full day, nothing logged",
  smokeFree: "{days} days smoke-free",
  best: "A new personal best",
  pack: "A pack's worth, not smoked",
  underTarget: "A week inside your target",
  target: "Over today's target",
};

export const BODIES = {
  reminder: "Two taps and the day is on the record — even if the answer is none.",
  risk: "{from}–{to} carries {pct}% of everything you have logged. Line something up now.",
  riskFirst: "Most days your first cigarette is around {hour}, and nothing is logged yet.",
  smokeFreeOne: "That is the one that takes the most deciding. It is on the record now.",
  smokeFree: "{days} days with nothing logged against them.",
  best: "{days} days is the longest run you have recorded.",
  pack: "{n} cigarettes you did not smoke — about {currency}{amount} of them.",
  underTarget: "{days} days running at or under {target} a day.",
  target: "{n} over your {target} a day. The rest of the evening is still yours.",
};

export const ACTIONS = {
  log: "Open Today",
  insights: "See the numbers",
};

/**
 * The switches on the settings screen, in the order they interrupt.
 *
 * Here rather than in SettingsTab because these reach sqT() through a
 * variable and check-i18n has to be told where to find them — and this is
 * where every other alert string already lives, so there is one place to
 * look rather than two.
 */
export const PREF_LABELS = {
  target: "When I go over my daily target",
  milestone: "Streaks, records and money saved",
  risk: "Before my heaviest stretch of the day",
  reminder: "If I have not logged anything by evening",
};

/** What the labels above the title say. */
export const KIND_LABELS = {
  reminder: "Reminder",
  risk: "Heads up",
  milestone: "Milestone",
  target: "Today",
};

/** On by default, at eight in the evening — late enough to be a real day. */
export const DEFAULT_PREFS = {
  reminder: true,
  risk: true,
  milestone: true,
  target: true,
  reminderHour: 20,
};

// ── Thresholds, so a rule fires on something worth saying out loud ───────

/** Three hours carrying less than this is not a stretch, it is arithmetic. */
const RISK_SHARE = 0.3;
/** How far ahead of a hard stretch there is still time to do something. */
const RISK_LEAD_HOURS = 1;
/** "The first thing I do" territory, same number coach.js uses. */
const EARLY_HOUR = 8;
/** Nobody is nagged on the day they signed up. */
const MIN_DAYS = 2;
/** The smoke-free runs worth stopping for. Every day would be noise. */
const FREE_STEPS = [1, 7];
/** Below this a "personal best" is a slow Tuesday. */
const MIN_BEST = 3;
/** A week of hitting the number you set yourself. */
const UNDER_TARGET_STEP = 7;

/** How long a day-keyed record is kept. Same reasoning, so the same number. */
export const SEEN_DAYS = TOMBSTONE_DAYS;

/**
 * The preferences, with the defaults filled in.
 *
 * Read through this rather than off settings directly, so an account made
 * before this feature existed needs no migration and no extra write on the
 * way in — it simply reads as "all on, eight in the evening" until somebody
 * touches a switch.
 */
export function alertPrefs(settings) {
  return { ...DEFAULT_PREFS, ...(settings?.alerts ?? {}) };
}

/**
 * Everything worth saying right now, worst first.
 *
 * @param {object} input
 * @param {object} input.profile   from domain/profile.js
 * @param {object} input.logs      day key → entries
 * @param {object} input.cravings  day key → craving sessions
 * @param {object} input.goal      baseline / target / quitDate / reason
 * @param {object} input.settings  country / product / pricePerPack / lang / alerts
 * @param {object} input.seen      alert id → {at, day, value}
 * @param {number} input.now       overridable so tests are not tied to today
 * @returns {Array<object>} alerts, highest priority first
 */
export function dueAlerts({
  profile,
  logs,
  cravings,
  goal,
  settings,
  seen,
  now = Date.now(),
} = {}) {
  const prefs = alertPrefs(settings);
  const today = dayKey(now);
  const already = (id) => Boolean(seen?.[id]);

  const found = [
    ...targetAlert({ logs, goal, prefs, today, already }),
    ...milestoneAlerts({ profile, goal, settings, prefs, seen, already }),
    ...riskAlerts({ profile, logs, prefs, today, now, already }),
    ...reminderAlert({ profile, logs, cravings, prefs, today, now, already }),
  ];

  // Priority first, then id, so the same inputs give the same order on every
  // render. A banner that reshuffles itself between ticks is a banner nobody
  // can finish reading — the same property coach.js pins down for tips.
  return found.sort((a, b) => b.priority - a.priority || a.id.localeCompare(b.id));
}

/** The one to show. There is only ever one; see PRIORITY. */
export const pickAlert = (alerts) => alerts?.[0] ?? null;

// ── The four rules ───────────────────────────────────────────────────────

/**
 * Over the number you set yourself.
 *
 * Deliberately `> target` rather than `=== target + 1`. The exact-crossing
 * test looks tidier and is wrong: a phone that logged four cigarettes in a
 * basement syncs them all at once, the count goes from below the target to
 * well past it in one step, and the equality never holds. The seen record is
 * what stops it repeating, not the shape of the comparison.
 *
 * The wording matters more here than anywhere else in the app. This fires
 * the instant somebody was honest with it. It says what happened and gets
 * out of the way; the moment it scolds, the next cigarette goes unlogged and
 * every number in the app starts drifting away from the truth.
 */
function targetAlert({ logs, goal, prefs, today, already }) {
  const target = goal?.target ?? null;
  const id = `target:${today}`;
  if (!prefs.target || target == null || already(id)) return [];

  const count = countOn(logs, today);
  if (count <= target) return [];

  return [
    {
      id,
      kind: "target",
      priority: PRIORITY.target,
      tone: "warn",
      title: { key: TITLES.target, params: {} },
      body: { key: BODIES.target, params: { n: count - target, target } },
      action: { tab: "log", label: ACTIONS.log },
    },
  ];
}

/**
 * The runs and totals worth stopping for.
 *
 * THE ONE PLACE THIS FEATURE COULD LIE. streaks() in profile.js counts a
 * tracked day with no key as smoke-free, on purpose — that is what lets a
 * perfect day count without being announced. But it means a person who
 * signed up, logged nothing ever, and came back a week later has a
 * seven-day "smoke-free run" the app cannot vouch for. Congratulating them
 * for it would be the one unearned sentence in an app whose entire claim is
 * that every number is checkable. Hence the totalEntries guard: a milestone
 * needs a record to be a milestone about.
 *
 * Each rung is remembered by its high-water mark rather than by a day, so
 * these ids are never swept (see sweepSeen). The streak-based ones re-arm
 * when the run breaks, so a second good week months later is celebrated
 * again — but not every day of the first one.
 */
function milestoneAlerts({ profile, goal, settings, prefs, seen, already }) {
  if (!prefs.milestone) return [];
  if (!profile || profile.days < MIN_DAYS || profile.totalEntries === 0) return [];

  const out = [];
  const streak = profile.streak ?? {};
  const free = streak.currentSmokeFree ?? 0;
  /**
   * The rung this person was last told about.
   *
   * For a run, a CURRENT value below the remembered one can only mean the
   * run broke and a new one started — so the memory is stale and the next
   * rung is news again. Without that, the high-water mark is permanent and
   * somebody's second good week, which is the harder one, passes in silence.
   * Totals that only ever grow (packs avoided) pass rearm: false and keep
   * their mark forever.
   */
  const held = (id, current, rearm) => {
    const stored = seen?.[id]?.value ?? 0;
    return rearm && current < stored ? 0 : stored;
  };

  const push = (id, value, tone, title, body) =>
    out.push({
      id,
      kind: "milestone",
      priority: PRIORITY.milestone,
      tone,
      value,
      title,
      body,
      action: { tab: "insights", label: ACTIONS.insights },
    });

  // ── Days with nothing logged against them ─────────────────────────────
  const step = [...FREE_STEPS].reverse().find((n) => free >= n) ?? null;
  if (step != null && step > held("milestone:free", free, true)) {
    push(
      "milestone:free",
      step,
      "good",
      step === 1
        ? { key: TITLES.smokeFreeOne, params: {} }
        : { key: TITLES.smokeFree, params: { days: step } },
      step === 1
        ? { key: BODIES.smokeFreeOne, params: {} }
        : { key: BODIES.smokeFree, params: { days: step } },
    );
  }

  // ── A run longer than any before it ───────────────────────────────────
  const best = streak.longestSmokeFree ?? 0;
  if (free >= MIN_BEST && free === best && free > held("milestone:best", free, true)) {
    push(
      "milestone:best",
      free,
      "good",
      { key: TITLES.best, params: {} },
      { key: BODIES.best, params: { days: free } },
    );
  }

  // ── A week inside the number you set yourself ─────────────────────────
  const under = streak.currentUnderTarget ?? 0;
  if (
    goal?.target != null &&
    under >= UNDER_TARGET_STEP &&
    under > held("milestone:undertarget", under, true)
  ) {
    push(
      "milestone:undertarget",
      under,
      "good",
      { key: TITLES.underTarget, params: {} },
      { key: BODIES.underTarget, params: { days: under, target: goal.target } },
    );
  }

  // ── Packs' worth avoided ──────────────────────────────────────────────
  // savedOver() answers null, not zero, when there is no baseline to have
  // saved against — so this stays quiet rather than treating "nothing to
  // compare with" as "you have saved nothing".
  const avoided = profile.money?.allTime?.avoided;
  const price = profile.money?.pricePerCigarette ?? 0;
  const packs = avoided == null ? 0 : Math.floor(avoided / PER_PACK);
  if (packs >= 1 && packs > held("milestone:pack", packs, false)) {
    push(
      "milestone:pack",
      packs,
      "good",
      { key: TITLES.pack, params: {} },
      {
        key: BODIES.pack,
        params: {
          n: Math.round(packs * PER_PACK),
          currency: currencyOf(settings),
          amount: (packs * PER_PACK * price).toFixed(2),
        },
      },
    );
  }

  return out;
}

/**
 * The hard part of the day, before it starts rather than after.
 *
 * Two shapes of the same alert, sharing one id so they can never both fire:
 * the three-hour stretch that carries the most, and — for somebody whose day
 * starts with one — the hour their first usually lands in.
 *
 * "Approaching" is measured circularly. A stretch starting at 23:00 is an
 * hour away at 22:10 and twenty-three hours away at 00:10; plain subtraction
 * has that exactly backwards, which would make the alert shout all morning
 * and stay silent at the one moment it could change anything.
 */
function riskAlerts({ profile, logs, prefs, today, now, already }) {
  const id = `risk:${today}`;
  if (!prefs.risk || already(id) || !profile?.enoughData) return [];

  const approaching = (hour) => {
    const until = hoursUntilHour(now, hour);
    return until > 0 && until <= RISK_LEAD_HOURS;
  };

  const made = (title, body) => [
    {
      id,
      kind: "risk",
      priority: PRIORITY.risk,
      tone: "warn",
      title,
      body,
      action: { tab: "log", label: ACTIONS.log },
    },
  ];

  const window = profile.peakWindow;
  if (window && window.share >= RISK_SHARE && approaching(window.from)) {
    const params = {
      from: window.from,
      to: window.to,
      pct: Math.round(window.share * 100),
    };
    return made({ key: TITLES.risk, params: {} }, { key: BODIES.risk, params });
  }

  // The first of the day, for somebody who has one before anything else.
  // Skipped when the stretch above already covers that hour — the same fact
  // arriving twice under two headings reads as the app double-counting.
  const first = profile.firstOfDayHour;
  if (
    first != null &&
    first <= EARLY_HOUR &&
    countOn(logs, today) === 0 &&
    !coversHour(window, first) &&
    approaching(first)
  ) {
    return made(
      { key: TITLES.riskFirst, params: {} },
      { key: BODIES.riskFirst, params: { hour: first } },
    );
  }

  return [];
}

/**
 * A day with no answer on it.
 *
 * The silence conditions are the whole rule, and one of them is the
 * difference between a useful reminder and the app's worst possible
 * behaviour:
 *
 *   `logs[today] === []` is a RECORDED ZERO — somebody pressed "I haven't
 *   smoked today". It is the best day a person using this app can have.
 *   `logs[today] === undefined` is a day nobody answered. Only the second
 *   deserves a reminder, and countOn() cannot tell them apart because it
 *   reads both as zero. So this is the one place in the app that looks at
 *   the raw shape of the row instead.
 *
 * A craving recorded today counts as an answer too. Somebody who stood
 * outside and rode one out was here, using the thing, and telling them they
 * have not logged anything would be the app not watching.
 */
function reminderAlert({ profile, logs, cravings, prefs, today, now, already }) {
  const id = `reminder:${today}`;
  if (!prefs.reminder || already(id)) return [];
  // Not gated on enoughData, deliberately: this is the alert that has to
  // work from the second day, and enoughData wants five cigarettes — which
  // somebody who is succeeding may never have.
  if (!profile || profile.days < MIN_DAYS) return [];

  const due = atHour(now, prefs.reminderHour);
  // `now >= due`, never `now === due`. A backgrounded tab gets no timers and
  // a locked phone gets nothing at all, so the 20:00 reminder is shown at
  // 21:37 when the app is reopened. It does not survive to tomorrow: the day
  // in the id has moved on and this candidate is no longer generated.
  if (now < due) return [];

  if (Object.prototype.hasOwnProperty.call(logs ?? {}, today)) return [];
  if ((cravings?.[today] ?? []).length > 0) return [];

  return [
    {
      id,
      kind: "reminder",
      priority: PRIORITY.reminder,
      tone: "plain",
      title: { key: TITLES.reminder, params: {} },
      body: { key: BODIES.reminder, params: {} },
      action: { tab: "log", label: ACTIONS.log },
    },
  ];
}

/** Whether a peak window contains an hour, wrapping past midnight. */
function coversHour(window, hour) {
  if (!window) return false;
  const { from, to } = window;
  return from <= to ? hour >= from && hour <= to : hour >= from || hour <= to;
}

/**
 * The currency symbol for the money milestone.
 *
 * data/countries.js is plain data with no React and no DOM in it, so this
 * stays as portable as the rest of the file — the symbol is not a
 * translatable string and must not become one.
 */
function currencyOf(settings) {
  return countryFor(settings?.country).currency;
}

// ── What has already been said ───────────────────────────────────────────

/**
 * Writes down that an alert was shown.
 *
 * Returns the row it was given when nothing changes. That is load-bearing:
 * the caller writes to the database whenever the object differs, and this is
 * recomputed on every tick, so an unstable identity here would be a network
 * write every minute for as long as the app is open.
 */
export function markSeen(row, alert, at = Date.now()) {
  if (!alert) return row;
  const seen = row?.seen ?? {};
  const before = seen[alert.id];
  const value = alert.value ?? null;
  if (before && (value == null || (before.value ?? 0) >= value)) return row;

  return {
    ...(row ?? {}),
    seen: {
      ...seen,
      [alert.id]: {
        at,
        day: dayKey(at),
        ...(value == null ? {} : { value }),
      },
    },
  };
}

/**
 * Two devices' record of what has been said, combined.
 *
 * Note this is the OPPOSITE polarity to mergeFeedback() next to it in the
 * MERGERS register, and the difference is worth stating: a tip verdict is an
 * opinion, so the newer one is the person's current one. This is evidence
 * that something already happened, so the EARLIER timestamp is the true one
 * — taking the newer would let a device that has only just heard about an
 * alert re-open a question that was settled hours ago.
 *
 * Values are high-water marks, so the higher wins. The preferences are not
 * in this row at all — they are a single small object with no history to
 * lose, so they live in settings and take the newest write, exactly like the
 * country and the pack price beside them.
 */
export function mergeAlerts(mine, theirs) {
  const seen = { ...(theirs?.seen ?? {}) };
  for (const [id, ours] of Object.entries(mine?.seen ?? {})) {
    const other = seen[id];
    if (!other) {
      seen[id] = ours;
      continue;
    }
    const oursAt = Number(ours.at) || 0;
    const otherAt = Number(other.at) || 0;
    const earlier = oursAt <= otherAt ? ours : other;
    const value = Math.max(Number(ours.value) || 0, Number(other.value) || 0);
    seen[id] = {
      at: earlier.at,
      day: earlier.day,
      ...(ours.value != null || other.value != null ? { value } : {}),
    };
  }
  return { v: 1, seen };
}

/**
 * Drops records old enough that every device has certainly caught up.
 *
 * Milestones are skipped on purpose. They are keyed by achievement rather
 * than by day and hold the high-water mark that stops them firing twice —
 * sweeping one would re-congratulate somebody, months later, for a pack they
 * already heard about.
 */
export function sweepSeen(row, now = Date.now()) {
  const seen = row?.seen ?? {};
  const cutoff = now - SEEN_DAYS * 24 * 60 * 60 * 1000;
  const kept = {};
  let dropped = 0;

  for (const [id, record] of Object.entries(seen)) {
    if (id.startsWith("milestone:") || (Number(record?.at) || 0) >= cutoff) kept[id] = record;
    else dropped += 1;
  }

  return { row: dropped ? { ...(row ?? {}), seen: kept } : row, dropped };
}
