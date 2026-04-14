import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, ArrowDownLeft, DollarSign } from "lucide-react";

export const Route = createFileRoute("/admin/transactions")({
  head: () => ({ meta: [{ title: "Transactions — Admin Panel" }] }),
  component: AdminTransactionsPage,
});

const transactions = [
  { id: "TXN-001", type: "order" as const, from: "Maria K.", to: "TechZone", amount: 49.99, commission: 5.00, date: "Apr 14, 2025", status: "completed" },
  { id: "TXN-002", type: "order" as const, from: "James L.", to: "TechZone", amount: 79.98, commission: 8.00, date: "Apr 13, 2025", status: "completed" },
  { id: "TXN-003", type: "payout" as const, from: "Platform", to: "TechZone", amount: 1250.00, commission: 0, date: "Apr 10, 2025", status: "completed" },
  { id: "TXN-004", type: "refund" as const, from: "Platform", to: "Sarah M.", amount: 199.99, commission: -20.00, date: "Apr 8, 2025", status: "completed" },
  { id: "TXN-005", type: "order" as const, from: "Emily R.", to: "TechZone", amount: 39.99, commission: 4.00, date: "Apr 5, 2025", status: "completed" },
  { id: "TXN-006", type: "payout" as const, from: "Platform", to: "FitGear", amount: 890.50, commission: 0, date: "Apr 3, 2025", status: "processing" },
];

function AdminTransactionsPage() {
  const totalRevenue = transactions.filter(t => t.type === "order").reduce((sum, t) => sum + t.amount, 0);
  const totalCommission = transactions.reduce((sum, t) => sum + t.commission, 0);
  const totalPayouts = transactions.filter(t => t.type === "payout").reduce((sum, t) => sum + t.amount, 0);

  const typeColors: Record<string, string> = {
    order: "bg-emerald-500/10 text-emerald-500",
    payout: "bg-blue-500/10 text-blue-500",
    refund: "bg-red-500/10 text-red-500",
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Transactions</h2>

      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Revenue", value: `$${totalRevenue.toFixed(0)}`, icon: DollarSign, color: "text-emerald-500" },
          { label: "Commission", value: `$${totalCommission.toFixed(0)}`, icon: ArrowDownLeft, color: "text-primary" },
          { label: "Payouts", value: `$${totalPayouts.toFixed(0)}`, icon: ArrowUpRight, color: "text-blue-500" },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border bg-card p-3 text-center">
            <s.icon className={`mx-auto h-4 w-4 ${s.color}`} />
            <p className="mt-1 text-sm font-bold">{s.value}</p>
            <p className="text-[10px] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border bg-card">
        {transactions.map((tx) => (
          <div key={tx.id} className="flex items-center gap-3 border-b px-4 py-3 last:border-0">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${typeColors[tx.type]}`}>
              {tx.type === "order" ? <ArrowDownLeft className="h-4 w-4" /> : tx.type === "payout" ? <ArrowUpRight className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-medium">{tx.id}</span>
                <span className={`rounded-full px-1.5 py-0.5 text-[8px] font-medium capitalize ${typeColors[tx.type]}`}>{tx.type}</span>
              </div>
              <p className="text-[11px] text-muted-foreground">{tx.from} → {tx.to}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">${tx.amount.toFixed(2)}</p>
              {tx.commission !== 0 && (
                <p className={`text-[10px] ${tx.commission > 0 ? "text-emerald-500" : "text-red-500"}`}>
                  {tx.commission > 0 ? "+" : ""}${tx.commission.toFixed(2)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
