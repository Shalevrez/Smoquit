// ─────────────────────────────────────────────────────────────────────────
//  The wordmark, the sign-out link, and one line about today.
//
//  The smoke wisp above the mark is decorative and animated; the injected
//  prefers-reduced-motion rule in the shell turns it off for anyone who has
//  asked for less movement.
// ─────────────────────────────────────────────────────────────────────────

import { sqT } from "../i18n/index.js";
import { signOut } from "../lib/auth.js";
import { colors } from "../theme/colors.js";
import { headerStyle, taglineStyle, wordmarkStyle } from "../theme/styles.js";
export function Header({ goal, count, user }) {
  const overTarget = goal && goal.target != null && count > goal.target;
  return (
    <header style={headerStyle}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 10,
          }}
        >
          <span style={wordmarkStyle}>
            {"Smo"}
            <span
              style={{
                color: colors.ember,
              }}
            >
              {"quit"}
            </span>
          </span>
          <span
            style={{
              position: "relative",
              width: 3,
              height: 14,
              display: "inline-block",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                width: 3,
                height: 14,
                background: `linear-gradient(${colors.ash}, ${colors.breath})`,
                borderRadius: 2,
              }}
            />
            <span
              style={{
                position: "absolute",
                left: 0,
                top: -4,
                width: 3,
                height: 4,
                background: colors.ember,
                borderRadius: 2,
                animation: "smoke 2.4s ease-out infinite",
              }}
            />
          </span>
        </div>
        {user && (
          <button
            onClick={() => signOut()}
            style={{
              background: "none",
              border: "none",
              color: colors.ash,
              fontSize: 12,
              cursor: "pointer",
              textDecoration: "underline",
            }}
            title={user.email}
          >
            {sqT("Sign out")}
          </button>
        )}
      </div>
      <p style={taglineStyle}>
        {goal
          ? overTarget
            ? sqT("Today: {count}. Over your {target}/day target — tomorrow's a fresh start.", {
                count: count,
                target: goal.target,
              })
            : sqT("Today: {count} of {target} allowed. Every skipped one counts.", {
                count: count,
                target: goal.target ?? "—",
              })
          : sqT("Log what you smoke. Notice the pattern. Loosen its grip.")}
      </p>
    </header>
  );
}
