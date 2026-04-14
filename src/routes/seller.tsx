import { createFileRoute } from "@tanstack/react-router";
import { PanelLayout } from "@/components/PanelLayout";
import { LayoutDashboard, Package, ShoppingCart, BarChart3, Boxes, Star, Banknote, Settings, Tag, Users, RotateCcw, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/seller")({
  component: SellerLayout,
});

const navItems = [
  { to: "/seller/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/seller/products", icon: Package, label: "Products" },
  { to: "/seller/orders", icon: ShoppingCart, label: "Orders" },
  { to: "/seller/analytics", icon: BarChart3, label: "Analytics" },
  { to: "/seller/inventory", icon: Boxes, label: "Inventory" },
  { to: "/seller/customers", icon: Users, label: "Customers" },
  { to: "/seller/messages", icon: MessageCircle, label: "Messages" },
  { to: "/seller/coupons", icon: Tag, label: "Coupons" },
  { to: "/seller/returns", icon: RotateCcw, label: "Returns" },
  { to: "/seller/reviews", icon: Star, label: "Reviews" },
  { to: "/seller/payouts", icon: Banknote, label: "Payouts" },
  { to: "/seller/settings", icon: Settings, label: "Settings" },
];

function SellerLayout() {
  return <PanelLayout title="Seller Panel" navItems={navItems} />;
}
