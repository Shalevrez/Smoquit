import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ─────────────────────────────────────────────────────────────────────────
//  Smoquit build
//
//  The site is served straight from the repository root: Cloudflare Pages
//  is pointed at the checkout with NO build command, and index.html +
//  assets/ are committed. So the build has to write its output there, and
//  leave everything else in the root untouched.
//
//  That is why the source lives in app/ rather than at the root: if
//  index.html were both Vite's input and its output, a build would
//  overwrite its own source. With the source in app/ and outDir "..", the
//  template is app/index.html and the result is the root index.html.
//
//  outDir is resolved relative to root, which is this directory, so ".."
//  is the repository root.
//  emptyOutDir must stay false — otherwise Vite would delete config.js,
//  version.js, storage-health.js, _headers and _redirects along with
//  everything else in there. scripts/clean-assets.mjs handles removing the
//  previous bundle instead, and it only ever touches assets/.
// ─────────────────────────────────────────────────────────────────────────

// The three runtime files at the repository root. They are plain scripts,
// edited in place and deployed without a rebuild, which is the whole point
// of them — see the comments in each one.
//
// They are injected here rather than written into app/index.html because
// Vite resolves every /-rooted script src against publicDir at build time.
// publicDir is off (the files already live in the output directory and must
// never be regenerated from a copy), so a literal tag would fail to resolve.
// Tags returned from transformIndexHtml are appended after that pass and
// land verbatim.
//
// ORDER AND PLACEMENT ARE LOAD-BEARING. The bundle is a module script, so
// it is deferred and runs after the parser reaches the end of the document
// — which is after these three have executed. That is the only reason
// window.SMOQUIT_CONFIG exists by the time the app reads it. Moving these
// to the head would break it silently, and only on a slow connection.
const runtimeScripts = () => ({
  name: "smoquit-runtime-scripts",
  transformIndexHtml() {
    return ["/config.js", "/storage-health.js", "/version.js"].map((src) => ({
      tag: "script",
      attrs: { src },
      injectTo: "body",
    }));
  },
});

export default defineConfig({
  // The config file lives in app/, and root is resolved relative to it, so
  // "." is app/ and outDir ".." is the repository root.
  root: ".",
  base: "/",
  publicDir: false,
  plugins: [react(), runtimeScripts()],
  build: {
    outDir: "..",
    emptyOutDir: false,
    assetsDir: "assets",
  },
});
