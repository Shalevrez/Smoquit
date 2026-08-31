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
import { countOn, entriesOn, markDeleted } from "./domain/entries.js";
import { todayKey } from "./lib/dates.js";
import { migrate } from "./lib/migrate.js";
import * as store from "./lib/store.js";
import { addCraving, heldOn } from "./domain/cravings.js";
import { BackdateSheet } from "./sheets/BackdateSheet.jsx";
import { CravingSheet } from "./sheets/CravingSheet.jsx";
import { TriggerSheet } from "./sheets/TriggerSheet.jsx";
import { GoalTab } from "./tabs/GoalTab.jsx";
import { HabitsTab } from "./tabs/HabitsTab.jsx";
import { InsightsTab } from "./tabs/InsightsTab.jsx";
import { SettingsTab } from "./tabs/SettingsTab.jsx";
import { TipsTab } from "./tabs/TipsTab.jsx";
import { TodayTab } from "./tabs/TodayTab.jsx";
import { colors } from "./theme/colors.js";
import { navStyle, pageStyle, shellStyle, tabStyle } from "./theme/styles.js";

/** Today's key, recomputed whenever the day actually turns over. */
function useTodayKey() {
  const [key, setKey] = React.useState(todayKey);

  React.useEffect(() => {
    const check = () => setKey((prev) => (todayKey() === prev ? prev : todayKey()));
    // A minute is fine: nothing here needs to notice midnight to the second,
    // and checking on wake matters more than checking often, because a
    // backgrounded tab does not get its timers.
    const timer = setInterval(check, 60000);
    document.addEventListener("visibilitychange", check);
    window.addEventListener("focus", check);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", check);
      window.removeEventListener("focus", check);
    };
  }, []);

  return key;
}

export function AppShell({ user }) {
  useSqLang();

  const [tab, setTab] = React.useState("log");
  const [ready, setReady] = React.useState(false);
  const [logs, setLogs] = React.useState({});
  const [goal, setGoal] = React.useState(null);
  const [settings, setSettings] = React.useState(null);
  const [meta, setMeta] = React.useState(null);
  const [cravings, setCravings] = React.useState({});
  const [ridingOut, setRidingOut] = React.useState(false);
  // Which sheet is up, if any: the trigger picker, then the time picker.
  const [askingTrigger, setAskingTrigger] = React.useState(null);
  const [backdating, setBackdating] = React.useState(null);

  React.useEffect(() => {
    const stopWatching = store.watchConnection();

    (async () => {
      await store.openStore();

      // Paint from the local copy before asking the network anything. With
      // a cache this is instant and works with no signal; without one it is
      // the same loading screen as before.
      const cachedLogs = store.cached("logs", {});
      const cachedCravings = store.cached("cravings", {});
      const cachedSettings = store.cached("settings", null);
      if (cachedSettings) {
        sqSetLang(cachedSettings.lang);
        setSettings(cachedSettings);
        setLogs(cachedLogs);
        setCravings(cachedCravings);
        setGoal(store.cached("goal", null));
        setMeta(store.cached("meta", null));
        setReady(true);
      }

      const [freshLogs, freshGoal, freshMeta, freshSettings, freshCravings] = await Promise.all([
        store.refresh("logs", {}),
        store.refresh("goal", null),
        store.refresh("meta", null),
        store.refresh("settings", null),
        store.refresh("cravings", {}),
      ]);

      // Entries used to be filed by UTC date; put them under the local day
      // they actually happened on before anything reads them.
      const migrated = await migrate(freshLogs.value ?? {}, freshMeta.value);
      setLogs(migrated.logs);
      setMeta(migrated.meta);
      setGoal(freshGoal.value);
      setCravings(freshCravings.value ?? {});

      let saved = freshSettings.value;
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
        store.write("settings", saved);
      } else if (!sqIsLang(saved.lang)) {
        // An account saved before the app spoke Hebrew: adopt whatever this
        // browser is showing and write it back, so it is pinned from now on.
        saved = { ...saved, lang: SQ_LANG };
        store.write("settings", saved);
      }

      sqSetLang(saved.lang);
      setSettings(saved);
      setReady(true);
    })();

    return stopWatching;
  }, []);

  const updateSettings = React.useCallback((changes) => {
    setSettings((prev) => {
      const next = { ...prev, ...changes };
      store.write("settings", next);
      return next;
    });
  }, []);

  // Recomputed on a tick rather than only on render: a phone left open on
  // this screen overnight would otherwise keep filing tomorrow's cigarettes
  // under yesterday, which is the same bug the local day key just fixed.
  const dayKey = useTodayKey();
  const todayLogs = entriesOn(logs, dayKey);

  // Every write below rewrites the whole logs blob, because that is what a
  // single jsonb row is. Fine at the scale one person can smoke.
  const addLog = React.useCallback(
    (trigger) => {
      const ts = Date.now();
      setLogs((prev) => {
        const today = [...(prev[dayKey] ?? [])];
        today.push({ ts, trigger });
        const next = { ...prev, [dayKey]: today };
        store.write("logs", next);
        return next;
      });
      return ts;
    },
    [dayKey],
  );

  const editLogTime = React.useCallback(
    (fromTs, toTs) => {
      setLogs((prev) => {
        const today = [...(prev[dayKey] ?? [])];
        const index = today.findIndex((entry) => entry.ts === fromTs && !entry.d);
        if (index === -1) return prev;
        today[index] = { ...today[index], ts: toTs };
        today.sort((a, b) => a.ts - b.ts);
        const next = { ...prev, [dayKey]: today };
        store.write("logs", next);
        return next;
      });
    },
    [dayKey],
  );

  // A day with nothing logged looks exactly like a day the app was never
  // opened. This is how someone says which one it was — an empty array is a
  // real, recorded zero.
  const markNoneToday = React.useCallback(() => {
    setLogs((prev) => {
      if (countOn(prev, dayKey) > 0) return prev;
      const next = { ...prev, [dayKey]: [] };
      store.write("logs", next);
      return next;
    });
  }, [dayKey]);

  // Both outcomes are recorded. Counting only the wins would make the
  // number flattering and useless — "seven of eleven this week" is the fact
  // worth having.
  const recordCraving = React.useCallback((outcome, { trigger, heldMs }) => {
    setCravings((prev) => {
      const next = addCraving(prev, { ts: Date.now(), trigger: trigger ?? null, outcome, heldMs });
      store.write("cravings", next);
      return next;
    });
  }, []);

  const removeLog = React.useCallback(
    (index) => {
      setLogs((prev) => {
        const next = { ...prev, [dayKey]: markDeleted(prev[dayKey], index) };
        store.write("logs", next);
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
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
          /* The breathing circle grows and shrinks with a transition, which
             an animation rule does not touch. It still changes size, so the
             pattern is followable; it just stops sliding. */
          .sq-breath { transition: none !important; }
        }
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
              onRideItOut={() => setRidingOut(true)}
              heldToday={heldOn(cravings, dayKey)}
              onNoneToday={markNoneToday}
              markedNoneToday={Array.isArray(logs[dayKey]) && todayLogs.length === 0}
            />
          )}
          {tab === "insights" && <InsightsTab logs={logs} meta={meta} />}
          {tab === "tips" && <TipsTab />}
          {tab === "habits" && <HabitsTab />}
          {tab === "goal" && (
            <GoalTab goal={goal} setGoal={setGoal} logs={logs} settings={settings} />
          )}
          {tab === "settings" && <SettingsTab settings={settings} onChange={updateSettings} />}
        </main>
      </div>

      {/*
        Giving in is not a dead end: "I smoked one anyway" records the
        craving and hands straight over to the normal logging flow with the
        trigger already chosen, so nobody is asked the same question twice
        or loses the entry for having lost the argument.
      */}
      {ridingOut && (
        <CravingSheet
          goal={goal}
          onClose={() => setRidingOut(false)}
          onHeld={(session) => {
            recordCraving("held", session);
            setRidingOut(false);
          }}
          onSmoked={(session) => {
            recordCraving("smoked", session);
            setRidingOut(false);
            if (session.trigger) {
              const ts = addLog(session.trigger);
              setBackdating({ ts, trigger: session.trigger });
            } else {
              setAskingTrigger(true);
            }
          }}
        />
      )}

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
