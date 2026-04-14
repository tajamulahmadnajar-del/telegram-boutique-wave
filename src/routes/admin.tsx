import { createFileRoute } from "@tanstack/react-router";
import { PanelLayout } from "@/components/PanelLayout";
import { LayoutDashboard, Users, Store, Package, ShoppingCart, Grid3X3, Percent, FileText, Bell } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

const navItems = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/users", icon: Users, label: "Users" },
  { to: "/admin/sellers", icon: Store, label: "Sellers" },
  { to: "/admin/products", icon: Package, label: "Products" },
  { to: "/admin/orders", icon: ShoppingCart, label: "Orders" },
  { to: "/admin/categories", icon: Grid3X3, label: "Categories" },
  { to: "/admin/commissions", icon: Percent, label: "Commissions" },
  { to: "/admin/reports", icon: FileText, label: "Reports" },
  { to: "/admin/notifications", icon: Bell, label: "Notifications" },
];

function AdminLayout() {
  return <PanelLayout title="Admin Panel" navItems={navItems} accentClass="bg-destructive" />;
}
