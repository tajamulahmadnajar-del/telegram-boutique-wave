import { createFileRoute } from "@tanstack/react-router";
import { sellerStats } from "@/lib/admin-mock-data";
import { DollarSign, ShoppingCart, Package, Star, Clock } from "lucide-react";

export const Route = createFileRoute("/seller/dashboard")({
  component: SellerDashboard,
});

function SellerDashboard() {
  const stats = sellerStats;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Dashboard</h2>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard icon={DollarSign} label="Revenue" value={`$${stats.totalRevenue.toLocaleString()}`} color="text-success" />
        <StatCard icon={ShoppingCart} label="Orders" value={stats.totalOrders.toString()} color="text-primary" />
        <StatCard icon={Package} label="Products" value={stats.totalProducts.toString()} color="text-chart-3" />
        <StatCard icon={Star} label="Rating" value={stats.avgRating.toFixed(1)} color="text-warning" />
      </div>

      {/* Pending orders alert */}
      {stats.pendingOrders > 0 && (
        <div className="flex items-center gap-2 rounded-xl border border-warning/30 bg-warning/10 p-3">
          <Clock className="h-4 w-4 text-warning" />
          <p className="text-sm font-medium">{stats.pendingOrders} orders pending action</p>
        </div>
      )}

      {/* Revenue chart (simple bar representation) */}
      <div className="rounded-xl border bg-card p-4">
        <h3 className="mb-3 text-sm font-semibold">Monthly Revenue</h3>
        <div className="flex items-end gap-2">
          {stats.monthlyRevenue.map((m) => {
            const maxRev = Math.max(...stats.monthlyRevenue.map(r => r.revenue));
            const height = (m.revenue / maxRev) * 100;
            return (
              <div key={m.month} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-[10px] text-muted-foreground">${(m.revenue / 1000).toFixed(1)}k</span>
                <div className="w-full rounded-t-md bg-primary/20" style={{ height: `${height}px` }}>
                  <div className="h-full rounded-t-md bg-primary" style={{ width: "100%" }} />
                </div>
                <span className="text-[10px] text-muted-foreground">{m.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top products */}
      <div className="rounded-xl border bg-card p-4">
        <h3 className="mb-3 text-sm font-semibold">Top Products</h3>
        <div className="space-y-2">
          {stats.topProducts.map((p, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2">
              <div>
                <p className="text-sm font-medium">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.sold} sold</p>
              </div>
              <p className="text-sm font-bold text-success">${p.revenue.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent orders */}
      <div className="rounded-xl border bg-card p-4">
        <h3 className="mb-3 text-sm font-semibold">Recent Orders</h3>
        <div className="space-y-2">
          {stats.recentOrders.slice(0, 3).map((o) => (
            <div key={o.id} className="flex items-center justify-between rounded-lg border px-3 py-2">
              <div className="flex items-center gap-2">
                <img src={o.customerAvatar} alt="" className="h-7 w-7 rounded-full" />
                <div>
                  <p className="text-sm font-medium">{o.customer}</p>
                  <p className="text-xs text-muted-foreground">{o.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">${o.total.toFixed(2)}</p>
                <OrderBadge status={o.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) {
  return (
    <div className="rounded-xl border bg-card p-3">
      <div className="flex items-center gap-2">
        <Icon className={`h-4 w-4 ${color}`} />
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <p className="mt-1 text-xl font-bold">{value}</p>
    </div>
  );
}

function OrderBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: "bg-warning/10 text-warning",
    processing: "bg-primary/10 text-primary",
    shipped: "bg-chart-2/10 text-chart-2",
    delivered: "bg-success/10 text-success",
  };
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${colors[status] || ""}`}>
      {status}
    </span>
  );
}
