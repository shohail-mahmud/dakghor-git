import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import Letters from "@/components/dakghor/pages/Letters";

export const Route = createFileRoute("/letters")({
  head: () => ({
    meta: [
      { title: "My Letters | Dakghor" },
      { name: "description", content: "A quiet, private local correspondence log on your device." },
      { property: "og:title", content: "My Letters | Dakghor" },
      { property: "og:description", content: "A quiet, private local correspondence log on your device." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LettersRouteComponent,
});

function LettersRouteComponent() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname === "/letters" || pathname === "/letters/") {
    return <Letters />;
  }
  return <Outlet />;
}
