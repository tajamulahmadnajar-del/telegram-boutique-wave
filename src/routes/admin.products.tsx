import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/lib/mock-data";
import { useState } from "react";
import { toast } from "sonner";
import { Search, Eye, EyeOff, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/products")({
  component: AdminProducts,
});

function AdminProducts() {
  const [prods, setProds] = useState(products.map(p => ({ ...p, visible: true })));
  const [search, setSearch] = useState("");

  const filtered = prods.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.seller.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleVisibility = (id: string) => {
    setProds(prods.map(p => p.id === id ? { ...p, visible: !p.visible } : p));
    toast.success("Product visibility toggled");
  };

  const removeProduct = (id: string) => {
    setProds(prods.filter(p => p.id !== id));
    toast.success("Product removed");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Product Moderation ({prods.length})</h2>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products or sellers..." className="w-full rounded-lg border bg-background pl-9 pr-3 py-2 text-sm" />
      </div>

      <div className="space-y-2">
        {filtered.map(p => (
          <div key={p.id} className={`flex gap-3 rounded-xl border bg-card p-3 ${!p.visible ? "opacity-50" : ""}`}>
            <img src={p.image} alt="" className="h-14 w-14 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium">{p.name}</p>
              <p className="text-xs text-muted-foreground">by {p.seller.name}</p>
              <div className="mt-0.5 flex items-center gap-2">
                <span className="text-sm font-bold text-primary">${p.price.toFixed(2)}</span>
                <span className="text-xs text-muted-foreground">⭐ {p.rating}</span>
                <span className="text-xs text-muted-foreground">{p.stock} in stock</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <button onClick={() => toggleVisibility(p.id)} className="rounded-md p-1.5 hover:bg-accent">
                {p.visible ? <Eye className="h-3.5 w-3.5 text-muted-foreground" /> : <EyeOff className="h-3.5 w-3.5 text-muted-foreground" />}
              </button>
              <button onClick={() => removeProduct(p.id)} className="rounded-md p-1.5 hover:bg-destructive/10">
                <Trash2 className="h-3.5 w-3.5 text-destructive" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
