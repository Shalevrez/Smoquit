// ─────────────────────────────────────────────────────────────────────────
//  Sign in or create an account.
//
//  The Google and Apple buttons appear only when those providers are
//  actually enabled on the Supabase project — showing a button that answers
//  "provider is not enabled" is worse than showing no button.
//
//  The language switch at the bottom is remembered in this browser only:
//  nobody is signed in yet, so there is no account to remember it in.
// ─────────────────────────────────────────────────────────────────────────

import React from "react";
import { SQ_LANG, SQ_LANG_OPTIONS, sqSetLang, sqT, useSqLang } from "../i18n/index.js";
import {
  fetchEnabledProviders,
  friendlyAuthError,
  signInWithPassword,
  signInWithProvider,
  signUpWithPassword,
} from "../lib/auth.js";
import { colors } from "../theme/colors.js";
import {
  authCardStyle,
  authDividerLabelStyle,
  authDividerStyle,
  authInputStyle,
  authPageStyle,
  authPrivacyStyle,
  authProviderButtonStyle,
  authSubmitStyle,
  authTaglineStyle,
  authToggleStyle,
  authWordmarkStyle,
} from "../theme/styles.js";
export function AuthScreen() {
  useSqLang();
  const [oauthProviders, setOauthProviders] = React.useState(null),
    [mode, setMode] = React.useState("signin"),
    [email, setEmail] = React.useState(""),
    [password, setPassword] = React.useState(""),
    [notice, setNotice] = React.useState(null),
    [busy, setBusy] = React.useState(false),
    submit = async () => {
      setNotice(null);
      setBusy(true);
      try {
        if (mode === "signup") {
          const { error } = await signUpWithPassword(email, password);
          if (error) throw error;
          setNotice({
            ok: true,
            text: sqT("Check your email to confirm your account, then sign in."),
          });
        } else {
          const { error } = await signInWithPassword(email, password);
          if (error) throw error;
        }
      } catch (err) {
        setNotice({
          ok: false,
          text: err.message || sqT("Something went wrong."),
        });
      } finally {
        setBusy(false);
      }
    },
    signInWith = async (provider) => {
      setNotice(null);
      const { error } = await signInWithProvider(provider);
      error &&
        setNotice({
          ok: false,
          text: friendlyAuthError(error.message),
        });
    };
  React.useEffect(() => {
    let alive = true;
    fetchEnabledProviders().then((enabled) => {
      if (alive) setOauthProviders(enabled);
    });
    return () => {
      alive = false;
    };
  }, []);
  const showGoogleBtn = !!(oauthProviders && oauthProviders.google),
    showAppleBtn = !!(oauthProviders && oauthProviders.apple),
    showOauthRow = showGoogleBtn || showAppleBtn;
  return (
    <div style={authPageStyle}>
      <div style={authCardStyle}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 8,
            justifyContent: "center",
            marginBottom: 6,
          }}
        >
          <span style={authWordmarkStyle}>
            {"Smo"}
            <span
              style={{
                color: colors.ember,
              }}
            >
              {"quit"}
            </span>
          </span>
        </div>
        <p style={authTaglineStyle}>
          {sqT("Track what you smoke. Notice the pattern. Loosen its grip.")}
        </p>
        {showOauthRow ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginTop: 22,
            }}
          >
            {showGoogleBtn ? (
              <button style={authProviderButtonStyle} onClick={() => signInWith("google")}>
                {sqT("Continue with Google")}
              </button>
            ) : null}
            {showAppleBtn ? (
              <button
                style={{
                  ...authProviderButtonStyle,
                  background: "#000",
                  color: "#fff",
                  borderColor: "#000",
                }}
                onClick={() => signInWith("apple")}
              >
                {sqT("Continue with Apple")}
              </button>
            ) : null}
          </div>
        ) : null}
        {showOauthRow ? (
          <div style={authDividerStyle}>
            <span style={authDividerLabelStyle}>{sqT("or")}</span>
          </div>
        ) : null}
        <input
          style={authInputStyle}
          type="email"
          placeholder="you@email.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
        />
        <input
          style={authInputStyle}
          type="password"
          placeholder={sqT("Password")}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
        />
        <button style={authSubmitStyle} onClick={submit} disabled={busy || !email || !password}>
          {busy ? "…" : sqT(mode === "signup" ? "Create account" : "Sign in")}
        </button>
        {notice && (
          <div
            style={{
              fontSize: 13,
              marginTop: 12,
              color: notice.ok ? colors.moss : colors.ember,
              lineHeight: 1.5,
            }}
          >
            {notice.text}
          </div>
        )}
        <button
          style={authToggleStyle}
          onClick={() => {
            setMode(mode === "signup" ? "signin" : "signup");
            setNotice(null);
          }}
        >
          {sqT(
            mode === "signup" ? "Already have an account? Sign in" : "New here? Create an account",
          )}
        </button>
        <p style={authPrivacyStyle}>
          {sqT(
            "Your data is stored privately in your own account and is visible only to you. We don't sell it, share it, or analyze it.",
          )}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 10,
            marginTop: 14,
          }}
        >
          {SQ_LANG_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              lang={option.id}
              onClick={() => sqSetLang(option.id)}
              style={{
                background: "none",
                border: "none",
                padding: "2px 6px",
                fontSize: 12.5,
                cursor: "pointer",
                color: SQ_LANG === option.id ? colors.ink : colors.ash,
                fontWeight: SQ_LANG === option.id ? 700 : 500,
                textDecoration: SQ_LANG === option.id ? "none" : "underline",
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
