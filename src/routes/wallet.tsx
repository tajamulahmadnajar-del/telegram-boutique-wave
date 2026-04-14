import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Wallet, ArrowUpRight, ArrowDownLeft, Plus } from "lucide-react";

export const Route = createFileRoute("/wallet")({
  head: () => ({ meta: [{ title: "Wallet — TG Market" }] }),
  component: WalletPage,
});

const transactions = [
  { id: "t1", type: "credit" as const, title: "Referral Bonus", amount: 10.00, date: "Apr 14, 2025" },
  { id: "t2", type: "debit" as const, title: "Order #ORD-2024-003", amount: 34.99, date: "Apr 13, 2025" },
  { id: "t3", type: "credit" as const, title: "Refund — Order #ORD-2024-001", amount: 49.99, date: "Apr 10, 2025" },
  { id: "t4", type: "credit" as const, title: "Top Up", amount: 100.00, date: "Apr 5, 2025" },
  { id: "t5", type: "debit" as const, title: "Order #ORD-2024-002", amount: 89.99, date: "Apr 3, 2025" },
  { id: "t6", type: "credit" as const, title: "Cashback", amount: 5.50, date: "Apr 1, 2025" },
];

function WalletPage() {
  return (
    <div className="pb-20">
      <AppHeader title="Wallet" showBack showSearch={false} />
      <div className="p-4 space-y-4">
        {/* Balance card */}
        <div className="rounded-xl bg-gradient-to-br from-primary to-primary/70 p-6 text-primary-foreground">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            <span className="text-sm opacity-90">Available Balance</span>
          </div>
          <p className="mt-2 text-3xl font-bold">$124.50</p>
          <div className="mt-4 flex gap-3">
            <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-white/20 py-2 text-sm font-medium backdrop-blur-sm">
              <Plus className="h-4 w-4" /> Top Up
            </button>
            <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-white/20 py-2 text-sm font-medium backdrop-blur-sm">
              <ArrowUpRight className="h-4 w-4" /> Withdraw
            </button>
          </div>
        </div>

        {/* Transactions */}
        <div>
          <h2 className="mb-2 text-sm font-semibold">Recent Transactions</h2>
          <div className="overflow-hidden rounded-xl border bg-card">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center gap-3 border-b px-4 py-3 last:border-0">
                <div className={`flex h-9 w-9 items-center justify-center rounded-full ${tx.type === "credit" ? "bg-emerald-500/10" : "bg-red-500/10"}`}>
                  {tx.type === "credit" ? (
                    <ArrowDownLeft className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{tx.title}</p>
                  <p className="text-[11px] text-muted-foreground">{tx.date}</p>
                </div>
                <span className={`text-sm font-semibold ${tx.type === "credit" ? "text-emerald-500" : "text-red-500"}`}>
                  {tx.type === "credit" ? "+" : "-"}${tx.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
