import { useEffect } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { getPage } from "@/lib/pages";

export const Route = createFileRoute("/view/$slug")({
  component: ViewPage,
  loader: ({ params }) => {
    const page = getPage(params.slug);
    if (!page) throw notFound();
    return page;
  },
});

function ViewPage() {
  const page = Route.useLoaderData();

  useEffect(() => {
    window.location.replace(`/pages/${page.slug}/index.html`);
  }, [page.slug]);

  return (
    <main className="grid min-h-screen place-items-center bg-bg px-6 text-fg">
      <p className="text-sm text-muted">Opening {page.brand}…</p>
    </main>
  );
}
