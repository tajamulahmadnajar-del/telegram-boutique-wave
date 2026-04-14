import { createFileRoute, Link } from "@tanstack/react-router";
import { useTelegram, useToggleTheme } from "@/lib/telegram";
import { ChevronRight, Heart, Bell, Package, Wallet, Moon, Sun, LogOut, Store, Shield } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — TG Market" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user, colorScheme } = useTelegram();
  const toggleTheme = useToggleTheme();

  const menuItems = [
    { icon: Package, label: "Order History", to: "/orders" },
    { icon: Heart, label: "Wishlist", to: "/wishlist" },
    { icon: Bell, label: "Notifications", to: "/notifications" },
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
        <p className="text-sm text-muted-foreground">@{user.username}</p>
        <p className="text-xs text-muted-foreground">ID: {user.id}</p>
      </div>

      <div className="mx-4 rounded-xl border bg-card p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Wallet className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Wallet Balance</p>
            <p className="text-lg font-bold">$124.50</p>
          </div>
        </div>
      </div>

      <div className="mx-4 mt-4 overflow-hidden rounded-xl border bg-card">
        {menuItems.map((item) => (
          <Link key={item.to} to={item.to as any} className="flex items-center gap-3 border-b px-4 py-3 last:border-0 transition-colors hover:bg-accent">
            <item.icon className="h-4.5 w-4.5 text-muted-foreground" />
            <span className="flex-1 text-sm font-medium">{item.label}</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Link>
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
