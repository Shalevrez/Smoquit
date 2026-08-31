// ─────────────────────────────────────────────────────────────────────────
//  Language.
//
//  Hand-rolled rather than a library, because the whole job is a flat
//  lookup and a {placeholder} substitution.
//
//  Which language you get is decided in this order:
//    1. the language saved in your account (Settings → שפה / Language),
//    2. failing that, the last choice made in this browser,
//    3. failing that, the browser's own language.
//
//  Step 2 is mirrored into localStorage so index.html can read it BEFORE
//  the first paint and start an RTL page out right-to-left, instead of
//  flipping once this module has booted. If sqDetectLang() changes, the
//  inline script in app/index.html has to change with it.
// ─────────────────────────────────────────────────────────────────────────

import React from "react";
import { SQ_HE } from "./he.js";
export const SQ_LANG_STORAGE_KEY = "smoquit.lang";
export const SQ_LANG_OPTIONS = [
  {
    id: "en",
    label: "English",
    dir: "ltr",
  },
  {
    id: "he",
    label: "עברית",
    dir: "rtl",
  },
];
export function sqIsLang(value) {
  return value === "en" || value === "he";
}
export function sqDetectLang() {
  try {
    const t = window.localStorage.getItem(SQ_LANG_STORAGE_KEY);
    if (sqIsLang(t)) return t;
  } catch {}
  try {
    const t = (navigator.languages && navigator.languages[0]) || navigator.language || "";
    if (/^(he|iw)\b/i.test(t)) return "he";
  } catch {}
  return "en";
}
export let SQ_LANG = sqDetectLang();
const sqLangListeners = new Set();
export function sqDir() {
  return SQ_LANG === "he" ? "rtl" : "ltr";
}
export function sqLocale() {
  return SQ_LANG === "he" ? "he-IL" : [];
}
export function sqT(key, params) {
  let text = (SQ_LANG === "he" && SQ_HE[key]) || key;
  if (params) for (const n in params) text = text.split("{" + n + "}").join(String(params[n]));
  return text;
}
export function sqApplyLangToDocument() {
  try {
    window.SMOQUIT_LANG = SQ_LANG;
    const root = document.documentElement;
    root.lang = SQ_LANG;
    root.dir = sqDir();
    document.title = sqT("Smoquit — quit smoking, one logged craving at a time");
  } catch {}
}
export function sqSetLang(lang, options) {
  if (!sqIsLang(lang)) return;
  if (!options || options.remember !== false)
    try {
      window.localStorage.setItem(SQ_LANG_STORAGE_KEY, lang);
    } catch {}
  if (lang === SQ_LANG) {
    sqApplyLangToDocument();
    return;
  }
  SQ_LANG = lang;
  sqApplyLangToDocument();
  sqLangListeners.forEach((r) => r(lang));
}
export function useSqLang() {
  const [, rerender] = React.useState(0);
  return (
    React.useEffect(() => {
      const e = () => rerender((r) => r + 1);
      return (sqLangListeners.add(e), () => sqLangListeners.delete(e));
    }, []),
    SQ_LANG
  );
}

// Set <html lang> and <html dir> from whatever we resolved, before the
// app renders anything.
sqApplyLangToDocument();
