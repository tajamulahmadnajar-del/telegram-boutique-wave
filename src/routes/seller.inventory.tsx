import { createFileRoute } from "@tanstack/react-router";
import { sellerProducts } from "@/lib/admin-mock-data";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/seller/inventory")({
  component: SellerInventory,
});

function SellerInventory() {
  const [products, setProducts] = useState(sellerProducts);

  const updateStock = (id: string, stock: number) => {
    setProducts(products.map(p => p.id === id ? { ...p, stock: Math.max(0, stock) } : p));
    toast.success("Stock updated");
  };

  const lowStock = products.filter(p => p.stock < 20);
  const inStock = products.filter(p => p.stock >= 20);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Inventory</h2>

      {lowStock.length > 0 && (
        <div className="rounded-xl border border-warning/30 bg-warning/10 p-3">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <span className="text-sm font-semibold">Low Stock Alert ({lowStock.length})</span>
          </div>
          <div className="space-y-2">
            {lowStock.map(p => (
              <div key={p.id} className="flex items-center justify-between rounded-lg bg-card px-3 py-2">
                <div className="flex items-center gap-2">
                  <img src={p.image} alt="" className="h-8 w-8 rounded object-cover" />
                  <div>
                    <p className="text-sm font-medium">{p.name}</p>
                    <p className="text-xs text-destructive">{p.stock} left</p>
                  </div>
                </div>
                <input
                  type="number"
                  value={p.stock}
                  onChange={e => updateStock(p.id, parseInt(e.target.value) || 0)}
                  className="w-16 rounded border bg-background px-2 py-1 text-center text-sm"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-xl border bg-card p-3">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle className="h-4 w-4 text-success" />
          <span className="text-sm font-semibold">In Stock ({inStock.length})</span>
        </div>
        <div className="space-y-2">
          {inStock.map(p => (
            <div key={p.id} className="flex items-center justify-between rounded-lg border px-3 py-2">
              <div className="flex items-center gap-2">
                <img src={p.image} alt="" className="h-8 w-8 rounded object-cover" />
                <div>
                  <p className="text-sm font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.stock} units</p>
                </div>
              </div>
              <input
                type="number"
                value={p.stock}
                onChange={e => updateStock(p.id, parseInt(e.target.value) || 0)}
                className="w-16 rounded border bg-background px-2 py-1 text-center text-sm"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
