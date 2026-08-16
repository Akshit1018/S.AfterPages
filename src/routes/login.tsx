import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <main className="grid min-h-screen place-items-center bg-bg px-6 text-fg">
      <div className="w-full max-w-sm space-y-5">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">
            AFTER
          </p>
          <h1 className="mt-2 font-display text-3xl">Sign in</h1>
          <p className="mt-2 text-sm text-muted">
            Optional — the gallery works without an account.
          </p>
        </div>
        {authEnabled ? (
          GROK_PROVIDERS.map((p) => (
            <button
              key={p.providerId}
              type="button"
              onClick={() => signIn(p.providerId, { callbackURL: "/" })}
              className="w-full rounded-[var(--radius)] border border-border bg-surface px-4 py-3 text-sm font-medium hover:bg-elevated"
            >
              Continue with {p.label}
            </button>
          ))
        ) : (
          <p className="text-sm text-muted">Sign-in is disabled.</p>
        )}
        <Link to="/" className="block text-center text-sm text-muted hover:text-fg">
          Back to gallery
        </Link>
      </div>
    </main>
  );
}
