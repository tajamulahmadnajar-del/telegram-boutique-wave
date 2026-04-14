import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/seller/customers")({
  head: () => ({ meta: [{ title: "Customers — Seller Panel" }] }),
  component: SellerCustomersPage,
});

const customers = [
  { id: "c1", name: "Maria K.", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Maria", orders: 5, totalSpent: 249.95, lastOrder: "Apr 14, 2025" },
  { id: "c2", name: "James L.", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=James", orders: 3, totalSpent: 159.97, lastOrder: "Apr 13, 2025" },
  { id: "c3", name: "David P.", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=David", orders: 2, totalSpent: 129.98, lastOrder: "Apr 10, 2025" },
  { id: "c4", name: "Sarah M.", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah", orders: 4, totalSpent: 399.96, lastOrder: "Apr 5, 2025" },
  { id: "c5", name: "Emily R.", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Emily", orders: 1, totalSpent: 39.99, lastOrder: "Apr 1, 2025" },
];

function SellerCustomersPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Customers ({customers.length})</h2>

      <div className="space-y-3">
        {customers.map((customer) => (
          <div key={customer.id} className="flex items-center gap-3 rounded-xl border bg-card p-4">
            <img src={customer.avatar} alt={customer.name} className="h-10 w-10 rounded-full" />
            <div className="flex-1">
              <p className="text-sm font-semibold">{customer.name}</p>
              <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1"><ShoppingBag className="h-3 w-3" /> {customer.orders} orders</span>
                <span>•</span>
                <span>${customer.totalSpent.toFixed(2)} spent</span>
              </div>
              <p className="text-[10px] text-muted-foreground">Last order: {customer.lastOrder}</p>
            </div>
            <button className="rounded-full bg-primary/10 p-2 transition-colors hover:bg-primary/20">
              <MessageCircle className="h-4 w-4 text-primary" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
