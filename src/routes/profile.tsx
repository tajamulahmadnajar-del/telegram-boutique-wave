import { createFileRoute } from "@tanstack/react-router";
import { useTelegram, useToggleTheme } from "@/lib/telegram";
import { ChevronRight, Heart, Bell, Package, Wallet, Moon, Sun, LogOut, Store, Shield, MapPin, Tag, Gift, HelpCircle, Settings, CheckCircle, AlertCircle } from "lucide-react";
import { InternalNav } from "@/components/InternalNav";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — TG Market" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user, colorScheme, authenticated, loading } = useTelegram();
  const toggleTheme = useToggleTheme();

  const menuItems = [
    { icon: Package, label: "Order History", to: "/orders" },
    { icon: Heart, label: "Wishlist", to: "/wishlist" },
    { icon: Wallet, label: "Wallet", to: "/wallet" },
    { icon: MapPin, label: "My Addresses", to: "/addresses" },
    { icon: Tag, label: "Coupons & Offers", to: "/coupons" },
    { icon: Gift, label: "Refer & Earn", to: "/refer" },
    { icon: Bell, label: "Notifications", to: "/notifications" },
    { icon: HelpCircle, label: "Help & Support", to: "/help" },
    { icon: Settings, label: "Settings", to: "/settings" },
  ];

  const panelItems = [
    { icon: Store, label: "Seller Panel", to: "/seller/dashboard" },
    { icon: Shield, label: "Admin Panel", to: "/admin/dashboard" },
  ];

  return (
    <div className="pb-4">
      <div className="flex flex-col items-center px-4 pt-6 pb-4">
        <img src={user.photo_url} alt={user.first_name} className="h-20 w-20 rounded-full border-2 border-primary" />
        <h1 className="mt-3 text-lg font-bold">{user.first_name} {user.last_name || ""}</h1>
        {user.username && <p className="text-sm text-muted-foreground">@{user.username}</p>}
        <p className="text-xs text-muted-foreground">ID: {user.id}</p>

        <div className="mt-2 flex items-center gap-1.5">
          {loading ? (
            <span className="text-xs text-muted-foreground">Connecting...</span>
          ) : authenticated ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">
              <CheckCircle className="h-3 w-3" /> Telegram Verified
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-warning/10 px-2.5 py-0.5 text-xs font-medium text-warning">
              <AlertCircle className="h-3 w-3" /> Preview Mode
            </span>
          )}
        </div>
      </div>

      <div className="mx-4 rounded-xl border bg-card p-4">
        <InternalNav to="/wallet" className="flex w-full items-center gap-3 text-left">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Wallet className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Wallet Balance</p>
            <p className="text-lg font-bold">$124.50</p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </InternalNav>
      </div>

      <div className="mx-4 mt-4 overflow-hidden rounded-xl border bg-card">
        {menuItems.map((item) => (
          <InternalNav key={item.to} to={item.to as any} className="flex w-full items-center gap-3 border-b px-4 py-3 text-left last:border-0 transition-colors hover:bg-accent">
            <item.icon className="h-4.5 w-4.5 text-muted-foreground" />
            <span className="flex-1 text-sm font-medium">{item.label}</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </InternalNav>
        ))}
      </div>

      <div className="mx-4 mt-4 overflow-hidden rounded-xl border bg-card">
        {panelItems.map((item) => (
          <InternalNav key={item.to} to={item.to as any} className="flex w-full items-center gap-3 border-b px-4 py-3 text-left last:border-0 transition-colors hover:bg-accent">
            <item.icon className="h-4.5 w-4.5 text-muted-foreground" />
            <span className="flex-1 text-sm font-medium">{item.label}</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </InternalNav>
        ))}
      </div>

      <div className="mx-4 mt-4 overflow-hidden rounded-xl border bg-card">
        <button onClick={toggleTheme} className="flex w-full items-center gap-3 px-4 py-3 transition-colors hover:bg-accent">
          {colorScheme === "dark" ? <Sun className="h-4.5 w-4.5 text-muted-foreground" /> : <Moon className="h-4.5 w-4.5 text-muted-foreground" />}
          <span className="flex-1 text-left text-sm font-medium">{colorScheme === "dark" ? "Light Mode" : "Dark Mode"}</span>
        </button>
      </div>

      <div className="mx-4 mt-4">
        <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-destructive/30 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10">
          <LogOut className="h-4 w-4" /> Log Out
        </button>
      </div>
    </div>
  );
}
