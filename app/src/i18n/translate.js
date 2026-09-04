// ─────────────────────────────────────────────────────────────────────────
//  Look up a string and fill in its blanks.
//
//  The whole of the translation machinery, minus the part that knows which
//  language the reader is in. That separation is the point: the app knows,
//  because it is a browser with a person in front of it; the thing that
//  sends push notifications does not, because it is a server working
//  through a list of accounts, each with their own answer stored in their
//  own settings row.
//
//  So this takes the dictionary as an argument. sqT() below passes whichever
//  one the reader has chosen; the sender passes whichever one that account
//  saved. One implementation, so the sentence in a notification and the
//  same sentence in the app cannot drift apart in their punctuation, their
//  placeholders, or their handling of a missing entry.
// ─────────────────────────────────────────────────────────────────────────

/**
 * @param {object|null} dict  english string → translation, or null for English
 * @param {string} key        the English string, which is also its own key
 * @param {object} [params]   {placeholder} values
 */
export function translate(dict, key, params) {
  // A missing entry falls through to the key, which IS readable English.
  // That is the whole reason the keys are sentences.
  let text = (dict && dict[key]) || key;
  if (params) {
    for (const name in params) text = text.split("{" + name + "}").join(String(params[name]));
  }
  return text;
}

/** The dictionary for a language code, or null when none is needed. */
export function dictFor(lang, dictionaries) {
  return dictionaries?.[lang] ?? null;
}
