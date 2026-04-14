import { createContext, useContext, useReducer, type ReactNode } from "react";
import type { Product } from "@/lib/mock-data";
import { toast } from "sonner";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  coupon: string | null;
  discount: number;
}

type CartAction =
  | { type: "ADD"; product: Product; quantity?: number }
  | { type: "REMOVE"; productId: string }
  | { type: "UPDATE_QTY"; productId: string; quantity: number }
  | { type: "CLEAR" }
  | { type: "APPLY_COUPON"; code: string };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find((i) => i.product.id === action.product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + (action.quantity || 1) }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, { product: action.product, quantity: action.quantity || 1 }] };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter((i) => i.product.id !== action.productId) };
    case "UPDATE_QTY":
      if (action.quantity <= 0) return { ...state, items: state.items.filter((i) => i.product.id !== action.productId) };
      return { ...state, items: state.items.map((i) => (i.product.id === action.productId ? { ...i, quantity: action.quantity } : i)) };
    case "CLEAR":
      return { items: [], coupon: null, discount: 0 };
    case "APPLY_COUPON":
      return { ...state, coupon: action.code, discount: action.code === "SAVE10" ? 10 : action.code === "SAVE20" ? 20 : 0 };
    default:
      return state;
  }
}

interface CartContextType {
  items: CartItem[];
  coupon: string | null;
  discount: number;
  subtotal: number;
  total: number;
  itemCount: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], coupon: null, discount: 0 });

  const subtotal = state.items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const discountAmount = (subtotal * state.discount) / 100;
  const total = subtotal - discountAmount;
  const itemCount = state.items.reduce((s, i) => s + i.quantity, 0);

  const addToCart = (product: Product, quantity?: number) => {
    dispatch({ type: "ADD", product, quantity });
    toast.success(`${product.name} added to cart`);
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: "REMOVE", productId });
    toast("Item removed from cart");
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QTY", productId, quantity });
  };

  const clearCart = () => dispatch({ type: "CLEAR" });

  const applyCoupon = (code: string) => {
    dispatch({ type: "APPLY_COUPON", code });
    if (code === "SAVE10" || code === "SAVE20") {
      toast.success(`Coupon applied! ${code === "SAVE10" ? "10" : "20"}% off`);
    } else {
      toast.error("Invalid coupon code");
    }
  };

  return (
    <CartContext.Provider value={{ items: state.items, coupon: state.coupon, discount: state.discount, subtotal, total, itemCount, addToCart, removeFromCart, updateQuantity, clearCart, applyCoupon }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
