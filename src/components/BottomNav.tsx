import { Link, useLocation } from "@tanstack/react-router";
import { Home, Grid3X3, ShoppingCart, Package, User } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const tabs = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/categories", icon: Grid3X3, label: "Categories" },
  { to: "/cart", icon: ShoppingCart, label: "Cart" },
  { to: "/orders", icon: Package, label: "Orders" },
  { to: "/profile", icon: User, label: "Profile" },
] as const;

export function BottomNav() {
  const location = useLocation();
  const { itemCount } = useCart();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card safe-bottom">
      <div className="mx-auto flex max-w-lg items-center justify-around py-1">
        {tabs.map((tab) => {
          const isActive = tab.to === "/" ? location.pathname === "/" : location.pathname.startsWith(tab.to);
          const Icon = tab.icon;
          return (
            <Link key={tab.to} to={tab.to} className="relative flex flex-col items-center gap-0.5 px-3 py-1.5">
              <div className="relative">
                <Icon className={`h-5 w-5 transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                {tab.to === "/cart" && itemCount > 0 && (
                  <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-medium transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
