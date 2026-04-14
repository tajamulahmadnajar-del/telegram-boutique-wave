import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

export const Route = createFileRoute("/seller/settings")({
  component: SellerSettings,
});

function SellerSettings() {
  const [shopName, setShopName] = useState("TechZone");
  const [description, setDescription] = useState("Premium electronics and gadgets at the best prices.");
  const [email, setEmail] = useState("techzone@example.com");
  const [phone, setPhone] = useState("+1 234 567 8900");
  const [upi, setUpi] = useState("techzone@upi");
  const [autoAccept, setAutoAccept] = useState(true);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Shop Settings</h2>

      <div className="rounded-xl border bg-card p-4 space-y-3">
        <h3 className="text-sm font-semibold">Shop Information</h3>
        <div>
          <label className="text-xs text-muted-foreground">Shop Name</label>
          <input value={shopName} onChange={e => setShopName(e.target.value)} className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm" rows={3} />
        </div>
      </div>

      <div className="rounded-xl border bg-card p-4 space-y-3">
        <h3 className="text-sm font-semibold">Contact</h3>
        <div>
          <label className="text-xs text-muted-foreground">Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Phone</label>
          <input value={phone} onChange={e => setPhone(e.target.value)} className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm" />
        </div>
      </div>

      <div className="rounded-xl border bg-card p-4 space-y-3">
        <h3 className="text-sm font-semibold">Payment</h3>
        <div>
          <label className="text-xs text-muted-foreground">UPI ID</label>
          <input value={upi} onChange={e => setUpi(e.target.value)} className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm" />
        </div>
      </div>

      <div className="rounded-xl border bg-card p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Auto-accept orders</p>
            <p className="text-xs text-muted-foreground">Automatically accept new orders</p>
          </div>
          <button onClick={() => setAutoAccept(!autoAccept)} className={`h-6 w-10 rounded-full transition-colors ${autoAccept ? "bg-primary" : "bg-muted"}`}>
            <div className={`h-5 w-5 rounded-full bg-white shadow transition-transform ${autoAccept ? "translate-x-4.5" : "translate-x-0.5"}`} />
          </button>
        </div>
      </div>

      <Button className="w-full" onClick={() => toast.success("Settings saved (mock)")}>Save Settings</Button>
    </div>
  );
}
