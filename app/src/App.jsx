// ─────────────────────────────────────────────────────────────────────────
//  What to show: the config notice, the loader, the login, or the app.
// ─────────────────────────────────────────────────────────────────────────

import { AppShell } from "./AppShell.jsx";
import { sqT, useSqLang } from "./i18n/index.js";
import { useAuth } from "./lib/auth.js";
import { isConfigured } from "./lib/supabase.js";
import { AuthScreen } from "./screens/AuthScreen.jsx";
import { centerPage, configCard } from "./theme/styles.js";
export function Root() {
  useSqLang();
  const { user, ready } = useAuth();
  return isConfigured ? (
    ready ? (
      user ? (
        <AppShell key={user.id} user={user} />
      ) : (
        <AuthScreen />
      )
    ) : (
      <div style={centerPage}>
        <span
          style={{
            color: "#8A8577",
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
          }}
        >
          {sqT("Clearing the air…")}
        </span>
      </div>
    )
  ) : (
    <div style={centerPage}>
      <div style={configCard}>
        <h2
          style={{
            margin: "0 0 8px",
            fontFamily: "Georgia, serif",
          }}
        >
          {sqT("Almost there")}
        </h2>
        <p
          style={{
            color: "#3A3A36",
            lineHeight: 1.6,
            fontSize: 14,
          }}
        >
          {sqT("Open ")}
          <code>{"config.js"}</code>
          {sqT(
            " in this folder and paste in your Supabase Project URL and anon key (from Supabase → Settings → API), then reload this page.",
          )}
        </p>
      </div>
    </div>
  );
}
