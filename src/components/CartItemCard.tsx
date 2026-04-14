import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart, type CartItem as CartItemType } from "@/contexts/CartContext";
import { InternalNav } from "@/components/InternalNav";

export function CartItemCard({ item }: { item: CartItemType }) {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="flex gap-3 rounded-xl border bg-card p-3">
      <InternalNav to="/product/$productId" params={{ productId: item.product.id }} className="flex-shrink-0">
        <img src={item.product.image} alt={item.product.name} className="h-20 w-20 rounded-lg object-cover" />
      </InternalNav>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <InternalNav to="/product/$productId" params={{ productId: item.product.id }} className="text-left">
            <h3 className="line-clamp-1 text-sm font-medium">{item.product.name}</h3>
          </InternalNav>
          <p className="text-xs text-muted-foreground">{item.product.seller.name}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold">${(item.product.price * item.quantity).toFixed(2)}</span>
          <div className="flex items-center gap-2">
            <button onClick={() => removeFromCart(item.product.id)} className="rounded-full p-1 text-destructive transition-colors hover:bg-destructive/10">
              <Trash2 className="h-3.5 w-3.5" />
            </button>
            <div className="flex items-center gap-1 rounded-full bg-secondary">
              <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="flex h-6 w-6 items-center justify-center rounded-full transition-colors hover:bg-accent">
                <Minus className="h-3 w-3" />
              </button>
              <span className="min-w-5 text-center text-xs font-medium">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="flex h-6 w-6 items-center justify-center rounded-full transition-colors hover:bg-accent">
                <Plus className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
