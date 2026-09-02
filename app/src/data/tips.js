// ─────────────────────────────────────────────────────────────────────────
//  The tips.
//
//  t is the heading, d the body. Both are English strings used directly as
//  translation keys, so the Hebrew lives in i18n/he.js and a missing entry
//  degrades to readable English rather than a blank card.
//
//  id is the one field that is NOT shown to anybody. It is what the ranking
//  in domain/coach.js and a person's "this helped" are stored against, so it
//  must never change once it has shipped — rewording a tip is free, renaming
//  its id silently forgets everything anyone told us about it.
//
//  What deserves saying about the shape: there is nothing here about who a
//  tip is for. That lives in domain/coach.js, beside the scoring that uses
//  it. Keeping the file to content alone is also what lets check-i18n treat
//  every string in it as a string to translate, which is exactly right for
//  headings and bodies and exactly wrong for a tag like "morning".
// ─────────────────────────────────────────────────────────────────────────

export const TIPS = [
  {
    id: "wave",
    t: "Ride the 5-minute wave",
    d: "A craving peaks and fades in about 3–5 minutes whether or not you smoke. Set a timer and do anything else until it rings.",
  },
  {
    id: "delay",
    t: "Delay, don't decide",
    d: "Don't tell yourself 'never again' in the moment. Tell yourself 'not right now.' Push the next one 10 minutes later each time.",
  },
  {
    id: "hands",
    t: "Change your hands' job",
    d: "Cravings are partly muscle memory. Hold a pen, a coin, or a stress ball. Keep your hands busy and the urge loses its ritual.",
  },
  {
    id: "water",
    t: "Drink cold water slowly",
    d: "Sipping water mimics the hand-to-mouth motion and dulls the urge. Keep a full glass or bottle within reach.",
  },
  {
    id: "pairings",
    t: "Break the pairings",
    d: "Coffee, alcohol, and the after-meal moment are cues, not needs. Change the setting: brush your teeth, step outside, switch chairs.",
  },
  {
    id: "inconvenient",
    t: "Make it inconvenient",
    d: "Don't carry a lighter. Leave cigarettes in another room or the car. Every extra step is a chance to reconsider.",
  },
  {
    id: "breathe",
    t: "Breathe like you're smoking",
    d: "The deep inhale is part of what relaxes you. Try four slow breaths — in for 4, hold for 4, out for 6 — without the cigarette.",
  },
  {
    id: "reward",
    t: "Reward the skips",
    d: "Move the cigarette money into a jar or a savings note each day. Watching it grow makes the benefit concrete.",
  },

  // ── Written for signals the app can actually see ──────────────────────
  // Each of these answers something the profile detects: a day that ends
  // badly, a day that starts too early, a target being missed most days,
  // an evening out, and a run of urges that were beaten. A tip nobody's
  // data can ever point at is just more list.
  {
    id: "lastofnight",
    t: "Decide the last one before the evening starts",
    d: "Late cigarettes are usually about winding down, not nicotine. Pick the hour you stop, and put the pack somewhere you'd have to get up for.",
  },
  {
    id: "firstofday",
    t: "Push the first one back",
    d: "The first cigarette sets the pace of the whole day. Move it fifteen minutes later each morning — shower first, eat first, leave the house first.",
  },
  {
    id: "targetfit",
    t: "Aim at the day you actually have",
    d: "A target you miss most days stops being a target. Set it one below your real average, hold it for a week, then take another one off.",
  },
  {
    id: "social",
    t: "Decide the number before you go out",
    d: "Pick how many you'll have before you leave, say it out loud to someone, and stand where the smokers aren't. Deciding in the moment is the part that fails.",
  },
  {
    id: "bankwins",
    t: "Bank the ones you win",
    d: "You've ridden urges out before, and they passed. Keep count of them on purpose — the proof that they pass is most of what gets you through the next one.",
  },
];
