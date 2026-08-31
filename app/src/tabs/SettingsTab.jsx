// ─────────────────────────────────────────────────────────────────────────
//  Language, where you are, what you smoke, and what it costs.
// ─────────────────────────────────────────────────────────────────────────

import { COUNTRIES, countryFor, detectCountry } from "../data/countries.js";
import { PRODUCT_TYPE_LABELS } from "../data/products.js";
import { SQ_LANG, SQ_LANG_OPTIONS, sqSetLang, sqT } from "../i18n/index.js";
import { deleteAllData } from "../lib/storage.js";
import { colors } from "../theme/colors.js";
import {
  disclaimerStyle,
  fieldLabelStyle,
  hintStyle,
  inputStyle,
  reasonCardStyle,
} from "../theme/styles.js";
export function SettingsTab({ settings, onChange }) {
  if (!settings) return null;
  const country = countryFor(settings.country),
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
          ". Currency and the product list follow from it. Everything here stays on your device.",
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
