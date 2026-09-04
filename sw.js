// ─────────────────────────────────────────────────────────────────────────
//  Smoquit — the service worker.
//
//  It does ONE thing: receive a push and show it. Read that again if you
//  are about to add to it.
//
//  A service worker is the hardest code in this project to change. It is
//  hand-edited and uploaded like config.js and version.js, it outlives the
//  page that installed it, and a broken one keeps running on somebody's
//  phone until they think to reinstall the app. So the rule here is the
//  same one that keeps storage-health.js small: no framework, no imports,
//  no cleverness, and nothing that can throw.
//
//  In particular there is DELIBERATELY NO CACHING. A caching service worker
//  under this deploy — files served straight from the repository root, hand
//  uploaded, fingerprinted by the build — is how you end up serving last
//  week's bundle to people who have no way to clear it. Caching and push
//  are two hard problems and they do not go in one file.
//
//  It also holds no dictionary and no rules. The sender does the deciding
//  and the translating, and posts a finished title and body; see
//  app/src/domain/notify.js, whose notificationFrom() is the tested twin of
//  the defaults below. A worker that has to be taught a new sentence is a
//  worker that has to be redeployed to everybody's phone.
// ─────────────────────────────────────────────────────────────────────────

const ICON = "/icon-192.png";
const TABS = ["log", "insights", "tips", "habits", "goal", "settings"];

// Take over as soon as a new version is uploaded, rather than waiting for
// every tab to close. There is no cache to invalidate, so there is nothing
// a takeover can make inconsistent — and the alternative is a fix sitting
// unused behind a tab somebody left open in March.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));

/**
 * Everything here is defensive on purpose. This worker may be months older
 * than the server sending to it, and a notification that fails to render is
 * an interruption somebody paid attention for and got nothing from. Show
 * something, always.
 */
self.addEventListener("push", (event) => {
  let payload = null;
  try {
    payload = event.data ? event.data.json() : null;
  } catch (err) {
    payload = null;
  }

  const options = (payload && payload.options) || {};
  const title = (payload && typeof payload.title === "string" && payload.title) || "Smoquit";

  event.waitUntil(
    self.registration.showNotification(title, {
      body: typeof options.body === "string" ? options.body : "",
      icon: typeof options.icon === "string" ? options.icon : ICON,
      badge: typeof options.badge === "string" ? options.badge : ICON,
      tag: typeof options.tag === "string" ? options.tag : "smoquit",
      data: options.data && typeof options.data === "object" ? options.data : { tab: "log" },
    }),
  );
});

/**
 * Opening the app on the right screen.
 *
 * The app has no router — which tab is showing is a piece of state — so the
 * tab travels as a query parameter that the shell reads once on boot. An
 * unrecognised one opens the app plainly, because landing somewhere odd is
 * worse than landing on Today.
 *
 * An already-open window is focused rather than a second one opened. Two
 * copies of an offline-first app writing to the same account is not a
 * disaster — the merge in lib/store.js is built for exactly that — but it
 * is still not what somebody tapping a notification meant to happen.
 */
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const data = event.notification.data || {};
  const tab = TABS.indexOf(data.tab) === -1 ? null : data.tab;
  const url = tab ? "/?tab=" + encodeURIComponent(tab) : "/";

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((windows) => {
      for (const client of windows) {
        if ("focus" in client) {
          if ("navigate" in client) client.navigate(url).catch(() => {});
          return client.focus();
        }
      }
      return self.clients.openWindow ? self.clients.openWindow(url) : undefined;
    }),
  );
});
