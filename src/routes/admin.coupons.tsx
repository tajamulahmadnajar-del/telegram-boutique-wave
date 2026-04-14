import { createFileRoute } from "@tanstack/react-router";
import { Tag, Plus, Trash2, Eye } from "lucide-react";

export const Route = createFileRoute("/admin/coupons")({
  head: () => ({ meta: [{ title: "Coupons — Admin Panel" }] }),
  component: AdminCouponsPage,
});

const allCoupons = [
  { id: "ac1", code: "SAVE10", seller: "Platform", discount: "10%", type: "percentage", usageCount: 245, active: true, expiry: "Apr 30, 2025" },
  { id: "ac2", code: "FIRST20", seller: "Platform", discount: "$20", type: "flat", usageCount: 89, active: true, expiry: "May 15, 2025" },
  { id: "ac3", code: "TECHSAVE15", seller: "TechZone", discount: "15%", type: "percentage", usageCount: 34, active: true, expiry: "May 01, 2025" },
  { id: "ac4", code: "FLAT10", seller: "TechZone", discount: "$10", type: "flat", usageCount: 78, active: true, expiry: "Apr 30, 2025" },
  { id: "ac5", code: "STYLE30", seller: "StyleHub", discount: "30%", type: "percentage", usageCount: 12, active: false, expiry: "Apr 15, 2025" },
];

function AdminCouponsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">All Coupons</h2>
        <button className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground">
          <Plus className="h-3.5 w-3.5" /> Create Platform Coupon
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card">
        {allCoupons.map((coupon) => (
          <div key={coupon.id} className="flex items-center gap-3 border-b px-4 py-3 last:border-0">
            <Tag className="h-4 w-4 text-primary shrink-0" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold">{coupon.code}</span>
                <span className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${coupon.active ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-500"}`}>
                  {coupon.active ? "Active" : "Expired"}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                {coupon.discount} OFF • by {coupon.seller} • {coupon.usageCount} uses • exp. {coupon.expiry}
              </p>
            </div>
            <div className="flex gap-1">
              <button className="rounded-full p-1.5 hover:bg-accent"><Eye className="h-3.5 w-3.5 text-muted-foreground" /></button>
              <button className="rounded-full p-1.5 hover:bg-accent"><Trash2 className="h-3.5 w-3.5 text-destructive" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
