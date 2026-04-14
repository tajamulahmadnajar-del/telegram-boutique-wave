import { createFileRoute } from "@tanstack/react-router";
import { orders } from "@/lib/mock-data";
import { sellerOrders } from "@/lib/admin-mock-data";

export const Route = createFileRoute("/admin/orders")({
  component: AdminOrders,
});

function AdminOrders() {
  const allOrders = [
    ...orders.map(o => ({ ...o, type: "customer" as const })),
    ...sellerOrders.map(o => ({ id: o.id, total: o.total, status: o.status, date: o.date, type: "seller" as const, customer: o.customer })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">All Orders ({allOrders.length})</h2>

      <div className="grid grid-cols-4 gap-2">
        {(["pending", "processing", "shipped", "delivered"] as const).map(s => {
          const count = allOrders.filter(o => o.status === s).length;
          return (
            <div key={s} className="rounded-lg bg-card border p-2 text-center">
              <p className="text-lg font-bold">{count}</p>
              <p className="text-[10px] text-muted-foreground capitalize">{s}</p>
            </div>
          );
        })}
      </div>

      <div className="space-y-2">
        {allOrders.map(o => (
          <div key={o.id} className="flex items-center justify-between rounded-xl border bg-card px-3 py-2.5">
            <div>
              <p className="text-sm font-medium">{o.id}</p>
              <p className="text-xs text-muted-foreground">{o.date}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold">${o.total.toFixed(2)}</p>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${
                o.status === "pending" ? "bg-warning/10 text-warning" :
                o.status === "processing" ? "bg-primary/10 text-primary" :
                o.status === "shipped" ? "bg-chart-2/10 text-chart-2" :
                "bg-success/10 text-success"
              }`}>{o.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
