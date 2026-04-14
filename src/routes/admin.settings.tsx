import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({ meta: [{ title: "Settings — Admin Panel" }] }),
  component: AdminSettingsPage,
});

function AdminSettingsPage() {
  const [siteName, setSiteName] = useState("TG Market");
  const [supportEmail, setSupportEmail] = useState("support@tgmarket.com");
  const [minOrderAmount, setMinOrderAmount] = useState("10");
  const [freeShipThreshold, setFreeShipThreshold] = useState("50");
  const [maintenance, setMaintenance] = useState(false);
  const [newRegistrations, setNewRegistrations] = useState(true);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Platform Settings</h2>

      <div className="space-y-4">
        {/* General */}
        <div className="rounded-xl border bg-card p-4">
          <h3 className="text-sm font-semibold mb-3">General</h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground">Site Name</label>
              <input value={siteName} onChange={(e) => setSiteName(e.target.value)} className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Support Email</label>
              <input value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>
        </div>

        {/* Commerce */}
        <div className="rounded-xl border bg-card p-4">
          <h3 className="text-sm font-semibold mb-3">Commerce</h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground">Minimum Order Amount ($)</label>
              <input type="number" value={minOrderAmount} onChange={(e) => setMinOrderAmount(e.target.value)} className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Free Shipping Threshold ($)</label>
              <input type="number" value={freeShipThreshold} onChange={(e) => setFreeShipThreshold(e.target.value)} className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>
        </div>

        {/* Toggles */}
        <div className="rounded-xl border bg-card p-4">
          <h3 className="text-sm font-semibold mb-3">System</h3>
          <div className="space-y-3">
            {[
              { label: "Maintenance Mode", desc: "Temporarily disable the store", value: maintenance, setter: setMaintenance },
              { label: "New Registrations", desc: "Allow new user sign-ups", value: newRegistrations, setter: setNewRegistrations },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-[11px] text-muted-foreground">{item.desc}</p>
                </div>
                <button onClick={() => item.setter(!item.value)} className={`relative h-6 w-11 rounded-full transition-colors ${item.value ? "bg-primary" : "bg-muted"}`}>
                  <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${item.value ? "translate-x-5" : ""}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button className="w-full rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground">
          Save Changes
        </button>
      </div>
    </div>
  );
}
