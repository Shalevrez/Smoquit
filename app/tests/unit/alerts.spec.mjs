// ─────────────────────────────────────────────────────────────────────────
//  When the app speaks, and — mostly — when it does not.
//
//  An alert engine is judged almost entirely on its silences. A banner that
//  appears when it should is nice; a banner that nags somebody who already
//  answered, or congratulates them for a week they never logged, is the
//  thing that gets the feature switched off and the app deleted. So most of
//  what is pinned down here is the not-saying.
//
//  Two of these tests exist because the naive version of the rule is wrong
//  in a way that reads as correct:
//
//    • "no cigarettes today" is not the same question as "no answer today".
//      countOn() returns 0 for both, and one of them is somebody's best day.
//    • hours are circular. A stretch starting at 23:00 is imminent at 22:10
//      and most of a day away at 00:10, and plain subtraction has that
//      exactly backwards.
// ─────────────────────────────────────────────────────────────────────────
import { test, expect } from "@playwright/test";

import {
  ACTIONS,
  BODIES,
  DEFAULT_PREFS,
  dueAlerts,
  KIND_LABELS,
  markSeen,
  mergeAlerts,
  pickAlert,
  PREF_LABELS,
  SEEN_DAYS,
  sweepSeen,
  TITLES,
} from "../../src/domain/alerts.js";
import { buildProfile } from "../../src/domain/profile.js";
import { dayKey } from "../../src/lib/dates.js";

const TZ = process.env.TZ ?? "(system)";

// Local-time constructors throughout, and every expectation goes through
// dayKey() rather than a literal date string — that is what lets this file
// mean the same thing at UTC+14 and UTC-11.
const at = (day, hour, minute = 0) => new Date(2026, 7, day, hour, minute).getTime();
const key = (day) => dayKey(new Date(2026, 7, day));
const NOON = at(31, 12);

/** `{dayNumber: [[hour, trigger], …]}` → a stored log. */
const logsFrom = (spec) =>
  Object.fromEntries(
    Object.entries(spec).map(([day, entries]) => [
      key(Number(day)),
      entries.map(([hour, trigger]) => ({
        ts: at(Number(day), hour),
        trigger: trigger ?? "Habit",
      })),
    ]),
  );

const profileOf = (logs, rest = {}) =>
  buildProfile({ logs, meta: { trackingStartedAt: key(17) }, now: NOON, ...rest });

/** The whole call, with the boring arguments defaulted. */
const alertsFor = ({ logs = {}, now = NOON, ...rest }) => {
  const profile = rest.profile ?? profileOf(logs, { goal: rest.goal, settings: rest.settings });
  return dueAlerts({ logs, now, ...rest, profile });
};

const ids = (list) => list.map((alert) => alert.id);
const kinds = (list) => list.map((alert) => alert.kind);

/** A fortnight of ordinary smoking, so enoughData is true. */
const established = () => {
  const spec = {};
  for (let day = 18; day <= 30; day++) spec[day] = [[9], [13], [17], [18]];
  return spec;
};

// ── The daily reminder ───────────────────────────────────────────────────

test(`[${TZ}] the reminder waits for the hour the person picked`, () => {
  const logs = logsFrom(established());
  const before = alertsFor({ logs, now: at(31, 19, 30) });
  const after = alertsFor({ logs, now: at(31, 20, 30) });

  expect(kinds(before)).not.toContain("reminder");
  expect(kinds(after)).toContain("reminder");
});

test(`[${TZ}] a missed reminder is shown late, not lost and not tomorrow`, () => {
  // The phone was in a pocket at eight. A backgrounded tab gets no timers,
  // so the test has to be "the hour has passed", never "it is that hour".
  const logs = logsFrom(established());
  expect(kinds(alertsFor({ logs, now: at(31, 23, 45) }))).toContain("reminder");
  // …and it does not survive into the next day, because the id moves on.
  expect(ids(alertsFor({ logs, now: at(31, 23, 45) }))).toContain(`reminder:${key(31)}`);
});

test(`[${TZ}] a day recorded as smoke-free is an ANSWER, and is not nagged`, () => {
  // The bug this exists to stop. logs[today] = [] means somebody pressed
  // "I haven't smoked today" — the best day this app can record. countOn()
  // reads it as zero, exactly like a day nobody opened, so a rule written
  // against countOn nags the person who did best.
  const logs = { ...logsFrom(established()), [key(31)]: [] };
  const shown = alertsFor({ logs, now: at(31, 21) });

  expect(kinds(shown)).not.toContain("reminder");
});

test(`[${TZ}] a day with a cigarette on it is not nagged either`, () => {
  const logs = logsFrom({ ...established(), 31: [[9]] });
  expect(kinds(alertsFor({ logs, now: at(31, 21) }))).not.toContain("reminder");
});

test(`[${TZ}] riding out an urge counts as having been here`, () => {
  const logs = logsFrom(established());
  const cravings = {
    [key(31)]: [{ ts: at(31, 15), trigger: "Stress", outcome: "held", heldMs: 1 }],
  };

  expect(kinds(alertsFor({ logs, cravings, now: at(31, 21) }))).not.toContain("reminder");
});

test(`[${TZ}] nobody is nagged on the day they signed up`, () => {
  const logs = {};
  const profile = buildProfile({ logs, meta: { trackingStartedAt: key(31) }, now: NOON });
  expect(kinds(alertsFor({ logs, profile, now: at(31, 21) }))).not.toContain("reminder");
});

test(`[${TZ}] the switch turns it off, and so does having said it`, () => {
  const logs = logsFrom(established());
  const now = at(31, 21);

  const off = alertsFor({ logs, now, settings: { alerts: { reminder: false } } });
  expect(kinds(off)).not.toContain("reminder");

  const said = alertsFor({ logs, now, seen: { [`reminder:${key(31)}`]: { at: 1, day: key(31) } } });
  expect(kinds(said)).not.toContain("reminder");
});

test(`[${TZ}] the reminder hour is a preference, not a constant`, () => {
  const logs = logsFrom(established());
  const settings = { alerts: { reminderHour: 9 } };
  expect(kinds(alertsFor({ logs, settings, now: at(31, 10) }))).toContain("reminder");
  expect(kinds(alertsFor({ logs, settings, now: at(31, 8) }))).not.toContain("reminder");
});

// ── The risk window ──────────────────────────────────────────────────────

/** Everything piled into 16:00–18:00, so peakWindow is {from: 16}. */
const heavyAfternoon = () => {
  const spec = {};
  for (let day = 18; day <= 30; day++) spec[day] = [[16], [17], [17], [18]];
  return spec;
};

test(`[${TZ}] the heads-up comes before the stretch, not during it`, () => {
  const logs = logsFrom(heavyAfternoon());
  expect(kinds(alertsFor({ logs, now: at(31, 15, 30) }))).toContain("risk");
  expect(kinds(alertsFor({ logs, now: at(31, 11) }))).not.toContain("risk");
  // Once it has started there is nothing left to line up.
  expect(kinds(alertsFor({ logs, now: at(31, 16, 30) }))).not.toContain("risk");
});

test(`[${TZ}] a stretch that wraps past midnight is read the right way round`, () => {
  // The circular-hours case. from = 23, so at 22:10 it is fifty minutes off
  // and at 00:10 it is nearly a day off. Naive subtraction says -1 and 23,
  // which fires it at the one hour it is useless and silences it at the one
  // hour it is not.
  const spec = {};
  for (let day = 18; day <= 30; day++) spec[day] = [[23], [23], [0], [1]];
  const logs = logsFrom(spec);
  const profile = profileOf(logs);
  expect(profile.peakWindow.from).toBe(23);

  expect(kinds(alertsFor({ logs, profile, now: at(31, 22, 10) }))).toContain("risk");
  expect(kinds(alertsFor({ logs, profile, now: at(31, 0, 10) }))).not.toContain("risk");
});

test(`[${TZ}] a flat day has no heaviest stretch worth naming`, () => {
  // Spread evenly, so no three hours carry the threshold share. Saying
  // "this is your hard stretch" about arithmetic is how people stop
  // believing the rest of the app.
  const spec = {};
  for (let day = 18; day <= 30; day++) {
    spec[day] = Array.from({ length: 12 }, (_, i) => [i * 2]);
  }
  const logs = logsFrom(spec);
  const profile = profileOf(logs);
  expect(profile.peakWindow.share).toBeLessThan(0.3);
  expect(kinds(alertsFor({ logs, profile, now: at(31, 15, 30) }))).not.toContain("risk");
});

test(`[${TZ}] a thin record says nothing about a pattern`, () => {
  const logs = logsFrom({ 30: [[16]], 31: [[17]] });
  const profile = profileOf(logs);
  expect(profile.enoughData).toBe(false);
  expect(kinds(alertsFor({ logs, profile, now: at(31, 15, 30) }))).not.toContain("risk");
});

// ── Going over the target ────────────────────────────────────────────────

test(`[${TZ}] going over the target says so; being on it does not`, () => {
  const goal = { target: 3 };
  const onIt = logsFrom({ ...established(), 31: [[9], [10], [11]] });
  const over = logsFrom({ ...established(), 31: [[9], [10], [11], [12]] });

  expect(kinds(alertsFor({ logs: onIt, goal }))).not.toContain("target");
  expect(kinds(alertsFor({ logs: over, goal }))).toContain("target");
});

test(`[${TZ}] a batch of offline entries landing at once still trips it`, () => {
  // Why the rule is `> target` and not `=== target + 1`: a phone syncing
  // four entries from a basement takes the count from under the target to
  // well past it in one step, and the tidier equality never holds.
  const goal = { target: 2 };
  const logs = logsFrom({ ...established(), 31: [[9], [10], [11], [12], [13]] });
  const shown = alertsFor({ logs, goal });

  expect(kinds(shown)).toContain("target");
  expect(shown.find((a) => a.kind === "target").body.params).toMatchObject({ n: 3, target: 2 });
});

test(`[${TZ}] with no target there is nothing to be over`, () => {
  const logs = logsFrom({ ...established(), 31: [[9], [10], [11], [12]] });
  expect(kinds(alertsFor({ logs }))).not.toContain("target");
  expect(kinds(alertsFor({ logs, goal: { target: null } }))).not.toContain("target");
});

// ── Milestones ───────────────────────────────────────────────────────────

/** A fortnight of smoking, then `clean` days with nothing on them. */
const thenClean = (clean) => {
  const spec = {};
  for (let day = 18; day <= 31 - clean; day++) spec[day] = [[9], [13]];
  return logsFrom(spec);
};

test(`[${TZ}] an account that has logged NOTHING is never congratulated`, () => {
  // The one place this feature could lie. streaks() counts a tracked day
  // with no key as smoke-free — deliberately, so a perfect day counts
  // without being announced. But that hands somebody who signed up and
  // never opened the app again a fortnight-long "smoke-free run" the app
  // cannot vouch for a single day of.
  const logs = {};
  const profile = buildProfile({ logs, meta: { trackingStartedAt: key(17) }, now: NOON });
  expect(profile.streak.currentSmokeFree).toBeGreaterThan(7);
  expect(profile.totalEntries).toBe(0);

  expect(kinds(alertsFor({ logs, profile }))).not.toContain("milestone");
});

test(`[${TZ}] a first clean day is worth saying, once`, () => {
  const logs = thenClean(1);
  const first = alertsFor({ logs });
  expect(ids(first)).toContain("milestone:free");
  expect(first.find((a) => a.id === "milestone:free").title.key).toBe(TITLES.smokeFreeOne);

  const seen = markSeen(
    null,
    first.find((a) => a.id === "milestone:free"),
    NOON,
  ).seen;
  expect(ids(alertsFor({ logs, seen }))).not.toContain("milestone:free");
});

test(`[${TZ}] a week beats a day, and does not repeat every day inside it`, () => {
  const logs = thenClean(7);
  const shown = alertsFor({ logs }).find((a) => a.id === "milestone:free");
  expect(shown.value).toBe(7);
  expect(shown.title.key).toBe(TITLES.smokeFree);

  // Already told about the seven; day eight is not news.
  const seen = { "milestone:free": { at: NOON, day: key(31), value: 7 } };
  expect(ids(alertsFor({ logs, seen }))).not.toContain("milestone:free");
});

test(`[${TZ}] breaking the run re-arms it, so the next one counts again`, () => {
  // Without this the high-water mark is permanent and somebody's second
  // good week — the harder one — passes in silence.
  const logs = thenClean(1);
  const seen = { "milestone:free": { at: at(20, 12), day: key(20), value: 7 } };
  const profile = profileOf(logs);
  expect(profile.streak.currentSmokeFree).toBe(1);

  expect(ids(alertsFor({ logs, profile, seen }))).toContain("milestone:free");
});

test(`[${TZ}] money milestones stay quiet with nothing to have saved against`, () => {
  // savedOver() answers null rather than zero without a baseline. Treating
  // that null as a zero would be silent; treating it as a number would be a
  // claim about a saving nobody can check.
  const logs = thenClean(2);
  const settings = { pricePerPack: 40, country: "IL" };

  const noBaseline = alertsFor({ logs, settings, goal: { target: 5 } });
  expect(ids(noBaseline)).not.toContain("milestone:pack");

  const withBaseline = alertsFor({ logs, settings, goal: { target: 5, baseline: 20 } });
  expect(ids(withBaseline)).toContain("milestone:pack");
});

test(`[${TZ}] a pack's worth is counted in whole packs`, () => {
  const logs = thenClean(2);
  const goal = { baseline: 20 };
  const settings = { pricePerPack: 40, country: "IL" };
  const shown = alertsFor({ logs, goal, settings }).find((a) => a.id === "milestone:pack");

  expect(shown.value).toBeGreaterThanOrEqual(1);
  // Already heard about that many; it takes another full pack to speak up.
  const seen = { "milestone:pack": { at: NOON, day: key(31), value: shown.value } };
  expect(ids(alertsFor({ logs, goal, settings, seen }))).not.toContain("milestone:pack");
});

// ── Order, and how many ──────────────────────────────────────────────────

test(`[${TZ}] only one thing is said, and it is the most urgent one`, () => {
  const logs = { ...logsFrom(established()), [key(31)]: [] };
  const shown = alertsFor({
    logs,
    goal: { target: 1, baseline: 20 },
    settings: { pricePerPack: 40, country: "IL" },
    now: at(31, 21),
  });

  expect(shown.length).toBeGreaterThan(0);
  expect(pickAlert(shown)).toBe(shown[0]);
  // Priority order holds whatever else is due.
  expect(shown.map((a) => a.priority)).toEqual(
    [...shown.map((a) => a.priority)].sort((a, b) => b - a),
  );
});

test(`[${TZ}] the same inputs give the same order, every time`, () => {
  const args = {
    logs: thenClean(7),
    goal: { target: 2, baseline: 20 },
    settings: { country: "IL" },
  };
  expect(ids(alertsFor(args))).toEqual(ids(alertsFor(args)));
});

test(`[${TZ}] every switch really is a switch`, () => {
  const logs = { ...logsFrom(established()), [key(31)]: [] };
  const args = { logs, goal: { target: 1, baseline: 20 }, now: at(31, 21) };
  const off = Object.fromEntries(Object.keys(DEFAULT_PREFS).map((k) => [k, false]));

  expect(alertsFor({ ...args, settings: { alerts: off, country: "IL" } })).toEqual([]);
});

// ── The record of what has been said ─────────────────────────────────────

test(`[${TZ}] marking the same thing twice changes nothing at all`, () => {
  // Load-bearing. The caller writes to the database whenever this returns a
  // new object, and it is called on a timer, so an unstable identity here
  // is a network write every few seconds for as long as the app is open.
  const alert = { id: "reminder:x" };
  const once = markSeen(null, alert, NOON);
  expect(markSeen(once, alert, NOON + 5000)).toBe(once);
});

test(`[${TZ}] a higher milestone overwrites a lower one`, () => {
  const row = markSeen(null, { id: "milestone:free", value: 1 }, NOON);
  const up = markSeen(row, { id: "milestone:free", value: 7 }, NOON + 1000);
  expect(up.seen["milestone:free"].value).toBe(7);
  expect(up).not.toBe(row);
});

test(`[${TZ}] two devices: the EARLIER sighting wins, and the higher value`, () => {
  // Opposite polarity to mergeFeedback, on purpose. A tip verdict is an
  // opinion, so the newer one is current. This is evidence that something
  // already happened — taking the newer would let a device that has only
  // just heard about an alert re-open a settled question.
  const phone = {
    seen: { "daily:x": { at: 100, day: "a" }, "milestone:free": { at: 100, value: 7 } },
  };
  const laptop = {
    seen: { "daily:x": { at: 900, day: "b" }, "milestone:free": { at: 900, value: 1 } },
  };

  const merged = mergeAlerts(phone, laptop);
  expect(merged.seen["daily:x"].at).toBe(100);
  expect(merged.seen["daily:x"].day).toBe("a");
  expect(merged.seen["milestone:free"].value).toBe(7);
});

test(`[${TZ}] merging keeps what only one side knows about`, () => {
  const merged = mergeAlerts({ seen: { a: { at: 1 } } }, { seen: { b: { at: 2 } } });
  expect(Object.keys(merged.seen).sort()).toEqual(["a", "b"]);
});

test(`[${TZ}] old day records are swept; milestones never are`, () => {
  const old = NOON - (SEEN_DAYS + 1) * 24 * 60 * 60 * 1000;
  const row = {
    seen: {
      "reminder:old": { at: old, day: "old" },
      "reminder:new": { at: NOON, day: key(31) },
      "milestone:pack": { at: old, day: "old", value: 3 },
    },
  };

  const { row: swept, dropped } = sweepSeen(row, NOON);
  expect(dropped).toBe(1);
  expect(Object.keys(swept.seen).sort()).toEqual(["milestone:pack", "reminder:new"]);
});

test(`[${TZ}] sweeping nothing hands back the same row, so nothing is written`, () => {
  const row = { seen: { "reminder:new": { at: NOON, day: key(31) } } };
  expect(sweepSeen(row, NOON).row).toBe(row);
});

// ── The strings ──────────────────────────────────────────────────────────

test(`[${TZ}] no string is stranded where nothing can ever show it`, () => {
  // check-i18n demands Hebrew for every value in these tables, so a key
  // nothing emits becomes a translation of something nobody sees — invisible
  // in review and impossible to spot later.
  const emitted = new Set();
  const collect = (list) =>
    list.forEach((alert) => {
      emitted.add(alert.title.key);
      emitted.add(alert.body.key);
      if (alert.action) emitted.add(alert.action.label);
    });

  const settings = { pricePerPack: 40, country: "IL" };
  const money = { baseline: 20 };

  collect(alertsFor({ logs: thenClean(1), goal: money, settings }));
  collect(alertsFor({ logs: thenClean(7), goal: { ...money, target: 3 }, settings }));
  collect(alertsFor({ logs: logsFrom(established()), now: at(31, 21) }));
  collect(alertsFor({ logs: logsFrom(heavyAfternoon()), now: at(31, 15, 30) }));
  collect(
    alertsFor({ logs: logsFrom({ ...established(), 31: [[9], [10]] }), goal: { target: 1 } }),
  );

  // The under-target run needs a week of days inside the number.
  const modest = {};
  for (let day = 18; day <= 31; day++) modest[day] = [[9]];
  collect(alertsFor({ logs: logsFrom(modest), goal: { target: 2 } }));

  // The first-of-day variant needs somebody whose day OPENS with one but
  // whose weight is elsewhere — otherwise the heaviest stretch sits on top
  // of the morning, covers that hour, and the variant is correctly skipped.
  const morning = {};
  for (let day = 18; day <= 30; day++) morning[day] = [[7], [19], [20], [20], [21], [21]];
  collect(alertsFor({ logs: logsFrom(morning), now: at(31, 6, 30) }));

  const unreachable = [
    ...Object.values(TITLES),
    ...Object.values(BODIES),
    ...Object.values(ACTIONS),
  ].filter((text) => !emitted.has(text));

  expect(unreachable).toEqual([]);
});

test(`[${TZ}] every switch has a label and every kind has a heading`, () => {
  expect(Object.keys(PREF_LABELS).sort()).toEqual(
    Object.keys(DEFAULT_PREFS)
      .filter((k) => k !== "reminderHour")
      .sort(),
  );
  expect(Object.keys(KIND_LABELS).sort()).toEqual(
    ["milestone", "reminder", "risk", "target"].sort(),
  );
});
