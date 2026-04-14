import { createFileRoute } from "@tanstack/react-router";
import { RotateCcw } from "lucide-react";

export const Route = createFileRoute("/admin/returns")({
  head: () => ({ meta: [{ title: "Returns — Admin Panel" }] }),
  component: AdminReturnsPage,
});

const allReturns = [
  { id: "ar1", orderId: "ORD-2024-001", customer: "Maria K.", seller: "TechZone", product: "Wireless Earbuds Pro", amount: 49.99, reason: "Defective product", status: "pending" as const, date: "Apr 14, 2025" },
  { id: "ar2", orderId: "SO-003", customer: "David P.", seller: "GadgetWorld", product: "Mechanical Keyboard RGB", amount: 79.99, reason: "Wrong item", status: "approved" as const, date: "Apr 12, 2025" },
  { id: "ar3", orderId: "SO-004", customer: "Sarah M.", seller: "TechZone", product: "Smart Watch Ultra", amount: 199.99, reason: "Changed mind", status: "refunded" as const, date: "Apr 8, 2025" },
  { id: "ar4", orderId: "SO-005", customer: "Emily R.", seller: "TechZone", product: "Bluetooth Speaker", amount: 39.99, reason: "Not as described", status: "rejected" as const, date: "Apr 5, 2025" },
];

function AdminReturnsPage() {
  const statusColors: Record<string, string> = {
    pending: "bg-yellow-500/10 text-yellow-600",
    approved: "bg-blue-500/10 text-blue-600",
    refunded: "bg-emerald-500/10 text-emerald-600",
    rejected: "bg-red-500/10 text-red-500",
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Returns & Refunds</h2>

      <div className="grid grid-cols-4 gap-2 text-center">
        {[
          { label: "Pending", count: 1, color: "text-yellow-600" },
          { label: "Approved", count: 1, color: "text-blue-600" },
          { label: "Refunded", count: 1, color: "text-emerald-600" },
          { label: "Rejected", count: 1, color: "text-red-500" },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border bg-card p-2">
            <p className={`text-lg font-bold ${s.color}`}>{s.count}</p>
            <p className="text-[10px] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {allReturns.map((ret) => (
          <div key={ret.id} className="rounded-xl border bg-card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-semibold">{ret.orderId}</span>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${statusColors[ret.status]}`}>
                {ret.status}
              </span>
            </div>
            <div className="mt-2 space-y-0.5 text-xs text-muted-foreground">
              <p><span className="text-foreground font-medium">{ret.product}</span></p>
              <p>Customer: {ret.customer} • Seller: {ret.seller}</p>
              <p>Reason: {ret.reason}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="font-semibold text-sm text-foreground">${ret.amount.toFixed(2)}</span>
                <span>{ret.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
