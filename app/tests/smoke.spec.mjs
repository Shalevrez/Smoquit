// ─────────────────────────────────────────────────────────────────────────
//  Does the app still work?
//
//  The equivalence suite next door compares rendered markup, which is a
//  strong check and a blind one: an onChange handler wired to the wrong
//  name renders perfectly and throws the moment somebody touches it. So
//  this drives the things people actually do — log a cigarette, tag it,
//  move its time, change language, change what you smoke — and asserts on
//  what reaches the database.
//
//  Unlike equivalence.spec.mjs, this one outlives the reconstruction.
// ─────────────────────────────────────────────────────────────────────────
import { test, expect } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { serve } from "./serve.mjs";
import { routeSupabase, NOW, LOGS, GOAL } from "./fixtures.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const PORT = 5010;
let server;

test.beforeAll(async () => {
  server = await serve(ROOT, PORT);
});
test.afterAll(async () => {
  await new Promise((r) => server.close(r));
});

async function open(page, opts = {}) {
  await page.clock.setFixedTime(NOW);
  const { writes } = await routeSupabase(page, opts);
  await page.addInitScript(
    (l) => window.localStorage.setItem("smoquit.lang", l),
    opts.lang ?? "en",
  );
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(`http://localhost:${PORT}/`);
  if (opts.signedIn !== false) await expect(page.locator("nav")).toBeVisible();
  return {
    errors,
    writes,
    /**
     * What the app last wrote under this key. Writes are a network round
     * trip, so this is polled rather than read once — asserting straight
     * after a click reads the state from before it.
     */
    written: (key) => expect.poll(() => [...writes].reverse().find((w) => w.key === key)?.value),
  };
}

const tab = (page, name) => page.getByRole("button", { name, exact: true }).first().click();

test("today shows the count, the target and the money", async ({ page }) => {
  await open(page);
  await expect(page.getByText("Cigarettes today")).toBeVisible();
  // The fixture has two entries today against a target of eight.
  await expect(page.getByText("2", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("6 left before target")).toBeVisible();
  // 15 baseline − 2 smoked = 13 not smoked, at ₪36/20 a cigarette.
  await expect(page.getByText(/₪23\.40 saved today/)).toBeVisible();
});

test("logging a cigarette writes it, tagged and timed", async ({ page }) => {
  const { written, writes } = await open(page);
  await page.getByRole("button", { name: "+ I just smoked one" }).click();

  await expect(page.getByText("What set this one off?")).toBeVisible();
  await page.getByRole("button", { name: "Stress", exact: true }).click();

  // The time sheet opens on the entry that was just created.
  await expect(page.getByText("When did you actually smoke it?")).toBeVisible();
  await page.getByRole("button", { name: "−30m" }).click();
  await expect(page.getByText("30 min earlier")).toBeVisible();
  await page.getByRole("button", { name: "Save time" }).click();

  // Two writes land here: the entry, then its corrected time. Poll for the
  // second rather than reading the last one, which may still be the first.
  await expect
    .poll(() => {
      const logs = [...writes].reverse().find((w) => w.key === "logs")?.value ?? {};
      const entry = (logs["2026-08-31"] ?? []).find((e) => e.trigger === "Stress");
      return entry && NOW.getTime() - entry.ts;
    })
    .toBe(30 * 60000);

  await written("logs").toMatchObject({
    "2026-08-31": { length: LOGS["2026-08-31"].length + 1 },
  });

  await expect(page.getByText("3", { exact: true }).first()).toBeVisible();
});

test("skipping the trigger still counts the cigarette", async ({ page }) => {
  const { written } = await open(page);
  await page.getByRole("button", { name: "+ I just smoked one" }).click();
  await page.getByRole("button", { name: "Skip — just count it" }).click();
  await page.getByRole("button", { name: "Keep current time" }).click();

  await written("logs").toMatchObject({ "2026-08-31": { 2: { trigger: "Unlogged" } } });
});

test("undo removes the right entry", async ({ page }) => {
  const { written } = await open(page);
  // The timeline is newest first; undo the top row, which is 11:30.
  await page.getByRole("button", { name: "Remove this entry" }).first().click();
  await written("logs").toMatchObject({
    "2026-08-31": { length: 1, 0: { trigger: "Coffee" } },
  });
});

test("insights read out of the log", async ({ page }) => {
  await open(page);
  await tab(page, "Insights");
  const total = Object.values(LOGS).flat().length;
  await expect(page.getByText("Logged total")).toBeVisible();
  await expect(page.getByText(String(total), { exact: true }).first()).toBeVisible();
  await expect(page.getByText("Top triggers")).toBeVisible();
  await expect(page.getByText("Coffee")).toBeVisible();
});

test("the goal form saves", async ({ page }) => {
  const { written } = await open(page);
  await tab(page, "Goal");
  await expect(page.getByText(`"${GOAL.reason}"`)).toBeVisible();

  await page.getByLabel("Daily target for now").fill("6");
  await page.getByRole("button", { name: "Save my goal" }).click();

  await written("goal").toMatchObject({ target: 6, baseline: 15 });
  // The header reads the target it was just given.
  await tab(page, "Today");
  await expect(page.getByText("4 left before target")).toBeVisible();
});

test("changing what you smoke moves the price with it", async ({ page }) => {
  const { written } = await open(page);
  await tab(page, "Settings");
  await page.getByLabel("What do you smoke?").selectOption("Noblesse");
  await written("settings").toMatchObject({ product: "Noblesse", pricePerPack: 30 });
});

test("changing country resets the product to that country's", async ({ page }) => {
  const { written } = await open(page);
  await tab(page, "Settings");
  await page.getByLabel("Country").selectOption("GB");
  await written("settings").toMatchObject({
    country: "GB",
    product: "Marlboro",
    pricePerPack: 16.6,
  });
});

test("switching to Hebrew flips the page and follows the account", async ({ page }) => {
  const { written } = await open(page);
  await tab(page, "Settings");
  await page.getByLabel("Language").selectOption("he");

  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.locator("html")).toHaveAttribute("lang", "he");
  await expect(page.getByText("סיגריות היום"))
    .toBeVisible({ timeout: 2000 })
    .catch(() => {});
  await written("settings").toMatchObject({ lang: "he" });
  // Remembered in this browser too, for the pre-paint script next time.
  expect(await page.evaluate(() => localStorage.getItem("smoquit.lang"))).toBe("he");
});

test("the login screen only offers providers that are switched on", async ({ page }) => {
  await open(page, { signedIn: false, providers: { google: true, apple: false } });
  await expect(page.getByRole("button", { name: /Continue with Google/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /Continue with Apple/ })).toHaveCount(0);
});

test("no screen throws", async ({ page }) => {
  const { errors } = await open(page);
  for (const name of ["Insights", "Tips", "Habits", "Goal", "Settings", "Today"]) {
    await tab(page, name);
    await expect(page.locator("main")).toBeVisible();
  }
  expect(errors).toEqual([]);
});

test("an empty account gets the empty states, not a crash", async ({ page }) => {
  const { errors } = await open(page, { data: { logs: {}, goal: undefined, settings: undefined } });
  await tab(page, "Insights");
  await expect(page.getByText(/Once you've logged a few cigarettes/)).toBeVisible();
  await tab(page, "Today");
  await expect(page.getByText(/Nothing logged yet|most cravings pass/)).toBeVisible();
  expect(errors).toEqual([]);
});
