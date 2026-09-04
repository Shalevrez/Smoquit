// ─────────────────────────────────────────────────────────────────────────
//  What actually lands on the lock screen.
//
//  This is the last few inches of the push path and the only part of it
//  that can be tested without a phone, a push service and a live account —
//  so it is worth testing properly. Two halves, and they fail differently:
//
//    pushPayload      runs on a server we deploy, and turns an alert into a
//                     sentence in somebody's language. A mistake here is a
//                     notification that reads wrong, in Hebrew, to somebody
//                     who cannot tell us.
//
//    notificationFrom runs on a phone holding whatever service worker was
//                     current when they last opened the app, receiving a
//                     payload from today. A mistake here is a push that
//                     shows nothing at all — the person was interrupted and
//                     got no reason why.
// ─────────────────────────────────────────────────────────────────────────
import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { BODIES, TITLES } from "../../src/domain/alerts.js";
import { notificationFrom, PAYLOAD_VERSION, pushPayload, urlFor } from "../../src/domain/notify.js";
import { SQ_HE } from "../../src/i18n/he.js";
import { translate } from "../../src/i18n/translate.js";

const TZ = process.env.TZ ?? "(system)";
const TABS = ["log", "insights", "tips", "habits", "goal", "settings"];

/** The sender's translator, bound to a language it was told. */
const inLang = (lang) => (key, params) => translate(lang === "he" ? SQ_HE : null, key, params);

/** English hour naming, the same rule i18n/format.js uses. */
const englishHour = (h) => `${h === 0 ? 12 : h > 12 ? h - 12 : h}${h >= 12 ? "pm" : "am"}`;
const hebrewHour = (h) => `${String(h).padStart(2, "0")}:00`;

const riskAlert = {
  id: "risk:2026-08-31",
  kind: "risk",
  title: { key: TITLES.risk, params: {} },
  body: { key: BODIES.risk, params: { from: 16, to: 18, pct: 42 } },
  action: { tab: "log", label: "Open Today" },
};

test(`[${TZ}] the numbers in a notification are this person's own`, () => {
  const payload = pushPayload(riskAlert, { t: inLang("en"), hour: englishHour });

  expect(payload.v).toBe(PAYLOAD_VERSION);
  expect(payload.title).toBe("Your heavy stretch is coming up");
  expect(payload.options.body).toContain("4pm");
  expect(payload.options.body).toContain("6pm");
  expect(payload.options.body).toContain("42%");
  // No placeholder survives to the lock screen.
  expect(payload.options.body).not.toMatch(/\{[a-z]+\}/i);
});

test(`[${TZ}] a Hebrew reader gets Hebrew, and a Hebrew clock`, () => {
  // The sender has no language of its own — it is told one per account —
  // so this is the test that the telling works.
  const payload = pushPayload(riskAlert, { t: inLang("he"), hour: hebrewHour });

  expect(payload.title).toBe(SQ_HE[TITLES.risk]);
  expect(payload.options.body).toContain("16:00");
  expect(payload.options.body).toContain("18:00");
  expect(payload.options.body).not.toMatch(/\{[a-z]+\}/i);
  // And nothing English leaked through.
  expect(payload.options.body).not.toContain("pm");
});

test(`[${TZ}] every alert the engine can produce survives being sent`, () => {
  // A title or body with no Hebrew, or a placeholder the sender does not
  // fill, would only show up on somebody's phone. Walk the whole table.
  for (const lang of ["en", "he"]) {
    const t = inLang(lang);
    const hour = lang === "he" ? hebrewHour : englishHour;

    for (const [name, key] of Object.entries(TITLES)) {
      const params = {
        days: 7,
        n: 3,
        target: 5,
        from: 16,
        to: 18,
        pct: 40,
        hour: 8,
        currency: "₪",
        amount: "36.00",
      };
      const payload = pushPayload(
        {
          id: `x:${name}`,
          kind: "risk",
          title: { key, params },
          body: { key: BODIES[name] ?? key, params },
        },
        { t, hour },
      );
      expect(payload.title, `${lang}/${name}: title`).toBeTruthy();
      expect(payload.title, `${lang}/${name}: unfilled placeholder`).not.toMatch(/\{[a-z]+\}/i);
      expect(payload.options.body, `${lang}/${name}: unfilled placeholder`).not.toMatch(
        /\{[a-z]+\}/i,
      );
    }
  }
});

test(`[${TZ}] a second reminder replaces the first rather than stacking`, () => {
  // Nobody wants to unlock their phone to four of these.
  const a = pushPayload(
    { ...riskAlert, id: "risk:2026-08-31" },
    { t: inLang("en"), hour: englishHour },
  );
  const b = pushPayload(
    { ...riskAlert, id: "risk:2026-09-01" },
    { t: inLang("en"), hour: englishHour },
  );
  expect(a.options.tag).toBe(b.options.tag);

  const other = pushPayload(
    { ...riskAlert, kind: "milestone" },
    { t: inLang("en"), hour: englishHour },
  );
  // …but a milestone is not a reminder, and should not silently eat one.
  expect(other.options.tag).not.toBe(a.options.tag);
});

test(`[${TZ}] the notification carries where it should open`, () => {
  const payload = pushPayload(riskAlert, { t: inLang("en"), hour: englishHour });
  expect(payload.options.data).toMatchObject({ id: "risk:2026-08-31", tab: "log" });
  expect(urlFor(payload.options.data, TABS)).toBe("/?tab=log");
});

test(`[${TZ}] an alert with no action still opens the app`, () => {
  const payload = pushPayload(
    { ...riskAlert, action: null },
    { t: inLang("en"), hour: englishHour },
  );
  expect(payload.options.data.tab).toBe("log");
  expect(urlFor({ tab: "nonsense" }, TABS)).toBe("/");
  expect(urlFor(null, TABS)).toBe("/");
  expect(urlFor({ tab: "insights" }, TABS)).toBe("/?tab=insights");
});

// ── The phone's half: trust nothing ──────────────────────────────────────

test(`[${TZ}] a payload from the future still shows something`, () => {
  // The service worker on somebody's phone may be months older than the
  // server sending to it. A notification that fails to render is an
  // interruption they paid attention for and got nothing from.
  for (const rubbish of [null, undefined, {}, "not an object", 42, { options: null }]) {
    const shown = notificationFrom(rubbish);
    expect(shown.title, `for ${JSON.stringify(rubbish)}`).toBeTruthy();
    expect(typeof shown.options.body).toBe("string");
    expect(shown.options.icon).toBeTruthy();
    expect(shown.options.data).toBeTruthy();
  }
});

test(`[${TZ}] a good payload passes through untouched`, () => {
  const payload = pushPayload(riskAlert, { t: inLang("en"), hour: englishHour });
  const shown = notificationFrom(payload);
  expect(shown.title).toBe(payload.title);
  expect(shown.options.body).toBe(payload.options.body);
  expect(shown.options.tag).toBe(payload.options.tag);
  expect(shown.options.data).toEqual(payload.options.data);
});

test(`[${TZ}] the service worker's fallbacks match the ones under test`, () => {
  // sw.js cannot import from the bundle — it is a hand-edited file at the
  // site root — so it carries its own copy of these defaults. This is the
  // only thing stopping the two drifting apart unnoticed.
  const shown = notificationFrom(null);
  const sw = readSw();

  expect(sw).toContain('"/icon-192.png"');
  expect(sw).toContain(`"${shown.options.tag}"`);
  expect(sw).toContain(`"${shown.title}"`);
  // And that it still refuses to cache anything, which is the other half of
  // why it is allowed to be hand-maintained.
  expect(sw).not.toMatch(/caches\.(open|match)/);
  expect(sw).not.toContain('addEventListener("fetch"');
});

/** sw.js, read from the repository root where it is deployed from. */
function readSw() {
  const here = dirname(fileURLToPath(import.meta.url));
  return readFileSync(join(here, "..", "..", "..", "sw.js"), "utf8");
}
