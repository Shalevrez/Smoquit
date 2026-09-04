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

  const { writes, subscriptions } = await routeSupabase(page, opts);
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
    subscriptions,
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

// ── Tips and habits, aimed at the person reading them ────────────────────
//
// The fixture account is seven days of real-looking log, so these are
// assertions about a specific person: their first cigarette is usually
// around eight, coffee is their commonest tag, and they are nowhere near
// the baseline they set. Every number below is one the app should be able
// to point at in the log.

test("the tips lead with what the log actually says", async ({ page }) => {
  await open(page);
  await tab(page, "Tips");

  await expect(page.getByText("For you right now")).toBeVisible();
  // Their median first cigarette is 8am, which is what this tip is for.
  await expect(page.getByText("Push the first one back")).toBeVisible();
  await expect(
    page.getByText(/Your first cigarette of the day is usually around 8am/),
  ).toBeVisible();
  // Five of their sixteen came with coffee, and the card says so.
  await expect(
    page.getByText("5 of the cigarettes you logged in the last two weeks came with Coffee."),
  ).toBeVisible();
  // The rest are still there, in the order they were written.
  await expect(page.getByText("Everything else")).toBeVisible();
});

test("saying a tip does not work takes it out of the recommendations", async ({ page }) => {
  const { written } = await open(page);
  await tab(page, "Tips");

  const card = page.getByText("Break the pairings").locator("xpath=..");
  await card.getByRole("button", { name: "Not for me" }).click();

  await written("tipFeedback").toMatchObject({ pairings: { verdict: "didnt" } });
  // Gone from the top, and the fact that was arguing for it goes with it.
  await expect(
    page.getByText("5 of the cigarettes you logged in the last two weeks came with Coffee."),
  ).toHaveCount(0);
  // Not deleted, though — it is still in the library below.
  await expect(page.getByText("Break the pairings")).toBeVisible();
});

test("a tip that works is pinned, and pressing it again takes that back", async ({ page }) => {
  const { written } = await open(page);
  await tab(page, "Tips");

  const button = () =>
    page.getByText("Drink cold water slowly").locator("xpath=..").getByRole("button", {
      name: "This helps me",
    });
  await button().click();
  await written("tipFeedback").toMatchObject({ water: { verdict: "worked" } });
  await expect(
    page.getByText("You marked this one as something that works for you."),
  ).toBeVisible();

  await button().click();
  await written("tipFeedback").toEqual({});
});

test("the habits page offers the cue that is costing the most", async ({ page }) => {
  await open(page);
  await tab(page, "Habits");

  await expect(page.getByText("Worth trying next")).toBeVisible();
  await expect(page.getByText("Morning coffee")).toBeVisible();
  // Five coffee cigarettes over seven tracked days, all of them around eight.
  await expect(
    page.getByText("Coffee: about 0.7 a day lately, most often around 8am."),
  ).toBeVisible();
});

test("starting a swap begins measuring it against the log", async ({ page }) => {
  const { written } = await open(page);
  await tab(page, "Habits");
  await page.getByRole("button", { name: "Try this for a week" }).first().click();

  await written("habits").toMatchObject({
    [`Coffee:${"2026-08-31"}`]: { trigger: "Coffee", cue: "Morning coffee", endedAt: null },
  });
  await expect(page.getByText("What you're trying")).toBeVisible();
  await expect(page.getByText("Day 1 of 7")).toBeVisible();
  // One day in is not a result, and the card says so rather than claiming one.
  await expect(page.getByText("Too early to call. Check back in a day or two.")).toBeVisible();
  // The same cue is not offered again while it is being tried; the next
  // one down the list takes its place.
  await expect(
    page.getByText("Coffee: about 0.7 a day lately, most often around 8am."),
  ).toHaveCount(0);
  await expect(page.getByText("Work stress break")).toBeVisible();
});

test("stopping a swap keeps it out of the way", async ({ page }) => {
  const { written } = await open(page);
  await tab(page, "Habits");
  await page.getByRole("button", { name: "Try this for a week" }).first().click();
  await expect(page.getByText("What you're trying")).toBeVisible();

  await page.getByRole("button", { name: "Stop this one" }).click();
  await written("habits").toMatchObject({ "Coffee:2026-08-31": { endedAt: "2026-08-31" } });
  await expect(page.getByText("What you're trying")).toHaveCount(0);
});

test("an account with nothing logged is not told anything about itself", async ({ page }) => {
  const { errors } = await open(page, { data: { logs: {}, cravings: {}, meta: undefined } });
  await tab(page, "Tips");
  await expect(page.getByText("For you right now")).toHaveCount(0);
  await expect(page.getByText(/These are in the order they were written/)).toBeVisible();
  await tab(page, "Habits");
  await expect(page.getByText(/Tag a few cigarettes with what set them off/)).toBeVisible();
  await expect(page.getByText("Every swap")).toBeVisible();
  expect(errors).toEqual([]);
});

test("the personalised pages read right-to-left in Hebrew", async ({ page }) => {
  await open(page, { lang: "he", data: { settings: { ...SETTINGS, lang: "he" } } });
  await tab(page, "טיפים");
  await expect(page.getByText("בשבילכם עכשיו")).toBeVisible();
  await expect(page.getByText("זה עוזר לי").first()).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");

  await tab(page, "הרגלים");
  await expect(page.getByText("שווה לנסות עכשיו")).toBeVisible();
  await expect(page.getByRole("button", { name: "לנסות את זה לשבוע" }).first()).toBeVisible();
});

// ── Insights, once it leads with a direction ─────────────────────────────

/** A log of `perDay` cigarettes a day across a range of August days. */
const fortnight = (from, to, perDay, trigger = "Coffee") => {
  const logs = {};
  for (let day = from; day <= to; day++) {
    const date = `2026-08-${String(day).padStart(2, "0")}`;
    logs[date] = Array.from({ length: perDay }, (_, i) => ({
      ts: new Date(`${date}T${String(8 + i).padStart(2, "0")}:00:00+03:00`).getTime(),
      trigger,
    }));
  }
  return logs;
};

test("insights open with which way it is going", async ({ page }) => {
  await open(page);
  await tab(page, "Insights");
  await expect(page.getByText("The last two weeks", { exact: true })).toBeVisible();
  // Sixteen cigarettes over the seven days this account has been tracked.
  await expect(page.getByText("2.3", { exact: true }).first()).toBeVisible();
  // One week of history is not two fortnights, and it says so rather than
  // comparing somebody against a fortnight they never lived.
  await expect(page.getByText(/Too early to compare fortnights/)).toBeVisible();
});

test("a fortnight with one behind it is compared against it", async ({ page }) => {
  await open(page, {
    data: {
      logs: { ...fortnight(4, 17, 8), ...fortnight(18, 31, 2) },
      cravings: {},
      meta: { schemaVersion: 2, trackingStartedAt: "2026-08-04" },
    },
  });
  await tab(page, "Insights");
  await expect(page.getByText("Down from 8.0 a day the fortnight before.")).toBeVisible();
  // And the trigger that fell carries the arrow that says so.
  await expect(page.getByTitle("down on the fortnight before")).toBeVisible();
});

test("the urges are on the page at last", async ({ page }) => {
  // Recorded since the craving sheet shipped, and shown nowhere until now.
  await open(page);
  await tab(page, "Insights");
  await expect(
    page.getByText("You rode out 1 of the 2 urges you sat with in the last two weeks."),
  ).toBeVisible();
  await expect(page.getByText("50% ridden out")).toBeVisible();
});

test("an account that has never sat with one is told how to", async ({ page }) => {
  await open(page, { data: { cravings: {} } });
  await tab(page, "Insights");
  await expect(page.getByText(/Next time one comes, use/)).toBeVisible();
});

test("the peak is a stretch of the day, not a single hour", async ({ page }) => {
  await open(page);
  await tab(page, "Insights");
  await expect(
    page.getByText(/Your heaviest stretch is 8am–10am, which carries 38%/),
  ).toBeVisible();
});

test("the goal tab and the insights tab agree about the money", async ({ page }) => {
  // They used not to: the goal tab totalled over the days that had a key in
  // the log, which skips every day nobody opened the app — the clean ones.
  await open(page);
  await tab(page, "Insights");
  await expect(page.getByText("₪160")).toBeVisible();
  await tab(page, "Goal");
  await expect(page.getByText("₪160")).toBeVisible();
});

test("the streaks are counted, including the days with no key", async ({ page }) => {
  await open(page);
  await tab(page, "Insights");
  await expect(page.getByText("Streaks")).toBeVisible();
  await expect(page.getByText("Longest run")).toBeVisible();
  // The fixture's 29th has no entry at all, and is the run.
  await expect(page.getByText("Smoke-free days")).toBeVisible();
  await expect(page.getByText("Days at or under target")).toBeVisible();
});

test("the insights page reads right-to-left in Hebrew", async ({ page }) => {
  await open(page, { lang: "he", data: { settings: { ...SETTINGS, lang: "he" } } });
  await tab(page, "תובנות");
  await expect(page.getByText("השבועיים האחרונים", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "דחפים שישבתם איתם" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "רצפים" })).toBeVisible();
  // Hebrew reads the clock in twenty-four hours, here as everywhere else.
  await expect(page.getByText(/08:00–10:00/)).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
});

// ─────────────────────────────────────────────────────────────────────────
//  The nudges.
//
//  The frozen clock is midday and the reminder defaults to eight in the
//  evening, which is why the fifty-odd tests above see no banner and did
//  not have to change. The first test here pins that down, because the day
//  it stops being true it would surface as a wall of unrelated failures in
//  tests that suddenly have a card in front of the thing they click.
// ─────────────────────────────────────────────────────────────────────────

/** Everything off but the evening reminder, at an hour a test can reach. */
const ONLY_REMINDER = {
  reminderHour: 13,
  milestone: false,
  risk: false,
  target: false,
};

test("nothing is said at midday to somebody who has already logged", async ({ page }) => {
  await open(page);
  await expect(page.locator('[role="status"]')).toHaveCount(0);
});

test("going over the daily target says so, once, and does not scold", async ({ page }) => {
  // The fixture is two of a target of eight, so take the target down to one
  // rather than logging six cigarettes to get there.
  const { written } = await open(page, { data: { goal: { ...GOAL, target: 1 } } });

  const banner = page.locator('[role="status"]');
  await expect(banner).toBeVisible();
  await expect(banner).toContainText("Over today's target");
  await expect(banner).toContainText("1 over your 1 a day");
  await expect(banner).toContainText("The rest of the evening is still yours");
  // One at a time, always.
  await expect(banner).toHaveCount(1);

  // It is written down after a few seconds on screen, so a reload is quiet.
  await written("alerts").toMatchObject({ seen: { "target:2026-08-31": { day: "2026-08-31" } } });
});

test("dismissing a nudge writes it down, and it does not come back", async ({ page }) => {
  const { written } = await open(page, { data: { goal: { ...GOAL, target: 1 } } });

  const banner = page.locator('[role="status"]');
  await expect(banner).toBeVisible();
  await page.getByRole("button", { name: "Dismiss" }).click();
  await expect(banner).toHaveCount(0);

  await written("alerts").toMatchObject({ seen: { "target:2026-08-31": { day: "2026-08-31" } } });
});

test("a nudge already said is not said again", async ({ page }) => {
  await open(page, {
    data: {
      goal: { ...GOAL, target: 1 },
      alerts: { v: 1, seen: { "target:2026-08-31": { at: 1, day: "2026-08-31" } } },
    },
  });
  await expect(page.locator('[role="status"]')).toHaveCount(0);
});

test("the action on a nudge takes you to the tab it names", async ({ page }) => {
  await open(page, { data: { goal: { ...GOAL, target: 1 } } });

  await page.getByRole("button", { name: "Open Today" }).click();
  await expect(page.getByText("Cigarettes today")).toBeVisible();
  await expect(page.locator('[role="status"]')).toHaveCount(0);
});

test("the evening reminder waits for the hour, and only for an unanswered day", async ({
  page,
}) => {
  // No log row at all for today: nobody has answered for it. The clock is
  // pushed past the chosen hour rather than the default, so the test does
  // not sit through eight hours of fake time.
  const { written } = await open(page, {
    controlClock: true,
    data: {
      logs: { "2026-08-25": LOGS["2026-08-25"], "2026-08-26": LOGS["2026-08-26"] },
      // Only the reminder, so this test is about the reminder. Days with no
      // key are smoke-free days, so this account has a run going and would
      // otherwise be congratulated first — correctly, but not here.
      settings: { ...SETTINGS, alerts: ONLY_REMINDER },
    },
  });

  await expect(page.locator('[role="status"]')).toHaveCount(0);

  // Up to 12:59, then one more tick to land exactly on the hour. Advancing
  // the whole hour in one call would run the "counts as seen" timer too —
  // it is four seconds and this would be sixty minutes — and the banner
  // would appear and mark itself read inside the same call.
  await page.clock.runFor(59 * 60 * 1000);
  await expect(page.locator('[role="status"]')).toHaveCount(0);
  await page.clock.runFor(60 * 1000);

  const banner = page.locator('[role="status"]');
  await expect(banner).toContainText("Nothing logged today");
  await expect(banner).toContainText("Two taps and the day is on the record");

  // A few seconds on screen is what makes it said, so it is not burned by
  // being glimpsed and not repeated all evening either.
  await page.clock.runFor(5000);
  await written("alerts").toMatchObject({ seen: { "reminder:2026-08-31": {} } });
  await expect(banner).toHaveCount(0);
});

test("a day marked smoke-free counts as answered, and is not nagged", async ({ page }) => {
  // The distinction the whole reminder rule turns on: an empty array is
  // somebody pressing "I haven't smoked today", which is the best day this
  // app can record — not a day nobody answered for.
  await open(page, {
    controlClock: true,
    data: {
      logs: { "2026-08-25": LOGS["2026-08-25"], "2026-08-31": [] },
      settings: { ...SETTINGS, alerts: ONLY_REMINDER },
    },
  });

  await page.clock.runFor(60 * 60 * 1000);
  await expect(page.locator('[role="status"]')).toHaveCount(0);
});

test("the nudge switches are on the settings page and are saved", async ({ page }) => {
  const { written } = await open(page);
  await tab(page, "Settings");

  await expect(page.getByText("Nudges")).toBeVisible();
  // The promise this line makes changed when push arrived: it used to say
  // nothing was ever sent anywhere, and now it says the timed ones can be.
  await expect(page.getByText(/reach your phone too, even when Smoquit is closed/)).toBeVisible();

  await page.getByLabel("When I go over my daily target").uncheck();
  await written("settings").toMatchObject({ alerts: { target: false, reminder: true } });

  await page.getByLabel("Remind me at").selectOption("7");
  await written("settings").toMatchObject({ alerts: { reminderHour: 7 } });
});

test("a nudge reads right-to-left in Hebrew", async ({ page }) => {
  await open(page, {
    lang: "he",
    data: { goal: { ...GOAL, target: 1 }, settings: { ...SETTINGS, lang: "he" } },
  });

  const banner = page.locator('[role="status"]');
  await expect(banner).toContainText("מעל היעד של היום");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  // The accent stripe is on the side the reading starts from, which in
  // Hebrew is the right — borderInlineStart, never borderLeft.
  await expect(banner).toHaveCSS("border-left-width", "1px");
  await expect(banner).toHaveCSS("border-right-width", "3px");
});

// ─────────────────────────────────────────────────────────────────────────
//  Notifications that reach the phone.
//
//  The delivery itself cannot be tested here — that needs a real push
//  service, a real device and a real account, and it is what the manual
//  checklist in UPLOAD-ME-README.txt is for. What CAN be tested is
//  everything on this side of it, and one thing in particular that no
//  amount of manual testing would reliably catch: that the app never asks
//  for the notification permission on its own.
// ─────────────────────────────────────────────────────────────────────────

/** A stand-in for the browser's push machinery, installed before any script. */
async function stubPushManager(page) {
  await page.addInitScript(() => {
    const fake = {
      endpoint: "https://push.example.test/endpoint/abc123",
      toJSON: () => ({
        endpoint: "https://push.example.test/endpoint/abc123",
        keys: { p256dh: "test-p256dh", auth: "test-auth" },
      }),
      unsubscribe: async () => true,
    };
    // Chromium has no push service to talk to in a test, so subscribe()
    // would fail for reasons that have nothing to do with this app.
    window.__sqSubscribed = false;
    Object.defineProperty(window, "__sqFakePush", { value: fake });
    const install = (proto) => {
      proto.subscribe = async () => {
        window.__sqSubscribed = true;
        return fake;
      };
      proto.getSubscription = async () => (window.__sqSubscribed ? fake : null);
    };
    if (window.PushManager) install(window.PushManager.prototype);
  });
}

test("the app is installable: manifest, icons and a worker", async ({ page }) => {
  await open(page);

  await expect(page.locator('link[rel="manifest"]')).toHaveAttribute(
    "href",
    "/manifest.webmanifest",
  );
  await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveCount(1);

  // Fetched rather than assumed: _redirects sends unmatched paths to
  // index.html, so a missing manifest is a page of HTML, not a 404.
  const manifest = await page.evaluate(async () => {
    const res = await fetch("/manifest.webmanifest");
    return { type: res.headers.get("content-type"), body: await res.json() };
  });
  expect(manifest.body.name).toBe("Smoquit");
  expect(manifest.body.display).toBe("standalone");
  expect(manifest.body.icons.length).toBeGreaterThanOrEqual(2);
  expect(manifest.body.icons.some((i) => i.purpose === "maskable")).toBe(true);

  await expect
    .poll(() => page.evaluate(() => navigator.serviceWorker.getRegistration("/").then(Boolean)))
    .toBe(true);
});

test("opening the app never asks for the notification permission", async ({ page }) => {
  // The one that matters most. A prompt nobody asked for is answered with
  // Block, Block is close to permanent, and there is then no way back to
  // this feature for that person on that device.
  await page.addInitScript(() => {
    window.__sqAsked = 0;
    Notification.requestPermission = async () => {
      window.__sqAsked += 1;
      return "granted";
    };
  });
  await open(page);
  await tab(page, "Settings");
  await expect(page.getByText("Nudges")).toBeVisible();

  expect(await page.evaluate(() => window.__sqAsked)).toBe(0);
});

test("turning the switch on asks once, and registers the device", async ({ page }) => {
  // The browser's own permission store is not what is under test here — the
  // app's flow is. So the answer is stubbed, exactly as the prompt is.
  await page.addInitScript(() => {
    window.__sqAsked = 0;
    window.__sqGranted = "granted";
    Object.defineProperty(Notification, "permission", { get: () => window.__sqGranted });
    Notification.requestPermission = async () => {
      window.__sqAsked += 1;
      return "granted";
    };
  });
  await stubPushManager(page);
  const { subscriptions } = await open(page);

  // The key is a runtime file the tests do not ship, so supply one.
  await page.evaluate(() => {
    window.SMOQUIT_CONFIG.VAPID_PUBLIC_KEY = "BEl62iUYgUivxIkv69yViEuiBIa1HI0wYQ1S0m-5J5xU";
  });

  await tab(page, "Settings");
  // click(), not check(): the box is controlled by whether the browser
  // actually granted and subscribed, so it flips a moment after the tap
  // rather than with it, and check() insists on the latter.
  await page.getByLabel("Send them to my phone").click();

  await expect.poll(() => subscriptions.length).toBeGreaterThan(0);
  const row = subscriptions[subscriptions.length - 1];
  expect(row.endpoint).toContain("push.example.test");
  expect(row.p256dh).toBe("test-p256dh");
  expect(row.auth).toBe("test-auth");
  // The zone travels with the subscription. Without it the sender has no
  // way to know what "eight in the evening" means for this person.
  expect(row.tz).toBe("Asia/Jerusalem");

  expect(await page.evaluate(() => window.__sqAsked)).toBe(1);
});

test("a blocked permission says so, instead of failing silently", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(Notification, "permission", { get: () => "denied" });
  });
  await open(page);
  await tab(page, "Settings");

  await expect(page.getByText(/Notifications are blocked for this site/)).toBeVisible();
});

test("on an iPhone the switch explains itself instead of doing nothing", async ({ page }) => {
  // Safari gives a page no PushManager until the site is on the Home
  // Screen. Without this screen the switch simply does nothing, and the
  // honest conclusion is that the feature is broken.
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "userAgent", {
      get: () =>
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1",
    });
  });
  await open(page);
  await tab(page, "Settings");

  await page.getByText(/Add Smoquit to your Home Screen first/).click();
  await expect(
    page.getByRole("heading", { name: "Add Smoquit to your Home Screen" }),
  ).toBeVisible();
  await expect(page.getByText(/Scroll down and choose/)).toBeVisible();

  // And it is not a dead end.
  await page.getByRole("button", { name: "Back to settings" }).click();
  await expect(page.getByText("Nudges")).toBeVisible();
});

test("the install instructions read right-to-left in Hebrew", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "userAgent", {
      get: () =>
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) Version/17.5 Mobile Safari/604.1",
    });
  });
  await open(page, { lang: "he", data: { settings: { ...SETTINGS, lang: "he" } } });
  await tab(page, "הגדרות");

  await page.getByText(/הוסיפו קודם את Smoquit/).click();
  await expect(page.getByRole("heading", { name: "הוסיפו את Smoquit למסך הבית" })).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
});

test("a notification opens the app on the tab it named, and tidies up after itself", async ({
  page,
}) => {
  // sw.js sends the tab as a query parameter because the app has no router.
  // It is read once and then wiped: it describes how this visit began, not
  // where the person is, and leaving it would pin them there on every
  // refresh for the rest of the day.
  await open(page, { hash: "?tab=insights" });

  await expect(page.getByText("The last two weeks", { exact: true })).toBeVisible();
  expect(await page.evaluate(() => window.location.search)).toBe("");
});

test("a nonsense tab in the address opens the app anyway", async ({ page }) => {
  await open(page, { hash: "?tab=../../etc/passwd" });
  await expect(page.getByText("Cigarettes today")).toBeVisible();
});
