import { createFileRoute } from "@tanstack/react-router";
import { sellerOrders } from "@/lib/admin-mock-data";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/seller/orders")({
  component: SellerOrdersPage,
});

function SellerOrdersPage() {
  const [ords, setOrds] = useState(sellerOrders);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? ords : ords.filter(o => o.status === filter);

  const updateStatus = (id: string, status: any) => {
    setOrds(ords.map(o => o.id === id ? { ...o, status } : o));
    toast.success(`Order ${id} → ${status}`);
  };

  const statusFilters = ["all", "pending", "processing", "shipped", "delivered"];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Orders ({ords.length})</h2>

      <div className="hide-scrollbar flex gap-2 overflow-x-auto">
        {statusFilters.map(s => (
          <button key={s} onClick={() => setFilter(s)} className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors ${filter === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            {s}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(o => (
          <div key={o.id} className="rounded-xl border bg-card p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={o.customerAvatar} alt="" className="h-8 w-8 rounded-full" />
                <div>
                  <p className="text-sm font-medium">{o.customer}</p>
                  <p className="text-xs text-muted-foreground">{o.id} · {o.date}</p>
                </div>
              </div>
              <p className="text-sm font-bold">${o.total.toFixed(2)}</p>
            </div>
            <div className="mt-2 space-y-1">
              {o.items.map((item, i) => (
                <p key={i} className="text-xs text-muted-foreground">{item.quantity}× {item.name} — ${item.price.toFixed(2)}</p>
              ))}
            </div>
            <div className="mt-2 flex items-center justify-between">
              <StatusBadge status={o.status} />
              {o.status !== "delivered" && (
                <select
                  value={o.status}
                  onChange={e => updateStatus(o.id, e.target.value)}
                  className="rounded-md border bg-background px-2 py-1 text-xs"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: "bg-warning/10 text-warning",
    processing: "bg-primary/10 text-primary",
    shipped: "bg-chart-2/10 text-chart-2",
    delivered: "bg-success/10 text-success",
  };
  return <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${colors[status] || ""}`}>{status}</span>;
}
