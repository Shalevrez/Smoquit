// ─────────────────────────────────────────────────────────────────────────
//  Did the build produce a page that still works?
//
//  The deployed site is the repository root, and index.html there is
//  generated. Several things about it are load-bearing but invisible:
//
//    • config.js, storage-health.js and version.js must be there at all.
//      Vite resolves /-rooted script sources against publicDir, which is
//      off here, so they are injected by a plugin — and a Vite upgrade that
//      changes how transformIndexHtml output is handled would drop them
//      silently. The app would then boot with no Supabase keys and show the
//      "Almost there" screen to everybody.
//
//    • They must be classic scripts in the body, BEFORE the module bundle
//      runs. A module script is deferred, so it executes after these three;
//      that ordering is the only reason window.SMOQUIT_CONFIG exists when
//      lib/supabase.js reads it. Move them to the head and it breaks only
//      on a slow connection, which is to say: not on your machine.
//
//    • The language script has to run before the first paint, or a Hebrew
//      reader watches the page start left-to-right and flip.
//
//    • The build must not have touched config.js, version.js,
//      storage-health.js, _headers or _redirects. emptyOutDir is off
//      precisely so it cannot, but "cannot" is worth checking.
//
//  Run on every build. It is the thing that fails instead of production.
// ─────────────────────────────────────────────────────────────────────────
import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { resolve, join } from "node:path";

import { PROTECTED, FINGERPRINT_FILE } from "./protected.mjs";

const ROOT = resolve(import.meta.dirname, "..", "..");
const APP = resolve(import.meta.dirname, "..");
const problems = [];
const check = (ok, msg) => ok || problems.push(msg);

const html = readFileSync(join(ROOT, "index.html"), "utf8");

// ── The runtime scripts, in order, in the body ──────────────────────────
const RUNTIME = ["/config.js", "/storage-health.js", "/version.js"];
const bodyStart = html.indexOf("<body");
const classic = [...html.matchAll(/<script\s+src="([^"]+)"\s*>\s*<\/script>/g)];

check(
  classic.length === RUNTIME.length,
  `expected ${RUNTIME.length} plain <script src> tags, found ${classic.length}: ` +
    JSON.stringify(classic.map((m) => m[1])),
);
check(
  classic.map((m) => m[1]).join() === RUNTIME.join(),
  `runtime scripts are ${JSON.stringify(classic.map((m) => m[1]))}, expected ${JSON.stringify(RUNTIME)} in that order`,
);
for (const m of classic) {
  check(
    m.index > bodyStart,
    `${m[1]} is in the head; it must be in the body, before the module bundle`,
  );
}

// ── Exactly one module bundle, in the head ─────────────────────────────
const modules = [...html.matchAll(/<script type="module"[^>]*src="([^"]+)"/g)];
check(modules.length === 1, `expected exactly 1 module script, found ${modules.length}`);
if (modules.length === 1) {
  check(
    /^\/assets\/index-[A-Za-z0-9_-]+\.js$/.test(modules[0][1]),
    `module script src is ${modules[0][1]}, expected /assets/index-<hash>.js`,
  );
  check(modules[0].index < bodyStart, "the module bundle should be in the head");
  const bundle = join(ROOT, modules[0][1].replace(/^\//, ""));
  check(existsSync(bundle), `${modules[0][1]} is referenced but not on disk`);
}

// ── The pre-paint language script, verbatim ────────────────────────────
// Compared against the source rather than pattern-matched, so that a
// change to it has to be a change to app/index.html.
const between = (s, a, b) => {
  const i = s.indexOf(a);
  const j = i === -1 ? -1 : s.indexOf(b, i);
  return i === -1 || j === -1 ? null : s.slice(i, j + b.length);
};
const marker = 'localStorage.getItem("smoquit.lang")';
const wanted = between(readFileSync(join(APP, "index.html"), "utf8"), "<script>", "</script>");
const got = between(html, "<script>", "</script>");
check(
  wanted !== null && wanted.includes(marker),
  "app/index.html no longer has the pre-paint language script",
);
check(got === wanted, "the pre-paint language script in the output does not match app/index.html");
if (got !== null && wanted !== null) {
  check(
    html.indexOf(got) < (modules[0]?.index ?? Infinity),
    "the language script must run before the bundle",
  );
}

// ── The head the app was written against ───────────────────────────────
for (const needle of [
  '<html lang="en">',
  '<meta charset="UTF-8" />',
  'name="viewport"',
  '<meta name="theme-color" content="#F5F3EE" />',
  "<title>Smoquit",
  'name="description"',
  '<div id="root"></div>',
]) {
  check(html.includes(needle), `index.html no longer contains ${needle}`);
}

// ── The build did not clobber the runtime files ────────────────────────
// emptyOutDir is off precisely so that a build cannot delete the deployed
// files sitting beside its output. "Cannot" is worth checking — against the
// fingerprints clean-assets.mjs took just before the build, not against git:
// these files are edited by hand between builds, and an uncommitted edit of
// version.js is the normal case, not a fault.
let before = null;
try {
  before = JSON.parse(readFileSync(FINGERPRINT_FILE, "utf8"));
} catch {
  console.log("check-output: no pre-build fingerprints, skipping the runtime-file check");
}
if (before) {
  for (const name of PROTECTED) {
    const path = join(ROOT, name);
    const now = existsSync(path)
      ? createHash("sha256").update(readFileSync(path)).digest("hex")
      : null;
    if (before[name] === null && now === null) continue;
    check(now !== null, `the build removed ${name}`);
    check(now === before[name], `the build modified ${name}, which it must never write to`);
  }
}

if (problems.length) {
  console.error("\ncheck-output: the generated index.html is not deployable:\n");
  for (const p of problems) console.error(`  • ${p}`);
  console.error("");
  process.exit(1);
}
console.log(
  "check-output: index.html looks right (runtime scripts, bundle, language script, head)",
);
