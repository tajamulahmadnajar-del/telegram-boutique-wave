import { Star } from "lucide-react";
import type { Review } from "@/lib/mock-data";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="rounded-xl border bg-card p-3">
      <div className="flex items-center gap-2.5">
        <img src={review.userAvatar} alt={review.userName} className="h-8 w-8 rounded-full" />
        <div className="flex-1">
          <p className="text-sm font-medium">{review.userName}</p>
          <p className="text-[10px] text-muted-foreground">{review.date}</p>
        </div>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-3 w-3 ${i < review.rating ? "fill-warning text-warning" : "text-border"}`} />
          ))}
        </div>
      </div>
      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{review.comment}</p>
    </div>
  );
}
