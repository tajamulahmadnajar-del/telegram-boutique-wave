import { createFileRoute } from "@tanstack/react-router";
import { Tag, Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/seller/coupons")({
  head: () => ({ meta: [{ title: "Coupons — Seller Panel" }] }),
  component: SellerCouponsPage,
});

const mockCoupons = [
  { id: "sc1", code: "TECHSAVE15", discount: 15, type: "percentage" as const, minOrder: 50, usageCount: 34, maxUsage: 100, active: true, expiry: "2025-05-01" },
  { id: "sc2", code: "FLAT10", discount: 10, type: "flat" as const, minOrder: 30, usageCount: 78, maxUsage: 200, active: true, expiry: "2025-04-30" },
  { id: "sc3", code: "WELCOME25", discount: 25, type: "percentage" as const, minOrder: 100, usageCount: 12, maxUsage: 50, active: false, expiry: "2025-04-20" },
];

function SellerCouponsPage() {
  const [coupons, setCoupons] = useState(mockCoupons);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Coupons</h2>
        <button className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground">
          <Plus className="h-3.5 w-3.5" /> Create Coupon
        </button>
      </div>

      <div className="space-y-3">
        {coupons.map((coupon) => (
          <div key={coupon.id} className="rounded-xl border bg-card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-primary" />
                <span className="font-mono text-sm font-bold">{coupon.code}</span>
              </div>
              <div className="flex items-center gap-1">
                <button className="rounded-full p-1.5 hover:bg-accent"><Pencil className="h-3.5 w-3.5 text-muted-foreground" /></button>
                <button className="rounded-full p-1.5 hover:bg-accent"><Trash2 className="h-3.5 w-3.5 text-destructive" /></button>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                {coupon.type === "percentage" ? `${coupon.discount}% OFF` : `$${coupon.discount} OFF`}
              </span>
              <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">
                Min: ${coupon.minOrder}
              </span>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${coupon.active ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-500"}`}>
                {coupon.active ? "Active" : "Inactive"}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
              <span>Used: {coupon.usageCount}/{coupon.maxUsage}</span>
              <span>Expires: {coupon.expiry}</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-secondary">
              <div className="h-full rounded-full bg-primary" style={{ width: `${(coupon.usageCount / coupon.maxUsage) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
