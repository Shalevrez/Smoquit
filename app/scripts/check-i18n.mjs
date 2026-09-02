// ─────────────────────────────────────────────────────────────────────────
//  Every string on screen has a Hebrew translation — checked, not hoped.
//
//  The dictionary in src/i18n/he.js is keyed by the ENGLISH STRING ITSELF.
//  That is a good trade — a string with no entry falls through to readable
//  English rather than a blank — but it has one sharp edge: editing an
//  English string is also a key change. Change the English and forget to
//  re-key the Hebrew, and you get two failures at once: the old entry goes
//  orphaned and the new text goes untranslated. Neither shows up in review,
//  and the second one only shows up to somebody reading in Hebrew.
//
//  So this checks both directions: nothing missing, and nothing orphaned.
//
//  What it cannot see: sqT() called on a variable — sqT(entry.trigger),
//  sqT(tip.t) and friends. Those read from a handful of known data files,
//  so the files are listed in DYNAMIC below and their strings are collected
//  too. If you add another data-driven sqT() call, add its source here.
// ─────────────────────────────────────────────────────────────────────────
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve, relative } from "node:path";
import { parse } from "@babel/parser";
import _traverse from "@babel/traverse";

const traverse = _traverse.default ?? _traverse;
const SRC = resolve(import.meta.dirname, "..", "src");

// Strings that reach sqT() through a variable, by the file and the property
// path they live at.
const DYNAMIC = [
  ["data/triggers.js", "TRIGGERS", null], // an array of plain strings
  ["data/tabs.js", "TABS", ["label"]],
  ["data/tips.js", "TIPS", ["t", "d"]],
  ["data/habits.js", "HABITS", ["cue", "swap"]],
  // The sentence a tip is recommended with, and the words that go into one.
  // Both reach sqT() through a variable, from domain/coach.js.
  ["domain/coach.js", "REASONS", "values"],
  ["domain/coach.js", "PART_WORDS", null],
  ["data/breathing.js", "BREATH_PHASES", ["label"]],
  ["data/countries.js", "COUNTRIES", ["name"]],
  ["data/countries.js", "FALLBACK_COUNTRY", ["name"]],
  ["data/products.js", "PRODUCT_TYPE_LABELS", "values"],
];

// Written to the database, never shown raw; the app tags a skipped trigger
// with it and translates it on the way out like any other trigger.
const EXTRA = ["Unlogged"];

const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (/\.jsx?$/.test(path)) files.push(path);
  }
})(SRC);

const ast = (path) => parse(readFileSync(path, "utf8"), { sourceType: "module", plugins: ["jsx"] });

// ── What is asked for ───────────────────────────────────────────────────
const used = new Map(); // string -> where it was seen
const seen = (s, where) => used.has(s) || used.set(s, where);
let dynamicCalls = 0;

for (const path of files) {
  const where = relative(SRC, path);
  traverse(ast(path), {
    CallExpression(p) {
      if (p.node.callee.name !== "sqT") return;
      const arg = p.node.arguments[0];
      if (!arg) return;
      // sqT(cond ? "a" : "b") is still static — take both branches.
      const parts = arg.type === "ConditionalExpression" ? [arg.consequent, arg.alternate] : [arg];
      let allStatic = true;
      for (const part of parts) {
        if (part.type === "StringLiteral") seen(part.value, where);
        else allStatic = false;
      }
      if (!allStatic) dynamicCalls += 1;
    },
  });
}

for (const [file, name, props] of DYNAMIC) {
  const path = join(SRC, file);
  let found = false;
  traverse(ast(path), {
    VariableDeclarator(p) {
      if (p.node.id.name !== name) return;
      found = true;
      const init = p.node.init;
      const collect = (node) => {
        if (node.type === "StringLiteral") return seen(node.value, file);
        if (node.type === "ArrayExpression") return node.elements.forEach(collect);
        if (node.type !== "ObjectExpression") return;
        for (const prop of node.properties) {
          if (prop.type !== "ObjectProperty") continue;
          const key = prop.key.name ?? prop.key.value;
          if (props === "values") collect(prop.value);
          else if (props === null || props.includes(key)) collect(prop.value);
          else if (prop.value.type === "ObjectExpression" || prop.value.type === "ArrayExpression")
            collect(prop.value);
        }
      };
      collect(init);
    },
  });
  if (!found) {
    console.error(`check-i18n: ${file} no longer declares ${name} — update DYNAMIC in this script`);
    process.exit(1);
  }
}
for (const s of EXTRA) seen(s, "(written to the database)");

// ── What is offered ─────────────────────────────────────────────────────
const translated = new Set();
traverse(ast(join(SRC, "i18n", "he.js")), {
  VariableDeclarator(p) {
    if (p.node.id.name !== "SQ_HE") return;
    for (const prop of p.node.init.properties) {
      translated.add(prop.key.value ?? prop.key.name);
    }
  },
});

// ── Compare ─────────────────────────────────────────────────────────────
const missing = [...used.keys()].filter((s) => !translated.has(s));
const orphaned = [...translated].filter((s) => !used.has(s));

const show = (list) =>
  list
    .slice(0, 40)
    .map((s) => `    ${JSON.stringify(s.length > 90 ? s.slice(0, 90) + "…" : s)}`)
    .join("\n") + (list.length > 40 ? `\n    …and ${list.length - 40} more` : "");

let bad = false;
if (missing.length) {
  bad = true;
  console.error(
    `\ncheck-i18n: ${missing.length} string(s) shown to people with no Hebrew:\n${show(missing)}`,
  );
  console.error(`\n  Add them to src/i18n/he.js.`);
}
if (orphaned.length) {
  bad = true;
  console.error(
    `\ncheck-i18n: ${orphaned.length} entr(ies) in src/i18n/he.js that nothing asks for:\n${show(orphaned)}`,
  );
  console.error(
    `\n  Usually this means an English string was edited without re-keying its\n` +
      `  Hebrew — look for a matching "missing" entry above. Otherwise delete it.`,
  );
}
if (bad) process.exit(1);

console.log(
  `check-i18n: ${used.size} strings, all translated, no orphans` +
    (dynamicCalls ? ` (${dynamicCalls} dynamic sqT call(s), covered via DYNAMIC)` : ""),
);
