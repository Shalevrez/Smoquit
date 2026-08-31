// ─────────────────────────────────────────────────────────────────────────
//  Smoquit — version badge
//
//  Shows the build number in the bottom-left corner of every screen, so you
//  can tell at a glance WHICH upload you are actually looking at. Netlify
//  deploys and browser caches both lie occasionally; a number on the screen
//  does not.
//
//  ┌─────────────────────────────────────────────────────────────────────┐
//  │  BUMP THESE TWO LINES BEFORE EVERY UPLOAD.                          │
//  │                                                                     │
//  │  VERSION — third number for a fix, second for a new feature,        │
//  │            first for a rewrite.                                     │
//  │  BUILT   — the date you are uploading it (YYYY-MM-DD).              │
//  └─────────────────────────────────────────────────────────────────────┘
//
//  Plain JavaScript loaded at runtime, so bumping the number needs no
//  rebuild — edit, upload, done.
// ─────────────────────────────────────────────────────────────────────────
(function () {
  var VERSION = "1.2.0";
  var BUILT   = "2026-08-31";

  // Readable from the console too: just type SMOQUIT_VERSION.
  window.SMOQUIT_VERSION = { version: VERSION, built: BUILT };

  function render() {
    if (document.getElementById("smoquit-version")) return;

    var tag = document.createElement("div");
    tag.id = "smoquit-version";
    tag.textContent = "v" + VERSION + " · " + BUILT;
    tag.style.cssText = [
      "position:fixed",
      "left:10px",
      // Sits inside the 40px of bottom padding the app already leaves, and
      // clears the home indicator on iPhones.
      "bottom:calc(8px + env(safe-area-inset-bottom, 0px))",
      // Under the app's bottom-sheet overlay (z-index 50), above everything
      // else — a version tag should never cover a dialog.
      "z-index:40",
      "font:11px/1 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace",
      "letter-spacing:.3px",
      "color:#8A8577",           // the app's "ash"
      "opacity:.65",
      // Never intercepts a tap meant for the app underneath.
      "pointer-events:none",
      "user-select:none",
      "-webkit-user-select:none"
    ].join(";");

    document.body.appendChild(tag);
  }

  if (document.body) {
    render();
  } else {
    document.addEventListener("DOMContentLoaded", render);
  }
})();
