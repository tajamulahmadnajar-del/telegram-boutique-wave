import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { ReviewCard } from "@/components/ReviewCard";
import { StarRating } from "@/components/StarRating";
import { QuantitySelector } from "@/components/QuantitySelector";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, ShoppingCart, Share2, Store, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import type { Product, Review } from "@/lib/mock-data";
import { InternalNav } from "@/components/InternalNav";

export const Route = createFileRoute("/product/$productId")({
  head: () => ({ meta: [{ title: "Product — TG Market" }] }),
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { productId } = Route.useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  useEffect(() => {
    Promise.all([api.getProduct(productId), api.getReviews(productId)])
      .then(([p, r]) => { setProduct(p || null); setReviews(r); setLoading(false); });
  }, [productId]);

  if (loading) {
    return (
      <div>
        <Skeleton className="aspect-square w-full" />
        <div className="space-y-3 p-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-4xl">😕</p>
        <h2 className="mt-3 text-lg font-semibold">Product not found</h2>
        <InternalNav to="/" className="mt-3 text-sm text-primary">Go back home</InternalNav>
      </div>
    );
  }

  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  return (
    <div className="pb-24">
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img src={product.images[currentImage]} alt={product.name} className="h-full w-full object-cover" />
        <button onClick={() => window.history.back()} className="absolute left-3 top-3 rounded-full bg-card/80 p-2 backdrop-blur-sm">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="absolute right-3 top-3 flex gap-2">
          <button onClick={() => toggleWishlist(product)} className="rounded-full bg-card/80 p-2 backdrop-blur-sm">
            <Heart className={`h-5 w-5 ${isWishlisted(product.id) ? "fill-destructive text-destructive" : ""}`} />
          </button>
          <button onClick={() => { navigator.clipboard?.writeText(window.location.href); toast("Link copied!"); }} className="rounded-full bg-card/80 p-2 backdrop-blur-sm">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
        {product.images.length > 1 && (
          <>
            <button onClick={() => setCurrentImage((c) => (c - 1 + product.images.length) % product.images.length)} className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-card/60 p-1"><ChevronRight className="h-4 w-4 rotate-180" /></button>
            <button onClick={() => setCurrentImage((c) => (c + 1) % product.images.length)} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-card/60 p-1"><ChevronRight className="h-4 w-4" /></button>
            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
              {product.images.map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all ${i === currentImage ? "w-4 bg-white" : "w-1.5 bg-white/50"}`} />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="space-y-4 p-4">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <>
                <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
                <span className="rounded-full bg-destructive/15 px-2 py-0.5 text-[10px] font-bold text-destructive">-{discount}%</span>
              </>
            )}
          </div>
          <h1 className="mt-1.5 text-base font-semibold">{product.name}</h1>
          <div className="mt-1 flex items-center gap-2">
            <StarRating rating={Math.round(product.rating)} size="sm" />
            <span className="text-xs text-muted-foreground">{product.rating} ({product.reviewCount} reviews)</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${product.stock > 10 ? "bg-success" : product.stock > 0 ? "bg-warning" : "bg-destructive"}`} />
          <span className="text-xs text-muted-foreground">{product.stock > 10 ? "In Stock" : product.stock > 0 ? `Only ${product.stock} left` : "Out of Stock"}</span>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Description</h3>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{product.description}</p>
        </div>

        <div className="flex items-center gap-3 rounded-xl border bg-card p-3">
          <img src={product.seller.avatar} alt={product.seller.name} className="h-10 w-10 rounded-full" />
          <div className="flex-1">
            <div className="flex items-center gap-1">
              <Store className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-sm font-medium">{product.seller.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <StarRating rating={Math.round(product.seller.rating)} size="sm" />
              <span className="text-[10px] text-muted-foreground">{product.seller.rating}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Reviews ({reviews.length})</h3>
          <div className="mt-2 space-y-2">
            {reviews.slice(0, 3).map((r) => <ReviewCard key={r.id} review={r} />)}
          </div>
        </div>
      </div>

      <div className="fixed bottom-16 left-0 right-0 z-30 border-t bg-card px-4 py-3 safe-bottom">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <QuantitySelector value={quantity} onChange={setQuantity} max={product.stock} />
          <button onClick={() => addToCart(product, quantity)} disabled={product.stock === 0} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-transform active:scale-[0.98] disabled:opacity-50">
            <ShoppingCart className="h-4 w-4" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
