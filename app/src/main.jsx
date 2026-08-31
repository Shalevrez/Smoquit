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
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
