import { createFileRoute } from "@tanstack/react-router";
import { payouts, sellerStats } from "@/lib/admin-mock-data";
import { Wallet, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/seller/payouts")({
  component: SellerPayouts,
});

function SellerPayouts() {
  const totalEarned = payouts.filter(p => p.status === "completed").reduce((s, p) => s + p.amount, 0);
  const pending = payouts.filter(p => p.status === "pending").reduce((s, p) => s + p.amount, 0);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Payouts</h2>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border bg-card p-3">
          <p className="text-xs text-muted-foreground">Total Earned</p>
          <p className="text-xl font-bold text-success">${totalEarned.toFixed(2)}</p>
        </div>
        <div className="rounded-xl border bg-card p-3">
          <p className="text-xs text-muted-foreground">Pending</p>
          <p className="text-xl font-bold text-warning">${pending.toFixed(2)}</p>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">Available Balance</span>
          </div>
          <p className="text-lg font-bold">${(sellerStats.totalRevenue - totalEarned).toFixed(2)}</p>
        </div>
        <Button className="w-full" size="sm" onClick={() => toast.success("Withdrawal requested (mock)")}>
          <ArrowUpRight className="h-3.5 w-3.5" /> Request Withdrawal
        </Button>
      </div>

      <div className="rounded-xl border bg-card p-4">
        <h3 className="mb-3 text-sm font-semibold">Payout History</h3>
        <div className="space-y-2">
          {payouts.map(p => (
            <div key={p.id} className="flex items-center justify-between rounded-lg border px-3 py-2">
              <div>
                <p className="text-sm font-medium">{p.id}</p>
                <p className="text-xs text-muted-foreground">{p.date} · {p.method}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">${p.amount.toFixed(2)}</p>
                <PayoutBadge status={p.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PayoutBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    completed: "bg-success/10 text-success",
    processing: "bg-primary/10 text-primary",
    pending: "bg-warning/10 text-warning",
  };
  return <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${colors[status] || ""}`}>{status}</span>;
}
