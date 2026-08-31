import { defineConfig } from "@playwright/test";

// ─────────────────────────────────────────────────────────────────────────
//  The app caps itself at 480px and is only ever used on a phone, so the
//  tests run at a phone viewport — a desktop one would exercise a layout
//  nobody sees.
//
//  Note the explicit browserName. Playwright's device descriptors carry a
//  defaultBrowserType, and every iPhone preset says "webkit"; picking one
//  for its viewport quietly changes which engine runs.
// ─────────────────────────────────────────────────────────────────────────
export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  expect: { timeout: 10000 },
  fullyParallel: false,
  workers: 1,
  reporter: process.env.CI ? "line" : "list",
  use: {
    browserName: "chromium",
    viewport: { width: 390, height: 844 },
    // Pinned, and deliberately not UTC. A day here is a LOCAL day, and the
    // bugs that live in that distinction are invisible at offset zero — the
    // fixture timestamps are written in +03:00 for the same reason.
    timezoneId: "Asia/Jerusalem",
    hasTouch: true,
    launchOptions: {
      // This environment ships one Chromium, at a fixed path, and cannot
      // download the build Playwright would otherwise look for. Running as
      // root also means the sandbox has to come off.
      executablePath:
        process.env.SMOQUIT_CHROMIUM ??
        "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell",
      args: ["--no-sandbox"],
    },
  },
});
