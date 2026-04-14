import { createFileRoute } from "@tanstack/react-router";
import { RotateCcw, Check, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/seller/returns")({
  head: () => ({ meta: [{ title: "Returns — Seller Panel" }] }),
  component: SellerReturnsPage,
});

const mockReturns = [
  { id: "ret1", orderId: "SO-001", customer: "Maria K.", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Maria", product: "Wireless Earbuds Pro", reason: "Defective product", amount: 49.99, status: "pending" as const, date: "Apr 14, 2025" },
  { id: "ret2", orderId: "SO-003", customer: "David P.", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=David", product: "Mechanical Keyboard RGB", reason: "Wrong item received", amount: 79.99, status: "pending" as const, date: "Apr 12, 2025" },
  { id: "ret3", orderId: "SO-004", customer: "Sarah M.", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah", product: "Smart Watch Ultra", reason: "Changed my mind", amount: 199.99, status: "approved" as const, date: "Apr 8, 2025" },
  { id: "ret4", orderId: "SO-005", customer: "Emily R.", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Emily", product: "Bluetooth Speaker", reason: "Not as described", amount: 39.99, status: "rejected" as const, date: "Apr 5, 2025" },
];

function SellerReturnsPage() {
  const [returns, setReturns] = useState(mockReturns);

  const handleAction = (id: string, action: "approved" | "rejected") => {
    setReturns(returns.map(r => r.id === id ? { ...r, status: action } : r));
    toast.success(`Return ${action}`);
  };

  const statusColors = {
    pending: "bg-yellow-500/10 text-yellow-600",
    approved: "bg-emerald-500/10 text-emerald-600",
    rejected: "bg-red-500/10 text-red-500",
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Returns & Refunds</h2>

      <div className="space-y-3">
        {returns.map((ret) => (
          <div key={ret.id} className="rounded-xl border bg-card p-4">
            <div className="flex items-start gap-3">
              <img src={ret.avatar} alt={ret.customer} className="h-9 w-9 rounded-full" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">{ret.customer}</p>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${statusColors[ret.status]}`}>
                    {ret.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Order: {ret.orderId}</p>
                <p className="mt-1 text-sm">{ret.product}</p>
                <p className="text-xs text-muted-foreground">Reason: {ret.reason}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm font-semibold">${ret.amount.toFixed(2)}</span>
                  <span className="text-[10px] text-muted-foreground">{ret.date}</span>
                </div>
              </div>
            </div>
            {ret.status === "pending" && (
              <div className="mt-3 flex gap-2 border-t pt-3">
                <button onClick={() => handleAction(ret.id, "approved")} className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-emerald-500 py-2 text-xs font-medium text-white">
                  <Check className="h-3.5 w-3.5" /> Approve
                </button>
                <button onClick={() => handleAction(ret.id, "rejected")} className="flex flex-1 items-center justify-center gap-1 rounded-lg border py-2 text-xs font-medium text-destructive">
                  <X className="h-3.5 w-3.5" /> Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
