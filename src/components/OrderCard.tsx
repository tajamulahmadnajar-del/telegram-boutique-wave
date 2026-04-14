import { ChevronRight } from "lucide-react";
import type { Order } from "@/lib/mock-data";
import { InternalNav } from "@/components/InternalNav";

const statusColors: Record<string, string> = {
  pending: "bg-warning/15 text-warning",
  processing: "bg-primary/15 text-primary",
  shipped: "bg-chart-2/15 text-chart-2",
  delivered: "bg-success/15 text-success",
};

export function OrderCard({ order }: { order: Order }) {
  return (
    <InternalNav
      to="/orders"
      search={{ id: order.id } as any}
      className="block w-full rounded-xl border bg-card p-4 text-left transition-shadow hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">{order.id}</p>
          <p className="text-xs text-muted-foreground">{order.date}</p>
        </div>
        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold capitalize ${statusColors[order.status] || ""}`}>
          {order.status}
        </span>
      </div>
      <div className="mt-3 flex items-center gap-2">
        {order.items.slice(0, 3).map((item) => (
          <img key={item.productId} src={item.image} alt={item.name} className="h-10 w-10 rounded-lg border object-cover" />
        ))}
        {order.items.length > 3 && (
          <span className="flex h-10 w-10 items-center justify-center rounded-lg border bg-secondary text-xs text-muted-foreground">
            +{order.items.length - 3}
          </span>
        )}
        <div className="ml-auto flex items-center gap-1">
          <span className="text-sm font-bold">${order.total.toFixed(2)}</span>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </InternalNav>
  );
}

export function OrderTimeline({ timeline }: { timeline: Order["timeline"] }) {
  return (
    <div className="space-y-0">
      {timeline.map((step, i) => (
        <div key={i} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className={`h-3 w-3 rounded-full border-2 ${i === timeline.length - 1 ? "border-primary bg-primary" : "border-muted-foreground bg-background"}`} />
            {i < timeline.length - 1 && <div className="w-0.5 flex-1 bg-border" />}
          </div>
          <div className="pb-4">
            <p className="text-sm font-medium">{step.status}</p>
            <p className="text-xs text-muted-foreground">{step.date}</p>
            <p className="text-xs text-muted-foreground">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
