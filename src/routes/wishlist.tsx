import { createFileRoute, Link } from "@tanstack/react-router";
import { useWishlist } from "@/contexts/WishlistContext";
import { ProductCard } from "@/components/ProductCard";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — TG Market" }] }),
  component: WishlistPage,
});

function WishlistPage() {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <Heart className="h-16 w-16 text-muted-foreground/30" />
        <h2 className="mt-4 text-lg font-semibold">Your wishlist is empty</h2>
        <p className="mt-1 text-sm text-muted-foreground">Save products you love here</p>
        <Link to="/" className="mt-4 rounded-full bg-primary px-6 py-2 text-sm font-medium text-primary-foreground">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="mb-4 text-lg font-bold">Wishlist ({items.length})</h1>
      <div className="grid grid-cols-2 gap-3">
        {items.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
