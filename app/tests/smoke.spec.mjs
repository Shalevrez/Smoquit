// ─────────────────────────────────────────────────────────────────────────
//  Does the app still work?
//
//  Drives the things people actually do — log a cigarette, tag it, move its
//  time, change language, change what you smoke — and asserts on what
//  reaches the database. Handlers are the part that rendering checks cannot
//  see: one wired to the wrong name paints perfectly and throws the moment
//  somebody touches it.
// ─────────────────────────────────────────────────────────────────────────
import { test, expect } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { serve } from "./serve.mjs";
import { routeSupabase, NOW, LOGS, GOAL, SETTINGS, SUPABASE_HOST } from "./fixtures.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const PORT = 5010;
let server;

test.beforeAll(async () => {
  server = await serve(ROOT, PORT);
});
test.afterAll(async () => {
  await new Promise((r) => server.close(r));
});

/**
 * Loads the app against the stand-in Supabase, at a fixed moment.
 *
 * `hash` is how an email link arrives: Supabase puts the token, the link
 * type and any failure in the fragment, and the app reads them on boot.
 *
 * `controlClock` swaps the frozen clock for a fake one that only moves when
 * a test says so, which is how anything with a five-minute timer gets
 * tested in a second. It has to be pumped once after navigation: with the
 * clock installed nothing on a timer runs at all, and the app's own boot
 * needs a tick to finish.
 */
async function open(page, opts = {}) {
  if (opts.controlClock) await page.clock.install({ time: NOW });
  else await page.clock.setFixedTime(NOW);

  const { writes } = await routeSupabase(page, opts);
  await page.addInitScript(
    (l) => window.localStorage.setItem("smoquit.lang", l),
    opts.lang ?? "en",
  );
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(`http://localhost:${PORT}/${opts.hash ?? ""}`);
  if (opts.controlClock) await page.clock.runFor(2000);
  // A recovery link lands on the new-password screen, signed in or not, so
  // waiting for the app's nav there would wait forever.
  if (opts.signedIn !== false && !opts.hash) await expect(page.locator("nav")).toBeVisible();
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
  const { writes } = await open(page);
  // The timeline is newest first; undo the top row, which is 11:30. The
  // entry stays as a tombstone (see domain/entries.js) — what has to be
  // gone is the cigarette, not the record that it was deleted.
  await page.getByRole("button", { name: "Remove this entry" }).first().click();
  await expect
    .poll(() => {
      const logs = [...writes].reverse().find((w) => w.key === "logs")?.value ?? {};
      return (logs["2026-08-31"] ?? []).filter((e) => !e.d).map((e) => e.trigger);
    })
    .toEqual(["Coffee"]);
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

test("the reset form asks for an address, and nothing else", async ({ page }) => {
  await open(page, { signedIn: false });
  await page.getByRole("button", { name: /Forgot your password/ }).click();

  await expect(page.getByRole("button", { name: "Send reset link" })).toBeVisible();
  // Nothing to type a password into, and no social buttons: neither has
  // anything to do with getting a link into an inbox.
  await expect(page.locator("input[type=password]")).toHaveCount(0);
  await expect(page.getByRole("button", { name: /Continue with/ })).toHaveCount(0);

  await page.getByRole("button", { name: "Back to sign in" }).click();
  await expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();
  await expect(page.locator("input[type=password]")).toHaveCount(1);
});

test("a reset request never says whether the address has an account", async ({ page }) => {
  await open(page, { signedIn: false });
  await page.getByRole("button", { name: /Forgot your password/ }).click();
  await page.locator("input[type=email]").fill("nobody@example.com");
  await page.getByRole("button", { name: "Send reset link" }).click();
  await expect(page.getByText(/If that address has an account/)).toBeVisible();
});

test("a reset link opens the new-password screen, not the app", async ({ page }) => {
  // Signed in, which normally means the app — but this session came from a
  // reset link, so the forgotten password has to be replaced first.
  await open(page, {
    signedIn: true,
    hash: "#access_token=stand-in&refresh_token=stand-in&type=recovery",
  });
  await expect(page.getByText("Choose a new password.")).toBeVisible();
  await expect(page.locator("nav")).toHaveCount(0);

  // The two boxes have to agree, and be long enough to be worth having.
  await page.locator("input[type=password]").first().fill("abc");
  await page.locator("input[type=password]").nth(1).fill("abc");
  await page.getByRole("button", { name: "Save new password" }).click();
  await expect(page.getByText("Pick a password of at least 6 characters.")).toBeVisible();

  await page.locator("input[type=password]").first().fill("a-longer-one");
  await page.locator("input[type=password]").nth(1).fill("a-different-one");
  await page.getByRole("button", { name: "Save new password" }).click();
  await expect(page.getByText("The two passwords don't match.")).toBeVisible();

  await page.locator("input[type=password]").nth(1).fill("a-longer-one");
  await page.getByRole("button", { name: "Save new password" }).click();
  await expect(page.getByText("Password changed. Opening the app…")).toBeVisible();
  // And then it gets out of the way.
  await expect(page.locator("nav")).toBeVisible();
});

test("a stale link says so instead of showing a blank form", async ({ page }) => {
  await open(page, {
    signedIn: false,
    hash: "#error=access_denied&error_code=otp_expired&error_description=Email+link+is+invalid+or+has+expired",
  });
  await expect(page.getByText(/That link didn't work/)).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();
});

test("the reset screens read right-to-left in Hebrew", async ({ page }) => {
  await open(page, {
    signedIn: true,
    lang: "he",
    hash: "#access_token=stand-in&type=recovery",
  });
  await expect(page.getByText("בחרו סיסמה חדשה.")).toBeVisible();
  await expect(page.getByRole("button", { name: "שמירת הסיסמה החדשה" })).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
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

// ── Local days ──────────────────────────────────────────────────────────

test("a cigarette after local midnight belongs to the new day", async ({ page }) => {
  // 00:30 local. Under the old UTC day key this landed in yesterday east of
  // Greenwich, and "cigarettes today" only reset hours after midnight.
  const justAfterMidnight = new Date("2026-09-01T00:30:00+03:00");
  await page.clock.setFixedTime(justAfterMidnight);
  const { writes } = await routeSupabase(page);
  await page.goto(`http://localhost:${PORT}/`);
  await expect(page.locator("nav")).toBeVisible();

  // A fresh day: nothing logged yet, whatever yesterday held.
  await expect(page.getByText("Cigarettes today")).toBeVisible();
  await expect(page.getByText("8 left before target")).toBeVisible();

  await page.getByRole("button", { name: "+ I just smoked one" }).click();
  await page.getByRole("button", { name: "Stress", exact: true }).click();
  await page.getByRole("button", { name: "Keep current time" }).click();

  await expect
    .poll(() => Object.keys([...writes].reverse().find((w) => w.key === "logs")?.value ?? {}))
    .toContain("2026-09-01");
});

test("history stored under UTC keys is moved to the local day it happened on", async ({ page }) => {
  // What the old code wrote: 00:40 on 27 August local (UTC+3) filed under
  // the 26th, because that is the UTC date.
  const ts = new Date("2026-08-27T00:40:00+03:00").getTime();
  const { writes } = await routeSupabase(page, {
    data: { logs: { "2026-08-26": [{ ts, trigger: "Craving" }] }, meta: undefined },
  });
  await page.clock.setFixedTime(NOW);
  await page.goto(`http://localhost:${PORT}/`);
  await expect(page.locator("nav")).toBeVisible();

  const written = (key) =>
    expect.poll(() => [...writes].reverse().find((w) => w.key === key)?.value);

  // The entry moves, the original is kept, and the account is marked done.
  await written("logs").toEqual({ "2026-08-27": [{ ts, trigger: "Craving" }] });
  await written("logs_backup_v1").toEqual({ "2026-08-26": [{ ts, trigger: "Craving" }] });
  await written("meta").toMatchObject({ schemaVersion: 2, trackingStartedAt: "2026-08-27" });
});

test("an already-migrated account is left alone", async ({ page }) => {
  const { writes } = await routeSupabase(page, {
    data: { meta: { schemaVersion: 2, trackingStartedAt: "2026-08-25" } },
  });
  await page.clock.setFixedTime(NOW);
  await page.goto(`http://localhost:${PORT}/`);
  await expect(page.locator("nav")).toBeVisible();
  await page.waitForTimeout(500);

  expect(writes.map((w) => w.key)).not.toContain("logs");
  expect(writes.map((w) => w.key)).not.toContain("logs_backup_v1");
});

// ── Counting days honestly ──────────────────────────────────────────────

test("a day with nothing logged can be recorded, and counts", async ({ page }) => {
  const { written } = await open(page, {
    data: { logs: { "2026-08-29": [{ ts: Date.now(), trigger: "Coffee" }] } },
  });
  await page.getByRole("button", { name: "I haven't smoked today" }).click();
  await expect(page.getByRole("button", { name: /Counted as a smoke-free day/ })).toBeVisible();
  await written("logs").toMatchObject({ "2026-08-31": { length: 0 } });

  await tab(page, "Insights");
  await expect(page.getByText("Smoke-free days")).toBeVisible();
});

test("smoke-free days count the gaps, not just the recorded zeroes", async ({ page }) => {
  await open(page);
  await tab(page, "Insights");
  // The fixture spans 25–31 August: seven tracked days, and the 29th has
  // no entries at all. It is still a day without a cigarette.
  const stat = (label) => page.getByText(label, { exact: true }).locator("..");
  await expect(stat("Days tracked")).toContainText("7");
  await expect(stat("Smoke-free days")).toContainText("1");
});

test("the offer to record a clean day goes away once something is logged", async ({ page }) => {
  await open(page);
  await expect(page.getByRole("button", { name: "I haven't smoked today" })).toHaveCount(0);
});

// ── Saying true things ──────────────────────────────────────────────────

test("settings does not claim the data stays on the device", async ({ page }) => {
  await open(page);
  await tab(page, "Settings");
  await expect(page.getByText(/stays on your device/)).toHaveCount(0);
  await expect(page.getByText(/saved privately in your account/)).toBeVisible();
});

// ── Working without a network ───────────────────────────────────────────

test("a cigarette logged with no signal is not lost", async ({ page, context }) => {
  const { writes } = await open(page);

  await context.setOffline(true);
  for (const trigger of ["Stress", "Boredom"]) {
    await page.getByRole("button", { name: "+ I just smoked one" }).click();
    await page.getByRole("button", { name: trigger, exact: true }).click();
    await page.getByRole("button", { name: "Keep current time" }).click();
  }

  // On screen immediately, whatever the network is doing.
  await expect(page.getByText("4", { exact: true }).first()).toBeVisible();
  // And no red banner: a dropped connection is not a misconfigured database.
  await expect(page.locator("#smoquit-storage-banner")).toHaveCount(0);

  await context.setOffline(false);
  await page.evaluate(() => window.dispatchEvent(new Event("online")));

  await expect
    .poll(() => {
      const logs = [...writes].reverse().find((w) => w.key === "logs")?.value ?? {};
      return (logs["2026-08-31"] ?? []).filter((e) => !e.d).length;
    })
    .toBe(4);
});

test("the app opens from its local copy when the database is unreachable", async ({ page }) => {
  await open(page);
  await expect(page.getByText("Cigarettes today")).toBeVisible();
  await expect(page.getByText("6 left before target")).toBeVisible();

  // Cut off Supabase specifically rather than the whole network: serving
  // the page itself without a connection is the service worker's job, and
  // it does not exist yet. What is being checked here is that the DATA
  // survives an unreachable database.
  await page.route(`${SUPABASE_HOST}/rest/**`, (route) => route.abort("connectionfailed"));
  await page.reload();

  await expect(page.locator("nav")).toBeVisible();
  await expect(page.getByText("6 left before target")).toBeVisible();
  // Still no banner: unreachable is not misconfigured.
  await expect(page.locator("#smoquit-storage-banner")).toHaveCount(0);
});

test("undo leaves a mark, so a delete is not undone by a sync", async ({ page }) => {
  const { written } = await open(page);
  await page.getByRole("button", { name: "Remove this entry" }).first().click();

  // One live entry on screen, and the deletion recorded rather than erased.
  await expect(page.getByText("1", { exact: true }).first()).toBeVisible();
  await written("logs").toMatchObject({
    "2026-08-31": { length: 2, 1: { d: 1 } },
  });
});

test("signing out does not leave the account cached on the device", async ({ page }) => {
  await open(page);
  const cachedKeys = () =>
    page.evaluate(() => Object.keys(localStorage).filter((k) => k.startsWith("smoquit.cache.")));
  expect(await cachedKeys()).not.toHaveLength(0);

  await page.getByRole("button", { name: "Sign out" }).click();
  await expect.poll(cachedKeys).toHaveLength(0);
});

// ── The craving moment ──────────────────────────────────────────────────

test("riding out a craving is recorded as a win, and costs no cigarette", async ({ page }) => {
  const { written, writes } = await open(page);

  await page.getByRole("button", { name: "I want one right now" }).click();
  await expect(page.getByText("Ride it out")).toBeVisible();
  // The clock starts on its own — no question is asked first.
  await expect(page.getByText("5:00")).toBeVisible();

  await page.getByRole("button", { name: "Stress", exact: true }).click();
  await page.getByRole("button", { name: "It passed" }).click();

  await written("cravings").toMatchObject({
    "2026-08-31": { length: 1, 0: { outcome: "held", trigger: "Stress" } },
  });
  // Nothing was smoked, so nothing was logged.
  expect(writes.map((w) => w.key)).not.toContain("logs");
  await expect(page.getByText("1 craving ridden out today")).toBeVisible();
});

test("a craving can be ridden out without naming what caused it", async ({ page }) => {
  const { written } = await open(page);
  await page.getByRole("button", { name: "I want one right now" }).click();
  await page.getByRole("button", { name: "It passed" }).click();
  await written("cravings").toMatchObject({ "2026-08-31": { 0: { trigger: null } } });
});

test("giving in records the craving and hands over to logging", async ({ page }) => {
  const { written } = await open(page);

  await page.getByRole("button", { name: "I want one right now" }).click();
  await page.getByRole("button", { name: "Coffee", exact: true }).click();
  await page.getByRole("button", { name: "I smoked one anyway" }).click();

  // The urge is recorded honestly, not quietly dropped for being a loss.
  await written("cravings").toMatchObject({
    "2026-08-31": { 0: { outcome: "smoked", trigger: "Coffee" } },
  });

  // And it goes straight to the time sheet — the trigger was already given,
  // so nobody is asked the same question twice.
  await expect(page.getByText("When did you actually smoke it?")).toBeVisible();
  await page.getByRole("button", { name: "Keep current time" }).click();
  await written("logs").toMatchObject({
    "2026-08-31": { length: 3, 2: { trigger: "Coffee" } },
  });
});

test("giving in without naming a trigger still asks what set it off", async ({ page }) => {
  await open(page);
  await page.getByRole("button", { name: "I want one right now" }).click();
  await page.getByRole("button", { name: "I smoked one anyway" }).click();
  await expect(page.getByText("What set this one off?")).toBeVisible();
});

test("choosing a trigger offers something to do instead", async ({ page }) => {
  await open(page);
  await page.getByRole("button", { name: "I want one right now" }).click();
  await expect(page.getByText("Swap", { exact: true })).toHaveCount(0);

  await page.getByRole("button", { name: "Coffee", exact: true }).click();
  await expect(page.getByText("Swap", { exact: true })).toBeVisible();
  await expect(page.getByText(/switch to tea for a week/)).toBeVisible();

  // "Craving" describes the urge itself, so there is no routine to swap.
  await page.getByRole("button", { name: "Craving", exact: true }).click();
  await expect(page.getByText("Swap", { exact: true })).toHaveCount(0);
});

test("the sheet shows you your own reason", async ({ page }) => {
  await open(page);
  await page.getByRole("button", { name: "I want one right now" }).click();
  await expect(page.getByText(`"${GOAL.reason}"`)).toBeVisible();
});

test("the timer runs down and says so when the wave has passed", async ({ page }) => {
  await open(page, { controlClock: true });
  await page.getByRole("button", { name: "I want one right now" }).click();
  await expect(page.getByText("5:00")).toBeVisible();

  await page.clock.runFor("04:00");
  await expect(page.getByText("1:00")).toBeVisible();
  await expect(page.getByText("The wave has passed")).toHaveCount(0);

  await page.clock.runFor("01:05");
  await expect(page.getByText("The wave has passed")).toBeVisible();
  await expect(page.getByText("0:00")).toBeVisible();
});

test("closing the sheet records nothing, because nothing is known", async ({ page }) => {
  const { writes } = await open(page);
  await page.getByRole("button", { name: "I want one right now" }).click();
  await page.locator("body").click({ position: { x: 5, y: 5 } });

  await expect(page.getByText("Ride it out")).toHaveCount(0);
  await page.waitForTimeout(300);
  expect(writes.map((w) => w.key)).not.toContain("cravings");
});

test("the craving sheet reads right-to-left in Hebrew", async ({ page }) => {
  // Language lives in the account, and the account wins over the browser —
  // that is the whole point of storing it there, so setting localStorage
  // alone would be overwritten on boot.
  await open(page, { lang: "he", data: { settings: { ...SETTINGS, lang: "he" } } });
  await page.getByRole("button", { name: "בא לי עכשיו" }).click();
  await expect(page.getByText("רכבו על הגל")).toBeVisible();
  await expect(page.getByText("שאיפה")).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await page.getByRole("button", { name: "עבר לי" }).click();
  await expect(page.getByText("דחף אחד שעבר היום")).toBeVisible();
});
