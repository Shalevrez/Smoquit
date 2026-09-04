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
    write: false,
    legalComments: "none",
  });
  return BANNER + result.outputFiles[0].text;
}

/** What is committed at the root right now, or null. */
export const committed = () => (existsSync(OUTPUT) ? readFileSync(OUTPUT, "utf8") : null);

if (import.meta.filename === process.argv[1]) {
  const text = await bundle();
  writeFileSync(OUTPUT, text);
  console.log(`build-edge: wrote supabase-send-alerts.js (${(text.length / 1024).toFixed(1)} KB)`);
}
