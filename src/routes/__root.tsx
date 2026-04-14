import { Outlet, Link, createRootRoute, HeadContent, Scripts, useLocation } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { TelegramProvider } from "@/lib/telegram";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { BottomNav } from "@/components/BottomNav";
import { AppHeader } from "@/components/AppHeader";
import { InternalNav } from "@/components/InternalNav";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">The page you're looking for doesn't exist.</p>
        <div className="mt-6">
          <InternalNav to="/" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            Go home
          </InternalNav>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" },
      { title: "TG Market" },
      { name: "description", content: "Your one-stop marketplace on Telegram" },
      { name: "theme-color", content: "#2481cc" },
      { property: "og:title", content: "TG Market" },
      { name: "twitter:title", content: "TG Market" },
      { property: "og:description", content: "Your one-stop marketplace on Telegram" },
      { name: "twitter:description", content: "Your one-stop marketplace on Telegram" },
      { name: "twitter:card", content: "summary" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "preload", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap", as: "style" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const location = useLocation();
  const isPanel = location.pathname.startsWith("/seller") || location.pathname.startsWith("/admin");

  return (
    <TelegramProvider>
      <CartProvider>
        <WishlistProvider>
          <div className="mx-auto max-w-lg min-h-screen bg-background">
            {!isPanel && <AppHeader />}
            <main className={isPanel ? "" : "pb-16"}>
              <Outlet />
            </main>
            {!isPanel && <BottomNav />}
          </div>
          <Toaster position="top-center" />
        </WishlistProvider>
      </CartProvider>
    </TelegramProvider>
  );
}
