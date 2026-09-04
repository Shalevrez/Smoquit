// ─────────────────────────────────────────────────────────────────────────
//  An alert, turned into the notification a phone will show.
//
//  This is the one place where an alert stops being facts and becomes a
//  sentence, and it runs on the SERVER rather than in the service worker.
//  That is deliberate, and it is what keeps sw.js honest: a service worker
//  is the hardest code in the project to update — it is a hand-edited file
//  at the site root, it caches itself, and a broken one is broken on
//  somebody's phone until they notice and reinstall. So it gets no
//  dictionary, no domain rules and no formatting, and instead receives a
//  finished title and a finished body and shows them.
//
//  Which means the payload IS the notification, near enough. Everything
//  showNotification() wants is computed here, where it can be tested
//  without a browser, and sw.js does little more than pass it along with
//  defensive defaults in case a payload ever arrives from an older build.
//
//  The language comes from the account's own settings row, not from the
//  sender's environment — a server has no language. See i18n/translate.js.
// ─────────────────────────────────────────────────────────────────────────

/** Bump when the payload shape changes in a way sw.js has to notice. */
export const PAYLOAD_VERSION = 1;

/** Where the icons live. Root-served, hand-placed, never rebuilt. */
const ICON = "/icon-192.png";

/**
 * Build the push payload for one alert.
 *
 * @param {object} alert      one entry from dueAlerts()
 * @param {object} ctx
 * @param {(key: string, params?: object) => string} ctx.t   already bound to
 *   the reader's language
 * @param {(hour: number) => string} ctx.hour  how to name an hour in it
 * @returns {object} JSON to send, and very nearly the notification itself
 */
export function pushPayload(alert, { t, hour }) {
  // The engine hands out raw hour NUMBERS so that it needs no language.
  // This is where they become something readable — through the caller's
  // formatter, so a notification and the app agree about what to call four
  // in the afternoon.
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
      data: { id: alert.id, kind: alert.kind, tab: alert.action?.tab ?? "log" },
    },
  };
}

/**
 * What sw.js should actually show, given whatever arrived.
 *
 * Separate from building it because these are different jobs with different
 * risks: the builder runs on a server we deploy, this runs on a phone that
 * may be holding a service worker from months ago and receiving a payload
 * from today. So it trusts nothing and always returns something showable —
 * a notification that fails to render is a push the person paid attention
 * cost for and got nothing from.
 *
 * Kept here, beside the builder, so the two shapes are read together. sw.js
 * carries its own copy of the fallbacks because a service worker cannot
 * import from the bundle; this is the version under test.
 */
export function notificationFrom(payload, fallbackTitle = "Smoquit") {
  const ok = payload && typeof payload === "object";
  const title = (ok && typeof payload.title === "string" && payload.title) || fallbackTitle;
  const options = (ok && payload.options) || {};

  return {
    title,
    options: {
      body: typeof options.body === "string" ? options.body : "",
      icon: typeof options.icon === "string" ? options.icon : ICON,
      badge: typeof options.badge === "string" ? options.badge : ICON,
      tag: typeof options.tag === "string" ? options.tag : "smoquit",
      data: options.data && typeof options.data === "object" ? options.data : { tab: "log" },
    },
  };
}

/**
 * The address a notification should open.
 *
 * The app has no router — the tab is a piece of state — so this is a query
 * parameter the shell reads once on boot rather than a path. Anything
 * unrecognised opens the app plainly, which is the right failure: landing
 * somewhere odd is worse than landing on Today.
 */
export function urlFor(data, tabs) {
  const tab = data?.tab;
  return tabs?.includes(tab) ? `/?tab=${encodeURIComponent(tab)}` : "/";
}
