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
//
//  The banner speaks whichever language the app is in: the bundle publishes
//  it as window.SMOQUIT_LANG, and it is read at the moment a failure
//  happens, so switching language mid-session is picked up too.
// ─────────────────────────────────────────────────────────────────────────
(function () {
  var BANNER_ID = "smoquit-storage-banner";
  var dismissed = false;

  function lang() {
    return window.SMOQUIT_LANG === "he" ? "he" : "en";
  }

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

  // The table is there, but this account is not allowed to touch it —
  // a missing GRANT, or an insert blocked by row-level security.
  function isPermissionDenied(err) {
    if (!err) return false;
    var code = String(err.code || "");
    var text = String(err.message || "");
    return (
      code === "42501" ||             // Postgres: insufficient_privilege
      /row-level security|permission denied/i.test(text)
    );
  }

  // The request never got as far as the table: the login token is missing,
  // expired or rejected. Re-running SQL would not help here — signing in
  // again would, so this must not be lumped in with the case above.
  function isAuthProblem(err) {
    if (!err) return false;
    var code = String(err.code || "");
    var text = String(err.message || "");
    return (
      code === "PGRST301" ||          // PostgREST: JWT rejected
      code === "401" || err.status === 401 ||
      /jwt|token|not authenticated|invalid claim/i.test(text)
    );
  }

  // The exact words the database used. The friendly sentence above is a
  // guess at the cause; THIS is the evidence, and without it a wrong guess
  // sends you fixing the wrong thing.
  function rawDetail(err) {
    if (!err) return "";
    var bits = [];
    if (err.code) bits.push(String(err.code));
    if (err.message) bits.push(String(err.message));
    if (err.details) bits.push(String(err.details));
    if (err.hint) bits.push("hint: " + String(err.hint));
    if (!bits.length) {
      try { bits.push(JSON.stringify(err)); } catch (e) { bits.push(String(err)); }
    }
    return bits.join(" · ");
  }

  var MESSAGES = {
    en: {
      load: "load your saved data",
      save: "save your data",
      tableMissing:
        "Smoquit could not {verb}: the database table is missing. " +
        "Open your Supabase project → SQL Editor, paste supabase-schema.sql and run it, then reload this page.",
      auth:
        "Smoquit could not {verb}: your sign-in was not accepted. " +
        "Sign out and sign back in. If that does not help, check that Supabase's Site URL matches the address you are on.",
      denied:
        "Smoquit could not {verb}: the database refused the request. " +
        "Re-run the CURRENT supabase-schema.sql from the repo — it grants this app access to the table — then reload this page.",
      unknown:
        "Smoquit could not {verb}. Nothing you enter is being stored right now. " +
        "Check your connection and reload; if it keeps happening, re-run supabase-schema.sql in Supabase.",
      dismiss: "Dismiss"
    },
    he: {
      load: "לטעון את הנתונים השמורים שלכם",
      save: "לשמור את הנתונים שלכם",
      tableMissing:
        "‏Smoquit לא הצליח {verb}: טבלת מסד הנתונים חסרה. " +
        "פתחו את הפרויקט ב־Supabase ← SQL Editor, הדביקו את supabase-schema.sql והריצו אותו, ואז רעננו את הדף.",
      auth:
        "‏Smoquit לא הצליח {verb}: ההתחברות שלכם לא התקבלה. " +
        "התנתקו והתחברו מחדש. אם זה לא עוזר, בדקו שכתובת ה־Site URL ב־Supabase תואמת לכתובת שאתם נמצאים בה.",
      denied:
        "‏Smoquit לא הצליח {verb}: מסד הנתונים דחה את הבקשה. " +
        "הריצו מחדש את הגרסה העדכנית של supabase-schema.sql מהמאגר — היא מעניקה לאפליקציה גישה לטבלה — ואז רעננו את הדף.",
      unknown:
        "‏Smoquit לא הצליח {verb}. שום דבר שתזינו לא נשמר כרגע. " +
        "בדקו את החיבור ורעננו; אם זה חוזר, הריצו מחדש את supabase-schema.sql ב־Supabase.",
      dismiss: "סגירה"
    }
  };

  function messageFor(kind, err) {
    var words = MESSAGES[lang()];
    var verb = kind === "load" ? words.load : words.save;
    var key = isTableMissing(err)
      ? "tableMissing"
      : isAuthProblem(err)
        ? "auth"
        : isPermissionDenied(err)
          ? "denied"
          : "unknown";
    return words[key].replace("{verb}", verb);
  }

  function render(text, detail) {
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
    bar.lang = lang();
    bar.dir = lang() === "he" ? "rtl" : "ltr";
    bar.style.cssText = [
      "position:fixed", "top:0", "left:0", "right:0", "z-index:2147483647",
      "background:#E4572E", "color:#fff",
      "font:14px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif",
      lang() === "he" ? "padding:12px 16px 12px 44px" : "padding:12px 44px 12px 16px",
      "box-shadow:0 1px 6px rgba(0,0,0,.2)"
    ].join(";");
    var line = document.createElement("div");
    line.textContent = text;
    bar.appendChild(line);

    // The database's own words, verbatim and selectable, so the exact code
    // can be copied into a bug report instead of described from memory.
    if (detail) {
      var raw = document.createElement("div");
      raw.textContent = detail;
      // Postgres codes and English error text — always left-to-right, even
      // when the sentence above it is Hebrew.
      raw.dir = "ltr";
      raw.style.cssText = [
        "margin-top:5px",
        "font:11px/1.4 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace",
        "opacity:.85",
        "word-break:break-word",
        "user-select:text",
        "-webkit-user-select:text"
      ].join(";");
      bar.appendChild(raw);
    }

    var close = document.createElement("button");
    close.type = "button";
    close.setAttribute("aria-label", MESSAGES[lang()].dismiss);
    close.textContent = "×";
    close.style.cssText = [
      "position:absolute", "top:6px", lang() === "he" ? "left:10px" : "right:10px",
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
      var detail = rawDetail(err);
      if (document.body) {
        render(text, detail);
      } else {
        document.addEventListener("DOMContentLoaded", function () {
          render(text, detail);
        });
      }
    } catch (e) {
      // A broken error banner must never take the app down with it.
    }
  };
})();
