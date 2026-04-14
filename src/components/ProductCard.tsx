import { Heart, Plus, Star } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import type { Product } from "@/lib/mock-data";
import { InternalNav } from "@/components/InternalNav";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export function ProductCard({ product, compact }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  return (
    <div className="group relative overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md">
      <InternalNav to="/product/$productId" params={{ productId: product.id }} className="block w-full">
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
          {discount > 0 && (
            <span className="absolute left-2 top-2 rounded-full bg-destructive px-2 py-0.5 text-[10px] font-bold text-destructive-foreground">
              -{discount}%
            </span>
          )}
        </div>
      </InternalNav>

      <button
        onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
        className="absolute right-2 top-2 rounded-full bg-card/80 p-1.5 backdrop-blur-sm transition-colors"
      >
        <Heart className={`h-4 w-4 ${isWishlisted(product.id) ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
      </button>

      <div className={`p-2.5 ${compact ? "p-2" : ""}`}>
        <InternalNav to="/product/$productId" params={{ productId: product.id }} className="text-left">
          <h3 className="line-clamp-2 text-xs font-medium leading-tight">{product.name}</h3>
        </InternalNav>
        <div className="mt-1 flex items-center gap-1">
          <Star className="h-3 w-3 fill-warning text-warning" />
          <span className="text-[10px] text-muted-foreground">{product.rating} ({product.reviewCount})</span>
        </div>
        <div className="mt-1.5 flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-bold">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-[10px] text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <button
            onClick={() => addToCart(product)}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform active:scale-90"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
