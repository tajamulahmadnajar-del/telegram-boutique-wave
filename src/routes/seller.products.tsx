import { createFileRoute } from "@tanstack/react-router";
import { sellerProducts } from "@/lib/admin-mock-data";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/seller/products")({
  component: SellerProducts,
});

function SellerProducts() {
  const [prods, setProds] = useState(sellerProducts);
  const [showForm, setShowForm] = useState(false);

  const handleDelete = (id: string) => {
    setProds(prods.filter(p => p.id !== id));
    toast.success("Product deleted");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Products ({prods.length})</h2>
        <Button size="sm" onClick={() => setShowForm(!showForm)}>
          <Plus className="h-3.5 w-3.5" /> Add
        </Button>
      </div>

      {showForm && (
        <div className="rounded-xl border bg-card p-4 space-y-3">
          <h3 className="text-sm font-semibold">Add New Product</h3>
          <input placeholder="Product name" className="w-full rounded-lg border bg-background px-3 py-2 text-sm" />
          <input placeholder="Price" type="number" className="w-full rounded-lg border bg-background px-3 py-2 text-sm" />
          <textarea placeholder="Description" className="w-full rounded-lg border bg-background px-3 py-2 text-sm" rows={3} />
          <input placeholder="Image URL" className="w-full rounded-lg border bg-background px-3 py-2 text-sm" />
          <div className="flex gap-2">
            <Button size="sm" onClick={() => { setShowForm(false); toast.success("Product added (mock)"); }}>Save</Button>
            <Button size="sm" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {prods.map((p) => (
          <div key={p.id} className="flex gap-3 rounded-xl border bg-card p-3">
            <img src={p.image} alt={p.name} className="h-16 w-16 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium">{p.name}</p>
              <p className="text-sm font-bold text-primary">${p.price.toFixed(2)}</p>
              <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-0.5"><Eye className="h-3 w-3" />{p.views}</span>
                <span>{p.salesCount} sold</span>
                <span className="text-success">${p.revenue}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <button className="rounded-md p-1.5 hover:bg-accent"><Edit className="h-3.5 w-3.5 text-muted-foreground" /></button>
              <button className="rounded-md p-1.5 hover:bg-destructive/10" onClick={() => handleDelete(p.id)}>
                <Trash2 className="h-3.5 w-3.5 text-destructive" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
