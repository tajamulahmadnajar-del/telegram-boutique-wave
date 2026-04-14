import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { OrderCard, OrderTimeline } from "@/components/OrderCard";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Package } from "lucide-react";
import type { Order } from "@/lib/mock-data";

export const Route = createFileRoute("/orders")({
  head: () => ({ meta: [{ title: "Orders — TG Market" }] }),
  validateSearch: (search: Record<string, unknown>) => ({
    id: (search.id as string) || "",
  }),
  component: OrdersPage,
});

function OrdersPage() {
  const { id } = Route.useSearch();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      api.getOrder(id).then((o) => { setSelectedOrder(o || null); setLoading(false); });
    } else {
      api.getOrders().then((o) => { setOrders(o); setLoading(false); });
    }
  }, [id]);

  if (loading) {
    return <div className="space-y-3 p-4">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-xl" />)}</div>;
  }

  if (selectedOrder) {
    return (
      <div className="p-4">
        <button onClick={() => window.history.back()} className="mb-3 flex items-center gap-1 text-sm text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to Orders
        </button>
        <div className="rounded-xl border bg-card p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold">{selectedOrder.id}</h2>
            <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-[10px] font-semibold capitalize text-primary">{selectedOrder.status}</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{selectedOrder.address}</p>

          <div className="mt-4 space-y-2">
            {selectedOrder.items.map((item) => (
              <div key={item.productId} className="flex items-center gap-3">
                <img src={item.image} alt={item.name} className="h-12 w-12 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="text-xs font-medium">{item.name}</p>
                  <p className="text-[10px] text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <span className="text-xs font-bold">${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="mt-3 border-t pt-3 flex justify-between">
            <span className="text-sm font-medium">Total</span>
            <span className="text-sm font-bold">${selectedOrder.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-4 rounded-xl border bg-card p-4">
          <h3 className="mb-3 text-sm font-bold">Order Timeline</h3>
          <OrderTimeline timeline={selectedOrder.timeline} />
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <Package className="h-16 w-16 text-muted-foreground/30" />
        <h2 className="mt-4 text-lg font-semibold">No orders yet</h2>
        <p className="mt-1 text-sm text-muted-foreground">Your order history will appear here</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="mb-4 text-lg font-bold">My Orders</h1>
      <div className="space-y-3">
        {orders.map((order) => <OrderCard key={order.id} order={order} />)}
      </div>
    </div>
  );
}
