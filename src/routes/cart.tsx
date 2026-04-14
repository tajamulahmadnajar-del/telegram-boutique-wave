import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/contexts/CartContext";
import { CartItemCard } from "@/components/CartItemCard";
import { ShoppingCart, Tag } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — TG Market" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, subtotal, total, discount, coupon, applyCoupon, itemCount } = useCart();
  const [couponInput, setCouponInput] = useState("");

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
        <ShoppingCart className="h-16 w-16 text-muted-foreground/30" />
        <h2 className="mt-4 text-lg font-semibold">Your cart is empty</h2>
        <p className="mt-1 text-sm text-muted-foreground">Add some products to get started</p>
        <Link to="/" className="mt-4 rounded-full bg-primary px-6 py-2 text-sm font-medium text-primary-foreground">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-36">
      <div className="px-4 pt-3">
        <h1 className="text-lg font-bold">Cart ({itemCount})</h1>
      </div>

      <div className="mt-3 space-y-2.5 px-4">
        {items.map((item) => <CartItemCard key={item.product.id} item={item} />)}
      </div>

      <div className="mt-4 px-4">
        <div className="flex gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-full border bg-card px-3 py-2">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <input
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              placeholder="Coupon code"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <button onClick={() => { applyCoupon(couponInput); setCouponInput(""); }} className="rounded-full bg-secondary px-4 text-sm font-medium">
            Apply
          </button>
        </div>
        {coupon && discount > 0 && (
          <p className="mt-1.5 text-xs text-success">✓ Coupon "{coupon}" applied — {discount}% off</p>
        )}
      </div>

      <div className="fixed bottom-16 left-0 right-0 z-30 border-t bg-card px-4 py-3 safe-bottom">
        <div className="mx-auto max-w-lg">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-xs text-success">
              <span>Discount ({discount}%)</span>
              <span>-${((subtotal * discount) / 100).toFixed(2)}</span>
            </div>
          )}
          <div className="mt-1 flex items-center justify-between">
            <span className="text-sm font-bold">Total</span>
            <span className="text-lg font-bold">${total.toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="mt-2 flex w-full items-center justify-center rounded-full bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-transform active:scale-[0.98]">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
