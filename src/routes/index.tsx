import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Code2 } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { PAGES } from "@/lib/pages";
import { canCopy, readAccess } from "@/lib/access";
import { PayWall } from "@/components/pay-wall";

export const Route = createFileRoute("/")({ component: Home });

function AuthSlot() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return <div className="h-8 w-20 animate-pulse rounded-full bg-elevated" />;
  }
  return user ? (
    <SignedIn>
      <UserButton />
    </SignedIn>
  ) : (
    <SignedOut>
      <Link
        to="/login"
        className="rounded-full border border-border px-4 py-2 text-sm text-muted hover:text-fg"
      >
        Sign in
      </Link>
    </SignedOut>
  );
}

function Home() {
  const [payOpen, setPayOpen] = useState(false);
  const [tick, setTick] = useState(0);
  const access = useMemo(() => readAccess(), [tick]);
  const unlockedAll = access.plan === "year" || access.plan === "life";

  return (
    <div className="min-h-screen bg-bg text-fg">
      <header className="sticky top-0 z-20 border-b border-border/80 bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">
              AFTER
            </p>
            <p className="font-display text-lg tracking-tight">Product pages</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPayOpen(true)}
              className="hidden h-11 items-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-fg sm:inline-flex"
            >
              <Code2 className="size-4" />
              {unlockedAll ? "Access active" : "Unlock all code"}
            </button>
            <AuthSlot />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl leading-[1.1] tracking-tight md:text-5xl">
            Live AFTER pages.
            <span className="text-muted"> Real previews, then the source.</span>
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
            Tap a card to open the page. Copy the HTML/CSS/JS from the top bar —
            ₹99 for one page, ₹999 for a year of every page, or ₹4,999 lifetime
            with updates and a custom request.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setPayOpen(true)}
          className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-fg sm:hidden"
        >
          <Code2 className="size-4" />
          Unlock all code
        </button>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PAGES.map((page, i) => (
            <li key={page.slug}>
              <a
                href={`/pages/${page.slug}/index.html`}
                className="group flex h-full flex-col overflow-hidden rounded-[var(--radius)] border border-border bg-surface"
              >
                <div className="relative bg-elevated px-6 pt-5 pb-4">
                  <span className="absolute top-3 left-3 z-10 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur-sm">
                    {String(i + 1).padStart(2, "0")} · {page.category}
                  </span>
                  <div className="mx-auto w-[58%] overflow-hidden rounded-[1.15rem] border border-black/40 bg-black shadow-[0_18px_40px_rgba(0,0,0,0.45)]">
                    <div className="flex justify-center bg-black py-1.5">
                      <span className="h-1 w-10 rounded-full bg-white/20" />
                    </div>
                    <img
                      src={`/previews/${page.slug}.png`}
                      alt={`${page.brand} preview`}
                      className="aspect-[9/16] w-full object-cover object-top"
                    />
                  </div>
                  <span className="absolute right-3 bottom-3 inline-flex items-center gap-1 text-xs font-medium text-white">
                    Open
                    <ArrowUpRight className="size-3.5" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-1.5 p-4">
                  <p className="text-xs font-medium tracking-wide text-accent uppercase">
                    {page.brand}
                  </p>
                  <h2 className="font-display text-[1.15rem] leading-snug">
                    {page.product}
                  </h2>
                  <p className="mt-auto pt-3 text-sm text-primary">
                    {canCopy(page.slug, access) ? "Code unlocked" : page.lift}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </main>

      <PayWall
        open={payOpen}
        slug="gallery"
        defaultPlan="year"
        hideSingle
        onClose={() => setPayOpen(false)}
        onPaid={() => {
          setPayOpen(false);
          setTick((n) => n + 1);
        }}
      />
    </div>
  );
}
