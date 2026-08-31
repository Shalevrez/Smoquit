// ─────────────────────────────────────────────────────────────────────────
//  Is the rebuilt app the same app?
//
//  The source in app/src was recovered from the bundle that is currently
//  deployed. A recovery like that is worth nothing without proof, and
//  reading 2,200 lines twice is not proof: a dropped style property or one
//  wrong character inside an English sentence — which is also a translation
//  key — survives any amount of review.
//
//  So this drives both builds through the same screens and compares the DOM
//  they produce, character for character. Every pixel in this app comes
//  from an inline style object, so the serialised DOM carries the styling
//  too: an exact match is very close to a proof of equivalence, and it
//  catches the one class of mistake the codemod could plausibly make —
//  children nested into the wrong element.
//
//  Delete this file once the reconstruction has shipped and settled; it
//  compares against an artifact that will not be rebuilt again.
// ─────────────────────────────────────────────────────────────────────────
import { test, expect } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { serve } from "./serve.mjs";
import { routeSupabase, NOW } from "./fixtures.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const NEW_ROOT = join(here, "..", "..");
const OLD_ROOT = process.env.SMOQUIT_OLD_BUILD;

const PORTS = { old: 5001, new: 5002 };
let servers = [];

test.beforeAll(async () => {
  test.skip(!OLD_ROOT, "set SMOQUIT_OLD_BUILD to the previous artifact to compare against");
  servers = [await serve(OLD_ROOT, PORTS.old), await serve(NEW_ROOT, PORTS.new)];
});
test.afterAll(async () => {
  for (const s of servers) await new Promise((r) => s.close(r));
});

const TABS = ["log", "insights", "tips", "habits", "goal", "settings"];

/** Renders one screen in one build and returns the app's markup. */
async function markup(page, which, { lang, tab, signedIn = true, sheet = null }) {
  // setFixedTime, not install(): install() freezes the page's timers too, and
  // React never finishes rendering.
  await page.clock.setFixedTime(NOW);
  await routeSupabase(page, { signedIn });
  await page.addInitScript((l) => window.localStorage.setItem("smoquit.lang", l), lang);

  // A reconstruction that throws renders an empty #root, and an empty
  // string compares equal to another empty string. Say so instead.
  page.on("pageerror", (e) => console.log(`[${which}] page error: ${e.message}`));
  await page.goto(`http://localhost:${PORTS[which]}/`);
  const root = page.locator("#root");

  if (signedIn) {
    // Wait for the loader to give way to the real thing.
    await expect(root.getByRole("navigation")).toBeVisible();
    if (tab) {
      const index = TABS.indexOf(tab);
      await root.locator("nav button").nth(index).click();
    }
    if (sheet === "trigger") {
      await root
        .getByRole("button", { name: /smoked one|עישנתי/ })
        .first()
        .click();
    }
    if (sheet === "backdate") {
      await root
        .getByRole("button", { name: /smoked one|עישנתי/ })
        .first()
        .click();
      await root.getByRole("button", { name: /^(Stress|לחץ)$/ }).click();
    }
  } else {
    await expect(
      root.getByRole("button", { name: /Sign in|Create account|כניסה|יצירת חשבון/ }).first(),
    ).toBeVisible();
  }

  // The version badge is a sibling of #root and is not part of the app.
  return (await root.innerHTML()).trim();
}

const cases = [];
for (const lang of ["en", "he"]) {
  cases.push({ name: `auth screen (${lang})`, lang, signedIn: false });
  for (const tab of TABS) cases.push({ name: `${tab} tab (${lang})`, lang, tab });
  cases.push({ name: `trigger sheet (${lang})`, lang, tab: "log", sheet: "trigger" });
  cases.push({ name: `backdate sheet (${lang})`, lang, tab: "log", sheet: "backdate" });
}

for (const c of cases) {
  test(`same DOM — ${c.name}`, async ({ browser }) => {
    const render = async (which) => {
      const ctx = await browser.newContext();
      const page = await ctx.newPage();
      const html = await markup(page, which, c);
      await ctx.close();
      return html;
    };
    const before = await render("old");
    const after = await render("new");
    expect(after).toBe(before);
  });
}
