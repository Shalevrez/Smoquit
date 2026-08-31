// ─────────────────────────────────────────────────────────────────────────
//  Where a reset link lands.
//
//  Following the link has already signed this person in — Supabase hands out
//  a short-lived session so that updateUser() has something to authenticate
//  with. Dropping them straight into the app would leave the forgotten
//  password in place, so this screen stands in front of it until a new one
//  is set.
//
//  "Back to sign in" signs out on the way, so an abandoned reset does not
//  leave that short-lived session lying around on a shared phone.
// ─────────────────────────────────────────────────────────────────────────

import React from "react";
import { sqT, useSqLang } from "../i18n/index.js";
import { friendlyAuthError, setNewPassword, signOut } from "../lib/auth.js";
import { setRecovering } from "../lib/authLinks.js";
import { colors } from "../theme/colors.js";
import {
  authCardStyle,
  authInputStyle,
  authPageStyle,
  authSubmitStyle,
  authTaglineStyle,
  authToggleStyle,
  authWordmarkStyle,
} from "../theme/styles.js";

const MIN_PASSWORD_LENGTH = 6;

export function NewPasswordScreen() {
  useSqLang();
  const [password, setPassword] = React.useState(""),
    [repeat, setRepeat] = React.useState(""),
    [notice, setNotice] = React.useState(null),
    [busy, setBusy] = React.useState(false),
    submit = async () => {
      if (password.length < MIN_PASSWORD_LENGTH) {
        setNotice({
          ok: false,
          text: sqT("Pick a password of at least 6 characters."),
        });
        return;
      }
      if (password !== repeat) {
        setNotice({
          ok: false,
          text: sqT("The two passwords don't match."),
        });
        return;
      }
      setNotice(null);
      setBusy(true);
      try {
        const { error } = await setNewPassword(password);
        if (error) throw error;
        setNotice({
          ok: true,
          text: sqT("Password changed. Opening the app…"),
        });
        // Long enough to read the line, short enough not to feel stuck.
        setTimeout(() => setRecovering(false), 900);
      } catch (err) {
        setNotice({
          ok: false,
          text: friendlyAuthError(err.message),
        });
        setBusy(false);
      }
    };
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
        <p style={authTaglineStyle}>{sqT("Choose a new password.")}</p>
        <div
          style={{
            height: 18,
          }}
        />
        <input
          style={authInputStyle}
          type="password"
          placeholder={sqT("New password")}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="new-password"
        />
        <input
          style={authInputStyle}
          type="password"
          placeholder={sqT("Repeat new password")}
          value={repeat}
          onChange={(event) => setRepeat(event.target.value)}
          autoComplete="new-password"
        />
        <button style={authSubmitStyle} onClick={submit} disabled={busy || !password || !repeat}>
          {busy ? "…" : sqT("Save new password")}
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
          onClick={async () => {
            await signOut();
            setRecovering(false);
          }}
        >
          {sqT("Back to sign in")}
        </button>
      </div>
    </div>
  );
}
