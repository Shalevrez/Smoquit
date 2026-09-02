// ─────────────────────────────────────────────────────────────────────────
//  What this person's smoking actually looks like, as facts.
//
//  The tips tab used to show eight fixed cards in a fixed order and the
//  habits tab six, identically, to everybody — while the log underneath
//  already knew that this particular person smokes with coffee at eight in
//  the morning and rides out four urges in five. Every number needed to say
//  so was being written down and none of it was being read.
//
//  So: one pure function, computed once in the shell, that turns the stored
//  log into the facts every screen wants. It returns NUMBERS AND NAMES ONLY
//  — no sentences, no translation, no formatting. The moment a phrase is
//  built in here it has to be built twice, once per language, and the thing
//  becomes untestable without a locale. Screens phrase it; this decides what
//  is true.
//
//  Two traps are inherited from the log's shape and must not be re-sprung:
//  a deleted entry is a tombstone rather than an absence, so nothing may
//  read logs[day] directly — entriesOn() is the only way in; and a skipped
//  trigger is filed as the literal "Unlogged", which is a real cigarette
//  with nothing to say about itself, so it counts in totals and hours and
//  never as a trigger.
// ─────────────────────────────────────────────────────────────────────────

import { TRIGGERS } from "../data/triggers.js";
import { summarise } from "./cravings.js";
import { countOn, entriesOn } from "./entries.js";
import { trackingStartedAt } from "./insights.js";
import { pricePerCigarette, savedOver } from "./money.js";
import { dayKey, dayKeysBetween } from "../lib/dates.js";

/**
 * How far back "lately" reaches, and the same length again behind it to
 * compare against. Two weeks rather than one because a week has too few of
 * any single trigger to say anything — three coffees and two stresses is
 * noise — and because most people's weekends do not look like their
 * weekdays, so an odd-length window keeps drawing a different picture.
 */
export const WINDOW_DAYS = 14;

/** Below this there is not enough history to tell a pattern from a Tuesday. */
export const MIN_DAYS = 3;
export const MIN_ENTRIES = 5;

/** A change smaller than this either way is not a direction, it is weather. */
const TREND_DEADBAND = 0.2;

// What it takes before one day of the week is called out as the bad one.
const MIN_WEEKDAYS = 2; // at least two of them tracked
const MIN_WEEKDAY_ENTRIES = 3;
const WEEKDAY_LIFT = 0.25; // and a quarter worse than an ordinary day

const PARTS = [
  ["night", 22, 4],
  ["morning", 5, 11],
  ["afternoon", 12, 16],
  ["evening", 17, 21],
];

/** Which part of the day an hour belongs to. Night wraps around midnight. */
export function partOfDay(hour) {
  for (const [name, from, to] of PARTS) {
    if (from <= to ? hour >= from && hour <= to : hour >= from || hour <= to) return name;
  }
  return "night";
}

/**
 * Everything the coach and the habits screen need to know, from everything
 * that has been written down.
 *
 * @param {object} input
 * @param {object} input.logs      day key → entries
 * @param {object} input.cravings  day key → craving sessions
 * @param {object} input.goal      baseline / target / quitDate / reason
 * @param {object} input.settings  country / product / pricePerPack / lang
 * @param {object} input.meta      schemaVersion / trackingStartedAt
 * @param {number} input.now       overridable so tests are not tied to today
 */
export function buildProfile({ logs, cravings, goal, settings, meta, now = Date.now() } = {}) {
  const todayK = dayKey(now);
  const trackedKeys = dayKeysBetween(trackingStartedAt(logs, meta), todayK);

  // The last fortnight, and the fortnight before it. Sliced off the tracked
  // range rather than counted back from today, so a week-old account is
  // compared against the seven days it has instead of against seven days of
  // invented zeroes — which would make everybody's first fortnight look
  // like a relapse.
  const recentKeys = trackedKeys.slice(-WINDOW_DAYS);
  const previousKeys = trackedKeys.slice(-WINDOW_DAYS * 2, -WINDOW_DAYS);

  const recent = windowStats(logs, recentKeys);
  const previous = previousKeys.length ? windowStats(logs, previousKeys) : null;

  // One pass over the whole record. The hour chart, the weekday rates and
  // each trigger's usual hour all want as much history as there is rather
  // than the last fortnight of it — a pattern in the clock is the one thing
  // here that gets steadier the further back you look.
  const whole = wholeRecord(logs, trackedKeys);
  const totalEntries = whole.total;

  return {
    today: todayK,
    days: trackedKeys.length,
    totalEntries,
    enoughData: trackedKeys.length >= MIN_DAYS && totalEntries >= MIN_ENTRIES,

    recent,
    previous,
    trend: direction(recent.perDay, previous?.perDay),

    // The whole record, which is what the Insights tab draws.
    allTime: {
      total: whole.total,
      days: trackedKeys.length,
      avgPerDay: whole.total / Math.max(trackedKeys.length, 1),
      bestDay: whole.perDay.length ? Math.min(...whole.perDay) : 0,
      smokeFreeDays: whole.perDay.filter((count) => count === 0).length,
    },
    last7: lastSevenDays(logs, now),

    byHour: whole.byHour,
    peakHour: peakOf(whole.byHour),
    peakWindow: heaviestStretch(whole.byHour),
    weekday: whole.weekday,
    worstWeekday: worstWeekday(whole),

    triggerRank: rankTriggers(recent, previous, whole.triggerHours),
    peakPart: peakPart(recent.byHour),
    firstOfDayHour: medianFirstHour(logs, recentKeys),

    cravings: cravingStats(cravings, recentKeys),
    streak: streaks(logs, trackedKeys, goal?.target ?? null),
    target: targetStats(logs, recentKeys, goal?.target ?? null),
    money: {
      pricePerCigarette: pricePerCigarette(settings),
      recent: savedOver(logs, recentKeys, goal, settings),
      allTime: savedOver(logs, trackedKeys, goal, settings),
    },
  };
}

/**
 * Counts over one stretch of days — a fortnight, usually — from the entries
 * that really are ones. Weekdays are deliberately not counted here: two
 * weeks holds two of each, which is not enough to say anything about
 * anybody's Saturdays, so that reading is taken over the whole record.
 */
function windowStats(logs, keys) {
  const byHour = new Array(24).fill(0);
  const triggers = {};
  let total = 0;

  for (const key of keys) {
    for (const entry of entriesOn(logs, key)) {
      total += 1;
      byHour[new Date(entry.ts).getHours()] += 1;
      // "Unlogged" is a cigarette whose cause was not given. It belongs in
      // the total and the hour it happened in, and nowhere near a claim
      // about what sets this person off.
      if (entry.trigger && entry.trigger !== "Unlogged") {
        triggers[entry.trigger] = (triggers[entry.trigger] || 0) + 1;
      }
    }
  }

  const days = Math.max(keys.length, 1);
  return { days: keys.length, total, perDay: total / days, byHour, triggers };
}

/**
 * One walk through every tracked day.
 *
 * `perDay` is a count for every day in the range, including the ones with
 * no key at all — those are the days nobody opened the app, which are the
 * days nothing was smoked, and leaving them out is how a perfect week
 * becomes invisible and a best day can never be zero. Same reasoning as the
 * insights tab has always used; it just happens once now instead of in
 * three places with three slightly different answers.
 */
function wholeRecord(logs, keys) {
  const byHour = new Array(24).fill(0);
  const triggerHours = {};
  const weekdayCounts = new Array(7).fill(0);
  const weekdayDays = new Array(7).fill(0);
  const perDay = [];
  let total = 0;

  for (const key of keys) {
    const weekday = new Date(`${key}T00:00:00`).getDay();
    const entries = entriesOn(logs, key);
    weekdayDays[weekday] += 1;
    weekdayCounts[weekday] += entries.length;
    perDay.push(entries.length);
    total += entries.length;

    for (const entry of entries) {
      const hour = new Date(entry.ts).getHours();
      byHour[hour] += 1;
      if (entry.trigger && entry.trigger !== "Unlogged") {
        (triggerHours[entry.trigger] ??= new Array(24).fill(0))[hour] += 1;
      }
    }
  }

  return {
    total,
    perDay,
    byHour,
    triggerHours,
    weekday: {
      counts: weekdayCounts,
      days: weekdayDays,
      perDay: weekdayCounts.map((count, i) => (weekdayDays[i] ? count / weekdayDays[i] : 0)),
    },
  };
}

/**
 * The last seven calendar days, today last.
 *
 * Counted back from today rather than taken off the end of the tracked
 * range, because this is the chart of the week just had — a day before
 * tracking began is a real zero on it, not a day to leave out.
 */
function lastSevenDays(logs, now) {
  const days = [];
  for (let back = 6; back >= 0; back--) {
    const date = new Date(now);
    date.setDate(date.getDate() - back);
    const key = dayKey(date);
    days.push({ date: key, count: countOn(logs, key) });
  }
  return days;
}

/**
 * The three-hour stretch that carries the most, wrapping past midnight.
 *
 * A single peak hour is a thin thing to plan around — it moves with one
 * cigarette, and nobody's day is organised to the hour. Three hours is a
 * stretch somebody can recognise as a part of their day and actually put
 * something else into.
 */
function heaviestStretch(byHour, width = 3) {
  const total = byHour.reduce((sum, count) => sum + count, 0);
  if (!total) return null;

  let best = { from: 0, count: -1 };
  for (let from = 0; from < 24; from++) {
    let count = 0;
    for (let i = 0; i < width; i++) count += byHour[(from + i) % 24];
    if (count > best.count) best = { from, count };
  }
  return {
    from: best.from,
    to: (best.from + width - 1) % 24,
    count: best.count,
    share: best.count / total,
  };
}

/**
 * The day of the week that is worse than the rest, if one is.
 *
 * Per tracked occurrence of that weekday rather than per total, or a
 * fortnight that happens to hold three Mondays would elect Monday. Reported
 * only when it is meaningfully above the ordinary day and rests on more
 * than a single instance — "your Saturdays are bad" off one Saturday is the
 * kind of claim that makes somebody stop believing the rest of the page.
 */
function worstWeekday(whole) {
  const mean = whole.total / Math.max(whole.perDay.length, 1);
  if (!mean) return null;

  let worst = null;
  whole.weekday.perDay.forEach((rate, weekday) => {
    if (whole.weekday.days[weekday] < MIN_WEEKDAYS) return;
    if (whole.weekday.counts[weekday] < MIN_WEEKDAY_ENTRIES) return;
    if (!worst || rate > worst.perDay) worst = { weekday, perDay: rate, lift: rate / mean - 1 };
  });
  return worst && worst.lift >= WEEKDAY_LIFT ? worst : null;
}

/**
 * The triggers, worst first.
 *
 * Ordered by how many a day they cost lately rather than by lifetime total,
 * because the point of the list is what to do something about now. A
 * trigger that dominated a month ago and has since been beaten should fall
 * down it — that is the whole reward for beating it.
 */
function rankTriggers(recent, previous, allTimeHours) {
  return TRIGGERS.map((trigger) => {
    const count = recent.triggers[trigger] ?? 0;
    const recentPerDay = count / Math.max(recent.days, 1);
    const prevPerDay = previous
      ? (previous.triggers[trigger] ?? 0) / Math.max(previous.days, 1)
      : null;
    const hours = allTimeHours[trigger] ?? new Array(24).fill(0);
    return {
      trigger,
      count,
      share: recent.total ? count / recent.total : 0,
      recentPerDay,
      prevPerDay,
      trend: direction(recentPerDay, prevPerDay),
      hours,
      peakHour: count ? peakOf(hours) : null,
      part: count ? partOfDay(peakOf(hours)) : null,
    };
  })
    .filter((rank) => rank.count > 0)
    .sort((a, b) => b.count - a.count || a.trigger.localeCompare(b.trigger));
}

/**
 * Up, down, or neither.
 *
 * The deadband is the point: without it every single number has an arrow on
 * it, one cigarette either way reads as a trend, and the arrows stop meaning
 * anything. Returns null when there is nothing to compare against, which is
 * not the same as "no change".
 */
function direction(now, before) {
  if (before == null) return null;
  if (before === 0) return now === 0 ? 0 : 1;
  const change = (now - before) / before;
  if (change <= -TREND_DEADBAND) return -1;
  if (change >= TREND_DEADBAND) return 1;
  return 0;
}

/** The tallest hour. Ties go to the earlier one, which is arbitrary but fixed. */
function peakOf(byHour) {
  return byHour.indexOf(Math.max(...byHour));
}

/** Which quarter of the day carries the most, and what share of it. */
function peakPart(byHour) {
  const parts = {};
  byHour.forEach((count, hour) => {
    parts[partOfDay(hour)] = (parts[partOfDay(hour)] || 0) + count;
  });
  const total = byHour.reduce((sum, count) => sum + count, 0);
  const [name, count] = Object.entries(parts).sort(([, a], [, b]) => b - a)[0] ?? [null, 0];
  return { part: total ? name : null, share: total ? count / total : 0 };
}

/**
 * The hour the day's first cigarette usually lands in.
 *
 * A median rather than a mean, because one 3am on one bad night drags an
 * average across half the morning and the number is meant to describe the
 * ordinary day.
 */
function medianFirstHour(logs, keys) {
  const firsts = [];
  for (const key of keys) {
    const entries = entriesOn(logs, key);
    // The earliest by time rather than the first in the array: a backdated
    // entry is written where it belongs, but nothing re-sorts a day that
    // was only ever read.
    if (entries.length) firsts.push(new Date(Math.min(...entries.map((e) => e.ts))).getHours());
  }
  if (!firsts.length) return null;
  firsts.sort((a, b) => a - b);
  return firsts[Math.floor(firsts.length / 2)];
}

/**
 * Urges faced and urges ridden out, overall and per trigger.
 *
 * Both outcomes, as everywhere else cravings are counted: a rate computed
 * from wins alone would be 100% forever and worth nothing. `rate` is null
 * rather than 0 when no urge was recorded — never having been tested is not
 * the same as having failed.
 */
function cravingStats(cravings, keys) {
  const overall = keys.length
    ? summarise(cravings, keys[0], keys[keys.length - 1])
    : { held: 0, faced: 0, rate: null };

  const byTrigger = {};
  let heldMsTotal = 0;
  for (const key of keys) {
    for (const session of cravings?.[key] ?? []) {
      if (session.trigger) {
        const seen = (byTrigger[session.trigger] ??= { held: 0, faced: 0, rate: null });
        seen.faced += 1;
        if (session.outcome === "held") seen.held += 1;
        seen.rate = seen.held / seen.faced;
      }
      heldMsTotal += Number(session.heldMs) || 0;
    }
  }

  return {
    ...overall,
    byTrigger,
    avgHeldMs: overall.faced ? heldMsTotal / overall.faced : null,
  };
}

/**
 * Runs of days.
 *
 * A smoke-free day is a tracked day with nothing on it — including the days
 * nobody opened the app, exactly as the insights tab counts them, because
 * the alternative is that a perfect day is invisible unless it was
 * announced. Today counts while it is still clean; it is the day being
 * lived, and a streak that only updates at midnight is no use to somebody
 * deciding at four in the afternoon.
 */
function streaks(logs, trackedKeys, target) {
  let currentSmokeFree = 0;
  let longestSmokeFree = 0;
  let run = 0;
  let currentUnderTarget = 0;

  for (const key of trackedKeys) {
    if (countOn(logs, key) === 0) {
      run += 1;
      longestSmokeFree = Math.max(longestSmokeFree, run);
    } else {
      run = 0;
    }
  }
  currentSmokeFree = run;

  if (target != null) {
    for (let i = trackedKeys.length - 1; i >= 0; i--) {
      if (countOn(logs, trackedKeys[i]) > target) break;
      currentUnderTarget += 1;
    }
  }

  return {
    currentSmokeFree,
    longestSmokeFree,
    currentUnderTarget: target == null ? null : currentUnderTarget,
  };
}

/** How often the daily target was actually met, lately. */
function targetStats(logs, keys, target) {
  if (target == null) return { target: null, daysMet: 0, daysMissed: 0, metRate: null };
  let daysMet = 0;
  for (const key of keys) if (countOn(logs, key) <= target) daysMet += 1;
  return {
    target,
    daysMet,
    daysMissed: keys.length - daysMet,
    metRate: keys.length ? daysMet / keys.length : null,
  };
}
