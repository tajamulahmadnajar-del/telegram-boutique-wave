import { createFileRoute } from "@tanstack/react-router";
import { adminStats } from "@/lib/admin-mock-data";
import { Download, TrendingUp, ShoppingCart, Users, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/reports")({
  component: AdminReports,
});

function AdminReports() {
  const stats = adminStats;

  const reports = [
    { title: "Sales Report", description: "Complete sales breakdown by product, seller, and category", icon: DollarSign },
    { title: "Order Report", description: "Order volume, fulfillment rate, and delivery metrics", icon: ShoppingCart },
    { title: "User Report", description: "User growth, retention, and engagement metrics", icon: Users },
    { title: "Revenue Report", description: "Revenue trends, forecasts, and commission earnings", icon: TrendingUp },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Reports</h2>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border bg-card p-3 text-center">
          <p className="text-xs text-muted-foreground">This Month Revenue</p>
          <p className="text-xl font-bold text-success">${stats.monthlyRevenue[stats.monthlyRevenue.length - 1].revenue.toLocaleString()}</p>
        </div>
        <div className="rounded-xl border bg-card p-3 text-center">
          <p className="text-xs text-muted-foreground">This Month Orders</p>
          <p className="text-xl font-bold text-primary">{stats.totalOrders}</p>
        </div>
      </div>

      {/* Revenue comparison */}
      <div className="rounded-xl border bg-card p-4">
        <h3 className="mb-3 text-sm font-semibold">Revenue Comparison (Monthly)</h3>
        <div className="space-y-2">
          {stats.monthlyRevenue.map((m, i) => {
            const max = Math.max(...stats.monthlyRevenue.map(r => r.revenue));
            const prev = i > 0 ? stats.monthlyRevenue[i - 1].revenue : m.revenue;
            const change = ((m.revenue - prev) / prev * 100).toFixed(1);
            return (
              <div key={m.month} className="flex items-center gap-3">
                <span className="w-8 text-xs text-muted-foreground">{m.month}</span>
                <div className="h-4 flex-1 rounded-full bg-muted">
                  <div className="h-4 rounded-full bg-primary/70" style={{ width: `${(m.revenue / max) * 100}%` }} />
                </div>
                <span className="w-12 text-right text-xs font-medium">${(m.revenue/1000).toFixed(1)}k</span>
                <span className={`w-12 text-right text-[10px] ${parseFloat(change) >= 0 ? "text-success" : "text-destructive"}`}>
                  {parseFloat(change) >= 0 ? "+" : ""}{change}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Downloadable reports */}
      <div className="space-y-2">
        {reports.map((r, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border bg-card p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <r.icon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{r.title}</p>
              <p className="text-xs text-muted-foreground">{r.description}</p>
            </div>
            <Button size="sm" variant="outline" onClick={() => toast.success(`${r.title} downloaded (mock)`)}>
              <Download className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
