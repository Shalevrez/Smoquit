// ─────────────────────────────────────────────────────────────────────────
//  The signed-in app: state, chrome, and which tab is showing.
//
//  All of the person's data is loaded once here and passed down, so no
//  screen fetches anything of its own. Every change writes through to the
//  database immediately — there is no save button anywhere except on the
//  goal and settings forms.
//
//  Navigation is a piece of state, not a route. There is one screen, six
//  views, and nothing worth deep-linking to; the SPA fallback in _redirects
//  exists so that a refresh on any address still loads the app, not because
//  addresses mean anything here.
// ─────────────────────────────────────────────────────────────────────────

import React from "react";

import { Header } from "./components/Header.jsx";
import { countryFor, detectCountry } from "./data/countries.js";
import { TABS } from "./data/tabs.js";
import { SQ_LANG, sqIsLang, sqSetLang, sqT, useSqLang } from "./i18n/index.js";
import { todayKey } from "./lib/dates.js";
import { loadKey, saveKey } from "./lib/storage.js";
import { BackdateSheet } from "./sheets/BackdateSheet.jsx";
import { TriggerSheet } from "./sheets/TriggerSheet.jsx";
import { GoalTab } from "./tabs/GoalTab.jsx";
import { HabitsTab } from "./tabs/HabitsTab.jsx";
import { InsightsTab } from "./tabs/InsightsTab.jsx";
import { SettingsTab } from "./tabs/SettingsTab.jsx";
import { TipsTab } from "./tabs/TipsTab.jsx";
import { TodayTab } from "./tabs/TodayTab.jsx";
import { colors } from "./theme/colors.js";
import { navStyle, pageStyle, shellStyle, tabStyle } from "./theme/styles.js";

export function AppShell({ user }) {
  useSqLang();

  const [tab, setTab] = React.useState("log");
  const [ready, setReady] = React.useState(false);
  const [logs, setLogs] = React.useState({});
  const [goal, setGoal] = React.useState(null);
  const [settings, setSettings] = React.useState(null);
  // Which sheet is up, if any: the trigger picker, then the time picker.
  const [askingTrigger, setAskingTrigger] = React.useState(null);
  const [backdating, setBackdating] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      setLogs(await loadKey("logs", {}));
      setGoal(await loadKey("goal", null));

      let saved = await loadKey("settings", null);
      if (!saved) {
        // First run: guess a country, take its most common pack as the
        // starting price, and write it down so the guess is only made once.
        const country = detectCountry();
        const product = countryFor(country).products[0];
        saved = {
          country,
          product: product.n,
          pricePerPack: product.p,
          lang: SQ_LANG,
        };
        saveKey("settings", saved);
      } else if (!sqIsLang(saved.lang)) {
        // An account saved before the app spoke Hebrew: adopt whatever this
        // browser is showing and write it back, so it is pinned from now on.
        saved = { ...saved, lang: SQ_LANG };
        saveKey("settings", saved);
      }

      sqSetLang(saved.lang);
      setSettings(saved);
      setReady(true);
    })();
  }, []);

  const updateSettings = React.useCallback((changes) => {
    setSettings((prev) => {
      const next = { ...prev, ...changes };
      saveKey("settings", next);
      return next;
    });
  }, []);

  const dayKey = todayKey();
  const todayLogs = logs[dayKey] || [];

  // Every write below rewrites the whole logs blob, because that is what a
  // single jsonb row is. Fine at the scale one person can smoke.
  const addLog = React.useCallback(
    (trigger) => {
      const ts = Date.now();
      setLogs((prev) => {
        const today = prev[dayKey] ? [...prev[dayKey]] : [];
        today.push({ ts, trigger });
        const next = { ...prev, [dayKey]: today };
        saveKey("logs", next);
        return next;
      });
      return ts;
    },
    [dayKey],
  );

  const editLogTime = React.useCallback(
    (fromTs, toTs) => {
      setLogs((prev) => {
        const today = [...(prev[dayKey] || [])];
        const index = today.findIndex((entry) => entry.ts === fromTs);
        if (index === -1) return prev;
        today[index] = { ...today[index], ts: toTs };
        today.sort((a, b) => a.ts - b.ts);
        const next = { ...prev, [dayKey]: today };
        saveKey("logs", next);
        return next;
      });
    },
    [dayKey],
  );

  const removeLog = React.useCallback(
    (index) => {
      setLogs((prev) => {
        const today = [...(prev[dayKey] || [])];
        today.splice(index, 1);
        const next = { ...prev, [dayKey]: today };
        saveKey("logs", next);
        return next;
      });
    },
    [dayKey],
  );

  if (!ready) {
    return (
      <div
        style={{
          ...pageStyle,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ color: colors.ash, fontFamily: "Georgia, serif", fontStyle: "italic" }}>
          {sqT("Clearing the air…")}
        </span>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      {/*
        The only stylesheet rules the app adds at runtime. They are here
        rather than in index.css because the focus ring has to be the
        palette's ember, and the palette is JavaScript.
      */}
      <style>{`
        * { box-sizing: border-box; }
        @keyframes rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes smoke { 0% { opacity:.5; transform: translateY(0) scaleX(1); } 100% { opacity:0; transform: translateY(-22px) scaleX(1.6); } }
        .sq-tab:focus-visible, .sq-btn:focus-visible { outline: 2px solid ${colors.ember}; outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
      `}</style>

      <div style={shellStyle}>
        <Header goal={goal} count={todayLogs.length} user={user} />

        <nav style={navStyle}>
          {TABS.map((t) => (
            <button
              key={t.id}
              className="sq-tab"
              onClick={() => setTab(t.id)}
              style={{
                ...tabStyle,
                color: tab === t.id ? colors.ink : colors.ash,
                borderBottom: tab === t.id ? `2px solid ${colors.ember}` : "2px solid transparent",
                fontWeight: tab === t.id ? 700 : 500,
              }}
            >
              {sqT(t.label)}
            </button>
          ))}
        </nav>

        <main style={{ padding: "22px 20px 40px", animation: "rise .3s ease" }}>
          {tab === "log" && (
            <TodayTab
              todayLogs={todayLogs}
              goal={goal}
              settings={settings}
              onAsk={() => setAskingTrigger(true)}
              onRemove={removeLog}
            />
          )}
          {tab === "insights" && <InsightsTab logs={logs} />}
          {tab === "tips" && <TipsTab />}
          {tab === "habits" && <HabitsTab />}
          {tab === "goal" && (
            <GoalTab goal={goal} setGoal={setGoal} logs={logs} settings={settings} />
          )}
          {tab === "settings" && <SettingsTab settings={settings} onChange={updateSettings} />}
        </main>
      </div>

      {/*
        Logging is two sheets in a row: what set it off, then when it really
        happened. The second opens on the entry the first just created.
      */}
      {askingTrigger && (
        <TriggerSheet
          onPick={(trigger) => {
            const ts = addLog(trigger);
            setAskingTrigger(null);
            setBackdating({ ts, trigger });
          }}
          onClose={() => setAskingTrigger(null)}
        />
      )}
      {backdating && (
        <BackdateSheet
          entry={backdating}
          onSave={(ts) => {
            if (ts !== backdating.ts) editLogTime(backdating.ts, ts);
            setBackdating(null);
          }}
          onClose={() => setBackdating(null)}
        />
      )}
    </div>
  );
}
