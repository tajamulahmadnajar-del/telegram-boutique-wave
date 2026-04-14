import { useEffect, useState } from "react";
import type { Product } from "@/lib/mock-data";
import { ProductCard } from "./ProductCard";

interface FlashDealTimerProps {
  endsAt: string;
}

function CountdownTimer({ endsAt }: FlashDealTimerProps) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const update = () => {
      const diff = new Date(endsAt).getTime() - Date.now();
      if (diff <= 0) { setTimeLeft("Ended"); return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  return (
    <span className="rounded-md bg-destructive px-2 py-0.5 text-[10px] font-bold text-destructive-foreground">
      ⏰ {timeLeft}
    </span>
  );
}

export function FlashDealCard({ product }: { product: Product }) {
  return (
    <div className="relative">
      <ProductCard product={product} compact />
      {product.flashDealEnds && (
        <div className="absolute left-2 top-[calc(50%-8px)] z-10">
          <CountdownTimer endsAt={product.flashDealEnds} />
        </div>
      )}
    </div>
  );
}
