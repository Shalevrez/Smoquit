// ─────────────────────────────────────────────────────────────────────────
//  A signed-in account, without a network or a real one.
//
//  Every screen in this app is behind a login, and every number on it comes
//  out of one Supabase table. So the tests stand in for both: routeSupabase
//  intercepts the project's origin and answers auth and user_data itself.
//  That makes the screens reachable, the data fixed, and the whole suite
//  independent of the live project — no test account, and no possibility of
//  a test writing to somebody's real history.
// ─────────────────────────────────────────────────────────────────────────

export const SUPABASE_HOST = "https://bzzdmxiykbrvwlyimagu.supabase.co";

// Frozen so that "today", the hour chart and the seven-day bars are the same
// on every run. Chosen mid-month and mid-week so nothing lands on an edge.
export const NOW = new Date("2026-08-31T12:00:00+03:00");

const day = (d, ...hhmm) => [
  d,
  hhmm.map(([h, m, trigger]) => ({
    ts: new Date(
      `2026-08-${d.slice(-2)}T${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00+03:00`,
    ).getTime(),
    trigger,
  })),
];

// Deliberately includes entries either side of local midnight: 00:40 and
// 23:20 are exactly the ones that land in the wrong day when day keys are
// computed in UTC.
export const LOGS = Object.fromEntries([
  day("2026-08-25", [8, 15, "Coffee"], [13, 5, "After a meal"], [17, 40, "Stress"]),
  day("2026-08-26", [9, 0, "Coffee"], [23, 20, "Social"]),
  day("2026-08-27", [0, 40, "Craving"], [8, 30, "Coffee"], [15, 10, "Boredom"], [18, 0, "Habit"]),
  day("2026-08-28", [8, 45, "Coffee"], [16, 20, "Stress"]),
  day("2026-08-30", [10, 0, "Boredom"], [14, 30, "Stress"], [20, 15, "Social"]),
  day("2026-08-31", [8, 20, "Coffee"], [11, 30, "Unlogged"]),
]);

// Urges faced, both the ones that passed and the ones that did not. Today
// deliberately has none, so a test can watch the first one appear.
const craving = (date, hour, outcome) => ({
  ts: new Date(`${date}T${String(hour).padStart(2, "0")}:00:00+03:00`).getTime(),
  trigger: "Stress",
  outcome,
  heldMs: 5 * 60 * 1000,
});

export const CRAVINGS = {
  "2026-08-30": [craving("2026-08-30", 11, "held"), craving("2026-08-30", 16, "smoked")],
};

export const GOAL = {
  baseline: 15,
  target: 8,
  quitDate: "2026-12-01",
  reason: "Be there for my kids without getting winded.",
};

export const SETTINGS = {
  country: "IL",
  product: "Marlboro (Red / Gold)",
  pricePerPack: 36,
  lang: "en",
};

const USER = {
  id: "00000000-0000-4000-8000-000000000001",
  email: "someone@example.com",
  aud: "authenticated",
  role: "authenticated",
  app_metadata: { provider: "email" },
  user_metadata: {},
  created_at: "2026-06-01T00:00:00Z",
};

const SESSION = {
  access_token: "test-access-token",
  refresh_token: "test-refresh-token",
  token_type: "bearer",
  expires_in: 3600,
  expires_at: Math.floor(NOW.getTime() / 1000) + 3600,
  user: USER,
};

/**
 * @param {import('@playwright/test').Page} page
 * @param {object} [opts]
 * @param {boolean} [opts.signedIn]  false to land on the login screen
 * @param {object|null} [opts.data]  overrides for the three stored rows
 * @param {{google:boolean, apple:boolean}} [opts.providers]
 * @returns {{writes: {key:string, value:any}[], rows: object, subscriptions: object[]}}
 *   every upsert the app made, in order, the current state of the stored
 *   rows, and any push subscription it registered.
 */
export async function routeSupabase(page, opts = {}) {
  const signedIn = opts.signedIn ?? true;
  const providers = opts.providers ?? { google: true, apple: true };
  const rows = {
    logs: LOGS,
    goal: GOAL,
    settings: SETTINGS,
    // Already migrated by default, so a test only exercises the migration
    // when it deliberately clears this.
    meta: { schemaVersion: 2, trackingStartedAt: "2026-08-25" },
    cravings: CRAVINGS,
    ...(opts.data ?? {}),
  };

  // Returned rather than hung off the page: Playwright's page fixture does
  // not carry ad-hoc properties through to the test.
  const writes = [];
  // Push subscriptions live in their own table rather than in user_data —
  // the sender has to read across accounts, which the policies on user_data
  // exist to prevent. See supabase-schema.sql.
  const subscriptions = [];

  // The client persists its session in localStorage under a key derived
  // from the project ref, and reads it before it ever asks the network.
  // Seeding it there is what makes the app come up already signed in.
  if (signedIn) {
    const ref = new URL(SUPABASE_HOST).hostname.split(".")[0];
    await page.addInitScript(
      ([key, session]) => window.localStorage.setItem(key, JSON.stringify(session)),
      [`sb-${ref}-auth-token`, SESSION],
    );
  }

  await page.route(`${SUPABASE_HOST}/**`, async (route) => {
    const req = route.request();
    const url = new URL(req.url());
    const json = (body, status = 200) =>
      route.fulfill({ status, contentType: "application/json", body: JSON.stringify(body) });

    if (url.pathname === "/auth/v1/settings") {
      return json({ external: providers });
    }
    if (url.pathname === "/auth/v1/user") {
      // getUser() wants the user, not a session wrapped around one. Getting
      // this wrong makes currentUserId() return null, and then every write
      // is skipped in silence — which looks exactly like a passing app.
      return signedIn ? json(USER) : json({ error: "unauthorized" }, 401);
    }
    if (url.pathname.startsWith("/auth/v1/")) {
      if (url.pathname.endsWith("/logout")) return route.fulfill({ status: 204, body: "" });
      return signedIn ? json(SESSION) : json({ session: null, user: null });
    }
    if (url.pathname === "/rest/v1/push_subscriptions") {
      if (req.method() === "POST" || req.method() === "PATCH") {
        for (const row of [].concat(JSON.parse(req.postData() || "{}"))) subscriptions.push(row);
        return json([], 201);
      }
      if (req.method() === "DELETE") {
        subscriptions.length = 0;
        return json([], 204);
      }
      // The real table grants the browser no select at all, so anything
      // reaching here is the app asking for something it should not.
      return json({ message: "permission denied for table push_subscriptions" }, 403);
    }
    if (url.pathname === "/rest/v1/user_data") {
      if (req.method() === "GET") {
        const key = (url.searchParams.get("key") ?? "").replace(/^eq\./, "");
        const value = rows[key];
        // PostgREST returns a list; the app asks for maybeSingle.
        return json(value === undefined ? [] : [{ value }]);
      }
      if (req.method() === "POST" || req.method() === "PATCH") {
        const body = JSON.parse(req.postData() || "{}");
        for (const row of [].concat(body)) {
          rows[row.key] = row.value;
          writes.push({ key: row.key, value: row.value });
        }
        return json([], 201);
      }
      if (req.method() === "DELETE") {
        for (const key of Object.keys(rows)) delete rows[key];
        return json([], 204);
      }
    }
    return json({}, 200);
  });

  return { writes, rows, subscriptions };
}
