import { createFileRoute } from "@tanstack/react-router";
import { adminStats } from "@/lib/admin-mock-data";
import { Users, Store, Package, ShoppingCart, DollarSign, Clock } from "lucide-react";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const stats = adminStats;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Admin Dashboard</h2>

      <div className="grid grid-cols-2 gap-3">
        <StatCard icon={Users} label="Users" value={stats.totalUsers.toString()} />
        <StatCard icon={Store} label="Sellers" value={stats.totalSellers.toString()} />
        <StatCard icon={Package} label="Products" value={stats.totalProducts.toString()} />
        <StatCard icon={ShoppingCart} label="Orders" value={stats.totalOrders.toString()} />
        <StatCard icon={DollarSign} label="Revenue" value={`$${stats.totalRevenue.toLocaleString()}`} />
        <StatCard icon={Clock} label="Pending" value={stats.pendingApprovals.toString()} />
      </div>

      {/* Revenue chart */}
      <div className="rounded-xl border bg-card p-4">
        <h3 className="mb-3 text-sm font-semibold">Monthly Revenue</h3>
        <div className="flex items-end gap-2" style={{ height: 100 }}>
          {stats.monthlyRevenue.map(m => {
            const max = Math.max(...stats.monthlyRevenue.map(r => r.revenue));
            return (
              <div key={m.month} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-[9px] text-muted-foreground">${(m.revenue/1000).toFixed(0)}k</span>
                <div className="w-full rounded-t bg-destructive/80" style={{ height: `${(m.revenue / max) * 80}px` }} />
                <span className="text-[9px] text-muted-foreground">{m.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Orders by status */}
      <div className="rounded-xl border bg-card p-4">
        <h3 className="mb-3 text-sm font-semibold">Orders by Status</h3>
        <div className="grid grid-cols-2 gap-2">
          {stats.ordersByStatus.map(s => (
            <div key={s.status} className="rounded-lg bg-muted/50 px-3 py-2 text-center">
              <p className="text-lg font-bold">{s.count}</p>
              <p className="text-xs text-muted-foreground">{s.status}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top sellers */}
      <div className="rounded-xl border bg-card p-4">
        <h3 className="mb-3 text-sm font-semibold">Top Sellers</h3>
        <div className="space-y-2">
          {stats.topSellers.map((s, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{i + 1}</span>
                <div>
                  <p className="text-sm font-medium">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.orders} orders</p>
                </div>
              </div>
              <p className="text-sm font-bold text-success">${s.revenue.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div className="rounded-xl border bg-card p-4">
        <h3 className="mb-3 text-sm font-semibold">Recent Activity</h3>
        <div className="space-y-2">
          {stats.recentActivity.map((a, i) => (
            <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
              <div>
                <p className="text-sm">{a.action}</p>
                <p className="text-xs text-muted-foreground">{a.user}</p>
              </div>
              <p className="text-xs text-muted-foreground">{a.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-card p-3">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <p className="mt-1 text-xl font-bold">{value}</p>
    </div>
  );
}
