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
  IL: {
    name: "Israel",
    currency: "\u20AA",
    code: "ILS",
    perPack: 36,
    products: [
      {
        n: "Marlboro (Red / Gold)",
        p: 36,
        type: "cig"
      },
      {
        n: "L&M",
        p: 34,
        type: "cig"
      },
      {
        n: "Winston",
        p: 35,
        type: "cig"
      },
      {
        n: "Parliament",
        p: 39,
        type: "cig"
      },
      {
        n: "Camel",
        p: 36,
        type: "cig"
      },
      {
        n: "Noblesse",
        p: 30,
        type: "cig"
      },
      {
        n: "Time",
        p: 30,
        type: "cig"
      },
      {
        n: "Golf",
        p: 30,
        type: "cig"
      },
      {
        n: "Pall Mall",
        p: 33,
        type: "cig"
      },
      {
        n: "Roll-your-own (Drum / Golden Virginia)",
        p: 45,
        type: "roll"
      },
      {
        n: "IQOS / Heets",
        p: 34,
        type: "heated"
      }
    ]
  },
  US: {
    name: "United States",
    currency: "$",
    code: "USD",
    perPack: 8,
    products: [
      {
        n: "Marlboro",
        p: 9,
        type: "cig"
      },
      {
        n: "Newport",
        p: 9,
        type: "cig"
      },
      {
        n: "Camel",
        p: 8,
        type: "cig"
      },
      {
        n: "Pall Mall",
        p: 7,
        type: "cig"
      },
      {
        n: "Winston",
        p: 7.5,
        type: "cig"
      },
      {
        n: "American Spirit",
        p: 10,
        type: "cig"
      },
      {
        n: "Lucky Strike",
        p: 7.5,
        type: "cig"
      },
      {
        n: "Roll-your-own",
        p: 6,
        type: "roll"
      },
      {
        n: "IQOS / Heets",
        p: 8,
        type: "heated"
      }
    ]
  },
  GB: {
    name: "United Kingdom",
    currency: "\xA3",
    code: "GBP",
    perPack: 16,
    products: [
      {
        n: "Marlboro",
        p: 16.6,
        type: "cig"
      },
      {
        n: "Benson & Hedges",
        p: 16,
        type: "cig"
      },
      {
        n: "Lambert & Butler",
        p: 14.5,
        type: "cig"
      },
      {
        n: "Mayfair",
        p: 13.5,
        type: "cig"
      },
      {
        n: "Richmond",
        p: 13,
        type: "cig"
      },
      {
        n: "Amber Leaf (roll-your-own)",
        p: 20,
        type: "roll"
      },
      {
        n: "Golden Virginia (roll-your-own)",
        p: 21,
        type: "roll"
      },
      {
        n: "IQOS / Heets",
        p: 12,
        type: "heated"
      }
    ]
  },
  DE: {
    name: "Germany",
    currency: "\u20AC",
    code: "EUR",
    perPack: 8,
    products: [
      {
        n: "Marlboro",
        p: 8.6,
        type: "cig"
      },
      {
        n: "L&M",
        p: 8,
        type: "cig"
      },
      {
        n: "Gauloises",
        p: 8,
        type: "cig"
      },
      {
        n: "Lucky Strike",
        p: 8.2,
        type: "cig"
      },
      {
        n: "Pall Mall",
        p: 8,
        type: "cig"
      },
      {
        n: "West",
        p: 8,
        type: "cig"
      },
      {
        n: "Roll-your-own (Van Nelle / Pueblo)",
        p: 12,
        type: "roll"
      },
      {
        n: "IQOS / Heets",
        p: 8,
        type: "heated"
      }
    ]
  },
  FR: {
    name: "France",
    currency: "\u20AC",
    code: "EUR",
    perPack: 12,
    products: [
      {
        n: "Marlboro",
        p: 12.5,
        type: "cig"
      },
      {
        n: "Gauloises",
        p: 11.5,
        type: "cig"
      },
      {
        n: "Camel",
        p: 12,
        type: "cig"
      },
      {
        n: "Philip Morris",
        p: 11.5,
        type: "cig"
      },
      {
        n: "Winston",
        p: 11.5,
        type: "cig"
      },
      {
        n: "Roll-your-own",
        p: 16,
        type: "roll"
      },
      {
        n: "IQOS / Heets",
        p: 11,
        type: "heated"
      }
    ]
  },
  IT: {
    name: "Italy",
    currency: "\u20AC",
    code: "EUR",
    perPack: 6,
    products: [
      {
        n: "Marlboro",
        p: 6.2,
        type: "cig"
      },
      {
        n: "MS",
        p: 5.8,
        type: "cig"
      },
      {
        n: "Camel",
        p: 6,
        type: "cig"
      },
      {
        n: "Chesterfield",
        p: 5.5,
        type: "cig"
      },
      {
        n: "Winston",
        p: 5.7,
        type: "cig"
      },
      {
        n: "Roll-your-own",
        p: 8,
        type: "roll"
      },
      {
        n: "IQOS / Heets",
        p: 5.5,
        type: "heated"
      }
    ]
  },
  ES: {
    name: "Spain",
    currency: "\u20AC",
    code: "EUR",
    perPack: 5.4,
    products: [
      {
        n: "Marlboro",
        p: 5.4,
        type: "cig"
      },
      {
        n: "Fortuna",
        p: 5,
        type: "cig"
      },
      {
        n: "Ducados",
        p: 5,
        type: "cig"
      },
      {
        n: "Camel",
        p: 5.3,
        type: "cig"
      },
      {
        n: "Winston",
        p: 5.1,
        type: "cig"
      },
      {
        n: "Roll-your-own",
        p: 7,
        type: "roll"
      },
      {
        n: "IQOS / Heets",
        p: 5,
        type: "heated"
      }
    ]
  },
  AU: {
    name: "Australia",
    currency: "A$",
    code: "AUD",
    perPack: 45,
    products: [
      {
        n: "Winfield",
        p: 45,
        type: "cig"
      },
      {
        n: "Marlboro",
        p: 48,
        type: "cig"
      },
      {
        n: "Longbeach",
        p: 42,
        type: "cig"
      },
      {
        n: "Peter Jackson",
        p: 43,
        type: "cig"
      },
      {
        n: "Roll-your-own",
        p: 55,
        type: "roll"
      }
    ]
  },
  CA: {
    name: "Canada",
    currency: "C$",
    code: "CAD",
    perPack: 16,
    products: [
      {
        n: "du Maurier",
        p: 16,
        type: "cig"
      },
      {
        n: "Player's",
        p: 15.5,
        type: "cig"
      },
      {
        n: "Export A",
        p: 15,
        type: "cig"
      },
      {
        n: "Marlboro",
        p: 16,
        type: "cig"
      },
      {
        n: "Belmont",
        p: 16,
        type: "cig"
      },
      {
        n: "Roll-your-own",
        p: 14,
        type: "roll"
      }
    ]
  },
  IN: {
    name: "India",
    currency: "\u20B9",
    code: "INR",
    perPack: 340,
    products: [
      {
        n: "Gold Flake",
        p: 340,
        type: "cig"
      },
      {
        n: "Classic",
        p: 360,
        type: "cig"
      },
      {
        n: "Wills Navy Cut",
        p: 320,
        type: "cig"
      },
      {
        n: "Marlboro",
        p: 380,
        type: "cig"
      },
      {
        n: "Bidi (bundle)",
        p: 30,
        type: "roll"
      }
    ]
  }
};
var FALLBACK_COUNTRY = {
  name: "Other",
  currency: "$",
  code: "USD",
  perPack: 6,
  products: [
    {
      n: "Marlboro",
      p: 6,
      type: "cig"
    },
    {
      n: "Camel",
      p: 6,
      type: "cig"
    },
    {
      n: "Winston",
      p: 5.5,
      type: "cig"
    },
    {
      n: "L&M",
      p: 5,
      type: "cig"
    },
    {
      n: "Lucky Strike",
      p: 5.5,
      type: "cig"
    },
    {
      n: "Local brand",
      p: 5,
      type: "cig"
    },
    {
      n: "Roll-your-own",
      p: 7,
      type: "roll"
    },
    {
      n: "IQOS / Heets",
      p: 6,
      type: "heated"
    }
  ]
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
  Today: "\u05D4\u05D9\u05D5\u05DD",
  Insights: "\u05EA\u05D5\u05D1\u05E0\u05D5\u05EA",
  Tips: "\u05D8\u05D9\u05E4\u05D9\u05DD",
  Habits: "\u05D4\u05E8\u05D2\u05DC\u05D9\u05DD",
  Goal: "\u05D9\u05E2\u05D3",
  Settings: "\u05D4\u05D2\u05D3\u05E8\u05D5\u05EA",
  "Clearing the air\u2026": "\u05DE\u05E4\u05D6\u05E8\u05D9\u05DD \u05D0\u05EA \u05D4\u05E2\u05E9\u05DF\u2026",
  "Smoquit \u2014 quit smoking, one logged craving at a time": "Smoquit \u2014 \u05E0\u05D2\u05DE\u05DC\u05D9\u05DD \u05DE\u05E2\u05D9\u05E9\u05D5\u05DF, \u05E1\u05D9\u05D2\u05E8\u05D9\u05D4 \u05DE\u05EA\u05D5\u05E2\u05D3\u05EA \u05D0\u05D7\u05EA \u05D1\u05DB\u05DC \u05E4\u05E2\u05DD",
  "Track what you smoke. Notice the pattern. Loosen its grip.": "\u05E2\u05E7\u05D1\u05D5 \u05D0\u05D7\u05E8\u05D9 \u05DE\u05D4 \u05E9\u05D0\u05EA\u05DD \u05DE\u05E2\u05E9\u05E0\u05D9\u05DD. \u05E9\u05D9\u05DE\u05D5 \u05DC\u05D1 \u05DC\u05D3\u05E4\u05D5\u05E1. \u05E9\u05D7\u05E8\u05E8\u05D5 \u05D0\u05EA \u05D4\u05D0\u05D7\u05D9\u05D6\u05D4.",
  "Continue with Google": "\u05D4\u05EA\u05D7\u05D1\u05E8\u05D5\u05EA \u05E2\u05DD Google",
  "Continue with Apple": "\u05D4\u05EA\u05D7\u05D1\u05E8\u05D5\u05EA \u05E2\u05DD Apple",
  or: "\u05D0\u05D5",
  Password: "\u05E1\u05D9\u05E1\u05DE\u05D4",
  "Create account": "\u05D9\u05E6\u05D9\u05E8\u05EA \u05D7\u05E9\u05D1\u05D5\u05DF",
  "Sign in": "\u05DB\u05E0\u05D9\u05E1\u05D4",
  "Already have an account? Sign in": "\u05DB\u05D1\u05E8 \u05D9\u05E9 \u05DC\u05DB\u05DD \u05D7\u05E9\u05D1\u05D5\u05DF? \u05DB\u05E0\u05D9\u05E1\u05D4",
  "New here? Create an account": "\u05D7\u05D3\u05E9\u05D9\u05DD \u05DB\u05D0\u05DF? \u05D9\u05E6\u05D9\u05E8\u05EA \u05D7\u05E9\u05D1\u05D5\u05DF",
  "Check your email to confirm your account, then sign in.": "\u05E9\u05DC\u05D7\u05E0\u05D5 \u05DC\u05DB\u05DD \u05DE\u05D9\u05D9\u05DC \u05DC\u05D0\u05D9\u05E9\u05D5\u05E8 \u05D4\u05D7\u05E9\u05D1\u05D5\u05DF \u2014 \u05D0\u05E9\u05E8\u05D5 \u05D0\u05D5\u05EA\u05D5 \u05D5\u05D0\u05D6 \u05D4\u05D9\u05DB\u05E0\u05E1\u05D5.",
  "Forgot your password?": "\u05E9\u05DB\u05D7\u05EA\u05DD \u05D0\u05EA \u05D4\u05E1\u05D9\u05E1\u05DE\u05D4?",
  "Back to sign in": "\u05D7\u05D6\u05E8\u05D4 \u05DC\u05DE\u05E1\u05DA \u05D4\u05DB\u05E0\u05D9\u05E1\u05D4",
  "Send reset link": "\u05E9\u05DC\u05D9\u05D7\u05EA \u05E7\u05D9\u05E9\u05D5\u05E8 \u05DC\u05D0\u05D9\u05E4\u05D5\u05E1",
  "Enter your email and we'll send you a link to set a new password.": "\u05D4\u05D6\u05D9\u05E0\u05D5 \u05D0\u05EA \u05DB\u05EA\u05D5\u05D1\u05EA \u05D4\u05D3\u05D5\u05D0\u05F4\u05DC \u05D5\u05E0\u05E9\u05DC\u05D7 \u05DC\u05DB\u05DD \u05E7\u05D9\u05E9\u05D5\u05E8 \u05DC\u05E7\u05D1\u05D9\u05E2\u05EA \u05E1\u05D9\u05E1\u05DE\u05D4 \u05D7\u05D3\u05E9\u05D4.",
  "If that address has an account, a reset link is on its way. It works once, and expires in an hour.": "\u05D0\u05DD \u05E7\u05D9\u05D9\u05DD \u05D7\u05E9\u05D1\u05D5\u05DF \u05E2\u05DD \u05D4\u05DB\u05EA\u05D5\u05D1\u05EA \u05D4\u05D6\u05D5, \u05E7\u05D9\u05E9\u05D5\u05E8 \u05DC\u05D0\u05D9\u05E4\u05D5\u05E1 \u05D1\u05D3\u05E8\u05DA. \u05D4\u05E7\u05D9\u05E9\u05D5\u05E8 \u05E4\u05D5\u05E2\u05DC \u05E4\u05E2\u05DD \u05D0\u05D7\u05EA, \u05D5\u05E4\u05D2 \u05EA\u05D5\u05E7\u05E3 \u05D1\u05EA\u05D5\u05DA \u05E9\u05E2\u05D4.",
  "This account hasn't been confirmed yet. Open the confirmation link in the email we sent you.": "\u05D4\u05D7\u05E9\u05D1\u05D5\u05DF \u05E2\u05D3\u05D9\u05D9\u05DF \u05DC\u05D0 \u05D0\u05D5\u05E9\u05E8. \u05E4\u05EA\u05D7\u05D5 \u05D0\u05EA \u05E7\u05D9\u05E9\u05D5\u05E8 \u05D4\u05D0\u05D9\u05E9\u05D5\u05E8 \u05D1\u05DE\u05D9\u05D9\u05DC \u05E9\u05E9\u05DC\u05D7\u05E0\u05D5 \u05DC\u05DB\u05DD.",
  "That link didn't work \u2014 it may have expired or already been used. Ask for a new one.": "\u05D4\u05E7\u05D9\u05E9\u05D5\u05E8 \u05DC\u05D0 \u05E2\u05D1\u05D3 \u2014 \u05D9\u05D9\u05EA\u05DB\u05DF \u05E9\u05E4\u05D2 \u05EA\u05D5\u05E7\u05E4\u05D5 \u05D0\u05D5 \u05E9\u05DB\u05D1\u05E8 \u05E0\u05E2\u05E9\u05D4 \u05D1\u05D5 \u05E9\u05D9\u05DE\u05D5\u05E9. \u05D1\u05E7\u05E9\u05D5 \u05E7\u05D9\u05E9\u05D5\u05E8 \u05D7\u05D3\u05E9.",
  "Choose a new password.": "\u05D1\u05D7\u05E8\u05D5 \u05E1\u05D9\u05E1\u05DE\u05D4 \u05D7\u05D3\u05E9\u05D4.",
  "New password": "\u05E1\u05D9\u05E1\u05DE\u05D4 \u05D7\u05D3\u05E9\u05D4",
  "Repeat new password": "\u05D0\u05D9\u05DE\u05D5\u05EA \u05D4\u05E1\u05D9\u05E1\u05DE\u05D4 \u05D4\u05D7\u05D3\u05E9\u05D4",
  "Save new password": "\u05E9\u05DE\u05D9\u05E8\u05EA \u05D4\u05E1\u05D9\u05E1\u05DE\u05D4 \u05D4\u05D7\u05D3\u05E9\u05D4",
  "Pick a password of at least 6 characters.": "\u05D1\u05D7\u05E8\u05D5 \u05E1\u05D9\u05E1\u05DE\u05D4 \u05D1\u05D0\u05D5\u05E8\u05DA 6 \u05EA\u05D5\u05D5\u05D9\u05DD \u05DC\u05E4\u05D7\u05D5\u05EA.",
  "The two passwords don't match.": "\u05E9\u05EA\u05D9 \u05D4\u05E1\u05D9\u05E1\u05DE\u05D0\u05D5\u05EA \u05D0\u05D9\u05E0\u05DF \u05D6\u05D4\u05D5\u05EA.",
  "Password changed. Opening the app\u2026": "\u05D4\u05E1\u05D9\u05E1\u05DE\u05D4 \u05E9\u05D5\u05E0\u05EA\u05D4. \u05E4\u05D5\u05EA\u05D7\u05D9\u05DD \u05D0\u05EA \u05D4\u05D0\u05E4\u05DC\u05D9\u05E7\u05E6\u05D9\u05D4\u2026",
  "Something went wrong.": "\u05DE\u05E9\u05D4\u05D5 \u05D4\u05E9\u05EA\u05D1\u05E9.",
  "That sign-in option isn't switched on for this app yet. Use your email and password below.": "\u05D0\u05E4\u05E9\u05E8\u05D5\u05EA \u05D4\u05D4\u05EA\u05D7\u05D1\u05E8\u05D5\u05EA \u05D4\u05D6\u05D5 \u05E2\u05D3\u05D9\u05D9\u05DF \u05DC\u05D0 \u05DE\u05D5\u05E4\u05E2\u05DC\u05EA \u05D1\u05D0\u05E4\u05DC\u05D9\u05E7\u05E6\u05D9\u05D4. \u05D4\u05E9\u05EA\u05DE\u05E9\u05D5 \u05D1\u05D3\u05D5\u05D0\u05F4\u05DC \u05D5\u05D1\u05E1\u05D9\u05E1\u05DE\u05D4 \u05E9\u05DC\u05DE\u05D8\u05D4.",
  "Your data is stored privately in your own account and is visible only to you. We don't sell it, share it, or analyze it.": "\u05D4\u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05E9\u05DC\u05DB\u05DD \u05E0\u05E9\u05DE\u05E8\u05D9\u05DD \u05D1\u05D0\u05D5\u05E4\u05DF \u05E4\u05E8\u05D8\u05D9 \u05D1\u05D7\u05E9\u05D1\u05D5\u05DF \u05E9\u05DC\u05DB\u05DD \u05D5\u05D2\u05DC\u05D5\u05D9\u05D9\u05DD \u05E8\u05E7 \u05DC\u05DB\u05DD. \u05D0\u05D9\u05E0\u05E0\u05D5 \u05DE\u05D5\u05DB\u05E8\u05D9\u05DD, \u05DE\u05E9\u05EA\u05E4\u05D9\u05DD \u05D0\u05D5 \u05DE\u05E0\u05EA\u05D7\u05D9\u05DD \u05D0\u05D5\u05EA\u05DD.",
  "Sign out": "\u05D4\u05EA\u05E0\u05EA\u05E7\u05D5\u05EA",
  "Log what you smoke. Notice the pattern. Loosen its grip.": "\u05EA\u05E2\u05D3\u05D5 \u05DB\u05DC \u05E1\u05D9\u05D2\u05E8\u05D9\u05D4. \u05E9\u05D9\u05DE\u05D5 \u05DC\u05D1 \u05DC\u05D3\u05E4\u05D5\u05E1. \u05E9\u05D7\u05E8\u05E8\u05D5 \u05D0\u05EA \u05D4\u05D0\u05D7\u05D9\u05D6\u05D4.",
  "Today: {count}. Over your {target}/day target \u2014 tomorrow's a fresh start.": "\u05D4\u05D9\u05D5\u05DD: {count}. \u05DE\u05E2\u05DC \u05D4\u05D9\u05E2\u05D3 \u05E9\u05DC {target} \u05DC\u05D9\u05D5\u05DD \u2014 \u05DE\u05D7\u05E8 \u05DE\u05EA\u05D7\u05D9\u05DC\u05D9\u05DD \u05DE\u05D7\u05D3\u05E9.",
  "Today: {count} of {target} allowed. Every skipped one counts.": "\u05D4\u05D9\u05D5\u05DD: {count} \u05DE\u05EA\u05D5\u05DA {target} \u05DE\u05D5\u05EA\u05E8\u05D5\u05EA. \u05DB\u05DC \u05D0\u05D7\u05EA \u05E9\u05D3\u05D9\u05DC\u05D2\u05EA\u05DD \u05E2\u05DC\u05D9\u05D4 \u05E0\u05D7\u05E9\u05D1\u05EA.",
  "Cigarettes today": "\u05E1\u05D9\u05D2\u05E8\u05D9\u05D5\u05EA \u05D4\u05D9\u05D5\u05DD",
  "{n} over target": "{n} \u05DE\u05E2\u05DC \u05D4\u05D9\u05E2\u05D3",
  "{n} left before target": "\u05E0\u05E9\u05D0\u05E8\u05D5 {n} \u05E2\u05D3 \u05D4\u05D9\u05E2\u05D3",
  "\u2248 {currency}{amount} saved today vs. your usual": "\u2248 {currency}{amount} \u05E0\u05D7\u05E1\u05DB\u05D5 \u05D4\u05D9\u05D5\u05DD \u05DC\u05E2\u05D5\u05DE\u05EA \u05D9\u05D5\u05DD \u05E8\u05D2\u05D9\u05DC",
  "+ I just smoked one": "\u200F+ \u05E2\u05D9\u05E9\u05E0\u05EA\u05D9 \u05E2\u05DB\u05E9\u05D9\u05D5 \u05D0\u05D7\u05EA",
  "I haven't smoked today": "\u200F\u05DC\u05D0 \u05E2\u05D9\u05E9\u05E0\u05EA\u05D9 \u05D4\u05D9\u05D5\u05DD",
  "Counted as a smoke-free day \u2713": "\u200F\u05E0\u05E1\u05E4\u05E8 \u05DB\u05D9\u05D5\u05DD \u05E0\u05E7\u05D9 \u2713",
  "Smoke-free days": "\u05D9\u05DE\u05D9\u05DD \u05E0\u05E7\u05D9\u05D9\u05DD",
  "Logging honestly is how the insights get useful.": "\u05EA\u05D9\u05E2\u05D5\u05D3 \u05DB\u05DF \u05D4\u05D5\u05D0 \u05DE\u05D4 \u05E9\u05D4\u05D5\u05E4\u05DA \u05D0\u05EA \u05D4\u05EA\u05D5\u05D1\u05E0\u05D5\u05EA \u05DC\u05DE\u05D5\u05E2\u05D9\u05DC\u05D5\u05EA.",
  // Riding out a craving.
  "I want one right now": "\u05D1\u05D0 \u05DC\u05D9 \u05E2\u05DB\u05E9\u05D9\u05D5",
  "1 craving ridden out today": "\u05D3\u05D7\u05E3 \u05D0\u05D7\u05D3 \u05E9\u05E2\u05D1\u05E8 \u05D4\u05D9\u05D5\u05DD",
  "{n} cravings ridden out today": "\u200F{n} \u05D3\u05D7\u05E4\u05D9\u05DD \u05E9\u05E2\u05D1\u05E8\u05D5 \u05D4\u05D9\u05D5\u05DD",
  "Ride it out": "\u05E8\u05DB\u05D1\u05D5 \u05E2\u05DC \u05D4\u05D2\u05DC",
  "The wave has passed": "\u05D4\u05D2\u05DC \u05E2\u05D1\u05E8",
  "A craving peaks and fades in a few minutes, smoked or not.": "\u05D3\u05D7\u05E3 \u05DE\u05D2\u05D9\u05E2 \u05DC\u05E9\u05D9\u05D0 \u05D5\u05D3\u05D5\u05E2\u05DA \u05EA\u05D5\u05DA \u05DB\u05DE\u05D4 \u05D3\u05E7\u05D5\u05EA, \u05D1\u05D9\u05DF \u05D0\u05DD \u05E2\u05D9\u05E9\u05E0\u05EA\u05DD \u05D5\u05D1\u05D9\u05DF \u05D0\u05DD \u05DC\u05D0.",
  "You didn't smoke for five minutes. That is the whole trick.": "\u05D7\u05DE\u05E9 \u05D3\u05E7\u05D5\u05EA \u05D1\u05DC\u05D9 \u05DC\u05E2\u05E9\u05DF. \u05D6\u05D4 \u05DB\u05DC \u05D4\u05E1\u05D5\u05D3.",
  "Breathe in": "\u05E9\u05D0\u05D9\u05E4\u05D4",
  Hold: "\u05D4\u05D7\u05D6\u05E7\u05D4",
  "Breathe out": "\u05E0\u05E9\u05D9\u05E4\u05D4",
  "What's driving it?": "\u05DE\u05D4 \u05DE\u05E0\u05D9\u05E2 \u05D0\u05EA \u05D6\u05D4?",
  "It passed": "\u05E2\u05D1\u05E8 \u05DC\u05D9",
  "I smoked one anyway": "\u05E2\u05D9\u05E9\u05E0\u05EA\u05D9 \u05D1\u05DB\u05DC \u05D6\u05D0\u05EA",
  "Today's timeline": "\u05E6\u05D9\u05E8 \u05D4\u05D6\u05DE\u05DF \u05E9\u05DC \u05D4\u05D9\u05D5\u05DD",
  "Nothing logged yet today. If a craving comes, try waiting it out \u2014 most pass in 3\u20135 minutes. If you do smoke, tap the button above so you can see your own pattern later.": "\u05E2\u05D3\u05D9\u05D9\u05DF \u05DC\u05D0 \u05EA\u05D5\u05E2\u05D3 \u05DB\u05DC\u05D5\u05DD \u05D4\u05D9\u05D5\u05DD. \u05D0\u05DD \u05E2\u05D5\u05DC\u05D4 \u05D3\u05D7\u05E3, \u05E0\u05E1\u05D5 \u05DC\u05D7\u05DB\u05D5\u05EA \u05E9\u05D9\u05D7\u05DC\u05D5\u05E3 \u2014 \u05E8\u05D5\u05D1\u05DD \u05E2\u05D5\u05D1\u05E8\u05D9\u05DD \u05EA\u05D5\u05DA 3\u20135 \u05D3\u05E7\u05D5\u05EA. \u05D0\u05DD \u05D1\u05DB\u05DC \u05D6\u05D0\u05EA \u05E2\u05D9\u05E9\u05E0\u05EA\u05DD, \u05DC\u05D7\u05E6\u05D5 \u05E2\u05DC \u05D4\u05DB\u05E4\u05EA\u05D5\u05E8 \u05DC\u05DE\u05E2\u05DC\u05D4 \u05DB\u05D3\u05D9 \u05E9\u05EA\u05D5\u05DB\u05DC\u05D5 \u05DC\u05E8\u05D0\u05D5\u05EA \u05D1\u05D4\u05DE\u05E9\u05DA \u05D0\u05EA \u05D4\u05D3\u05E4\u05D5\u05E1 \u05E9\u05DC\u05DB\u05DD.",
  "Remove this entry": "\u05D4\u05E1\u05E8\u05EA \u05D4\u05E8\u05E9\u05D5\u05DE\u05D4",
  Undo: "\u05D1\u05D9\u05D8\u05D5\u05DC",
  "What set this one off?": "\u05DE\u05D4 \u05D2\u05E8\u05DD \u05DC\u05D6\u05D5?",
  "Naming the trigger is half of unlearning it.": "\u05DC\u05EA\u05EA \u05E9\u05DD \u05DC\u05D8\u05E8\u05D9\u05D2\u05E8 \u05D6\u05D4 \u05D7\u05E6\u05D9 \u05DE\u05D4\u05E2\u05D1\u05D5\u05D3\u05D4.",
  Stress: "\u05DC\u05D7\u05E5",
  Boredom: "\u05E9\u05E2\u05DE\u05D5\u05DD",
  Coffee: "\u05E7\u05E4\u05D4",
  "After a meal": "\u05D0\u05D7\u05E8\u05D9 \u05D0\u05E8\u05D5\u05D7\u05D4",
  Social: "\u05D7\u05D1\u05E8\u05D4",
  Craving: "\u05D3\u05D7\u05E3",
  Habit: "\u05D4\u05E8\u05D2\u05DC",
  Unlogged: "\u05DC\u05DC\u05D0 \u05EA\u05D9\u05D5\u05D2",
  "Skip \u2014 just count it": "\u05D3\u05D9\u05DC\u05D5\u05D2 \u2014 \u05E8\u05E7 \u05DC\u05E1\u05E4\u05D5\u05E8",
  "When did you actually smoke it?": "\u05DE\u05EA\u05D9 \u05D1\u05D0\u05DE\u05EA \u05E2\u05D9\u05E9\u05E0\u05EA\u05DD \u05D0\u05D5\u05EA\u05D4?",
  "Logged just now. Nudge it back if this one was earlier today.": "\u05EA\u05D5\u05E2\u05D3\u05D4 \u05E2\u05DB\u05E9\u05D9\u05D5. \u05D4\u05D6\u05D9\u05D6\u05D5 \u05D0\u05D7\u05D5\u05E8\u05D4 \u05D0\u05DD \u05D6\u05D4 \u05E7\u05E8\u05D4 \u05DE\u05D5\u05E7\u05D3\u05DD \u05D9\u05D5\u05EA\u05E8 \u05D4\u05D9\u05D5\u05DD.",
  "Logged at the current time": "\u05EA\u05D5\u05E2\u05D3\u05D4 \u05D1\u05E9\u05E2\u05D4 \u05D4\u05E0\u05D5\u05DB\u05D7\u05D9\u05EA",
  "{n} min earlier": "{n} \u05D3\u05E7\u05D5\u05EA \u05E7\u05D5\u05D3\u05DD \u05DC\u05DB\u05DF",
  "{h}h {m}m earlier": "{h} \u05E9\u05E2\u05D5\u05EA \u05D5-{m} \u05D3\u05E7\u05D5\u05EA \u05E7\u05D5\u05D3\u05DD \u05DC\u05DB\u05DF",
  "\u2212{n}m": "\u2212{n} \u05D3\u05E7\u05F3",
  "\u2212{n}h": "\u2212{n} \u05E9\u05E2\u05F3",
  Reset: "\u05D0\u05D9\u05E4\u05D5\u05E1",
  "Or set an exact time": "\u05D0\u05D5 \u05E7\u05D1\u05E2\u05D5 \u05E9\u05E2\u05D4 \u05DE\u05D3\u05D5\u05D9\u05E7\u05EA",
  "Save time": "\u05E9\u05DE\u05D9\u05E8\u05EA \u05D4\u05E9\u05E2\u05D4",
  "Keep current time": "\u05DC\u05D4\u05E9\u05D0\u05D9\u05E8 \u05D0\u05EA \u05D4\u05E9\u05E2\u05D4 \u05D4\u05E0\u05D5\u05DB\u05D7\u05D9\u05EA",
  "Once you've logged a few cigarettes, this page fills in with your patterns \u2014 busiest hours, top triggers, daily trend, and how many days you've cut back.": "\u05D0\u05D7\u05E8\u05D9 \u05E9\u05EA\u05EA\u05E2\u05D3\u05D5 \u05DB\u05DE\u05D4 \u05E1\u05D9\u05D2\u05E8\u05D9\u05D5\u05EA, \u05D4\u05E2\u05DE\u05D5\u05D3 \u05D4\u05D6\u05D4 \u05D9\u05EA\u05DE\u05DC\u05D0 \u05D1\u05D3\u05E4\u05D5\u05E1\u05D9\u05DD \u05E9\u05DC\u05DB\u05DD \u2014 \u05D4\u05E9\u05E2\u05D5\u05EA \u05D4\u05E2\u05DE\u05D5\u05E1\u05D5\u05EA, \u05D4\u05D8\u05E8\u05D9\u05D2\u05E8\u05D9\u05DD \u05D4\u05DE\u05D5\u05D1\u05D9\u05DC\u05D9\u05DD, \u05D4\u05DE\u05D2\u05DE\u05D4 \u05D4\u05D9\u05D5\u05DE\u05D9\u05EA \u05D5\u05DB\u05DE\u05D4 \u05D9\u05DE\u05D9\u05DD \u05D4\u05E6\u05DC\u05D7\u05EA\u05DD \u05DC\u05E6\u05DE\u05E6\u05DD.",
  "Logged total": "\u05E1\u05D4\u05F4\u05DB \u05EA\u05D5\u05E2\u05D3\u05D5",
  "Daily average": "\u05DE\u05DE\u05D5\u05E6\u05E2 \u05D9\u05D5\u05DE\u05D9",
  "Days tracked": "\u05D9\u05DE\u05D9\u05DD \u05D1\u05DE\u05E2\u05E7\u05D1",
  "Best (lowest) day": "\u05D4\u05D9\u05D5\u05DD \u05D4\u05DB\u05D9 \u05D8\u05D5\u05D1",
  "When you smoke": "\u05DE\u05EA\u05D9 \u05D0\u05EA\u05DD \u05DE\u05E2\u05E9\u05E0\u05D9\u05DD",
  "{count} at {hour}:00": "{count} \u05D1\u05E9\u05E2\u05D4 {hour}:00",
  "Top triggers": "\u05D8\u05E8\u05D9\u05D2\u05E8\u05D9\u05DD \u05DE\u05D5\u05D1\u05D9\u05DC\u05D9\u05DD",
  "No triggers tagged yet.": "\u05E2\u05D3\u05D9\u05D9\u05DF \u05DC\u05D0 \u05EA\u05D5\u05D9\u05D2\u05D5 \u05D8\u05E8\u05D9\u05D2\u05E8\u05D9\u05DD.",
  "Last 7 days": "7 \u05D4\u05D9\u05DE\u05D9\u05DD \u05D4\u05D0\u05D7\u05E8\u05D5\u05E0\u05D9\u05DD",
  "Small, repeatable moves beat willpower. Pick two that fit your day and lean on them.": "\u05E6\u05E2\u05D3\u05D9\u05DD \u05E7\u05D8\u05E0\u05D9\u05DD \u05E9\u05D7\u05D5\u05D6\u05E8\u05D9\u05DD \u05E2\u05DC \u05E2\u05E6\u05DE\u05DD \u05E2\u05D3\u05D9\u05E4\u05D9\u05DD \u05E2\u05DC \u05DB\u05D5\u05D7 \u05E8\u05E6\u05D5\u05DF. \u05D1\u05D7\u05E8\u05D5 \u05E9\u05E0\u05D9\u05D9\u05DD \u05E9\u05DE\u05EA\u05D0\u05D9\u05DE\u05D9\u05DD \u05DC\u05D9\u05D5\u05DD \u05E9\u05DC\u05DB\u05DD \u05D5\u05D4\u05D9\u05E9\u05E2\u05E0\u05D5 \u05E2\u05DC\u05D9\u05D4\u05DD.",
  "Ride the 5-minute wave": "\u05E8\u05DB\u05D1\u05D5 \u05E2\u05DC \u05D4\u05D2\u05DC \u05E9\u05DC 5 \u05D4\u05D3\u05E7\u05D5\u05EA",
  "A craving peaks and fades in about 3\u20135 minutes whether or not you smoke. Set a timer and do anything else until it rings.": "\u05D3\u05D7\u05E3 \u05DE\u05D2\u05D9\u05E2 \u05DC\u05E9\u05D9\u05D0 \u05D5\u05D3\u05D5\u05E2\u05DA \u05EA\u05D5\u05DA 3\u20135 \u05D3\u05E7\u05D5\u05EA, \u05D1\u05D9\u05DF \u05D0\u05DD \u05E2\u05D9\u05E9\u05E0\u05EA\u05DD \u05D5\u05D1\u05D9\u05DF \u05D0\u05DD \u05DC\u05D0. \u05D4\u05E4\u05E2\u05D9\u05DC\u05D5 \u05D8\u05D9\u05D9\u05DE\u05E8 \u05D5\u05E2\u05E9\u05D5 \u05DB\u05DC \u05D3\u05D1\u05E8 \u05D0\u05D7\u05E8 \u05E2\u05D3 \u05E9\u05D9\u05E6\u05DC\u05E6\u05DC.",
  "Delay, don't decide": "\u05DC\u05D3\u05D7\u05D5\u05EA, \u05DC\u05D0 \u05DC\u05D4\u05D7\u05DC\u05D9\u05D8",
  "Don't tell yourself 'never again' in the moment. Tell yourself 'not right now.' Push the next one 10 minutes later each time.": "\u05D0\u05DC \u05EA\u05D2\u05D9\u05D3\u05D5 \u05DC\u05E2\u05E6\u05DE\u05DB\u05DD \u05D1\u05E8\u05D2\u05E2 \u05D4\u05D0\u05DE\u05EA \u05F4\u05D0\u05E3 \u05E4\u05E2\u05DD \u05D9\u05D5\u05EA\u05E8\u05F4. \u05EA\u05D2\u05D9\u05D3\u05D5 \u05F4\u05DC\u05D0 \u05E2\u05DB\u05E9\u05D9\u05D5\u05F4. \u05D3\u05D7\u05D5 \u05DB\u05DC \u05E1\u05D9\u05D2\u05E8\u05D9\u05D4 \u05D1\u05E2\u05D5\u05D3 10 \u05D3\u05E7\u05D5\u05EA \u05D1\u05DB\u05DC \u05E4\u05E2\u05DD.",
  "Change your hands' job": "\u05EA\u05E0\u05D5 \u05DC\u05D9\u05D3\u05D9\u05D9\u05DD \u05EA\u05E4\u05E7\u05D9\u05D3 \u05D0\u05D7\u05E8",
  "Cravings are partly muscle memory. Hold a pen, a coin, or a stress ball. Keep your hands busy and the urge loses its ritual.": "\u05D3\u05D7\u05E4\u05D9\u05DD \u05D4\u05DD \u05D2\u05DD \u05D6\u05D9\u05DB\u05E8\u05D5\u05DF \u05E9\u05E8\u05D9\u05E8\u05D9. \u05D4\u05D7\u05D6\u05D9\u05E7\u05D5 \u05E2\u05D8, \u05DE\u05D8\u05D1\u05E2 \u05D0\u05D5 \u05DB\u05D3\u05D5\u05E8 \u05DC\u05D7\u05D9\u05E5. \u05DB\u05E9\u05D4\u05D9\u05D3\u05D9\u05D9\u05DD \u05E2\u05E1\u05D5\u05E7\u05D5\u05EA, \u05D4\u05D3\u05D7\u05E3 \u05DE\u05D0\u05D1\u05D3 \u05D0\u05EA \u05D4\u05D8\u05E7\u05E1 \u05E9\u05DC\u05D5.",
  "Drink cold water slowly": "\u05E9\u05EA\u05D5 \u05DE\u05D9\u05DD \u05E7\u05E8\u05D9\u05DD \u05DC\u05D0\u05D8",
  "Sipping water mimics the hand-to-mouth motion and dulls the urge. Keep a full glass or bottle within reach.": "\u05DC\u05D2\u05D9\u05DE\u05D5\u05EA \u05DE\u05D9\u05DD \u05DE\u05D7\u05E7\u05D5\u05EA \u05D0\u05EA \u05EA\u05E0\u05D5\u05E2\u05EA \u05D4\u05D9\u05D3 \u05DC\u05E4\u05D4 \u05D5\u05DE\u05E2\u05DE\u05E2\u05DE\u05D5\u05EA \u05D0\u05EA \u05D4\u05D3\u05D7\u05E3. \u05D4\u05D7\u05D6\u05D9\u05E7\u05D5 \u05DB\u05D5\u05E1 \u05D0\u05D5 \u05D1\u05E7\u05D1\u05D5\u05E7 \u05DE\u05DC\u05D0\u05D9\u05DD \u05D1\u05D4\u05D9\u05E9\u05D2 \u05D9\u05D3.",
  "Break the pairings": "\u05E9\u05D1\u05E8\u05D5 \u05D0\u05EA \u05D4\u05E6\u05D9\u05DE\u05D5\u05D3\u05D9\u05DD",
  "Coffee, alcohol, and the after-meal moment are cues, not needs. Change the setting: brush your teeth, step outside, switch chairs.": "\u05E7\u05E4\u05D4, \u05D0\u05DC\u05DB\u05D5\u05D4\u05D5\u05DC \u05D5\u05D4\u05E8\u05D2\u05E2 \u05E9\u05D0\u05D7\u05E8\u05D9 \u05D4\u05D0\u05E8\u05D5\u05D7\u05D4 \u05D4\u05DD \u05E8\u05DE\u05D6\u05D9\u05DD, \u05DC\u05D0 \u05E6\u05E8\u05DB\u05D9\u05DD. \u05E9\u05E0\u05D5 \u05D0\u05EA \u05D4\u05E1\u05D1\u05D9\u05D1\u05D4: \u05E6\u05D7\u05E6\u05D7\u05D5 \u05E9\u05D9\u05E0\u05D9\u05D9\u05DD, \u05E6\u05D0\u05D5 \u05D4\u05D7\u05D5\u05E6\u05D4, \u05D4\u05D7\u05DC\u05D9\u05E4\u05D5 \u05DB\u05D9\u05E1\u05D0.",
  "Make it inconvenient": "\u05D4\u05E4\u05DB\u05D5 \u05D0\u05EA \u05D6\u05D4 \u05DC\u05DE\u05E1\u05D5\u05E8\u05D1\u05DC",
  "Don't carry a lighter. Leave cigarettes in another room or the car. Every extra step is a chance to reconsider.": "\u05D0\u05DC \u05EA\u05E1\u05EA\u05D5\u05D1\u05D1\u05D5 \u05E2\u05DD \u05DE\u05E6\u05D9\u05EA. \u05D4\u05E9\u05D0\u05D9\u05E8\u05D5 \u05D0\u05EA \u05D4\u05E1\u05D9\u05D2\u05E8\u05D9\u05D5\u05EA \u05D1\u05D7\u05D3\u05E8 \u05D0\u05D7\u05E8 \u05D0\u05D5 \u05D1\u05E8\u05DB\u05D1. \u05DB\u05DC \u05E6\u05E2\u05D3 \u05E0\u05D5\u05E1\u05E3 \u05D4\u05D5\u05D0 \u05D4\u05D6\u05D3\u05DE\u05E0\u05D5\u05EA \u05DC\u05D4\u05EA\u05D7\u05E8\u05D8.",
  "Breathe like you're smoking": "\u05E0\u05E9\u05DE\u05D5 \u05DB\u05D0\u05D9\u05DC\u05D5 \u05D0\u05EA\u05DD \u05DE\u05E2\u05E9\u05E0\u05D9\u05DD",
  "The deep inhale is part of what relaxes you. Try four slow breaths \u2014 in for 4, hold for 4, out for 6 \u2014 without the cigarette.": "\u05D4\u05E9\u05D0\u05D9\u05E4\u05D4 \u05D4\u05E2\u05DE\u05D5\u05E7\u05D4 \u05D4\u05D9\u05D0 \u05D7\u05DC\u05E7 \u05DE\u05DE\u05D4 \u05E9\u05DE\u05E8\u05D2\u05D9\u05E2. \u05E0\u05E1\u05D5 \u05D0\u05E8\u05D1\u05E2 \u05E0\u05E9\u05D9\u05DE\u05D5\u05EA \u05D0\u05D9\u05D8\u05D9\u05D5\u05EA \u2014 \u05E9\u05D0\u05D9\u05E4\u05D4 4, \u05D4\u05D7\u05D6\u05E7\u05D4 4, \u05E0\u05E9\u05D9\u05E4\u05D4 6 \u2014 \u05D1\u05DC\u05D9 \u05D4\u05E1\u05D9\u05D2\u05E8\u05D9\u05D4.",
  "Reward the skips": "\u05EA\u05D2\u05DE\u05DC\u05D5 \u05D0\u05EA \u05D4\u05D3\u05D9\u05DC\u05D5\u05D2\u05D9\u05DD",
  "Move the cigarette money into a jar or a savings note each day. Watching it grow makes the benefit concrete.": "\u05D4\u05E2\u05D1\u05D9\u05E8\u05D5 \u05D0\u05EA \u05DB\u05E1\u05E3 \u05D4\u05E1\u05D9\u05D2\u05E8\u05D9\u05D5\u05EA \u05DC\u05E6\u05E0\u05E6\u05E0\u05EA \u05D0\u05D5 \u05DC\u05D4\u05D5\u05E8\u05D0\u05EA \u05D7\u05D9\u05E1\u05DB\u05D5\u05DF \u05D1\u05DB\u05DC \u05D9\u05D5\u05DD. \u05DC\u05E8\u05D0\u05D5\u05EA \u05D0\u05D5\u05EA\u05D5 \u05D2\u05D3\u05DC \u05D4\u05D5\u05E4\u05DA \u05D0\u05EA \u05D4\u05E8\u05D5\u05D5\u05D7 \u05DC\u05DE\u05D5\u05D7\u05E9\u05D9.",
  "Smoquit is a self-help tracker, not medical advice. For nicotine replacement, prescriptions, or a quit plan tailored to you, talk to a doctor or a free quitline.": "Smoquit \u05D4\u05D5\u05D0 \u05DB\u05DC\u05D9 \u05DE\u05E2\u05E7\u05D1 \u05DC\u05E2\u05D6\u05E8\u05D4 \u05E2\u05E6\u05DE\u05D9\u05EA, \u05DC\u05D0 \u05D9\u05D9\u05E2\u05D5\u05E5 \u05E8\u05E4\u05D5\u05D0\u05D9. \u05DC\u05EA\u05D7\u05DC\u05D9\u05E4\u05D9 \u05E0\u05D9\u05E7\u05D5\u05D8\u05D9\u05DF, \u05DE\u05E8\u05E9\u05DE\u05D9\u05DD \u05D0\u05D5 \u05EA\u05D5\u05DB\u05E0\u05D9\u05EA \u05D2\u05DE\u05D9\u05DC\u05D4 \u05DE\u05D5\u05EA\u05D0\u05DE\u05EA \u05D0\u05D9\u05E9\u05D9\u05EA \u2014 \u05E4\u05E0\u05D5 \u05DC\u05E8\u05D5\u05E4\u05D0 \u05D0\u05D5 \u05DC\u05DE\u05D5\u05E7\u05D3 \u05D2\u05DE\u05D9\u05DC\u05D4.",
  "A habit is a loop: ": "\u05D4\u05E8\u05D2\u05DC \u05D4\u05D5\u05D0 \u05DC\u05D5\u05DC\u05D0\u05D4: ",
  "cue \u2192 routine \u2192 reward": "\u05E8\u05DE\u05D6 \u2190 \u05E9\u05D2\u05E8\u05D4 \u2190 \u05EA\u05D2\u05DE\u05D5\u05DC",
  ". You can't easily delete the cue, but you can swap the routine and still get a reward. Find your cue below and try its swap.": ". \u05E7\u05E9\u05D4 \u05DC\u05DE\u05D7\u05D5\u05E7 \u05D0\u05EA \u05D4\u05E8\u05DE\u05D6, \u05D0\u05D1\u05DC \u05D0\u05E4\u05E9\u05E8 \u05DC\u05D4\u05D7\u05DC\u05D9\u05E3 \u05D0\u05EA \u05D4\u05E9\u05D2\u05E8\u05D4 \u05D5\u05E2\u05D3\u05D9\u05D9\u05DF \u05DC\u05E7\u05D1\u05DC \u05EA\u05D2\u05DE\u05D5\u05DC. \u05DE\u05E6\u05D0\u05D5 \u05DC\u05DE\u05D8\u05D4 \u05D0\u05EA \u05D4\u05E8\u05DE\u05D6 \u05E9\u05DC\u05DB\u05DD \u05D5\u05E0\u05E1\u05D5 \u05D0\u05EA \u05D4\u05EA\u05D7\u05DC\u05D9\u05E3 \u05E9\u05DC\u05D5.",
  Cue: "\u05E8\u05DE\u05D6",
  Swap: "\u05EA\u05D7\u05DC\u05D9\u05E3",
  "Morning coffee": "\u05E7\u05E4\u05D4 \u05E9\u05DC \u05D4\u05D1\u05D5\u05E7\u05E8",
  "Drink it standing at a window, or switch to tea for a week so the pairing breaks.": "\u05E9\u05EA\u05D5 \u05D0\u05D5\u05EA\u05D5 \u05D1\u05E2\u05DE\u05D9\u05D3\u05D4 \u05DC\u05D9\u05D3 \u05D4\u05D7\u05DC\u05D5\u05DF, \u05D0\u05D5 \u05E2\u05D1\u05E8\u05D5 \u05DC\u05EA\u05D4 \u05DC\u05E9\u05D1\u05D5\u05E2 \u05DB\u05D3\u05D9 \u05DC\u05E9\u05D1\u05D5\u05E8 \u05D0\u05EA \u05D4\u05E6\u05D9\u05DE\u05D5\u05D3.",
  "The commute": "\u05D4\u05E0\u05E1\u05D9\u05E2\u05D4 \u05DC\u05E2\u05D1\u05D5\u05D3\u05D4",
  "Chew gum or queue a podcast the moment you sit down \u2014 fill the hand and the head.": "\u05DC\u05E2\u05E1\u05D5 \u05DE\u05E1\u05D8\u05D9\u05E7 \u05D0\u05D5 \u05D4\u05E4\u05E2\u05D9\u05DC\u05D5 \u05E4\u05D5\u05D3\u05E7\u05D0\u05E1\u05D8 \u05D1\u05E8\u05D2\u05E2 \u05E9\u05D0\u05EA\u05DD \u05DE\u05EA\u05D9\u05D9\u05E9\u05D1\u05D9\u05DD \u2014 \u05EA\u05E2\u05E1\u05D9\u05E7\u05D5 \u05D0\u05EA \u05D4\u05D9\u05D3 \u05D5\u05D0\u05EA \u05D4\u05E8\u05D0\u05E9.",
  "Work stress break": "\u05D4\u05E4\u05E1\u05E7\u05EA \u05DC\u05D7\u05E5 \u05D1\u05E2\u05D1\u05D5\u05D3\u05D4",
  "Take the break, drop the cigarette. Walk to get water or do 10 slow breaths outside.": "\u05E7\u05D7\u05D5 \u05D0\u05EA \u05D4\u05D4\u05E4\u05E1\u05E7\u05D4, \u05D5\u05EA\u05E8\u05D5 \u05E2\u05DC \u05D4\u05E1\u05D9\u05D2\u05E8\u05D9\u05D4. \u05DC\u05DB\u05D5 \u05DC\u05D4\u05D1\u05D9\u05D0 \u05DE\u05D9\u05DD \u05D0\u05D5 \u05E7\u05D7\u05D5 10 \u05E0\u05E9\u05D9\u05DE\u05D5\u05EA \u05D0\u05D9\u05D8\u05D9\u05D5\u05EA \u05D1\u05D7\u05D5\u05E5.",
  "After eating": "\u05D0\u05D7\u05E8\u05D9 \u05D4\u05D0\u05D5\u05DB\u05DC",
  "Stand up and brush your teeth or leave the table immediately. The clean-mouth feeling fights the urge.": "\u05E7\u05D5\u05DE\u05D5 \u05D5\u05E6\u05D7\u05E6\u05D7\u05D5 \u05E9\u05D9\u05E0\u05D9\u05D9\u05DD, \u05D0\u05D5 \u05E2\u05D6\u05D1\u05D5 \u05D0\u05EA \u05D4\u05E9\u05D5\u05DC\u05D7\u05DF \u05DE\u05D9\u05D3. \u05EA\u05D7\u05D5\u05E9\u05EA \u05D4\u05E4\u05D4 \u05D4\u05E0\u05E7\u05D9 \u05E0\u05DC\u05D7\u05DE\u05EA \u05D1\u05D3\u05D7\u05E3.",
  "With a drink": "\u05E2\u05DD \u05DE\u05E9\u05E7\u05D4",
  "Hold the glass in your smoking hand and keep it full. Sit with non-smokers when you can.": "\u05D4\u05D7\u05D6\u05D9\u05E7\u05D5 \u05D0\u05EA \u05D4\u05DB\u05D5\u05E1 \u05D1\u05D9\u05D3 \u05D4\u05DE\u05E2\u05E9\u05E0\u05EA \u05D5\u05D3\u05D0\u05D2\u05D5 \u05E9\u05EA\u05D9\u05E9\u05D0\u05E8 \u05DE\u05DC\u05D0\u05D4. \u05E9\u05D1\u05D5 \u05DC\u05D9\u05D3 \u05DC\u05D0\u05BE\u05DE\u05E2\u05E9\u05E0\u05D9\u05DD \u05DB\u05E9\u05D0\u05E4\u05E9\u05E8.",
  "Keep a 5-minute list ready: text a friend, stretch, a quick game \u2014 anything to bridge the gap.": "\u05D4\u05D7\u05D6\u05D9\u05E7\u05D5 \u05E8\u05E9\u05D9\u05DE\u05EA 5 \u05D3\u05E7\u05D5\u05EA \u05DE\u05D5\u05DB\u05E0\u05D4: \u05D4\u05D5\u05D3\u05E2\u05D4 \u05DC\u05D7\u05D1\u05E8, \u05DE\u05EA\u05D9\u05D7\u05D5\u05EA, \u05DE\u05E9\u05D7\u05E7 \u05E7\u05E6\u05E8 \u2014 \u05DB\u05DC \u05D3\u05D1\u05E8 \u05E9\u05D9\u05D2\u05E9\u05E8 \u05E2\u05DC \u05D4\u05E4\u05E2\u05E8.",
  "Why you're doing this": "\u05DC\u05DE\u05D4 \u05D0\u05EA\u05DD \u05E2\u05D5\u05E9\u05D9\u05DD \u05D0\u05EA \u05D6\u05D4",
  "Days to quit date": "\u05D9\u05DE\u05D9\u05DD \u05DC\u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05D2\u05DE\u05D9\u05DC\u05D4",
  "Days since quit date": "\u05D9\u05DE\u05D9\u05DD \u05DE\u05D0\u05D6 \u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05D2\u05DE\u05D9\u05DC\u05D4",
  "Est. total saved": "\u05D7\u05D9\u05E1\u05DB\u05D5\u05DF \u05DB\u05D5\u05DC\u05DC \u05DE\u05D5\u05E2\u05E8\u05DA",
  "Cigarettes on a typical day (before quitting)": "\u05E1\u05D9\u05D2\u05E8\u05D9\u05D5\u05EA \u05D1\u05D9\u05D5\u05DD \u05E8\u05D2\u05D9\u05DC (\u05DC\u05E4\u05E0\u05D9 \u05D4\u05D2\u05DE\u05D9\u05DC\u05D4)",
  "Daily target for now": "\u05D9\u05E2\u05D3 \u05D9\u05D5\u05DE\u05D9 \u05DC\u05E2\u05DB\u05E9\u05D9\u05D5",
  "Target quit date": "\u05EA\u05D0\u05E8\u05D9\u05DA \u05D9\u05E2\u05D3 \u05DC\u05D2\u05DE\u05D9\u05DC\u05D4",
  "Your reason (you'll see it every time you open this)": "\u05D4\u05E1\u05D9\u05D1\u05D4 \u05E9\u05DC\u05DB\u05DD (\u05EA\u05E8\u05D0\u05D5 \u05D0\u05D5\u05EA\u05D4 \u05D1\u05DB\u05DC \u05E4\u05E2\u05DD \u05E9\u05EA\u05E4\u05EA\u05D7\u05D5 \u05D0\u05EA \u05D6\u05D4)",
  "e.g. 15": "\u05DC\u05DE\u05E9\u05DC 15",
  "e.g. 8": "\u05DC\u05DE\u05E9\u05DC 8",
  "e.g. Be there for my kids without getting winded.": "\u05DC\u05DE\u05E9\u05DC: \u05DC\u05D4\u05D9\u05D5\u05EA \u05E9\u05DD \u05D1\u05E9\u05D1\u05D9\u05DC \u05D4\u05D9\u05DC\u05D3\u05D9\u05DD \u05D1\u05DC\u05D9 \u05DC\u05D4\u05EA\u05E0\u05E9\u05E3.",
  "Save my goal": "\u05E9\u05DE\u05D9\u05E8\u05EA \u05D4\u05D9\u05E2\u05D3",
  Language: "\u05E9\u05E4\u05D4",
  "Saved to your account, so it follows you to every device you sign in on.": "\u05E0\u05E9\u05DE\u05E8\u05EA \u05D1\u05D7\u05E9\u05D1\u05D5\u05DF \u05E9\u05DC\u05DB\u05DD, \u05DB\u05DA \u05E9\u05D4\u05D9\u05D0 \u05DE\u05EA\u05DC\u05D5\u05D5\u05D4 \u05DC\u05DB\u05DC \u05DE\u05DB\u05E9\u05D9\u05E8 \u05E9\u05EA\u05EA\u05D7\u05D1\u05E8\u05D5 \u05DE\u05DE\u05E0\u05D5.",
  "We set your country automatically when you first opened Smoquit": "\u05E7\u05D1\u05E2\u05E0\u05D5 \u05D0\u05EA \u05D4\u05DE\u05D3\u05D9\u05E0\u05D4 \u05E9\u05DC\u05DB\u05DD \u05D0\u05D5\u05D8\u05D5\u05DE\u05D8\u05D9\u05EA \u05DB\u05E9\u05E4\u05EA\u05D7\u05EA\u05DD \u05D0\u05EA Smoquit \u05D1\u05E4\u05E2\u05DD \u05D4\u05E8\u05D0\u05E9\u05D5\u05E0\u05D4",
  " (you've since changed it)": " (\u05DE\u05D0\u05D6 \u05E9\u05D9\u05E0\u05D9\u05EA\u05DD \u05D0\u05D5\u05EA\u05D4)",
  ". Currency and the product list follow from it. All of it is saved privately in your account.": ". \u05D4\u05DE\u05D8\u05D1\u05E2 \u05D5\u05E8\u05E9\u05D9\u05DE\u05EA \u05D4\u05DE\u05D5\u05E6\u05E8\u05D9\u05DD \u05E0\u05D2\u05D6\u05E8\u05D9\u05DD \u05DE\u05DE\u05E0\u05D4. \u05DB\u05DC \u05DE\u05D4 \u05E9\u05DB\u05D0\u05DF \u05E0\u05E9\u05DE\u05E8 \u05D1\u05D7\u05E9\u05D1\u05D5\u05DF \u05D4\u05E4\u05E8\u05D8\u05D9 \u05E9\u05DC\u05DB\u05DD.",
  Country: "\u05DE\u05D3\u05D9\u05E0\u05D4",
  "Other ($ USD)": "\u05D0\u05D7\u05E8 (\u200E$ USD)",
  "What do you smoke?": "\u05DE\u05D4 \u05D0\u05EA\u05DD \u05DE\u05E2\u05E9\u05E0\u05D9\u05DD?",
  Cigarettes: "\u05E1\u05D9\u05D2\u05E8\u05D9\u05D5\u05EA",
  "Roll-your-own": "\u05D8\u05D1\u05E7 \u05DC\u05D2\u05DC\u05D2\u05D5\u05DC",
  "Heated tobacco": "\u05D8\u05D1\u05E7 \u05DE\u05D7\u05D5\u05DE\u05DD",
  "Price per pack ({currency})": "\u05DE\u05D7\u05D9\u05E8 \u05DC\u05D7\u05E4\u05D9\u05E1\u05D4 ({currency})",
  "Prefilled from your brand. Adjust it to match what you actually pay \u2014 the savings numbers on Today and Goal use this (\xF720 per cigarette).": "\u05DE\u05D5\u05DC\u05D0 \u05DC\u05E4\u05D9 \u05D4\u05DE\u05D5\u05EA\u05D2 \u05E9\u05DC\u05DB\u05DD. \u05D4\u05EA\u05D0\u05D9\u05DE\u05D5 \u05DC\u05DE\u05D4 \u05E9\u05D0\u05EA\u05DD \u05D1\u05D0\u05DE\u05EA \u05DE\u05E9\u05DC\u05DE\u05D9\u05DD \u2014 \u05D7\u05D9\u05E9\u05D5\u05D1\u05D9 \u05D4\u05D7\u05D9\u05E1\u05DB\u05D5\u05DF \u05D1\u05DC\u05E9\u05D5\u05E0\u05D9\u05D5\u05EA \u05D4\u05D9\u05D5\u05DD \u05D5\u05D4\u05D9\u05E2\u05D3 \u05DE\u05E1\u05EA\u05DE\u05DB\u05D9\u05DD \u05E2\u05DC \u05D6\u05D4 (\u05D7\u05DC\u05E7\u05D9 20 \u05DC\u05E1\u05D9\u05D2\u05E8\u05D9\u05D4).",
  "Your setup": "\u05D4\u05DE\u05E6\u05D1 \u05E9\u05DC\u05DB\u05DD",
  "{currency}{price} per pack \xB7 \u2248 {currency}{each} per cigarette": "{currency}{price} \u05DC\u05D7\u05E4\u05D9\u05E1\u05D4 \xB7 \u2248 {currency}{each} \u05DC\u05E1\u05D9\u05D2\u05E8\u05D9\u05D4",
  "Product prices are rough 2026 estimates to get you started, not live retail prices \u2014 always trust the value you enter yourself.": "\u05DE\u05D7\u05D9\u05E8\u05D9 \u05D4\u05DE\u05D5\u05E6\u05E8\u05D9\u05DD \u05D4\u05DD \u05D4\u05E2\u05E8\u05DB\u05D5\u05EA \u05D2\u05E1\u05D5\u05EA \u05DC\u05E9\u05E0\u05EA 2026 \u05DB\u05E0\u05E7\u05D5\u05D3\u05EA \u05E4\u05EA\u05D9\u05D7\u05D4, \u05DC\u05D0 \u05DE\u05D7\u05D9\u05E8\u05D9\u05DD \u05D1\u05D6\u05DE\u05DF \u05D0\u05DE\u05EA \u2014 \u05E1\u05DE\u05DB\u05D5 \u05EA\u05DE\u05D9\u05D3 \u05E2\u05DC \u05D4\u05E1\u05DB\u05D5\u05DD \u05E9\u05D0\u05EA\u05DD \u05DE\u05D6\u05D9\u05E0\u05D9\u05DD \u05D1\u05E2\u05E6\u05DE\u05DB\u05DD.",
  "Your account & privacy": "\u05D4\u05D7\u05E9\u05D1\u05D5\u05DF \u05D5\u05D4\u05E4\u05E8\u05D8\u05D9\u05D5\u05EA \u05E9\u05DC\u05DB\u05DD",
  "Everything you log is stored privately in your own account and is visible only to you. We don't sell, share, or analyze it.": "\u05DB\u05DC \u05DE\u05D4 \u05E9\u05D0\u05EA\u05DD \u05DE\u05EA\u05E2\u05D3\u05D9\u05DD \u05E0\u05E9\u05DE\u05E8 \u05D1\u05D0\u05D5\u05E4\u05DF \u05E4\u05E8\u05D8\u05D9 \u05D1\u05D7\u05E9\u05D1\u05D5\u05DF \u05E9\u05DC\u05DB\u05DD \u05D5\u05D2\u05DC\u05D5\u05D9 \u05E8\u05E7 \u05DC\u05DB\u05DD. \u05D0\u05D9\u05E0\u05E0\u05D5 \u05DE\u05D5\u05DB\u05E8\u05D9\u05DD, \u05DE\u05E9\u05EA\u05E4\u05D9\u05DD \u05D0\u05D5 \u05DE\u05E0\u05EA\u05D7\u05D9\u05DD \u05D0\u05D5\u05EA\u05D5.",
  "Permanently delete all your Smoquit data? This can't be undone.": "\u05DC\u05DE\u05D7\u05D5\u05E7 \u05DC\u05E6\u05DE\u05D9\u05EA\u05D5\u05EA \u05D0\u05EA \u05DB\u05DC \u05D4\u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05E9\u05DC\u05DB\u05DD \u05D1\u05BESmoquit? \u05D0\u05D9 \u05D0\u05E4\u05E9\u05E8 \u05DC\u05D1\u05D8\u05DC \u05D0\u05EA \u05D6\u05D4.",
  "Delete all my data": "\u05DE\u05D7\u05D9\u05E7\u05EA \u05DB\u05DC \u05D4\u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05E9\u05DC\u05D9",
  Israel: "\u05D9\u05E9\u05E8\u05D0\u05DC",
  "United States": "\u05D0\u05E8\u05E6\u05D5\u05EA \u05D4\u05D1\u05E8\u05D9\u05EA",
  "United Kingdom": "\u05D1\u05E8\u05D9\u05D8\u05E0\u05D9\u05D4",
  Germany: "\u05D2\u05E8\u05DE\u05E0\u05D9\u05D4",
  France: "\u05E6\u05E8\u05E4\u05EA",
  Italy: "\u05D0\u05D9\u05D8\u05DC\u05D9\u05D4",
  Spain: "\u05E1\u05E4\u05E8\u05D3",
  Australia: "\u05D0\u05D5\u05E1\u05D8\u05E8\u05DC\u05D9\u05D4",
  Canada: "\u05E7\u05E0\u05D3\u05D4",
  India: "\u05D4\u05D5\u05D3\u05D5",
  Other: "\u05D0\u05D7\u05E8",
  "Almost there": "\u05DB\u05DE\u05E2\u05D8 \u05E9\u05DD",
  "Open ": "\u05E4\u05EA\u05D7\u05D5 \u05D0\u05EA ",
  " in this folder and paste in your Supabase Project URL and anon key (from Supabase \u2192 Settings \u2192 API), then reload this page.": " \u05D1\u05EA\u05D9\u05E7\u05D9\u05D9\u05D4 \u05D4\u05D6\u05D5, \u05D4\u05D3\u05D1\u05D9\u05E7\u05D5 \u05D0\u05EA \u05DB\u05EA\u05D5\u05D1\u05EA \u05D4\u05E4\u05E8\u05D5\u05D9\u05E7\u05D8 \u05D5\u05DE\u05E4\u05EA\u05D7 \u05D4\u05BEanon \u05DE\u05BESupabase (\u05D3\u05E8\u05DA Supabase \u2190 Settings \u2190 API), \u05D5\u05D0\u05D6 \u05E8\u05E2\u05E0\u05E0\u05D5 \u05D0\u05EA \u05D4\u05D3\u05E3.",
  "Prices show in {currency} {code}.": "\u05D4\u05DE\u05D7\u05D9\u05E8\u05D9\u05DD \u05DE\u05D5\u05E6\u05D2\u05D9\u05DD \u05D1\u05BE\u200E{currency} {code}.",
  // ── The tips written for a signal, and the coaching around them ───────
  "Decide the last one before the evening starts": "\u05D4\u05D7\u05DC\u05D9\u05D8\u05D5 \u05E2\u05DC \u05D4\u05D0\u05D7\u05E8\u05D5\u05E0\u05D4 \u05E2\u05D5\u05D3 \u05DC\u05E4\u05E0\u05D9 \u05E9\u05D4\u05E2\u05E8\u05D1 \u05DE\u05EA\u05D7\u05D9\u05DC",
  "Late cigarettes are usually about winding down, not nicotine. Pick the hour you stop, and put the pack somewhere you'd have to get up for.": "\u05E1\u05D9\u05D2\u05E8\u05D9\u05D5\u05EA \u05DE\u05D0\u05D5\u05D7\u05E8\u05D5\u05EA \u05D4\u05DF \u05D1\u05D3\u05E8\u05DA \u05DB\u05DC\u05DC \u05E2\u05E0\u05D9\u05D9\u05DF \u05E9\u05DC \u05D4\u05E8\u05D2\u05E2\u05D4, \u05DC\u05D0 \u05E9\u05DC \u05E0\u05D9\u05E7\u05D5\u05D8\u05D9\u05DF. \u05D1\u05D7\u05E8\u05D5 \u05D0\u05EA \u05D4\u05E9\u05E2\u05D4 \u05E9\u05D1\u05D4 \u05D0\u05EA\u05DD \u05DE\u05E4\u05E1\u05D9\u05E7\u05D9\u05DD, \u05D5\u05E9\u05D9\u05DE\u05D5 \u05D0\u05EA \u05D4\u05D7\u05E4\u05D9\u05E1\u05D4 \u05D1\u05DE\u05E7\u05D5\u05DD \u05E9\u05E6\u05E8\u05D9\u05DA \u05DC\u05E7\u05D5\u05DD \u05D1\u05E9\u05D1\u05D9\u05DC\u05D5.",
  "Push the first one back": "\u05D3\u05D7\u05D5 \u05D0\u05EA \u05D4\u05E8\u05D0\u05E9\u05D5\u05E0\u05D4 \u05E9\u05DC \u05D4\u05D9\u05D5\u05DD",
  "The first cigarette sets the pace of the whole day. Move it fifteen minutes later each morning \u2014 shower first, eat first, leave the house first.": "\u05D4\u05E1\u05D9\u05D2\u05E8\u05D9\u05D4 \u05D4\u05E8\u05D0\u05E9\u05D5\u05E0\u05D4 \u05E7\u05D5\u05D1\u05E2\u05EA \u05D0\u05EA \u05D4\u05E7\u05E6\u05D1 \u05E9\u05DC \u05DB\u05DC \u05D4\u05D9\u05D5\u05DD. \u05D3\u05D7\u05D5 \u05D0\u05D5\u05EA\u05D4 \u05D1\u05D7\u05DE\u05E9 \u05E2\u05E9\u05E8\u05D4 \u05D3\u05E7\u05D5\u05EA \u05D1\u05DB\u05DC \u05D1\u05D5\u05E7\u05E8 \u2014 \u05E7\u05D5\u05D3\u05DD \u05DE\u05E7\u05DC\u05D7\u05EA, \u05E7\u05D5\u05D3\u05DD \u05D0\u05D5\u05DB\u05DC, \u05E7\u05D5\u05D3\u05DD \u05DC\u05E6\u05D0\u05EA \u05DE\u05D4\u05D1\u05D9\u05EA.",
  "Aim at the day you actually have": "\u05DB\u05D5\u05D5\u05E0\u05D5 \u05DC\u05D9\u05D5\u05DD \u05E9\u05D1\u05D0\u05DE\u05EA \u05D9\u05E9 \u05DC\u05DB\u05DD",
  "A target you miss most days stops being a target. Set it one below your real average, hold it for a week, then take another one off.": "\u05D9\u05E2\u05D3 \u05E9\u05DE\u05E4\u05E1\u05E4\u05E1\u05D9\u05DD \u05D1\u05E8\u05D5\u05D1 \u05D4\u05D9\u05DE\u05D9\u05DD \u05DE\u05E4\u05E1\u05D9\u05E7 \u05DC\u05D4\u05D9\u05D5\u05EA \u05D9\u05E2\u05D3. \u05E7\u05D1\u05E2\u05D5 \u05D0\u05D5\u05EA\u05D5 \u05D0\u05D7\u05EA \u05DE\u05EA\u05D7\u05EA \u05DC\u05DE\u05DE\u05D5\u05E6\u05E2 \u05D4\u05D0\u05DE\u05D9\u05EA\u05D9 \u05E9\u05DC\u05DB\u05DD, \u05D4\u05D7\u05D6\u05D9\u05E7\u05D5 \u05E9\u05D1\u05D5\u05E2, \u05D5\u05D0\u05D6 \u05D4\u05D5\u05E8\u05D9\u05D3\u05D5 \u05E2\u05D5\u05D3 \u05D0\u05D7\u05EA.",
  "Decide the number before you go out": "\u05D4\u05D7\u05DC\u05D9\u05D8\u05D5 \u05E2\u05DC \u05D4\u05DE\u05E1\u05E4\u05E8 \u05DC\u05E4\u05E0\u05D9 \u05E9\u05D0\u05EA\u05DD \u05D9\u05D5\u05E6\u05D0\u05D9\u05DD",
  "Pick how many you'll have before you leave, say it out loud to someone, and stand where the smokers aren't. Deciding in the moment is the part that fails.": "\u05D1\u05D7\u05E8\u05D5 \u05DB\u05DE\u05D4 \u05EA\u05E2\u05E9\u05E0\u05D5 \u05DC\u05E4\u05E0\u05D9 \u05E9\u05D0\u05EA\u05DD \u05D9\u05D5\u05E6\u05D0\u05D9\u05DD, \u05D0\u05DE\u05E8\u05D5 \u05D0\u05EA \u05D4\u05DE\u05E1\u05E4\u05E8 \u05D1\u05E7\u05D5\u05DC \u05DC\u05DE\u05D9\u05E9\u05D4\u05D5, \u05D5\u05E2\u05DE\u05D3\u05D5 \u05D1\u05DE\u05E7\u05D5\u05DD \u05E9\u05D1\u05D5 \u05DC\u05D0 \u05DE\u05E2\u05E9\u05E0\u05D9\u05DD. \u05D4\u05D4\u05D7\u05DC\u05D8\u05D4 \u05D1\u05E8\u05D2\u05E2 \u05E2\u05E6\u05DE\u05D5 \u05D4\u05D9\u05D0 \u05D4\u05D7\u05DC\u05E7 \u05E9\u05E0\u05DB\u05E9\u05DC.",
  "Bank the ones you win": "\u05D0\u05E1\u05E4\u05D5 \u05D0\u05EA \u05D4\u05E4\u05E2\u05DE\u05D9\u05DD \u05E9\u05E0\u05D9\u05E6\u05D7\u05EA\u05DD",
  "You've ridden urges out before, and they passed. Keep count of them on purpose \u2014 the proof that they pass is most of what gets you through the next one.": "\u05DB\u05D1\u05E8 \u05E2\u05D1\u05E8\u05EA\u05DD \u05D3\u05D7\u05E4\u05D9\u05DD \u05D5\u05D4\u05DD \u05D7\u05DC\u05E4\u05D5. \u05E1\u05E4\u05E8\u05D5 \u05D0\u05D5\u05EA\u05DD \u05D1\u05DB\u05D5\u05D5\u05E0\u05D4 \u2014 \u05D4\u05D4\u05D5\u05DB\u05D7\u05D4 \u05E9\u05D4\u05DD \u05D7\u05D5\u05DC\u05E4\u05D9\u05DD \u05D4\u05D9\u05D0 \u05E8\u05D5\u05D1 \u05DE\u05D4 \u05E9\u05D9\u05E2\u05D1\u05D9\u05E8 \u05D0\u05EA\u05DB\u05DD \u05D0\u05EA \u05D4\u05D1\u05D0 \u05D1\u05EA\u05D5\u05E8.",
  // The sentence under a recommendation, which is the whole reason it is
  // there. Several open with a number or a trigger name, so they carry a
  // right-to-left mark to stop that first glyph jumping to the far end.
  "{n} of the cigarettes you logged in the last two weeks came with {trigger}.": "\u200F{n} \u05DE\u05D4\u05E1\u05D9\u05D2\u05E8\u05D9\u05D5\u05EA \u05E9\u05EA\u05D9\u05E2\u05D3\u05EA\u05DD \u05D1\u05E9\u05D1\u05D5\u05E2\u05D9\u05D9\u05DD \u05D4\u05D0\u05D7\u05E8\u05D5\u05E0\u05D9\u05DD \u05D4\u05D2\u05D9\u05E2\u05D5 \u05E2\u05DD {trigger}.",
  "{trigger} is behind more of your cigarettes than it was a fortnight ago.": "\u200F{trigger} \u05E2\u05D5\u05DE\u05D3 \u05DE\u05D0\u05D7\u05D5\u05E8\u05D9 \u05D9\u05D5\u05EA\u05E8 \u05DE\u05D4\u05E1\u05D9\u05D2\u05E8\u05D9\u05D5\u05EA \u05E9\u05DC\u05DB\u05DD \u05DE\u05D0\u05E9\u05E8 \u05DC\u05E4\u05E0\u05D9 \u05E9\u05D1\u05D5\u05E2\u05D9\u05D9\u05DD.",
  "Most of your cigarettes lately are {part} ones.": "\u05E8\u05D5\u05D1 \u05D4\u05E1\u05D9\u05D2\u05E8\u05D9\u05D5\u05EA \u05E9\u05DC\u05DB\u05DD \u05DC\u05D0\u05D7\u05E8\u05D5\u05E0\u05D4 \u05D4\u05DF \u05E1\u05D9\u05D2\u05E8\u05D9\u05D5\u05EA \u05E9\u05DC {part}.",
  "Your first cigarette of the day is usually around {hour}.": "\u05D4\u05E1\u05D9\u05D2\u05E8\u05D9\u05D4 \u05D4\u05E8\u05D0\u05E9\u05D5\u05E0\u05D4 \u05E9\u05DC\u05DB\u05DD \u05D1\u05D9\u05D5\u05DD \u05D4\u05D9\u05D0 \u05D1\u05D3\u05E8\u05DA \u05DB\u05DC\u05DC \u05D1\u05E1\u05D1\u05D9\u05D1\u05D5\u05EA {hour}.",
  "Most of the urges you sat with lately ended in a cigarette anyway.": "\u05E8\u05D5\u05D1 \u05D4\u05D3\u05D7\u05E4\u05D9\u05DD \u05E9\u05D9\u05E9\u05D1\u05EA\u05DD \u05D0\u05D9\u05EA\u05DD \u05DC\u05D0\u05D7\u05E8\u05D5\u05E0\u05D4 \u05D4\u05E1\u05EA\u05D9\u05D9\u05DE\u05D5 \u05D1\u05DB\u05DC \u05D6\u05D0\u05EA \u05D1\u05E1\u05D9\u05D2\u05E8\u05D9\u05D4.",
  "You rode out {held} of the {faced} urges you sat with in the last two weeks.": "\u05E2\u05DE\u05D3\u05EA\u05DD \u05D1\u05BE{held} \u05DE\u05EA\u05D5\u05DA {faced} \u05D4\u05D3\u05D7\u05E4\u05D9\u05DD \u05E9\u05D9\u05E9\u05D1\u05EA\u05DD \u05D0\u05D9\u05EA\u05DD \u05D1\u05E9\u05D1\u05D5\u05E2\u05D9\u05D9\u05DD \u05D4\u05D0\u05D7\u05E8\u05D5\u05E0\u05D9\u05DD.",
  "You were over your daily target on {n} of the last {days} days.": "\u05D4\u05D9\u05D9\u05EA\u05DD \u05DE\u05E2\u05DC \u05D4\u05D9\u05E2\u05D3 \u05D4\u05D9\u05D5\u05DE\u05D9 \u05D1\u05BE{n} \u05DE\u05EA\u05D5\u05DA {days} \u05D4\u05D9\u05DE\u05D9\u05DD \u05D4\u05D0\u05D7\u05E8\u05D5\u05E0\u05D9\u05DD.",
  "That is about {n} cigarettes you did not smoke in the last two weeks.": "\u05D6\u05D4 \u05D1\u05E2\u05E8\u05DA {n} \u05E1\u05D9\u05D2\u05E8\u05D9\u05D5\u05EA \u05E9\u05DC\u05D0 \u05E2\u05D9\u05E9\u05E0\u05EA\u05DD \u05D1\u05E9\u05D1\u05D5\u05E2\u05D9\u05D9\u05DD \u05D4\u05D0\u05D7\u05E8\u05D5\u05E0\u05D9\u05DD.",
  "You marked this one as something that works for you.": "\u05E1\u05D9\u05DE\u05E0\u05EA\u05DD \u05E9\u05D6\u05D4 \u05E2\u05D5\u05D1\u05D3 \u05D1\u05E9\u05D1\u05D9\u05DC\u05DB\u05DD.",
  morning: "\u05D1\u05D5\u05E7\u05E8",
  afternoon: "\u05E6\u05D4\u05E8\u05D9\u05D9\u05DD",
  evening: "\u05E2\u05E8\u05D1",
  night: "\u05DC\u05D9\u05DC\u05D4",
  // The tips screen around the recommendations.
  "For you right now": "\u05D1\u05E9\u05D1\u05D9\u05DC\u05DB\u05DD \u05E2\u05DB\u05E9\u05D9\u05D5",
  "These are in the order they were written. Once you've logged a few days, this page leads with the ones that match your own pattern.": "\u05D0\u05DC\u05D4 \u05DE\u05D5\u05E4\u05D9\u05E2\u05D9\u05DD \u05D1\u05E1\u05D3\u05E8 \u05E9\u05D1\u05D5 \u05E0\u05DB\u05EA\u05D1\u05D5. \u05D0\u05D7\u05E8\u05D9 \u05E9\u05EA\u05EA\u05E2\u05D3\u05D5 \u05DB\u05DE\u05D4 \u05D9\u05DE\u05D9\u05DD, \u05D4\u05D3\u05E3 \u05D4\u05D6\u05D4 \u05D9\u05E4\u05EA\u05D7 \u05D1\u05D8\u05D9\u05E4\u05D9\u05DD \u05E9\u05DE\u05EA\u05D0\u05D9\u05DE\u05D9\u05DD \u05DC\u05D3\u05E4\u05D5\u05E1 \u05E9\u05DC\u05DB\u05DD.",
  "Everything else": "\u05DB\u05DC \u05D4\u05E9\u05D0\u05E8",
  "This helps me": "\u05D6\u05D4 \u05E2\u05D5\u05D6\u05E8 \u05DC\u05D9",
  "Not for me": "\u05DC\u05D0 \u05D1\u05E9\u05D1\u05D9\u05DC\u05D9",
  // The habits screen, once a swap is something you start and measure.
  "What you're trying": "\u05DE\u05D4 \u05D0\u05EA\u05DD \u05DE\u05E0\u05E1\u05D9\u05DD",
  "Worth trying next": "\u05E9\u05D5\u05D5\u05D4 \u05DC\u05E0\u05E1\u05D5\u05EA \u05E2\u05DB\u05E9\u05D9\u05D5",
  "Every swap": "\u05DB\u05DC \u05D4\u05EA\u05D7\u05DC\u05D9\u05E4\u05D9\u05DD",
  "Tag a few cigarettes with what set them off, and this page will suggest the swap worth trying first \u2014 then measure it for you.": "\u05EA\u05D9\u05D9\u05D2\u05D5 \u05DB\u05DE\u05D4 \u05E1\u05D9\u05D2\u05E8\u05D9\u05D5\u05EA \u05E2\u05DD \u05DE\u05D4 \u05E9\u05D4\u05E6\u05D9\u05EA \u05D0\u05D5\u05EA\u05DF, \u05D5\u05D4\u05D3\u05E3 \u05D4\u05D6\u05D4 \u05D9\u05E6\u05D9\u05E2 \u05D0\u05EA \u05D4\u05EA\u05D7\u05DC\u05D9\u05E3 \u05E9\u05E9\u05D5\u05D5\u05D4 \u05DC\u05E0\u05E1\u05D5\u05EA \u05E8\u05D0\u05E9\u05D5\u05DF \u2014 \u05D5\u05D0\u05D6 \u05D9\u05DE\u05D3\u05D5\u05D3 \u05D0\u05D5\u05EA\u05D5 \u05D1\u05E9\u05D1\u05D9\u05DC\u05DB\u05DD.",
  "a day with this cue, before and since": "\u05D1\u05D9\u05D5\u05DD \u05E2\u05DD \u05D4\u05E8\u05DE\u05D6 \u05D4\u05D6\u05D4, \u05DC\u05E4\u05E0\u05D9 \u05D5\u05DE\u05D0\u05D6",
  "{n} of {days} days clear": "\u200F{n} \u05DE\u05EA\u05D5\u05DA {days} \u05D9\u05DE\u05D9\u05DD \u05E0\u05E7\u05D9\u05D9\u05DD",
  "Day {n} of {total}": "\u05D9\u05D5\u05DD {n} \u05DE\u05EA\u05D5\u05DA {total}",
  "Stop this one": "\u05DC\u05E2\u05E6\u05D5\u05E8 \u05D0\u05EA \u05D6\u05D4",
  "{trigger}: about {n} a day lately.": "\u200F{trigger}: \u05D1\u05E2\u05E8\u05DA {n} \u05D1\u05D9\u05D5\u05DD \u05DC\u05D0\u05D7\u05E8\u05D5\u05E0\u05D4.",
  "{trigger}: about {n} a day lately, most often around {hour}.": "\u200F{trigger}: \u05D1\u05E2\u05E8\u05DA {n} \u05D1\u05D9\u05D5\u05DD \u05DC\u05D0\u05D7\u05E8\u05D5\u05E0\u05D4, \u05DC\u05E8\u05D5\u05D1 \u05E1\u05D1\u05D9\u05D1 {hour}.",
  "Try this for a week": "\u05DC\u05E0\u05E1\u05D5\u05EA \u05D0\u05EA \u05D6\u05D4 \u05DC\u05E9\u05D1\u05D5\u05E2",
  "Too early to call. Check back in a day or two.": "\u05DE\u05D5\u05E7\u05D3\u05DD \u05DE\u05D3\u05D9 \u05DC\u05D4\u05DB\u05E8\u05D9\u05E2. \u05D7\u05D6\u05E8\u05D5 \u05DC\u05D1\u05D3\u05D5\u05E7 \u05D1\u05E2\u05D5\u05D3 \u05D9\u05D5\u05DD\u05BE\u05D9\u05D5\u05DE\u05D9\u05D9\u05DD.",
  "Down {pct}% on this cue since you started.": "\u05D9\u05E8\u05D9\u05D3\u05D4 \u05E9\u05DC {pct}% \u05D1\u05E8\u05DE\u05D6 \u05D4\u05D6\u05D4 \u05DE\u05D0\u05D6 \u05E9\u05D4\u05EA\u05D7\u05DC\u05EA\u05DD.",
  "Up on this cue since you started \u2014 another swap may fit better.": "\u05E2\u05DC\u05D9\u05D9\u05D4 \u05D1\u05E8\u05DE\u05D6 \u05D4\u05D6\u05D4 \u05DE\u05D0\u05D6 \u05E9\u05D4\u05EA\u05D7\u05DC\u05EA\u05DD \u2014 \u05D0\u05D5\u05DC\u05D9 \u05EA\u05D7\u05DC\u05D9\u05E3 \u05D0\u05D7\u05E8 \u05D9\u05EA\u05D0\u05D9\u05DD \u05D9\u05D5\u05EA\u05E8.",
  "No real change on this cue yet. Give it the full week.": "\u05E2\u05D3\u05D9\u05D9\u05DF \u05D0\u05D9\u05DF \u05E9\u05D9\u05E0\u05D5\u05D9 \u05D0\u05DE\u05D9\u05EA\u05D9 \u05D1\u05E8\u05DE\u05D6 \u05D4\u05D6\u05D4. \u05EA\u05E0\u05D5 \u05DC\u05D6\u05D4 \u05D0\u05EA \u05DB\u05DC \u05D4\u05E9\u05D1\u05D5\u05E2.",
  // ── Insights, once the page leads with a direction rather than a wall ──
  "The last two weeks": "\u05D4\u05E9\u05D1\u05D5\u05E2\u05D9\u05D9\u05DD \u05D4\u05D0\u05D7\u05E8\u05D5\u05E0\u05D9\u05DD",
  "a day, on average.": "\u05D1\u05D9\u05D5\u05DD, \u05D1\u05DE\u05DE\u05D5\u05E6\u05E2.",
  "Too early to compare fortnights \u2014 this is your first.": "\u05DE\u05D5\u05E7\u05D3\u05DD \u05DE\u05D3\u05D9 \u05DC\u05D4\u05E9\u05D5\u05D5\u05EA \u05E9\u05D1\u05D5\u05E2\u05D9\u05D9\u05DD \u2014 \u05D0\u05DC\u05D4 \u05D4\u05E9\u05D1\u05D5\u05E2\u05D9\u05D9\u05DD \u05D4\u05E8\u05D0\u05E9\u05D5\u05E0\u05D9\u05DD \u05E9\u05DC\u05DB\u05DD.",
  "Down from {n} a day the fortnight before.": "\u05D9\u05E8\u05D9\u05D3\u05D4 \u05DE\u05BE{n} \u05D1\u05D9\u05D5\u05DD \u05D1\u05E9\u05D1\u05D5\u05E2\u05D9\u05D9\u05DD \u05E9\u05DC\u05E4\u05E0\u05D9.",
  "Up from {n} a day the fortnight before.": "\u05E2\u05DC\u05D9\u05D9\u05D4 \u05DE\u05BE{n} \u05D1\u05D9\u05D5\u05DD \u05D1\u05E9\u05D1\u05D5\u05E2\u05D9\u05D9\u05DD \u05E9\u05DC\u05E4\u05E0\u05D9.",
  "About the same as the fortnight before.": "\u05D1\u05E2\u05E8\u05DA \u05DB\u05DE\u05D5 \u05D1\u05E9\u05D1\u05D5\u05E2\u05D9\u05D9\u05DD \u05E9\u05DC\u05E4\u05E0\u05D9.",
  "Urges you sat with": "\u05D3\u05D7\u05E4\u05D9\u05DD \u05E9\u05D9\u05E9\u05D1\u05EA\u05DD \u05D0\u05D9\u05EA\u05DD",
  "Nothing recorded yet. Next time one comes, use \u201CI want one right now\u201D on the Today tab \u2014 what happens either way gets counted here.": "\u05E2\u05D3\u05D9\u05D9\u05DF \u05DC\u05D0 \u05EA\u05D5\u05E2\u05D3 \u05DB\u05DC\u05D5\u05DD. \u05D1\u05E4\u05E2\u05DD \u05D4\u05D1\u05D0\u05D4 \u05E9\u05D9\u05D2\u05D9\u05E2 \u05D3\u05D7\u05E3, \u05D4\u05E9\u05EA\u05DE\u05E9\u05D5 \u05D1\u201E\u05D1\u05D0 \u05DC\u05D9 \u05E2\u05DB\u05E9\u05D9\u05D5\u201D \u05D1\u05D8\u05D0\u05D1 \u05D4\u05D9\u05D5\u05DD \u2014 \u05DE\u05D4 \u05E9\u05D9\u05E7\u05E8\u05D4, \u05DC\u05DB\u05D0\u05DF \u05D0\u05D5 \u05DC\u05DB\u05D0\u05DF, \u05D9\u05D9\u05E1\u05E4\u05E8 \u05DB\u05D0\u05DF.",
  "{pct}% ridden out": "\u200F{pct}% \u05E9\u05E2\u05D1\u05E8\u05D5 \u05D1\u05DC\u05D9 \u05E1\u05D9\u05D2\u05E8\u05D9\u05D4",
  "Your heaviest stretch is {from}\u2013{to}, which carries {pct}% of everything you've logged. Plan a replacement for that window \u2014 a walk, water, a piece of gum.": "\u05D4\u05E7\u05D8\u05E2 \u05D4\u05E2\u05DE\u05D5\u05E1 \u05D1\u05D9\u05D5\u05EA\u05E8 \u05E9\u05DC\u05DB\u05DD \u05D4\u05D5\u05D0 {from}\u2013{to}, \u05D5\u05D1\u05D5 {pct}% \u05DE\u05DB\u05DC \u05DE\u05D4 \u05E9\u05EA\u05D9\u05E2\u05D3\u05EA\u05DD. \u05EA\u05DB\u05E0\u05E0\u05D5 \u05EA\u05D7\u05DC\u05D9\u05E3 \u05DC\u05D7\u05DC\u05D5\u05DF \u05D4\u05D6\u05D4 \u2014 \u05D4\u05DC\u05D9\u05DB\u05D4, \u05DE\u05D9\u05DD, \u05DE\u05E1\u05D8\u05D9\u05E7.",
  "{day} is your heaviest day of the week, at about {n} a day.": "\u200F{day} \u05D4\u05D5\u05D0 \u05D4\u05D9\u05D5\u05DD \u05D4\u05E2\u05DE\u05D5\u05E1 \u05D1\u05E9\u05D1\u05D5\u05E2 \u05E9\u05DC\u05DB\u05DD, \u05E2\u05DD \u05D1\u05E2\u05E8\u05DA {n} \u05D1\u05D9\u05D5\u05DD.",
  "up on the fortnight before": "\u05E2\u05DC\u05D9\u05D9\u05D4 \u05D1\u05D9\u05D7\u05E1 \u05DC\u05E9\u05D1\u05D5\u05E2\u05D9\u05D9\u05DD \u05E9\u05DC\u05E4\u05E0\u05D9",
  "down on the fortnight before": "\u05D9\u05E8\u05D9\u05D3\u05D4 \u05D1\u05D9\u05D7\u05E1 \u05DC\u05E9\u05D1\u05D5\u05E2\u05D9\u05D9\u05DD \u05E9\u05DC\u05E4\u05E0\u05D9",
  Streaks: "\u05E8\u05E6\u05E4\u05D9\u05DD",
  "Smoke-free run": "\u05E8\u05E6\u05E3 \u05D1\u05DC\u05D9 \u05E2\u05D9\u05E9\u05D5\u05DF",
  "Longest run": "\u05D4\u05E8\u05E6\u05E3 \u05D4\u05D0\u05E8\u05D5\u05DA \u05D1\u05D9\u05D5\u05EA\u05E8",
  "Days at or under target": "\u05D9\u05DE\u05D9\u05DD \u05D1\u05EA\u05D5\u05DA \u05D4\u05D9\u05E2\u05D3",
  // ── Alerts: the nudges, and the switches that turn them off ──────────
  Dismiss: "\u05E1\u05D2\u05D9\u05E8\u05D4",
  Nudges: "\u05EA\u05D6\u05DB\u05D5\u05E8\u05D5\u05EA",
  "These appear at the top of the app. Turn on notifications below and the timed ones reach your phone too, even when Smoquit is closed.": "\u05D0\u05DC\u05D5 \u05DE\u05D5\u05E4\u05D9\u05E2\u05D5\u05EA \u05D1\u05E8\u05D0\u05E9 \u05D4\u05D0\u05E4\u05DC\u05D9\u05E7\u05E6\u05D9\u05D4. \u05D4\u05D3\u05DC\u05D9\u05E7\u05D5 \u05D4\u05EA\u05E8\u05D0\u05D5\u05EA \u05DC\u05DE\u05D8\u05D4 \u05D5\u05D4\u05DE\u05EA\u05D5\u05D6\u05DE\u05E0\u05D5\u05EA \u05D9\u05D2\u05D9\u05E2\u05D5 \u05D2\u05DD \u05DC\u05D8\u05DC\u05E4\u05D5\u05DF \u05E9\u05DC\u05DB\u05DD, \u05D2\u05DD \u05DB\u05E9-Smoquit \u05E1\u05D2\u05D5\u05E8\u05D4.",
  "Remind me at": "\u05D4\u05D6\u05DB\u05D9\u05E8\u05D5 \u05DC\u05D9 \u05D1\u05E9\u05E2\u05D4",
  "Only on a day you have not answered for yet. Marking a day smoke-free counts as answering.": "\u05E8\u05E7 \u05D1\u05D9\u05D5\u05DD \u05E9\u05E2\u05D3\u05D9\u05D9\u05DF \u05DC\u05D0 \u05E2\u05E0\u05D9\u05EA\u05DD \u05E2\u05DC\u05D9\u05D5. \u05E1\u05D9\u05DE\u05D5\u05DF \u05D9\u05D5\u05DD \u05DB\u05E0\u05E7\u05D9 \u05DE\u05E2\u05D9\u05E9\u05D5\u05DF \u05E0\u05D7\u05E9\u05D1 \u05EA\u05E9\u05D5\u05D1\u05D4.",
  Reminder: "\u05EA\u05D6\u05DB\u05D5\u05E8\u05EA",
  "Heads up": "\u05E9\u05D9\u05DE\u05D5 \u05DC\u05D1",
  Milestone: "\u05D0\u05D1\u05DF \u05D3\u05E8\u05DA",
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
  "If I have not logged anything by evening": "\u05D0\u05DD \u05DC\u05D0 \u05EA\u05D9\u05E2\u05D3\u05EA\u05D9 \u05DB\u05DC\u05D5\u05DD \u05E2\u05D3 \u05D4\u05E2\u05E8\u05D1",
  // ── Push: the switch, and what to do when it will not go on ──────────
  "Send them to my phone": "\u05E9\u05DC\u05D7\u05D5 \u05D0\u05D5\u05EA\u05DF \u05DC\u05D8\u05DC\u05E4\u05D5\u05DF \u05E9\u05DC\u05D9",
  "Add Smoquit to your Home Screen first \u2014 on iPhone that is the only way.": "\u05D4\u05D5\u05E1\u05D9\u05E4\u05D5 \u05E7\u05D5\u05D3\u05DD \u05D0\u05EA Smoquit \u05DC\u05DE\u05E1\u05DA \u05D4\u05D1\u05D9\u05EA \u2014 \u05D1\u05D0\u05D9\u05D9\u05E4\u05D5\u05DF \u05D6\u05D5 \u05D4\u05D3\u05E8\u05DA \u05D4\u05D9\u05D7\u05D9\u05D3\u05D4.",
  "This browser cannot show notifications.": "\u05D4\u05D3\u05E4\u05D3\u05E4\u05DF \u05D4\u05D6\u05D4 \u05DC\u05D0 \u05D9\u05D5\u05D3\u05E2 \u05DC\u05D4\u05E6\u05D9\u05D2 \u05D4\u05EA\u05E8\u05D0\u05D5\u05EA.",
  "Notifications are blocked for this site in your browser's settings.": "\u05D4\u05EA\u05E8\u05D0\u05D5\u05EA \u05D7\u05E1\u05D5\u05DE\u05D5\u05EA \u05DC\u05D0\u05EA\u05E8 \u05D4\u05D6\u05D4 \u05D1\u05D4\u05D2\u05D3\u05E8\u05D5\u05EA \u05D4\u05D3\u05E4\u05D3\u05E4\u05DF \u05E9\u05DC\u05DB\u05DD.",
  "On iPhone": "\u05D1\u05D0\u05D9\u05D9\u05E4\u05D5\u05DF",
  "Add Smoquit to your Home Screen": "\u05D4\u05D5\u05E1\u05D9\u05E4\u05D5 \u05D0\u05EA Smoquit \u05DC\u05DE\u05E1\u05DA \u05D4\u05D1\u05D9\u05EA",
  "Apple only lets a website send notifications once it has been added to the Home Screen. It takes about ten seconds, and afterwards Smoquit opens like any other app \u2014 same account, same history.": "\u05D0\u05E4\u05DC \u05DE\u05D0\u05E4\u05E9\u05E8\u05EA \u05DC\u05D0\u05EA\u05E8 \u05DC\u05E9\u05DC\u05D5\u05D7 \u05D4\u05EA\u05E8\u05D0\u05D5\u05EA \u05E8\u05E7 \u05D0\u05D7\u05E8\u05D9 \u05E9\u05D4\u05D5\u05D0 \u05E0\u05D5\u05E1\u05E3 \u05DC\u05DE\u05E1\u05DA \u05D4\u05D1\u05D9\u05EA. \u05D6\u05D4 \u05DC\u05D5\u05E7\u05D7 \u05DB\u05E2\u05E9\u05E8 \u05E9\u05E0\u05D9\u05D5\u05EA, \u05D5\u05DE\u05E2\u05DB\u05E9\u05D9\u05D5 Smoquit \u05E0\u05E4\u05EA\u05D7\u05EA \u05DB\u05DE\u05D5 \u05DB\u05DC \u05D0\u05E4\u05DC\u05D9\u05E7\u05E6\u05D9\u05D4 \u05D0\u05D7\u05E8\u05EA \u2014 \u05D0\u05D5\u05EA\u05D5 \u05D7\u05E9\u05D1\u05D5\u05DF, \u05D0\u05D5\u05EA\u05D4 \u05D4\u05D9\u05E1\u05D8\u05D5\u05E8\u05D9\u05D4.",
  "Tap the share button": "\u05D4\u05E7\u05D9\u05E9\u05D5 \u05E2\u05DC \u05DB\u05E4\u05EA\u05D5\u05E8 \u05D4\u05E9\u05D9\u05EA\u05D5\u05E3",
  "at the bottom of Safari.": "\u05D1\u05EA\u05D7\u05EA\u05D9\u05EA \u05E1\u05E4\u05D0\u05E8\u05D9.",
  'Scroll down and choose "Add to Home Screen".': '\u05D2\u05DC\u05D5\u05DC\u05D5 \u05DC\u05DE\u05D8\u05D4 \u05D5\u05D1\u05D7\u05E8\u05D5 \u05D1\u05BE"\u05D4\u05D5\u05E1\u05E3 \u05DC\u05DE\u05E1\u05DA \u05D4\u05D1\u05D9\u05EA".',
  "Open Smoquit from your Home Screen, then come back to Settings and turn the switch on.": "\u05E4\u05EA\u05D7\u05D5 \u05D0\u05EA Smoquit \u05DE\u05DE\u05E1\u05DA \u05D4\u05D1\u05D9\u05EA, \u05D5\u05D0\u05D6 \u05D7\u05D6\u05E8\u05D5 \u05DC\u05D4\u05D2\u05D3\u05E8\u05D5\u05EA \u05D5\u05D4\u05D3\u05DC\u05D9\u05E7\u05D5 \u05D0\u05EA \u05D4\u05DE\u05EA\u05D2.",
  "If you are reading this in Chrome or another browser on your iPhone, open the site in Safari first \u2014 Apple only offers this from there.": "\u05D0\u05DD \u05D0\u05EA\u05DD \u05E7\u05D5\u05E8\u05D0\u05D9\u05DD \u05D0\u05EA \u05D6\u05D4 \u05D1\u05DB\u05E8\u05D5\u05DD \u05D0\u05D5 \u05D1\u05D3\u05E4\u05D3\u05E4\u05DF \u05D0\u05D7\u05E8 \u05D1\u05D0\u05D9\u05D9\u05E4\u05D5\u05DF, \u05E4\u05EA\u05D7\u05D5 \u05E7\u05D5\u05D3\u05DD \u05D0\u05EA \u05D4\u05D0\u05EA\u05E8 \u05D1\u05E1\u05E4\u05D0\u05E8\u05D9 \u2014 \u05D0\u05E4\u05DC \u05DE\u05E6\u05D9\u05E2\u05D4 \u05D0\u05EA \u05D6\u05D4 \u05E8\u05E7 \u05DE\u05E9\u05DD.",
  "Back to settings": "\u05D7\u05D6\u05E8\u05D4 \u05DC\u05D4\u05D2\u05D3\u05E8\u05D5\u05EA"
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
