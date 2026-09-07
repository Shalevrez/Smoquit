// ─────────────────────────────────────────────────────────────────────────
//  Smoquit — send-alerts.  GENERATED FILE. DO NOT EDIT.
//
//  Built from app/edge/send-alerts.js and the domain rules it imports, by
//  app/scripts/build-edge.mjs. Edit the source and run `npm run build`;
//  editing this file directly is undone by the next build, and the build
//  fails if you commit a change to the source without regenerating it.
//
//  TO DEPLOY: Supabase dashboard -> Edge Functions -> send-alerts ->
//  paste the whole of this file -> Deploy. The secrets it expects are
//  listed in UPLOAD-ME-README.txt.
// ─────────────────────────────────────────────────────────────────────────
// edge/send-alerts.js
import { createClient } from "npm:@supabase/supabase-js@2";
import webpush from "npm:web-push@3.6.7";

// src/data/countries.js
var COUNTRIES = {
  "IL": {
    "name": "Israel",
    "currency": "\u20AA",
    "code": "ILS"
  },
  "US": {
    "name": "United States",
    "currency": "$",
    "code": "USD"
  },
  "GB": {
    "name": "United Kingdom",
    "currency": "\xA3",
    "code": "GBP"
  },
  "DE": {
    "name": "Germany",
    "currency": "\u20AC",
    "code": "EUR"
  },
  "FR": {
    "name": "France",
    "currency": "\u20AC",
    "code": "EUR"
  },
  "IT": {
    "name": "Italy",
    "currency": "\u20AC",
    "code": "EUR"
  },
  "ES": {
    "name": "Spain",
    "currency": "\u20AC",
    "code": "EUR"
  },
  "AU": {
    "name": "Australia",
    "currency": "A$",
    "code": "AUD"
  },
  "CA": {
    "name": "Canada",
    "currency": "C$",
    "code": "CAD"
  },
  "IN": {
    "name": "India",
    "currency": "\u20B9",
    "code": "INR"
  }
};
var FALLBACK_COUNTRY = {
  "name": "Other",
  "currency": "$",
  "code": "USD"
};
function countryFor(code) {
  return COUNTRIES[code] || FALLBACK_COUNTRY;
}

// src/lib/dates.js
var pad = (n) => String(n).padStart(2, "0");
function dayKey(date = /* @__PURE__ */ new Date()) {
  const d = date instanceof Date ? date : new Date(date);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
var todayKey = () => dayKey();
function dayKeysBetween(from, to) {
  const start = from instanceof Date ? new Date(from) : /* @__PURE__ */ new Date(`${from}T00:00:00`);
  const end = to instanceof Date ? new Date(to) : /* @__PURE__ */ new Date(`${to}T00:00:00`);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  const keys = [];
  const cursor = new Date(start);
  while (cursor <= end) {
    keys.push(dayKey(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return keys;
}
function atHour(ts, hour) {
  const d = new Date(ts);
  d.setHours(hour, 0, 0, 0);
  return d.getTime();
}
function zoneOffsetMs(timeZone, at = Date.now()) {
  const when = new Date(at);
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).formatToParts(when);
  const field = (type) => Number(parts.find((part) => part.type === type)?.value);
  const local = Date.UTC(
    field("year"),
    field("month") - 1,
    field("day"),
    field("hour"),
    field("minute"),
    field("second")
  );
  return local - Math.floor(when.getTime() / 1e3) * 1e3;
}
function hoursUntilHour(ts, hour) {
  const d = new Date(ts);
  const now = d.getHours() + d.getMinutes() / 60;
  return (hour - now + 24) % 24;
}

// src/domain/entries.js
var liveEntries = (entries) => (entries ?? []).filter((entry) => !entry?.d);
var entriesOn = (logs, key) => liveEntries(logs?.[key]);
var countOn = (logs, key) => entriesOn(logs, key).length;

// src/domain/money.js
var PER_PACK = 20;
var DEFAULT_PACK_PRICE = 13;
var pricePerCigarette = (settings) => (settings?.pricePerPack ?? DEFAULT_PACK_PRICE) / PER_PACK;
var avoidedOn = (count, baseline) => Math.max(0, (baseline ?? 0) - count);
function savedOver(logs, keys, goal, settings) {
  if (!goal?.baseline) return { avoided: null, saved: null, perDay: null };
  let avoided = 0;
  for (const key of keys) avoided += avoidedOn(countOn(logs, key), goal.baseline);
  const saved = avoided * pricePerCigarette(settings);
  return { avoided, saved, perDay: keys.length ? saved / keys.length : null };
}

// src/domain/alerts.js
var PRIORITY = { target: 90, milestone: 70, risk: 50, reminder: 30 };
var TITLES = {
  reminder: "Nothing logged today",
  risk: "Your heavy stretch is coming up",
  riskFirst: "Your first one usually lands around now",
  smokeFreeOne: "A full day, nothing logged",
  smokeFree: "{days} days smoke-free",
  best: "A new personal best",
  pack: "A pack's worth, not smoked",
  underTarget: "A week inside your target",
  target: "Over today's target"
};
var BODIES = {
  reminder: "Two taps and the day is on the record \u2014 even if the answer is none.",
  risk: "{from}\u2013{to} carries {pct}% of everything you have logged. Line something up now.",
  riskFirst: "Most days your first cigarette is around {hour}, and nothing is logged yet.",
  smokeFreeOne: "That is the one that takes the most deciding. It is on the record now.",
  smokeFree: "{days} days with nothing logged against them.",
  best: "{days} days is the longest run you have recorded.",
  pack: "{n} cigarettes you did not smoke \u2014 about {currency}{amount} of them.",
  underTarget: "{days} days running at or under {target} a day.",
  target: "{n} over your {target} a day. The rest of the evening is still yours."
};
var ACTIONS = {
  log: "Open Today",
  insights: "See the numbers"
};
var DEFAULT_PREFS = {
  reminder: true,
  risk: true,
  milestone: true,
  target: true,
  reminderHour: 20
};
var RISK_SHARE = 0.3;
var RISK_LEAD_HOURS = 1;
var EARLY_HOUR = 8;
var MIN_DAYS = 2;
var FREE_STEPS = [1, 7];
var MIN_BEST = 3;
var UNDER_TARGET_STEP = 7;
function alertPrefs(settings) {
  return { ...DEFAULT_PREFS, ...settings?.alerts ?? {} };
}
function dueAlerts({
  profile,
  logs,
  cravings,
  goal,
  settings,
  seen,
  now = Date.now()
} = {}) {
  const prefs = alertPrefs(settings);
  const today = dayKey(now);
  const already = (id) => Boolean(seen?.[id]);
  const found = [
    ...targetAlert({ logs, goal, prefs, today, already }),
    ...milestoneAlerts({ profile, goal, settings, prefs, seen, already }),
    ...riskAlerts({ profile, logs, prefs, today, now, already }),
    ...reminderAlert({ profile, logs, cravings, prefs, today, now, already })
  ];
  return found.sort((a, b) => b.priority - a.priority || a.id.localeCompare(b.id));
}
var pickAlert = (alerts) => alerts?.[0] ?? null;
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
      action: { tab: "log", label: ACTIONS.log }
    }
  ];
}
function milestoneAlerts({ profile, goal, settings, prefs, seen, already }) {
  if (!prefs.milestone) return [];
  if (!profile || profile.days < MIN_DAYS || profile.totalEntries === 0) return [];
  const out = [];
  const streak = profile.streak ?? {};
  const free = streak.currentSmokeFree ?? 0;
  const held = (id, current, rearm) => {
    const stored = seen?.[id]?.value ?? 0;
    return rearm && current < stored ? 0 : stored;
  };
  const push = (id, value, tone, title, body) => out.push({
    id,
    kind: "milestone",
    priority: PRIORITY.milestone,
    tone,
    value,
    title,
    body,
    action: { tab: "insights", label: ACTIONS.insights }
  });
  const step = [...FREE_STEPS].reverse().find((n) => free >= n) ?? null;
  if (step != null && step > held("milestone:free", free, true)) {
    push(
      "milestone:free",
      step,
      "good",
      step === 1 ? { key: TITLES.smokeFreeOne, params: {} } : { key: TITLES.smokeFree, params: { days: step } },
      step === 1 ? { key: BODIES.smokeFreeOne, params: {} } : { key: BODIES.smokeFree, params: { days: step } }
    );
  }
  const best = streak.longestSmokeFree ?? 0;
  if (free >= MIN_BEST && free === best && free > held("milestone:best", free, true)) {
    push(
      "milestone:best",
      free,
      "good",
      { key: TITLES.best, params: {} },
      { key: BODIES.best, params: { days: free } }
    );
  }
  const under = streak.currentUnderTarget ?? 0;
  if (goal?.target != null && under >= UNDER_TARGET_STEP && under > held("milestone:undertarget", under, true)) {
    push(
      "milestone:undertarget",
      under,
      "good",
      { key: TITLES.underTarget, params: {} },
      { key: BODIES.underTarget, params: { days: under, target: goal.target } }
    );
  }
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
          amount: (packs * PER_PACK * price).toFixed(2)
        }
      }
    );
  }
  return out;
}
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
      action: { tab: "log", label: ACTIONS.log }
    }
  ];
  const stretch = profile.peakWindow;
  if (stretch && stretch.share >= RISK_SHARE && approaching(stretch.from)) {
    const params = {
      from: stretch.from,
      to: stretch.to,
      pct: Math.round(stretch.share * 100)
    };
    return made({ key: TITLES.risk, params: {} }, { key: BODIES.risk, params });
  }
  const first = profile.firstOfDayHour;
  if (first != null && first <= EARLY_HOUR && countOn(logs, today) === 0 && !coversHour(stretch, first) && approaching(first)) {
    return made(
      { key: TITLES.riskFirst, params: {} },
      { key: BODIES.riskFirst, params: { hour: first } }
    );
  }
  return [];
}
function reminderAlert({ profile, logs, cravings, prefs, today, now, already }) {
  const id = `reminder:${today}`;
  if (!prefs.reminder || already(id)) return [];
  if (!profile || profile.days < MIN_DAYS) return [];
  const due = atHour(now, prefs.reminderHour);
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
      action: { tab: "log", label: ACTIONS.log }
    }
  ];
}
function coversHour(stretch, hour) {
  if (!stretch) return false;
  const { from, to } = stretch;
  return from <= to ? hour >= from && hour <= to : hour >= from || hour <= to;
}
function currencyOf(settings) {
  return countryFor(settings?.country).currency;
}
function markSeen(row, alert, at = Date.now()) {
  if (!alert) return row;
  const seen = row?.seen ?? {};
  const before = seen[alert.id];
  const value = alert.value ?? null;
  if (before && (value == null || (before.value ?? 0) >= value)) return row;
  return {
    ...row ?? {},
    seen: {
      ...seen,
      [alert.id]: {
        at,
        day: dayKey(at),
        ...value == null ? {} : { value }
      }
    }
  };
}

// src/domain/notify.js
var PAYLOAD_VERSION = 1;
var ICON = "/icon-192.png";
function pushPayload(alert, { t, hour }) {
  const say = (part) => {
    if (!part) return "";
    const params = { ...part.params };
    for (const name of ["hour", "from", "to"]) {
      if (name in params) params[name] = hour(params[name]);
    }
    for (const name of ["trigger", "part"]) {
      if (name in params) params[name] = t(params[name]);
    }
    return t(part.key, params);
  };
  return {
    v: PAYLOAD_VERSION,
    title: say(alert.title),
    options: {
      body: say(alert.body),
      icon: ICON,
      badge: ICON,
      // Tagged by kind, so a second reminder replaces the first rather than
      // stacking. Nobody wants to wake up to four of these.
      tag: `smoquit-${alert.kind}`,
      data: { id: alert.id, kind: alert.kind, tab: alert.action?.tab ?? "log" }
    }
  };
}

// src/data/triggers.js
var TRIGGERS = [
  "Stress",
  "Boredom",
  "Coffee",
  "After a meal",
  "Social",
  "Craving",
  "Habit"
];

// src/domain/cravings.js
var WAVE_MS = 5 * 60 * 1e3;
var on = (cravings, key) => cravings?.[key] ?? [];
function summarise(cravings, from, to = todayKey()) {
  let held = 0;
  let faced = 0;
  for (const key of dayKeysBetween(from, to)) {
    for (const session of on(cravings, key)) {
      faced += 1;
      if (session.outcome === "held") held += 1;
    }
  }
  return { held, faced, rate: faced === 0 ? null : held / faced };
}

// src/domain/insights.js
function trackingStartedAt(logs, meta) {
  if (meta?.trackingStartedAt) return meta.trackingStartedAt;
  const keys = Object.keys(logs ?? {}).sort();
  return keys.length ? keys[0] : todayKey();
}

// src/domain/profile.js
var WINDOW_DAYS = 14;
var MIN_DAYS2 = 3;
var MIN_ENTRIES = 5;
var TREND_DEADBAND = 0.2;
var MIN_WEEKDAYS = 2;
var MIN_WEEKDAY_ENTRIES = 3;
var WEEKDAY_LIFT = 0.25;
var PARTS = [
  ["night", 22, 4],
  ["morning", 5, 11],
  ["afternoon", 12, 16],
  ["evening", 17, 21]
];
function partOfDay(hour) {
  for (const [name, from, to] of PARTS) {
    if (from <= to ? hour >= from && hour <= to : hour >= from || hour <= to) return name;
  }
  return "night";
}
function buildProfile({ logs, cravings, goal, settings, meta, now = Date.now() } = {}) {
  const todayK = dayKey(now);
  const trackedKeys = dayKeysBetween(trackingStartedAt(logs, meta), todayK);
  const recentKeys = trackedKeys.slice(-WINDOW_DAYS);
  const previousKeys = trackedKeys.slice(-WINDOW_DAYS * 2, -WINDOW_DAYS);
  const recent = windowStats(logs, recentKeys);
  const previous = previousKeys.length ? windowStats(logs, previousKeys) : null;
  const whole = wholeRecord(logs, trackedKeys);
  const totalEntries = whole.total;
  return {
    today: todayK,
    days: trackedKeys.length,
    totalEntries,
    enoughData: trackedKeys.length >= MIN_DAYS2 && totalEntries >= MIN_ENTRIES,
    recent,
    previous,
    trend: direction(recent.perDay, previous?.perDay),
    // The whole record, which is what the Insights tab draws.
    allTime: {
      total: whole.total,
      days: trackedKeys.length,
      avgPerDay: whole.total / Math.max(trackedKeys.length, 1),
      bestDay: whole.perDay.length ? Math.min(...whole.perDay) : 0,
      smokeFreeDays: whole.perDay.filter((count) => count === 0).length
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
      allTime: savedOver(logs, trackedKeys, goal, settings)
    }
  };
}
function windowStats(logs, keys) {
  const byHour = new Array(24).fill(0);
  const triggers = {};
  let total = 0;
  for (const key of keys) {
    for (const entry of entriesOn(logs, key)) {
      total += 1;
      byHour[new Date(entry.ts).getHours()] += 1;
      if (entry.trigger && entry.trigger !== "Unlogged") {
        triggers[entry.trigger] = (triggers[entry.trigger] || 0) + 1;
      }
    }
  }
  const days = Math.max(keys.length, 1);
  return { days: keys.length, total, perDay: total / days, byHour, triggers };
}
function wholeRecord(logs, keys) {
  const byHour = new Array(24).fill(0);
  const triggerHours = {};
  const weekdayCounts = new Array(7).fill(0);
  const weekdayDays = new Array(7).fill(0);
  const perDay = [];
  let total = 0;
  for (const key of keys) {
    const weekday = (/* @__PURE__ */ new Date(`${key}T00:00:00`)).getDay();
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
      perDay: weekdayCounts.map((count, i) => weekdayDays[i] ? count / weekdayDays[i] : 0)
    }
  };
}
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
    share: best.count / total
  };
}
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
function rankTriggers(recent, previous, allTimeHours) {
  return TRIGGERS.map((trigger) => {
    const count = recent.triggers[trigger] ?? 0;
    const recentPerDay = count / Math.max(recent.days, 1);
    const prevPerDay = previous ? (previous.triggers[trigger] ?? 0) / Math.max(previous.days, 1) : null;
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
      part: count ? partOfDay(peakOf(hours)) : null
    };
  }).filter((rank) => rank.count > 0).sort((a, b) => b.count - a.count || a.trigger.localeCompare(b.trigger));
}
function direction(now, before) {
  if (before == null) return null;
  if (before === 0) return now === 0 ? 0 : 1;
  const change = (now - before) / before;
  if (change <= -TREND_DEADBAND) return -1;
  if (change >= TREND_DEADBAND) return 1;
  return 0;
}
function peakOf(byHour) {
  return byHour.indexOf(Math.max(...byHour));
}
function peakPart(byHour) {
  const parts = {};
  byHour.forEach((count2, hour) => {
    parts[partOfDay(hour)] = (parts[partOfDay(hour)] || 0) + count2;
  });
  const total = byHour.reduce((sum, count2) => sum + count2, 0);
  const [name, count] = Object.entries(parts).sort(([, a], [, b]) => b - a)[0] ?? [null, 0];
  return { part: total ? name : null, share: total ? count / total : 0 };
}
function medianFirstHour(logs, keys) {
  const firsts = [];
  for (const key of keys) {
    const entries = entriesOn(logs, key);
    if (entries.length) firsts.push(new Date(Math.min(...entries.map((e) => e.ts))).getHours());
  }
  if (!firsts.length) return null;
  firsts.sort((a, b) => a - b);
  return firsts[Math.floor(firsts.length / 2)];
}
function cravingStats(cravings, keys) {
  const overall = keys.length ? summarise(cravings, keys[0], keys[keys.length - 1]) : { held: 0, faced: 0, rate: null };
  const byTrigger = {};
  let heldMsTotal = 0;
  for (const key of keys) {
    for (const session of cravings?.[key] ?? []) {
      if (session.trigger) {
        const seen = byTrigger[session.trigger] ??= { held: 0, faced: 0, rate: null };
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
    avgHeldMs: overall.faced ? heldMsTotal / overall.faced : null
  };
}
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
    currentUnderTarget: target == null ? null : currentUnderTarget
  };
}
function targetStats(logs, keys, target) {
  if (target == null) return { target: null, daysMet: 0, daysMissed: 0, metRate: null };
  let daysMet = 0;
  for (const key of keys) if (countOn(logs, key) <= target) daysMet += 1;
  return {
    target,
    daysMet,
    daysMissed: keys.length - daysMet,
    metRate: keys.length ? daysMet / keys.length : null
  };
}

// src/domain/zone.js
function shiftDays(byDay, offset) {
  const shifted = {};
  for (const [day, rows] of Object.entries(byDay ?? {})) {
    shifted[day] = (rows ?? []).map(
      (row) => Number.isFinite(Number(row?.ts)) ? { ...row, ts: Number(row.ts) + offset } : row
    );
  }
  return shifted;
}
function inZone({ tz, logs, cravings, now = Date.now() }) {
  let theirs = 0;
  try {
    theirs = zoneOffsetMs(tz || "UTC", now);
  } catch {
    theirs = 0;
  }
  const hosts = -new Date(now).getTimezoneOffset() * 6e4;
  const offset = theirs - hosts;
  return {
    offset,
    now: now + offset,
    logs: shiftDays(logs, offset),
    cravings: shiftDays(cravings, offset)
  };
}

// src/i18n/he.js
var SQ_HE = {
  "Today": "\u05D4\u05D9\u05D5\u05DD",
  "Reminder": "\u05EA\u05D6\u05DB\u05D5\u05E8\u05EA",
  "Heads up": "\u05E9\u05D9\u05DE\u05D5 \u05DC\u05D1",
  "Milestone": "\u05D0\u05D1\u05DF \u05D3\u05E8\u05DA",
  "Nothing logged today": "\u05DC\u05D0 \u05EA\u05D5\u05E2\u05D3 \u05DB\u05DC\u05D5\u05DD \u05D4\u05D9\u05D5\u05DD",
  "Your heavy stretch is coming up": "\u05D4\u05E7\u05D8\u05E2 \u05D4\u05E2\u05DE\u05D5\u05E1 \u05E9\u05DC\u05DB\u05DD \u05DE\u05EA\u05E7\u05E8\u05D1",
  "Your first one usually lands around now": "\u05D4\u05E8\u05D0\u05E9\u05D5\u05E0\u05D4 \u05E9\u05DC\u05DB\u05DD \u05E0\u05D5\u05D7\u05EA\u05EA \u05D1\u05D3\u05E8\u05DB \u05DB\u05DC\u05DC \u05D1\u05E2\u05E8\u05DA \u05E2\u05DB\u05E9\u05D9\u05D5",
  "A full day, nothing logged": "\u05D9\u05D5\u05DD \u05E9\u05DC\u05DD, \u05D1\u05DC\u05D9 \u05E9\u05E0\u05E8\u05E9\u05DD \u05DB\u05DC\u05D5\u05DD",
  "{days} days smoke-free": "\u200F{days} \u05D9\u05DE\u05D9\u05DD \u05D1\u05DC\u05D9 \u05E2\u05D9\u05E9\u05D5\u05DF",
  "A new personal best": "\u05E9\u05D9\u05D0 \u05D0\u05D9\u05E9\u05D9 \u05D7\u05D3\u05E9",
  "A pack's worth, not smoked": "\u05D7\u05D1\u05D9\u05DC\u05D4 \u05E9\u05DC\u05DE\u05D4 \u05E9\u05DC\u05D0 \u05E2\u05D5\u05E9\u05E0\u05D4",
  "A week inside your target": "\u05E9\u05D1\u05D5\u05E2 \u05D1\u05EA\u05D5\u05DA \u05D4\u05D9\u05E2\u05D3 \u05E9\u05DC\u05DB\u05DD",
  "Over today's target": "\u05DE\u05E2\u05DC \u05D4\u05D9\u05E2\u05D3 \u05E9\u05DC \u05D4\u05D9\u05D5\u05DD",
  "Two taps and the day is on the record \u2014 even if the answer is none.": "\u05E9\u05EA\u05D9 \u05E0\u05D2\u05D9\u05E2\u05D5\u05EA \u05D5\u05D4\u05D9\u05D5\u05DD \u05DE\u05EA\u05D5\u05E2\u05D3 \u2014 \u05D2\u05DD \u05D0\u05DD \u05D4\u05EA\u05E9\u05D5\u05D1\u05D4 \u05D4\u05D9\u05D0 \u05D0\u05E3 \u05D0\u05D7\u05EA.",
  "{from}\u2013{to} carries {pct}% of everything you have logged. Line something up now.": "\u200F{from}\u2013{to} \u05E0\u05D5\u05E9\u05D0 {pct}% \u05DE\u05DB\u05DC \u05DE\u05D4 \u05E9\u05EA\u05D9\u05E2\u05D3\u05EA\u05DD. \u05EA\u05DB\u05E0\u05E0\u05D5 \u05DE\u05E9\u05D4\u05D5 \u05E2\u05DB\u05E9\u05D9\u05D5.",
  "Most days your first cigarette is around {hour}, and nothing is logged yet.": "\u05D1\u05E8\u05D5\u05D1 \u05D4\u05D9\u05DE\u05D9\u05DD \u05D4\u05E1\u05D9\u05D2\u05E8\u05D9\u05D4 \u05D4\u05E8\u05D0\u05E9\u05D5\u05E0\u05D4 \u05E9\u05DC\u05DB\u05DD \u05D4\u05D9\u05D0 \u05D1\u05E2\u05E8\u05DA \u05D1\u05BE{hour}, \u05D5\u05E2\u05D3\u05D9\u05D9\u05DF \u05DC\u05D0 \u05EA\u05D5\u05E2\u05D3 \u05DB\u05DC\u05D5\u05DD.",
  "That is the one that takes the most deciding. It is on the record now.": "\u05D6\u05D4 \u05D4\u05D9\u05D5\u05DD \u05E9\u05D3\u05D5\u05E8\u05E9 \u05D0\u05EA \u05DE\u05E8\u05D1\u05D9\u05EA \u05D4\u05D4\u05D7\u05DC\u05D8\u05D5\u05EA. \u05E2\u05DB\u05E9\u05D9\u05D5 \u05D4\u05D5\u05D0 \u05DE\u05EA\u05D5\u05E2\u05D3.",
  "{days} days with nothing logged against them.": "\u200F{days} \u05D9\u05DE\u05D9\u05DD \u05E9\u05DC\u05D0 \u05E0\u05E8\u05E9\u05DD \u05E2\u05DC\u05D9\u05D4\u05DD \u05DB\u05DC\u05D5\u05DD.",
  "{days} days is the longest run you have recorded.": "\u200F{days} \u05D9\u05DE\u05D9\u05DD \u05D4\u05DD \u05D4\u05E8\u05E6\u05E3 \u05D4\u05D0\u05E8\u05D5\u05DA \u05D1\u05D9\u05D5\u05EA\u05E8 \u05E9\u05EA\u05D9\u05E2\u05D3\u05EA\u05DD.",
  "{n} cigarettes you did not smoke \u2014 about {currency}{amount} of them.": "\u200F{n} \u05E1\u05D9\u05D2\u05E8\u05D9\u05D5\u05EA \u05E9\u05DC\u05D0 \u05E2\u05D9\u05E9\u05E0\u05EA\u05DD \u2014 \u05E9\u05D5\u05D5\u05D9 \u05DB\u05BE{currency}{amount}.",
  "{days} days running at or under {target} a day.": "\u200F{days} \u05D9\u05DE\u05D9\u05DD \u05D1\u05E8\u05E6\u05E3 \u05E9\u05DC {target} \u05D0\u05D5 \u05E4\u05D7\u05D5\u05EA \u05D1\u05D9\u05D5\u05DD.",
  "{n} over your {target} a day. The rest of the evening is still yours.": "\u200F{n} \u05DE\u05E2\u05DC \u05D4\u05BE{target} \u05D4\u05D9\u05D5\u05DE\u05D9\u05D5\u05EA \u05E9\u05DC\u05DB\u05DD. \u05E9\u05D0\u05E8 \u05D4\u05E2\u05E8\u05D1 \u05E2\u05D3\u05D9\u05D9\u05DF \u05E9\u05DC\u05DB\u05DD.",
  "Open Today": "\u05E4\u05EA\u05D7\u05D5 \u05D0\u05EA \u05D4\u05D9\u05D5\u05DD",
  "See the numbers": "\u05DC\u05E8\u05D0\u05D5\u05EA \u05D0\u05EA \u05D4\u05DE\u05E1\u05E4\u05E8\u05D9\u05DD",
  "When I go over my daily target": "\u05DB\u05E9\u05D0\u05E0\u05D9 \u05E2\u05D5\u05D1\u05E8/\u05EA \u05D0\u05EA \u05D4\u05D9\u05E2\u05D3 \u05D4\u05D9\u05D5\u05DE\u05D9",
  "Streaks, records and money saved": "\u05E8\u05E6\u05E4\u05D9\u05DD, \u05E9\u05D9\u05D0\u05D9\u05DD \u05D5\u05DB\u05E1\u05E3 \u05E9\u05E0\u05D7\u05E1\u05DA",
  "Before my heaviest stretch of the day": "\u05DC\u05E4\u05E0\u05D9 \u05D4\u05E7\u05D8\u05E2 \u05D4\u05E2\u05DE\u05D5\u05E1 \u05D1\u05D9\u05D5\u05DD \u05E9\u05DC\u05D9",
  "If I have not logged anything by evening": "\u05D0\u05DD \u05DC\u05D0 \u05EA\u05D9\u05E2\u05D3\u05EA\u05D9 \u05DB\u05DC\u05D5\u05DD \u05E2\u05D3 \u05D4\u05E2\u05E8\u05D1"
};

// src/i18n/translate.js
function translate(dict, key, params) {
  let text = dict && dict[key] || key;
  if (params) {
    for (const name in params) text = text.split("{" + name + "}").join(String(params[name]));
  }
  return text;
}

// edge/send-alerts.js
var MAX_FAILURES = 5;
var KEYS = ["logs", "cravings", "goal", "settings", "meta", "alerts"];
var hourIn = (lang) => (hour) => lang === "he" ? `${String(hour).padStart(2, "0")}:00` : `${hour === 0 ? 12 : hour > 12 ? hour - 12 : hour}${hour >= 12 ? "pm" : "am"}`;
async function rowsFor(db, userId) {
  const { data, error } = await db.from("user_data").select("key, value").eq("user_id", userId).in("key", KEYS);
  if (error) throw error;
  const rows = {};
  for (const row of data ?? []) rows[row.key] = row.value;
  return rows;
}
async function handle(db, subscription, now) {
  const rows = await rowsFor(db, subscription.user_id);
  const settings = rows.settings ?? {};
  const lang = settings.lang === "he" ? "he" : "en";
  const local = inZone({
    tz: subscription.tz,
    logs: rows.logs ?? {},
    cravings: rows.cravings ?? {},
    now
  });
  const profile = buildProfile({
    logs: local.logs,
    cravings: local.cravings,
    goal: rows.goal,
    settings,
    meta: rows.meta,
    now: local.now
  });
  const alert = pickAlert(
    dueAlerts({
      profile,
      logs: local.logs,
      cravings: local.cravings,
      goal: rows.goal,
      settings,
      seen: rows.alerts?.seen,
      now: local.now
    })
  );
  if (!alert) return "quiet";
  const t = (key, params) => translate(lang === "he" ? SQ_HE : null, key, params);
  const payload = pushPayload(alert, { t, hour: hourIn(lang) });
  try {
    await webpush.sendNotification(
      {
        endpoint: subscription.endpoint,
        keys: { p256dh: subscription.p256dh, auth: subscription.auth }
      },
      JSON.stringify(payload)
    );
  } catch (err) {
    const status = err?.statusCode ?? 0;
    if (status === 404 || status === 410) return "gone";
    throw err;
  }
  const next = markSeen(rows.alerts, alert, now);
  if (next !== rows.alerts) {
    await db.from("user_data").upsert(
      {
        user_id: subscription.user_id,
        key: "alerts",
        value: next,
        updated_at: new Date(now).toISOString()
      },
      { onConflict: "user_id,key" }
    );
  }
  return "sent";
}
Deno.serve(async (req) => {
  const secret = Deno.env.get("SEND_ALERTS_SECRET") ?? "";
  if (secret && req.headers.get("x-smoquit-secret") !== secret) {
    return new Response("no", { status: 401 });
  }
  webpush.setVapidDetails(
    Deno.env.get("VAPID_SUBJECT") ?? "mailto:hello@smoquit.app",
    Deno.env.get("VAPID_PUBLIC_KEY") ?? "",
    Deno.env.get("VAPID_PRIVATE_KEY") ?? ""
  );
  const db = createClient(
    Deno.env.get("SUPABASE_URL"),
    // The service role, which is the only way to read across accounts —
    // and the reason push_subscriptions grants the browser no select at all.
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"),
    { auth: { persistSession: false } }
  );
  const now = Date.now();
  const tally = { sent: 0, quiet: 0, gone: 0, failed: 0 };
  const { data: subscriptions, error } = await db.from("push_subscriptions").select("user_id, endpoint, p256dh, auth, tz, failures").lt("failures", MAX_FAILURES);
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  for (const subscription of subscriptions ?? []) {
    try {
      const outcome = await handle(db, subscription, now);
      tally[outcome] += 1;
      if (outcome === "gone") {
        await db.from("push_subscriptions").delete().eq("user_id", subscription.user_id).eq("endpoint", subscription.endpoint);
      }
    } catch (err) {
      tally.failed += 1;
      console.error("send-alerts:", subscription.user_id, String(err?.message ?? err));
      await db.from("push_subscriptions").update({ failures: (subscription.failures ?? 0) + 1 }).eq("user_id", subscription.user_id).eq("endpoint", subscription.endpoint);
    }
  }
  return new Response(JSON.stringify(tally), {
    headers: { "content-type": "application/json" }
  });
});
