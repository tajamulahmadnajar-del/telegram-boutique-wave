import { createFileRoute } from "@tanstack/react-router";
import { commissionSettings } from "@/lib/admin-mock-data";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Percent } from "lucide-react";

export const Route = createFileRoute("/admin/commissions")({
  component: AdminCommissions,
});

function AdminCommissions() {
  const [settings, setSettings] = useState(commissionSettings);

  const updateRate = (categoryId: string, rate: number) => {
    setSettings(settings.map(s => s.categoryId === categoryId ? { ...s, rate: Math.max(0, Math.min(100, rate)) } : s));
  };

  const avgRate = settings.reduce((s, c) => s + c.rate, 0) / settings.length;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Commission Settings</h2>

      <div className="rounded-xl border bg-card p-4 text-center">
        <Percent className="mx-auto h-6 w-6 text-primary" />
        <p className="mt-1 text-2xl font-bold">{avgRate.toFixed(1)}%</p>
        <p className="text-xs text-muted-foreground">Average Commission Rate</p>
      </div>

      <div className="rounded-xl border bg-card p-4">
        <h3 className="mb-3 text-sm font-semibold">Category Rates</h3>
        <div className="space-y-3">
          {settings.map(s => (
            <div key={s.categoryId} className="flex items-center justify-between">
              <span className="text-sm">{s.categoryName}</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={s.rate}
                  onChange={e => updateRate(s.categoryId, parseFloat(e.target.value) || 0)}
                  className="w-16 rounded border bg-background px-2 py-1 text-center text-sm"
                  min={0}
                  max={100}
                />
                <span className="text-sm text-muted-foreground">%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button className="w-full" onClick={() => toast.success("Commission rates saved (mock)")}>Save Changes</Button>
    </div>
  );
}
