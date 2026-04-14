import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Tag, Copy, Clock } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/coupons")({
  head: () => ({ meta: [{ title: "Coupons & Offers — TG Market" }] }),
  component: CouponsPage,
});

const coupons = [
  { id: "c1", code: "SAVE10", discount: "10% OFF", description: "On orders above $50", minOrder: 50, expiry: "Apr 30, 2025", type: "percentage" as const },
  { id: "c2", code: "FIRST20", discount: "$20 OFF", description: "First order discount", minOrder: 30, expiry: "May 15, 2025", type: "flat" as const },
  { id: "c3", code: "FREE SHIP", discount: "Free Shipping", description: "On all orders", minOrder: 0, expiry: "Apr 20, 2025", type: "shipping" as const },
  { id: "c4", code: "FLASH50", discount: "50% OFF", description: "Flash sale — electronics only", minOrder: 100, expiry: "Apr 16, 2025", type: "percentage" as const },
];

function CouponsPage() {
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success(`Copied: ${code}`);
  };

  return (
    <div className="pb-20">
      <AppHeader title="Coupons & Offers" showBack showSearch={false} />
      <div className="p-4 space-y-3">
        {coupons.map((coupon) => (
          <div key={coupon.id} className="relative overflow-hidden rounded-xl border bg-card">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary" />
            <div className="flex items-center gap-3 p-4 pl-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Tag className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-base font-bold">{coupon.discount}</p>
                <p className="text-xs text-muted-foreground">{coupon.description}</p>
                {coupon.minOrder > 0 && <p className="text-[10px] text-muted-foreground">Min. order: ${coupon.minOrder}</p>}
                <div className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Clock className="h-3 w-3" /> Expires: {coupon.expiry}
                </div>
              </div>
              <button
                onClick={() => copyCode(coupon.code)}
                className="flex items-center gap-1 rounded-lg border border-dashed border-primary px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/5"
              >
                {coupon.code} <Copy className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
