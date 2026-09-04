// ─────────────────────────────────────────────────────────────────────────
//  Getting a notification onto somebody's phone, with their permission.
//
//  Everything about this is a negotiation with the browser rather than with
//  us, so most of this file is finding out what is possible and saying so
//  honestly, rather than doing anything.
//
//  THE PERMISSION IS NEVER ASKED FOR ON LOAD. Not once, not "just this
//  time". A prompt somebody did not ask for is answered with Block, Block
//  is close to permanent, and the browsers are increasingly happy to make
//  it permanent on your behalf. So requestPermission() is only ever reached
//  from a tap on the switch in settings, which is also the only moment the
//  person has any idea what they are agreeing to.
//
//  ON IOS THE SWITCH CANNOT WORK AT ALL until the site has been added to
//  the Home Screen — Safari gives a page no PushManager otherwise. That is
//  not a failure to report as one; it is a thing to explain, which is what
//  reasonUnavailable() and screens/InstallScreen.jsx are for. Roughly half
//  of the people this app is written for are on an iPhone.
// ─────────────────────────────────────────────────────────────────────────

import { supabase } from "./supabase.js";
import { currentUserId } from "./storage.js";

/** Whether this browser has the pieces at all. */
export const pushSupported = () =>
  typeof window !== "undefined" &&
  "serviceWorker" in navigator &&
  "PushManager" in window &&
  "Notification" in window;

/** Whether the app is running as an installed app rather than a tab. */
export const isStandalone = () => {
  try {
    return (
      window.navigator.standalone === true ||
      window.matchMedia("(display-mode: standalone)").matches
    );
  } catch {
    return false;
  }
};

/** iOS or iPadOS, including the iPad that insists it is a Mac. */
export const isIOS = () => {
  try {
    const ua = navigator.userAgent || "";
    return (
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === "MacIntel" && (navigator.maxTouchPoints ?? 0) > 1)
    );
  } catch {
    return false;
  }
};

/** The reader's own zone, which the sender needs and cannot guess. */
export const currentZone = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
};

export const permission = () => {
  try {
    return Notification.permission;
  } catch {
    return "default";
  }
};

/**
 * Why the switch cannot be turned on, if it cannot.
 *
 * Returns a key from `UNAVAILABLE` below, or null when it can. These are
 * separate reasons because they need separate answers: one is fixed by
 * installing the app, one by changing a browser setting, and one cannot be
 * fixed at all. Collapsing them into "notifications unavailable" leaves the
 * person with nothing to do.
 */
export function reasonUnavailable() {
  if (isIOS() && !isStandalone()) return "ios-install";
  if (!pushSupported()) return "unsupported";
  if (permission() === "denied") return "blocked";
  return null;
}

/**
 * The sentences for those reasons. Exported as a table because they reach
 * sqT() through a variable — see the DYNAMIC list in scripts/check-i18n.mjs.
 */
export const UNAVAILABLE = {
  "ios-install": "Add Smoquit to your Home Screen first — on iPhone that is the only way.",
  unsupported: "This browser cannot show notifications.",
  blocked: "Notifications are blocked for this site in your browser's settings.",
};

/** The registration, once. Registering twice is harmless but noisy. */
let registering = null;
export function registerWorker() {
  if (!("serviceWorker" in navigator)) return Promise.resolve(null);
  registering ??= navigator.serviceWorker.register("/sw.js").catch((err) => {
    // Not fatal to anything: the app works without it, only push does not.
    console.warn("push: service worker did not register", err);
    registering = null;
    return null;
  });
  return registering;
}

/** Base64url, the form a VAPID key is published in, to the bytes it means. */
function urlBase64ToUint8Array(base64) {
  const padded = (base64 + "=".repeat((4 - (base64.length % 4)) % 4))
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  const raw = atob(padded);
  return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)));
}

const publicKey = () => window.SMOQUIT_CONFIG?.VAPID_PUBLIC_KEY || "";

/** A PushSubscription's keys, as the strings the sender needs. */
function keysOf(subscription) {
  const raw = subscription.toJSON?.() ?? {};
  return { p256dh: raw.keys?.p256dh ?? "", auth: raw.keys?.auth ?? "" };
}

/**
 * Turn notifications on: ask, subscribe, and tell the account.
 *
 * @returns {Promise<{ok: boolean, reason?: string}>} `reason` is a key of
 *   UNAVAILABLE, so the caller can say something specific rather than "it
 *   didn't work".
 */
export async function enablePush() {
  const blocked = reasonUnavailable();
  if (blocked) return { ok: false, reason: blocked };
  if (!publicKey()) return { ok: false, reason: "unsupported" };

  // From a tap, and only from a tap. See the note at the top of this file.
  const granted = await Notification.requestPermission();
  if (granted !== "granted") return { ok: false, reason: "blocked" };

  const registration = await registerWorker();
  if (!registration) return { ok: false, reason: "unsupported" };
  await navigator.serviceWorker.ready;

  const subscription =
    (await registration.pushManager.getSubscription()) ??
    (await registration.pushManager.subscribe({
      // Required by every browser that implements this, and the reason a
      // push cannot be sent by anybody who does not hold the private half.
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey()),
    }));

  const userId = await currentUserId();
  if (!userId) return { ok: false, reason: "unsupported" };

  const { p256dh, auth } = keysOf(subscription);
  // Keyed on (user_id, endpoint), so a phone and a laptop are two
  // subscriptions rather than one overwriting the other. The zone travels
  // with it because the sender has no other way to know what "eight in the
  // evening" means for this person.
  // No .select() after this on purpose: supabase-js only asks for the row
  // back when you chain one, and not asking is what lets the table grant no
  // select at all. See the note on ZONE_KEY below.
  const { error } = await supabase.from("push_subscriptions").upsert(
    {
      user_id: userId,
      endpoint: subscription.endpoint,
      p256dh,
      auth,
      tz: currentZone(),
      failures: 0,
    },
    { onConflict: "user_id,endpoint" },
  );
  if (error) {
    console.warn("push: could not save the subscription", error);
    return { ok: false, reason: "unsupported" };
  }
  return { ok: true };
}

/**
 * Turn them off, on this device.
 *
 * The row is deleted rather than flagged. A subscription nobody wants is
 * not history worth keeping, and leaving it behind means the sender keeps
 * paying to push to an endpoint that will politely accept it forever.
 */
export async function disablePush() {
  try {
    const registration = await navigator.serviceWorker?.getRegistration("/");
    const subscription = await registration?.pushManager?.getSubscription();
    if (subscription) {
      const userId = await currentUserId();
      if (userId) {
        await supabase
          .from("push_subscriptions")
          .delete()
          .eq("user_id", userId)
          .eq("endpoint", subscription.endpoint);
      }
      await subscription.unsubscribe();
    }
  } catch (err) {
    // Worth saying out loud but not worth failing: the switch goes off
    // either way, and a row left behind gets swept when the endpoint dies.
    console.warn("push: could not fully unsubscribe", err);
  }
}

/** Whether this device currently holds a subscription. */
export async function isSubscribed() {
  try {
    if (!pushSupported() || permission() !== "granted") return false;
    const registration = await navigator.serviceWorker.getRegistration("/");
    return Boolean(await registration?.pushManager?.getSubscription());
  } catch {
    return false;
  }
}

/**
 * Where this device last told the account it was.
 *
 * Kept locally rather than read back from the table, and that is a policy
 * decision as much as a performance one: the sender needs to read EVERY
 * subscriber's endpoint, which is why it uses the service role — and it
 * means the browser never needs select on this table at all. So the schema
 * grants none, and the one thing the client would have wanted to read back
 * is remembered here instead. It also saves a round trip on every boot.
 */
const ZONE_KEY = "smoquit.pushZone";

/**
 * Keep the stored zone honest.
 *
 * People move, and a reminder set for eight in the evening in Tel Aviv
 * arrives at ten in the morning once they land in California. Called on
 * open, and writes only when the zone has actually changed — this runs on
 * every boot and must not become a write on every boot.
 */
export async function refreshZone() {
  try {
    const tz = currentZone();
    let last = null;
    try {
      last = window.localStorage.getItem(ZONE_KEY);
    } catch {
      // Private mode, or storage refused. Fall through and write once.
    }
    if (last === tz) return;
    if (!(await isSubscribed())) return;

    const registration = await navigator.serviceWorker.getRegistration("/");
    const subscription = await registration?.pushManager?.getSubscription();
    const userId = await currentUserId();
    if (!subscription || !userId) return;

    const { error } = await supabase
      .from("push_subscriptions")
      .update({ tz })
      .eq("user_id", userId)
      .eq("endpoint", subscription.endpoint);

    if (!error) {
      try {
        window.localStorage.setItem(ZONE_KEY, tz);
      } catch {
        // Then we try again next boot. Harmless.
      }
    }
  } catch {
    // A stale zone is a wrong hour, not a broken app.
  }
}
