// ─────────────────────────────────────────────────────────────────────────
//  Smoquit — entry point.
//
//  config.js, storage-health.js and version.js have already run by the time
//  this does: they are plain scripts in the body, and this is a module, so
//  it is deferred until the parser reaches the end of the document. That
//  ordering is why window.SMOQUIT_CONFIG exists when lib/supabase.js reads
//  it, and it is enforced by scripts/check-output.mjs.
// ─────────────────────────────────────────────────────────────────────────
import React from "react";
import ReactDOM from "react-dom/client";
import { Root } from "./App.jsx";
import { registerWorker } from "./lib/push.js";
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);

// The service worker, registered from here rather than from a tag in
// index.html — check-output.mjs counts the plain <script src> tags in the
// output and there are exactly three of them, on purpose.
//
// Registering is not the same as asking for permission, and this asks for
// nothing: no prompt appears, and none ever appears without a tap on the
// switch in settings. All this buys is that a phone which has already said
// yes can receive something, and that the worker is in place before anybody
// goes looking for it.
registerWorker();
