import { createFileRoute } from "@tanstack/react-router";
import { sellerStats } from "@/lib/admin-mock-data";
import { TrendingUp, TrendingDown, Users, Eye } from "lucide-react";

export const Route = createFileRoute("/seller/analytics")({
  component: SellerAnalytics,
});

function SellerAnalytics() {
  const stats = sellerStats;

  const metrics = [
    { label: "Total Revenue", value: `$${stats.totalRevenue.toLocaleString()}`, change: "+12.5%", up: true },
    { label: "Total Orders", value: stats.totalOrders.toString(), change: "+8.3%", up: true },
    { label: "Avg Rating", value: stats.avgRating.toFixed(1), change: "+0.2", up: true },
    { label: "Conversion Rate", value: "3.8%", change: "-0.5%", up: false },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Analytics</h2>

      <div className="grid grid-cols-2 gap-3">
        {metrics.map((m, i) => (
          <div key={i} className="rounded-xl border bg-card p-3">
            <p className="text-xs text-muted-foreground">{m.label}</p>
            <p className="mt-0.5 text-xl font-bold">{m.value}</p>
            <div className={`mt-1 flex items-center gap-1 text-xs ${m.up ? "text-success" : "text-destructive"}`}>
              {m.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {m.change}
            </div>
          </div>
        ))}
      </div>

      {/* Revenue trend */}
      <div className="rounded-xl border bg-card p-4">
        <h3 className="mb-3 text-sm font-semibold">Revenue Trend</h3>
        <div className="flex items-end gap-2" style={{ height: 120 }}>
          {stats.monthlyRevenue.map((m) => {
            const max = Math.max(...stats.monthlyRevenue.map(r => r.revenue));
            const h = (m.revenue / max) * 100;
            return (
              <div key={m.month} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-[9px] text-muted-foreground">${(m.revenue/1000).toFixed(1)}k</span>
                <div className="w-full rounded-t bg-primary" style={{ height: `${h}px` }} />
                <span className="text-[9px] text-muted-foreground">{m.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Traffic stats */}
      <div className="rounded-xl border bg-card p-4">
        <h3 className="mb-3 text-sm font-semibold">Traffic Sources</h3>
        {[
          { label: "Direct", pct: 45, color: "bg-primary" },
          { label: "Search", pct: 30, color: "bg-chart-2" },
          { label: "Social", pct: 15, color: "bg-chart-4" },
          { label: "Referral", pct: 10, color: "bg-chart-5" },
        ].map(s => (
          <div key={s.label} className="mb-2">
            <div className="flex justify-between text-xs mb-1">
              <span>{s.label}</span>
              <span className="text-muted-foreground">{s.pct}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted">
              <div className={`h-2 rounded-full ${s.color}`} style={{ width: `${s.pct}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Customer metrics */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border bg-card p-3 text-center">
          <Users className="mx-auto h-5 w-5 text-primary" />
          <p className="mt-1 text-xl font-bold">1,234</p>
          <p className="text-xs text-muted-foreground">Total Customers</p>
        </div>
        <div className="rounded-xl border bg-card p-3 text-center">
          <Eye className="mx-auto h-5 w-5 text-chart-4" />
          <p className="mt-1 text-xl font-bold">8,456</p>
          <p className="text-xs text-muted-foreground">Store Views</p>
        </div>
      </div>
    </div>
  );
}
