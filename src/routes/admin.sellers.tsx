import { createFileRoute } from "@tanstack/react-router";
import { sellerApplications } from "@/lib/admin-mock-data";
import { useState } from "react";
import { toast } from "sonner";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/sellers")({
  component: AdminSellers,
});

function AdminSellers() {
  const [apps, setApps] = useState(sellerApplications);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? apps : apps.filter(a => a.status === filter);

  const updateStatus = (id: string, status: "approved" | "rejected") => {
    setApps(apps.map(a => a.id === id ? { ...a, status } : a));
    toast.success(`Seller ${status}`);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Seller Applications</h2>

      <div className="flex gap-2">
        {["all", "pending", "approved", "rejected"].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            {f} {f === "pending" ? `(${apps.filter(a => a.status === "pending").length})` : ""}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(a => (
          <div key={a.id} className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-3">
              <img src={a.avatar} alt="" className="h-10 w-10 rounded-full" />
              <div className="flex-1">
                <p className="text-sm font-semibold">{a.name}</p>
                <p className="text-xs text-muted-foreground">{a.email}</p>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${
                a.status === "pending" ? "bg-warning/10 text-warning" :
                a.status === "approved" ? "bg-success/10 text-success" :
                "bg-destructive/10 text-destructive"
              }`}>{a.status}</span>
            </div>
            <div className="mt-3 rounded-lg bg-muted/50 p-3">
              <p className="text-sm font-medium">{a.shopName}</p>
              <p className="text-xs text-muted-foreground">Category: {a.category}</p>
              <p className="mt-1 text-xs text-muted-foreground">{a.description}</p>
              <p className="mt-1 text-xs text-muted-foreground">Applied: {a.appliedDate}</p>
            </div>
            {a.status === "pending" && (
              <div className="mt-3 flex gap-2">
                <Button size="sm" className="flex-1" onClick={() => updateStatus(a.id, "approved")}>
                  <Check className="h-3.5 w-3.5" /> Approve
                </Button>
                <Button size="sm" variant="destructive" className="flex-1" onClick={() => updateStatus(a.id, "rejected")}>
                  <X className="h-3.5 w-3.5" /> Reject
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
