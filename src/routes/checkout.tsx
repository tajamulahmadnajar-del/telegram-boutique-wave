import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { toast } from "sonner";
import { MapPin, CreditCard, Banknote, Wallet, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — TG Market" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState({ name: "", phone: "", street: "", city: "", zip: "" });
  const [paymentMethod, setPaymentMethod] = useState("upi");

  const payments = [
    { id: "upi", label: "UPI", icon: CreditCard },
    { id: "cod", label: "Cash on Delivery", icon: Banknote },
    { id: "wallet", label: "Wallet", icon: Wallet },
  ];

  const handleConfirm = () => {
    if (!address.name || !address.phone || !address.street) {
      toast.error("Please fill in delivery details");
      return;
    }
    toast.success("Order placed successfully! 🎉");
    clearCart();
    navigate({ to: "/orders", search: { id: "" } });
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-4xl">🛒</p>
        <h2 className="mt-3 text-lg font-semibold">Cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="pb-28">
      <div className="px-4 pt-3">
        <h1 className="text-lg font-bold">Checkout</h1>
      </div>

      {/* Address */}
      <div className="mx-4 mt-4 rounded-xl border bg-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold">Delivery Address</h2>
        </div>
        <div className="space-y-2.5">
          {[
            { key: "name", placeholder: "Full Name", type: "text" },
            { key: "phone", placeholder: "Phone Number", type: "tel" },
            { key: "street", placeholder: "Street Address", type: "text" },
            { key: "city", placeholder: "City", type: "text" },
            { key: "zip", placeholder: "ZIP Code", type: "text" },
          ].map((field) => (
            <input
              key={field.key}
              type={field.type}
              placeholder={field.placeholder}
              value={address[field.key as keyof typeof address]}
              onChange={(e) => setAddress({ ...address, [field.key]: e.target.value })}
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-primary"
            />
          ))}
        </div>
      </div>

      {/* Payment */}
      <div className="mx-4 mt-4 rounded-xl border bg-card p-4">
        <h2 className="text-sm font-semibold mb-3">Payment Method</h2>
        <div className="space-y-2">
          {payments.map((pm) => (
            <button key={pm.id} onClick={() => setPaymentMethod(pm.id)} className={`flex w-full items-center gap-3 rounded-lg border p-3 transition-colors ${paymentMethod === pm.id ? "border-primary bg-primary/5" : ""}`}>
              <pm.icon className={`h-5 w-5 ${paymentMethod === pm.id ? "text-primary" : "text-muted-foreground"}`} />
              <span className="flex-1 text-left text-sm font-medium">{pm.label}</span>
              <div className={`h-4 w-4 rounded-full border-2 ${paymentMethod === pm.id ? "border-primary bg-primary" : "border-muted-foreground"}`}>
                {paymentMethod === pm.id && <div className="h-full w-full rounded-full border-2 border-card" />}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="mx-4 mt-4 rounded-xl border bg-card p-4">
        <h2 className="text-sm font-semibold mb-3">Order Summary</h2>
        {items.map((item) => (
          <div key={item.product.id} className="flex items-center justify-between py-1.5">
            <span className="text-xs text-muted-foreground">{item.product.name} × {item.quantity}</span>
            <span className="text-xs font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="mt-2 border-t pt-2 flex items-center justify-between">
          <span className="text-sm font-bold">Total</span>
          <span className="text-base font-bold">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Confirm */}
      <div className="fixed bottom-16 left-0 right-0 z-30 border-t bg-card px-4 py-3 safe-bottom">
        <div className="mx-auto max-w-lg">
          <button onClick={handleConfirm} className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground transition-transform active:scale-[0.98]">
            Confirm Order — ${total.toFixed(2)}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
