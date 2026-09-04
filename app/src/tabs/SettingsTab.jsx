// ─────────────────────────────────────────────────────────────────────────
//  Language, where you are, what you smoke, and what it costs.
// ─────────────────────────────────────────────────────────────────────────

import React from "react";

import { alertPrefs, PREF_LABELS } from "../domain/alerts.js";
import { formatHour } from "../i18n/format.js";
import { COUNTRIES, countryFor, detectCountry } from "../data/countries.js";
import { PRODUCT_TYPE_LABELS } from "../data/products.js";
import { SQ_LANG, SQ_LANG_OPTIONS, sqSetLang, sqT } from "../i18n/index.js";
import {
  disablePush,
  enablePush,
  isSubscribed,
  reasonUnavailable,
  UNAVAILABLE,
} from "../lib/push.js";
import { InstallScreen } from "../screens/InstallScreen.jsx";
import { deleteAllData } from "../lib/storage.js";
import { colors } from "../theme/colors.js";
import {
  disclaimerStyle,
  eyebrowStyle,
  fieldLabelStyle,
  hintStyle,
  inputStyle,
  linkNoteStyle,
  reasonCardStyle,
} from "../theme/styles.js";
const NUDGES = Object.entries(PREF_LABELS);

const HOURS = Array.from({ length: 24 }, (_, hour) => hour);

export function SettingsTab({ settings, onChange }) {
  // Whether this device is subscribed is the browser's answer, not ours, so
  // it is asked rather than stored — a person can revoke the permission in
  // their browser settings and never tell us.
  const [pushOn, setPushOn] = React.useState(false);
  const [pushBusy, setPushBusy] = React.useState(false);
  const [pushProblem, setPushProblem] = React.useState(null);
  const [showInstall, setShowInstall] = React.useState(false);

  React.useEffect(() => {
    let alive = true;
    isSubscribed().then((on) => alive && setPushOn(on));
    return () => {
      alive = false;
    };
  }, []);

  const togglePush = async (wanted) => {
    setPushBusy(true);
    setPushProblem(null);
    try {
      if (!wanted) {
        await disablePush();
        setPushOn(false);
        return;
      }
      const result = await enablePush();
      if (result.ok) {
        setPushOn(true);
        return;
      }
      // On iPhone the only useful answer is the instructions, so go
      // straight there rather than showing a sentence about a switch that
      // cannot work yet.
      if (result.reason === "ios-install") setShowInstall(true);
      else setPushProblem(result.reason);
    } finally {
      setPushBusy(false);
    }
  };

  // Hooks first, always — this screen is rendered before the account's
  // settings have arrived from the network.
  if (!settings) return null;
  if (showInstall) return <InstallScreen onBack={() => setShowInstall(false)} />;

  // Defaults are filled in on the way out rather than written on the way in,
  // so an account made before this feature existed needs no migration.
  const blockedBecause = reasonUnavailable(),
    prefs = alertPrefs(settings),
    setPref = (changes) => onChange({ alerts: { ...prefs, ...changes } }),
    country = countryFor(settings.country),
    detectedCountry = detectCountry(),
    // Changing country resets the product and its price to that country's
    // most common pack; keeping the old brand's price would be nonsense in a
    // new currency.
    pickCountry = (code) => {
      const product = countryFor(code).products[0];
      onChange({
        country: code,
        product: product.n,
        pricePerPack: product.p,
      });
    },
    pickProduct = (name) => {
      const product = country.products.find((candidate) => candidate.n === name);
      onChange({
        product: name,
        pricePerPack: product ? product.p : settings.pricePerPack,
      });
    };
  return (
    <div>
      <label style={fieldLabelStyle}>
        {sqT("Language")}
        <select
          value={SQ_LANG}
          onChange={(event) => {
            const lang = event.target.value;
            // Two places, on purpose: sqSetLang repaints the app now (and
            // remembers the choice on this device), onChange writes it into
            // the account so every later sign-in comes back in it.
            sqSetLang(lang);
            onChange({ lang });
          }}
          style={{
            ...inputStyle,
            appearance: "auto",
          }}
        >
          {SQ_LANG_OPTIONS.map((option) => (
            <option key={option.id} value={option.id} lang={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <div style={hintStyle}>
        {sqT("Saved to your account, so it follows you to every device you sign in on.")}
      </div>
      <p
        style={{
          fontSize: 14,
          color: colors.smoke,
          lineHeight: 1.6,
          marginTop: 26,
        }}
      >
        {sqT("We set your country automatically when you first opened Smoquit")}
        {settings.country === detectedCountry ? "" : sqT(" (you've since changed it)")}
        {sqT(
          ". Currency and the product list follow from it. All of it is saved privately in your account.",
        )}
      </p>
      <label style={fieldLabelStyle}>
        {sqT("Country")}
        <select
          value={settings.country}
          onChange={(o) => pickCountry(o.target.value)}
          style={{
            ...inputStyle,
            appearance: "auto",
          }}
        >
          {Object.entries(COUNTRIES).map(([o, a]) => (
            <option key={o} value={o}>{`${sqT(a.name)} (‎${a.currency} ${a.code})`}</option>
          ))}
          {!COUNTRIES[settings.country] && (
            <option value={settings.country}>{sqT("Other ($ USD)")}</option>
          )}
        </select>
      </label>
      <div
        style={{
          ...hintStyle,
        }}
      >
        {sqT("Prices show in {currency} {code}.", {
          currency: country.currency,
          code: country.code,
        })}
      </div>
      <label
        style={{
          ...fieldLabelStyle,
          marginTop: 18,
        }}
      >
        {sqT("What do you smoke?")}
        <select
          value={settings.product}
          onChange={(event) => pickProduct(event.target.value)}
          style={{
            ...inputStyle,
            appearance: "auto",
          }}
        >
          {country.products.map((product) => (
            <option
              key={product.n}
              value={product.n}
            >{`${product.n} — ${country.currency}${product.p} · ${sqT(PRODUCT_TYPE_LABELS[product.type] || product.type)}`}</option>
          ))}
        </select>
      </label>
      <label
        style={{
          ...fieldLabelStyle,
          marginTop: 18,
        }}
      >
        {sqT("Price per pack ({currency})", {
          currency: country.currency,
        })}
        <input
          type="number"
          min="0"
          step="0.5"
          value={settings.pricePerPack}
          onChange={(o) =>
            onChange({
              pricePerPack: o.target.value === "" ? 0 : Number(o.target.value),
            })
          }
          style={inputStyle}
        />
      </label>
      <div style={hintStyle}>
        {sqT(
          "Prefilled from your brand. Adjust it to match what you actually pay — the savings numbers on Today and Goal use this (÷20 per cigarette).",
        )}
      </div>
      <div
        style={{
          ...reasonCardStyle,
          background: colors.breath,
          marginTop: 22,
        }}
      >
        <div
          style={{
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: 1,
            color: colors.ash,
            marginBottom: 8,
          }}
        >
          {sqT("Your setup")}
        </div>
        <div
          style={{
            fontSize: 14,
            color: colors.smoke,
            lineHeight: 1.7,
          }}
        >
          {`${sqT(country.name)} · ${settings.product}`}
          <br />
          {sqT("{currency}{price} per pack · ≈ {currency}{each} per cigarette", {
            currency: country.currency,
            price: Number(settings.pricePerPack).toFixed(2),
            each: (Number(settings.pricePerPack) / 20).toFixed(2),
          })}
        </div>
      </div>
      <div style={disclaimerStyle}>
        {sqT(
          "Product prices are rough 2026 estimates to get you started, not live retail prices — always trust the value you enter yourself.",
        )}
      </div>
      <div
        style={{
          marginTop: 26,
          borderTop: `1px solid ${colors.line}`,
          paddingTop: 18,
        }}
      >
        <div style={eyebrowStyle}>{sqT("Nudges")}</div>
        {/*
          Said plainly, because it is the whole limit of what this does. A
          settings screen that implies a phone notification when nothing is
          sent anywhere is worse than no settings screen — the first time
          somebody's phone stays quiet at eight, every other switch here
          stops being believed.
        */}
        <p style={{ ...hintStyle, marginTop: 0, marginBottom: 12 }}>
          {sqT(
            "These appear at the top of the app. Turn on notifications below and the timed ones reach your phone too, even when Smoquit is closed.",
          )}
        </p>

        {/*
          The switch that asks the browser for permission. It is first
          because it answers a different question from the four below it:
          this one is WHERE they arrive, those are WHICH ones you want.
        */}
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 14,
            color: colors.smoke,
            padding: "9px 12px",
            marginBottom: 10,
            borderRadius: 10,
            background: colors.breath,
            border: `1px solid ${colors.line}`,
            cursor: pushBusy ? "progress" : "pointer",
            opacity: pushBusy ? 0.6 : 1,
          }}
        >
          <input
            type="checkbox"
            checked={pushOn}
            disabled={pushBusy}
            onChange={(event) => togglePush(event.target.checked)}
            style={{ width: 17, height: 17, accentColor: colors.ember, flexShrink: 0 }}
          />
          <span style={{ fontWeight: 600 }}>{sqT("Send them to my phone")}</span>
        </label>

        {/*
          Why it cannot be turned on, when it cannot — each with its own
          answer, because "notifications unavailable" leaves somebody with
          nothing to do about it.
        */}
        {!pushOn && blockedBecause === "ios-install" && (
          <button
            className="sq-btn"
            onClick={() => setShowInstall(true)}
            style={{ ...hintStyle, ...linkNoteStyle }}
          >
            {sqT(UNAVAILABLE["ios-install"])}
          </button>
        )}
        {!pushOn && blockedBecause && blockedBecause !== "ios-install" && (
          <div style={hintStyle}>{sqT(UNAVAILABLE[blockedBecause])}</div>
        )}
        {pushProblem && <div style={hintStyle}>{sqT(UNAVAILABLE[pushProblem])}</div>}

        {NUDGES.map(([id, label]) => (
          <label
            key={id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 14,
              color: colors.smoke,
              padding: "7px 0",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={prefs[id]}
              onChange={(event) => setPref({ [id]: event.target.checked })}
              style={{ width: 17, height: 17, accentColor: colors.ember, flexShrink: 0 }}
            />
            {sqT(label)}
          </label>
        ))}

        <label
          style={{
            ...fieldLabelStyle,
            marginTop: 14,
            opacity: prefs.reminder ? 1 : 0.5,
          }}
        >
          {sqT("Remind me at")}
          <select
            value={prefs.reminderHour}
            disabled={!prefs.reminder}
            onChange={(event) => setPref({ reminderHour: Number(event.target.value) })}
            style={{
              ...inputStyle,
              appearance: "auto",
            }}
          >
            {/*
              Through formatHour, so the picker and every sentence in the app
              call the same hour by the same name — a twelve-hour clock in
              English, a twenty-four hour one in Hebrew.
            */}
            {HOURS.map((hour) => (
              <option key={hour} value={hour}>
                {formatHour(hour)}
              </option>
            ))}
          </select>
        </label>
        <div style={hintStyle}>
          {sqT(
            "Only on a day you have not answered for yet. Marking a day smoke-free counts as answering.",
          )}
        </div>
      </div>

      <div
        style={{
          marginTop: 26,
          borderTop: `1px solid ${colors.line}`,
          paddingTop: 18,
        }}
      >
        <div
          style={{
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: 1,
            color: colors.ash,
            marginBottom: 8,
          }}
        >
          {sqT("Your account & privacy")}
        </div>
        <p
          style={{
            fontSize: 13,
            color: colors.smoke,
            lineHeight: 1.6,
            marginTop: 0,
          }}
        >
          {sqT(
            "Everything you log is stored privately in your own account and is visible only to you. We don't sell, share, or analyze it.",
          )}
        </p>
        <button
          onClick={async () => {
            window.confirm(
              sqT("Permanently delete all your Smoquit data? This can't be undone."),
            ) && (await deleteAllData(), window.location.reload());
          }}
          style={{
            background: "none",
            border: `1px solid ${colors.ember}`,
            color: colors.ember,
            borderRadius: 10,
            padding: "11px 14px",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            width: "100%",
            marginTop: 6,
          }}
        >
          {sqT("Delete all my data")}
        </button>
      </div>
    </div>
  );
}
