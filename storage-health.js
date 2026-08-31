// ─────────────────────────────────────────────────────────────────────────
//  Smoquit — storage health banner
//
//  The app saves your logs, goal and settings to Supabase. Every one of
//  those calls used to fail *silently*: a console.error nobody reads, and a
//  screen that carried on looking perfectly normal. You only found out that
//  nothing had been stored when you came back the next day to an empty app.
//
//  This file makes that failure visible. The app calls
//  window.SMOQUIT_STORAGE_ERROR(kind, key, error) whenever a read or write
//  to the database fails, and we put a banner on the screen saying so — with
//  the fix, when we can tell which one it is.
//
//  Plain JavaScript loaded at runtime, like config.js, so it can be edited
//  without rebuilding the app.
// ─────────────────────────────────────────────────────────────────────────
(function () {
  var BANNER_ID = "smoquit-storage-banner";
  var dismissed = false;

  // Supabase / PostgREST report a missing table in a few different shapes
  // depending on which layer noticed it. Any of these means the same thing:
  // supabase-schema.sql was never run, or it rolled back.
  function isTableMissing(err) {
    if (!err) return false;
    var code = String(err.code || "");
    var text = String(err.message || "") + " " + String(err.details || "") + " " + String(err.hint || "");
    return (
      code === "PGRST205" ||          // PostgREST: table not in the schema cache
      code === "42P01" ||             // Postgres: undefined_table
      /Could not find the table/i.test(text) ||
      /relation .* does not exist/i.test(text)
    );
  }

  // RLS is on but the policies are missing, so the database refuses the row.
  function isPermissionDenied(err) {
    if (!err) return false;
    var code = String(err.code || "");
    var text = String(err.message || "");
    return (
      code === "42501" ||             // Postgres: insufficient_privilege
      code === "PGRST301" ||          // PostgREST: JWT / row-security failure
      /row-level security|permission denied/i.test(text)
    );
  }

  function messageFor(kind, err) {
    var verb = kind === "load" ? "load your saved data" : "save your data";

    if (isTableMissing(err)) {
      return (
        "Smoquit could not " + verb + ": the database table is missing. " +
        "Open your Supabase project → SQL Editor, paste supabase-schema.sql and run it, then reload this page."
      );
    }
    if (isPermissionDenied(err)) {
      return (
        "Smoquit could not " + verb + ": the database refused the request. " +
        "Re-run supabase-schema.sql in your Supabase project — it sets the per-user security rules — then reload this page."
      );
    }
    return (
      "Smoquit could not " + verb + ". Nothing you enter is being stored right now. " +
      "Check your connection and reload; if it keeps happening, re-run supabase-schema.sql in Supabase."
    );
  }

  function render(text) {
    if (dismissed || typeof document === "undefined" || !document.body) return;

    var existing = document.getElementById(BANNER_ID);
    if (existing) {
      // Keep the first, most specific message rather than flapping between
      // one failing key and the next — they all have the same cause.
      return;
    }

    var bar = document.createElement("div");
    bar.id = BANNER_ID;
    bar.setAttribute("role", "alert");
    bar.style.cssText = [
      "position:fixed", "top:0", "left:0", "right:0", "z-index:2147483647",
      "background:#E4572E", "color:#fff",
      "font:14px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif",
      "padding:12px 44px 12px 16px", "box-shadow:0 1px 6px rgba(0,0,0,.2)"
    ].join(";");
    bar.textContent = text;

    var close = document.createElement("button");
    close.type = "button";
    close.setAttribute("aria-label", "Dismiss");
    close.textContent = "×";
    close.style.cssText = [
      "position:absolute", "top:6px", "right:10px",
      "background:none", "border:none", "color:#fff",
      "font-size:22px", "line-height:1", "cursor:pointer", "padding:4px"
    ].join(";");
    close.onclick = function () {
      dismissed = true;
      if (bar.parentNode) bar.parentNode.removeChild(bar);
    };
    bar.appendChild(close);

    document.body.appendChild(bar);
  }

  window.SMOQUIT_STORAGE_ERROR = function (kind, key, err) {
    try {
      var text = messageFor(kind, err);
      if (document.body) {
        render(text);
      } else {
        document.addEventListener("DOMContentLoaded", function () {
          render(text);
        });
      }
    } catch (e) {
      // A broken error banner must never take the app down with it.
    }
  };
})();
