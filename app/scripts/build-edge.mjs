// ─────────────────────────────────────────────────────────────────────────
//  One file to paste into the Supabase dashboard.
//
//  This project has no CLI and no deploy pipeline: the database schema is
//  pasted into the SQL editor, the site is a folder of committed files.
//  The sender is the same deal — you paste it into the Edge Functions
//  editor — which means it has to arrive as ONE self-contained file, with
//  the rules from app/src/domain/ already inside it.
//
//  Hence a bundle. The alternative, writing the rules out a second time in
//  a standalone file, is the thing this whole design exists to avoid: two
//  copies of "when is somebody's streak worth mentioning" that agree on the
//  day they are written and never again.
//
//  npm: and https: imports are left alone. Deno resolves those itself at
//  deploy time, and inlining them would turn a 20KB file into a megabyte
//  nobody can paste.
// ─────────────────────────────────────────────────────────────────────────
import { build } from "esbuild";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, join } from "node:path";

import {
  ACTIONS,
  BODIES,
  KIND_LABELS,
  PREF_LABELS,
  TITLES,
} from "../src/domain/alerts.js";
import { COUNTRIES, FALLBACK_COUNTRY } from "../src/data/countries.js";
import { SQ_HE } from "../src/i18n/he.js";

const APP = resolve(import.meta.dirname, "..");
const ROOT = resolve(APP, "..");

export const ENTRY = join(APP, "edge", "send-alerts.js");
export const OUTPUT = join(ROOT, "supabase-send-alerts.js");

const BANNER = `// ─────────────────────────────────────────────────────────────────────────
//  Smoquit — send-alerts.  GENERATED FILE. DO NOT EDIT.
//
//  Built from app/edge/send-alerts.js and the domain rules it imports, by
//  app/scripts/build-edge.mjs. Edit the source and run \`npm run build\`;
//  editing this file directly is undone by the next build, and the build
//  fails if you commit a change to the source without regenerating it.
//
//  TO DEPLOY: Supabase dashboard -> Edge Functions -> send-alerts ->
//  paste the whole of this file -> Deploy. The secrets it expects are
//  listed in UPLOAD-ME-README.txt.
// ─────────────────────────────────────────────────────────────────────────
`;

/**
 * Every string the sender can ever put in front of somebody.
 *
 * Derived from the tables in domain/alerts.js rather than listed, so a new
 * alert string is carried into the bundle by the act of adding it. A hand
 * kept list here would be a second place to forget.
 */
function alertStrings() {
  return new Set(
    [TITLES, BODIES, ACTIONS, KIND_LABELS, PREF_LABELS].flatMap((table) =>
      Object.values(table),
    ),
  );
}

/**
 * Two data files the sender needs a sliver of, trimmed on the way in.
 *
 * NOTHING IN src/ CHANGES. The app keeps the whole Hebrew dictionary and
 * the whole product catalogue; this only decides what the SENDER carries,
 * and it exists because the difference is most of the file:
 *
 *   he.js         283 strings, of which the sender can show 28. It also
 *                 inflates about threefold on the way in, because esbuild
 *                 writes every Hebrew letter as a six-character escape.
 *   countries.js  needed for exactly one field, `currency`, and arriving
 *                 with a price list for every brand in every country.
 *
 * Together they were two thirds of a file that has to be pasted into a
 * dashboard by hand. Trimming them is worth doing on its own terms — a
 * server should not carry 255 translations it cannot reach — and the
 * verify() below is what stops the trimming being silent when it is wrong.
 */
function trimDataForSender() {
  const wanted = alertStrings();
  const dictionary = Object.fromEntries(
    Object.entries(SQ_HE).filter(([english]) => wanted.has(english)),
  );

  // Same exports, same shape, same countryFor() — each country reduced to
  // the three fields that survive a currency lookup. `products` is the bulk
  // and the sender never reads it.
  const slim = (country) => ({
    name: country.name,
    currency: country.currency,
    code: country.code,
  });
  const countries = Object.fromEntries(
    Object.entries(COUNTRIES).map(([code, country]) => [code, slim(country)]),
  );

  return {
    name: "smoquit-trim-for-sender",
    setup(esbuild) {
      esbuild.onLoad({ filter: /src[/\\]i18n[/\\]he\.js$/ }, () => ({
        contents:
          "// Trimmed by scripts/build-edge.mjs: only the strings the sender\n" +
          "// can actually show. The app still ships the whole dictionary.\n" +
          `export const SQ_HE = ${JSON.stringify(dictionary, null, 2)};\n`,
        loader: "js",
      }));

      esbuild.onLoad({ filter: /src[/\\]data[/\\]countries\.js$/ }, () => ({
        contents:
          "// Trimmed by scripts/build-edge.mjs: the sender reads one field,\n" +
          "// `currency`, so the product catalogues do not travel with it.\n" +
          `export const COUNTRIES = ${JSON.stringify(countries, null, 2)};\n` +
          `export const FALLBACK_COUNTRY = ${JSON.stringify(slim(FALLBACK_COUNTRY), null, 2)};\n` +
          "export function countryFor(code) {\n" +
          "  return COUNTRIES[code] || FALLBACK_COUNTRY;\n" +
          "}\n",
        loader: "js",
      }));
    },
  };
}

/**
 * The trimming did not lose anything.
 *
 * This is the whole reason the trimming is allowed to exist. A dropped
 * string does not throw — translate() falls through to the English key, so
 * a Hebrew reader gets an English notification on their phone and nobody
 * ever reports it. Checked against the real bundle text, not against the
 * intention.
 */
function verify(text) {
  const problems = [];
  // esbuild writes non-ASCII as escapes, so a Hebrew sentence never appears
  // in the output as itself. Decode first and compare like with like.
  //
  // BOTH forms, and that is not belt and braces: esbuild uses \xNN for the
  // Latin-1 range and \uXXXX above it, so a decoder that knows only the
  // four-digit form reports the pound sign as missing while every Hebrew
  // string passes. This check caught exactly that in its own first draft.
  const decoded = text
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/\\x([0-9a-fA-F]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));

  for (const english of alertStrings()) {
    const hebrew = SQ_HE[english];
    if (!hebrew) problems.push(`no Hebrew at all for: ${english}`);
    else if (!decoded.includes(hebrew)) {
      problems.push(`Hebrew missing from the bundle for: ${english}`);
    }
  }

  for (const [code, country] of Object.entries(COUNTRIES)) {
    if (!decoded.includes(`"${code}"`)) problems.push(`country dropped: ${code}`);
    else if (!decoded.includes(country.currency)) {
      problems.push(`currency dropped for: ${code}`);
    }
  }

  if (problems.length) {
    console.error("\nbuild-edge: the trim lost something:\n");
    for (const problem of problems.slice(0, 20)) console.error(`  • ${problem}`);
    if (problems.length > 20) console.error(`  …and ${problems.length - 20} more`);
    console.error("");
    process.exit(1);
  }
}

/** The bundle, as text. Returned rather than written, so it can be checked. */
export async function bundle() {
  const result = await build({
    entryPoints: [ENTRY],
    bundle: true,
    format: "esm",
    platform: "neutral",
    target: "es2022",
    // Deno brings its own. Inlining them would be both wrong and enormous.
    external: ["npm:*", "https:*", "jsr:*", "node:*"],
    plugins: [trimDataForSender()],
    write: false,
    legalComments: "none",
  });

  const text = BANNER + result.outputFiles[0].text;
  verify(text);
  return text;
}

/** What is committed at the root right now, or null. */
export const committed = () => (existsSync(OUTPUT) ? readFileSync(OUTPUT, "utf8") : null);

if (import.meta.filename === process.argv[1]) {
  const text = await bundle();
  writeFileSync(OUTPUT, text);
  console.log(`build-edge: wrote supabase-send-alerts.js (${(text.length / 1024).toFixed(1)} KB)`);
}
