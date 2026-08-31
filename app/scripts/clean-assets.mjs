// ─────────────────────────────────────────────────────────────────────────
//  Remove the previous bundle before building the next one.
//
//  The build writes into the repository root, where the deployed runtime
//  files also live, so Vite's emptyOutDir has to stay off — it would delete
//  config.js, version.js, storage-health.js, _headers and _redirects along
//  with everything else. Nothing then clears the old bundle, and because
//  its filename contains a hash of its own contents, every build would
//  leave one more behind, forever, all of them committed.
//
//  So: delete the bundle, and NOTHING else. This refuses to run if assets/
//  contains anything it does not recognise, rather than guessing.
// ─────────────────────────────────────────────────────────────────────────
import { readdirSync, rmSync, existsSync, statSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, resolve } from "node:path";
import { PROTECTED, FINGERPRINT_FILE } from "./protected.mjs";

const root = resolve(import.meta.dirname, "..", "..");
const assets = join(root, "assets");

// Fingerprint the hand-edited runtime files before touching anything, so
// check-output.mjs can prove afterwards that the build left them alone.
// Comparing against git would be wrong: these are edited by hand between
// builds, and an uncommitted edit is not a build clobbering something.
const before = {};
for (const name of PROTECTED) {
  before[name] = existsSync(join(root, name))
    ? createHash("sha256")
        .update(readFileSync(join(root, name)))
        .digest("hex")
    : null;
}
writeFileSync(FINGERPRINT_FILE, JSON.stringify(before));

if (!existsSync(assets)) {
  console.log("clean-assets: no assets/ yet, nothing to do");
  process.exit(0);
}
if (!statSync(assets).isDirectory()) {
  console.error(`clean-assets: ${assets} is not a directory — refusing to touch it`);
  process.exit(1);
}

const BUILD_OUTPUT = /^index-[A-Za-z0-9_-]+\.(js|css)$/;

const entries = readdirSync(assets);
const strangers = entries.filter((name) => !BUILD_OUTPUT.test(name));
if (strangers.length) {
  console.error(
    `clean-assets: assets/ holds files this script does not recognise as build output:\n` +
      strangers.map((n) => `  ${n}`).join("\n") +
      `\nRefusing to delete anything. Move them elsewhere, or widen the pattern` +
      ` in ${import.meta.filename} if they really are build output.`,
  );
  process.exit(1);
}

for (const name of entries) rmSync(join(assets, name));
console.log(`clean-assets: removed ${entries.length} file(s) from assets/`);
