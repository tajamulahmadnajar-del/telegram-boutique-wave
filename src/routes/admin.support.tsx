import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare, Clock, CheckCircle2, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/admin/support")({
  head: () => ({ meta: [{ title: "Support Tickets — Admin Panel" }] }),
  component: AdminSupportPage,
});

const tickets = [
  { id: "TKT-001", user: "Maria K.", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Maria", subject: "Order not delivered", message: "My order ORD-2024-003 shows delivered but I didn't receive it.", priority: "high" as const, status: "open" as const, date: "Apr 14, 2025" },
  { id: "TKT-002", user: "James L.", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=James", subject: "Payment failed", message: "I was charged but order was not placed.", priority: "high" as const, status: "open" as const, date: "Apr 13, 2025" },
  { id: "TKT-003", user: "David P.", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=David", subject: "Account access issue", message: "Cannot update my profile picture.", priority: "low" as const, status: "in-progress" as const, date: "Apr 12, 2025" },
  { id: "TKT-004", user: "Emily R.", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Emily", subject: "Refund inquiry", message: "When will I receive my refund for returned item?", priority: "medium" as const, status: "resolved" as const, date: "Apr 10, 2025" },
];

function AdminSupportPage() {
  const priorityColors: Record<string, string> = {
    high: "bg-red-500/10 text-red-500",
    medium: "bg-yellow-500/10 text-yellow-600",
    low: "bg-blue-500/10 text-blue-500",
  };
  const statusIcons: Record<string, typeof Clock> = {
    open: AlertCircle,
    "in-progress": Clock,
    resolved: CheckCircle2,
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Support Tickets</h2>

      <div className="grid grid-cols-3 gap-2 text-center">
        {[
          { label: "Open", count: 2, color: "text-red-500" },
          { label: "In Progress", count: 1, color: "text-yellow-600" },
          { label: "Resolved", count: 1, color: "text-emerald-600" },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border bg-card p-3">
            <p className={`text-xl font-bold ${s.color}`}>{s.count}</p>
            <p className="text-[10px] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {tickets.map((ticket) => {
          const StatusIcon = statusIcons[ticket.status] || AlertCircle;
          return (
            <div key={ticket.id} className="rounded-xl border bg-card p-4">
              <div className="flex items-start gap-3">
                <img src={ticket.avatar} alt={ticket.user} className="h-9 w-9 rounded-full" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">{ticket.subject}</p>
                    <span className={`rounded-full px-2 py-0.5 text-[9px] font-medium capitalize ${priorityColors[ticket.priority]}`}>
                      {ticket.priority}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{ticket.user} • {ticket.id}</p>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{ticket.message}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <StatusIcon className="h-3 w-3" />
                      <span className="capitalize">{ticket.status}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">{ticket.date}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
