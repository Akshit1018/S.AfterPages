import { useState } from "react";
import { Check, X } from "lucide-react";
import { PLANS, applyPurchase, type PlanId } from "@/lib/access";

type Props = {
  open: boolean;
  slug: string;
  brand?: string;
  defaultPlan?: PlanId;
  hideSingle?: boolean;
  onClose: () => void;
  onPaid: () => void;
};

export function PayWall({ open, slug, brand, defaultPlan = "single", hideSingle = false, onClose, onPaid }: Props) {
  const [plan, setPlan] = useState<PlanId>(defaultPlan);
  const [method, setMethod] = useState<"upi" | "card">("upi");
  const [busy, setBusy] = useState(false);
  const [upi, setUpi] = useState("");
  const selected = PLANS.find((p) => p.id === plan)!;

  if (!open) return null;

  async function pay() {
    setBusy(true);
    await new Promise((r) => setTimeout(r, 900));
    applyPurchase(plan, slug);
    setBusy(false);
    onPaid();
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-end bg-black/70 p-0 sm:place-items-center sm:p-6">
      <div className="max-h-[94vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-surface text-fg shadow-2xl sm:rounded-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] text-primary uppercase">
              Unlock code
            </p>
            <h2 className="font-display text-2xl tracking-tight">
              Get the source{brand ? ` · ${brand}` : ""}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-11 place-items-center rounded-full text-muted hover:bg-elevated hover:text-fg"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="space-y-3 px-5 py-4">
          {PLANS.filter((p) => !hideSingle || p.id !== "single").map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPlan(p.id)}
              className={`w-full rounded-[var(--radius)] border px-4 py-3 text-left ${
                plan === p.id
                  ? "border-primary bg-elevated"
                  : "border-border bg-bg/40"
              }`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-medium">{p.label}</p>
                <p className="font-display text-xl">
                  ₹{p.price.toLocaleString("en-IN")}
                </p>
              </div>
              <p className="mt-0.5 text-xs text-muted">{p.period}</p>
              <ul className="mt-2 space-y-1">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2 text-sm text-muted">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
                    {pt}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>

        <div className="space-y-3 border-t border-border px-5 py-4">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setMethod("upi")}
              className={`h-11 flex-1 rounded-full text-sm font-medium ${
                method === "upi" ? "bg-primary text-primary-fg" : "bg-elevated text-muted"
              }`}
            >
              UPI
            </button>
            <button
              type="button"
              onClick={() => setMethod("card")}
              className={`h-11 flex-1 rounded-full text-sm font-medium ${
                method === "card" ? "bg-primary text-primary-fg" : "bg-elevated text-muted"
              }`}
            >
              Card
            </button>
          </div>

          {method === "upi" ? (
            <input
              value={upi}
              onChange={(e) => setUpi(e.target.value)}
              placeholder="yourname@upi"
              className="h-12 w-full rounded-lg border border-border bg-bg px-3 text-sm outline-none focus:border-primary"
            />
          ) : (
            <div className="grid gap-2">
              <input
                placeholder="Card number"
                inputMode="numeric"
                className="h-12 w-full rounded-lg border border-border bg-bg px-3 text-sm outline-none focus:border-primary"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  placeholder="MM/YY"
                  className="h-12 rounded-lg border border-border bg-bg px-3 text-sm outline-none focus:border-primary"
                />
                <input
                  placeholder="CVV"
                  className="h-12 rounded-lg border border-border bg-bg px-3 text-sm outline-none focus:border-primary"
                />
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={pay}
            disabled={busy}
            className="h-12 w-full rounded-full bg-primary text-sm font-semibold text-primary-fg disabled:opacity-60"
          >
            {busy
              ? "Confirming payment…"
              : `Pay ₹${selected.price.toLocaleString("en-IN")}`}
          </button>
          <p className="text-center text-xs text-muted">
            One-year plan renews access for 12 months. Lifetime includes updates
            and a custom page request.
          </p>
        </div>
      </div>
    </div>
  );
}
