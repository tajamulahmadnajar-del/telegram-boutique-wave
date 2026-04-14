import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { CategoryGridCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { SlidersHorizontal, X } from "lucide-react";
import type { Product, Category } from "@/lib/mock-data";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories — TG Market" },
      { name: "description", content: "Browse all product categories" },
    ],
  }),
  validateSearch: (search: Record<string, unknown>) => ({
    cat: (search.cat as string) || "",
    q: (search.q as string) || "",
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  const { cat, q } = Route.useSearch();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    setLoading(true);
    if (cat || q) {
      api.getProducts({ category: cat || undefined, search: q || undefined, sort: sort || undefined, minPrice: priceRange[0] > 0 ? priceRange[0] : undefined, maxPrice: priceRange[1] < 500 ? priceRange[1] : undefined, minRating: minRating > 0 ? minRating : undefined })
        .then((p) => { setProducts(p); setLoading(false); });
    } else {
      api.getCategories().then((c) => { setCategories(c); setLoading(false); });
    }
  }, [cat, q, sort, priceRange, minRating]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 p-4">
        {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="aspect-[3/4] rounded-xl" />)}
      </div>
    );
  }

  if (!cat && !q) {
    return (
      <div className="p-4">
        <h1 className="mb-4 text-lg font-bold">All Categories</h1>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((c) => <CategoryGridCard key={c.id} category={c} />)}
        </div>
      </div>
    );
  }

  const selectedCategory = categories.length > 0 ? categories.find((c) => c.id === cat) : null;

  return (
    <div className="pb-2">
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className="text-base font-bold">{q ? `Results for "${q}"` : selectedCategory?.name || cat}</h1>
        <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium">
          <SlidersHorizontal className="h-3.5 w-3.5" /> Filter
        </button>
      </div>

      {showFilters && (
        <div className="mx-4 mb-3 rounded-xl border bg-card p-3 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold">Filters</span>
            <button onClick={() => setShowFilters(false)}><X className="h-4 w-4" /></button>
          </div>
          <div>
            <label className="text-[10px] font-medium text-muted-foreground">Sort</label>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {[["", "Default"], ["price_asc", "Low → High"], ["price_desc", "High → Low"], ["popular", "Popular"]].map(([v, l]) => (
                <button key={v} onClick={() => setSort(v)} className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${sort === v ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>{l}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[10px] font-medium text-muted-foreground">Min Rating</label>
            <div className="mt-1 flex gap-1.5">
              {[0, 3, 4, 4.5].map((r) => (
                <button key={r} onClick={() => setMinRating(r)} className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${minRating === r ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
                  {r === 0 ? "All" : `${r}+⭐`}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-4xl">🔍</p>
          <p className="mt-2 text-sm font-medium">No products found</p>
          <p className="text-xs text-muted-foreground">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 px-4">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
