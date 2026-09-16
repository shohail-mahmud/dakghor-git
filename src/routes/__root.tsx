import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HeadContent, Outlet, Scripts, createRootRouteWithContext, useRouterState } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { AppLayout, PublicLayout } from "@/components/dakghor/layouts";
import appCss from "../styles.css?url";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [{ charSet: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { name: "author", content: "Dakghor" }],
    links: [{ rel: "stylesheet", href: appCss }, { rel: "preconnect", href: "https://fonts.googleapis.com" }, { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" }, { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Sora:wght@400;500;600&display=swap" }, { rel: "icon", href: "/favicon.ico" }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
});
function RootShell({ children }: { children: ReactNode }) { return <html lang="en"><head><HeadContent/></head><body>{children}<Scripts/></body></html>; }
function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const path = useRouterState({ select: (state) => state.location.pathname });
  const app = ["/postbox", "/write", "/address", "/letters", "/settings"].some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
  return <QueryClientProvider client={queryClient}>{app ? <AppLayout/> : <PublicLayout/>}</QueryClientProvider>;
}
