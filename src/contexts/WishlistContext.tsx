import { createContext, useContext, useState, type ReactNode } from "react";
import type { Product } from "@/lib/mock-data";
import { toast } from "sonner";

interface WishlistContextType {
  items: Product[];
  isWishlisted: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  const isWishlisted = (productId: string) => items.some((i) => i.id === productId);

  const toggleWishlist = (product: Product) => {
    if (isWishlisted(product.id)) {
      setItems((prev) => prev.filter((i) => i.id !== product.id));
      toast("Removed from wishlist");
    } else {
      setItems((prev) => [...prev, product]);
      toast.success("Added to wishlist ❤️");
    }
  };

  return (
    <WishlistContext.Provider value={{ items, isWishlisted, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
