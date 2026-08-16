export const ACCESS_KEY = "after_code_access_v1";

export type PlanId = "single" | "year" | "life";

export type AccessState = {
  plan: PlanId | "none";
  pages: string[];
  until: number | null;
  paidAt: number | null;
};

export const PLANS = [
  {
    id: "single" as const,
    price: 99,
    label: "This page",
    period: "one-time",
    points: ["HTML, CSS & JS for this page", "Copy instantly after pay", "Keep the files forever"],
  },
  {
    id: "year" as const,
    price: 999,
    label: "All pages · 1 year",
    period: "12 months",
    points: ["Every AFTER page in the gallery", "Copy any page for 1 year", "New pages added this year included"],
  },
  {
    id: "life" as const,
    price: 4999,
    label: "Lifetime + updates",
    period: "forever",
    points: [
      "All current and future pages",
      "Regular updates as pages improve",
      "Request your own product page",
    ],
  },
];

export function emptyAccess(): AccessState {
  return { plan: "none", pages: [], until: null, paidAt: null };
}

export function readAccess(): AccessState {
  if (typeof window === "undefined") return emptyAccess();
  try {
    const raw = localStorage.getItem(ACCESS_KEY);
    if (!raw) return emptyAccess();
    const parsed = JSON.parse(raw) as AccessState;
    if (parsed.plan === "year" && parsed.until && parsed.until < Date.now()) {
      return emptyAccess();
    }
    return parsed;
  } catch {
    return emptyAccess();
  }
}

export function writeAccess(next: AccessState) {
  localStorage.setItem(ACCESS_KEY, JSON.stringify(next));
}

export function canCopy(slug: string, state: AccessState = readAccess()): boolean {
  if (state.plan === "life") return true;
  if (state.plan === "year" && state.until && state.until > Date.now()) return true;
  if (state.plan === "single" && state.pages.includes(slug)) return true;
  return false;
}

export function applyPurchase(plan: PlanId, slug: string): AccessState {
  const now = Date.now();
  const current = readAccess();
  const next: AccessState =
    plan === "life"
      ? { plan: "life", pages: [], until: null, paidAt: now }
      : plan === "year"
        ? { plan: "year", pages: [], until: now + 365 * 24 * 60 * 60 * 1000, paidAt: now }
        : {
            plan: "single",
            pages: Array.from(new Set([...current.pages, slug])),
            until: null,
            paidAt: now,
          };
  writeAccess(next);
  return next;
}
