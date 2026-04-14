import { createFileRoute } from "@tanstack/react-router";
import { reviews } from "@/lib/mock-data";
import { Star } from "lucide-react";

export const Route = createFileRoute("/seller/reviews")({
  component: SellerReviews,
});

function SellerReviews() {
  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const distribution = [5, 4, 3, 2, 1].map(n => ({
    stars: n,
    count: reviews.filter(r => r.rating === n).length,
    pct: (reviews.filter(r => r.rating === n).length / reviews.length) * 100,
  }));

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Reviews</h2>

      {/* Summary */}
      <div className="rounded-xl border bg-card p-4 text-center">
        <p className="text-4xl font-bold">{avgRating.toFixed(1)}</p>
        <div className="mt-1 flex items-center justify-center gap-0.5">
          {[1, 2, 3, 4, 5].map(s => (
            <Star key={s} className={`h-4 w-4 ${s <= Math.round(avgRating) ? "fill-warning text-warning" : "text-muted"}`} />
          ))}
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{reviews.length} reviews</p>
      </div>

      {/* Distribution */}
      <div className="rounded-xl border bg-card p-4">
        {distribution.map(d => (
          <div key={d.stars} className="mb-2 flex items-center gap-2">
            <span className="w-4 text-xs text-right">{d.stars}</span>
            <Star className="h-3 w-3 fill-warning text-warning" />
            <div className="h-2 flex-1 rounded-full bg-muted">
              <div className="h-2 rounded-full bg-warning" style={{ width: `${d.pct}%` }} />
            </div>
            <span className="w-6 text-xs text-muted-foreground">{d.count}</span>
          </div>
        ))}
      </div>

      {/* Review list */}
      <div className="space-y-3">
        {reviews.map(r => (
          <div key={r.id} className="rounded-xl border bg-card p-3">
            <div className="flex items-center gap-2">
              <img src={r.userAvatar} alt="" className="h-8 w-8 rounded-full" />
              <div className="flex-1">
                <p className="text-sm font-medium">{r.userName}</p>
                <p className="text-xs text-muted-foreground">{r.date}</p>
              </div>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} className={`h-3 w-3 ${s <= r.rating ? "fill-warning text-warning" : "text-muted"}`} />
                ))}
              </div>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
