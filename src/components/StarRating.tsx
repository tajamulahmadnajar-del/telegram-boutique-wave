import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  onChange?: (rating: number) => void;
  size?: "sm" | "md" | "lg";
}

export function StarRating({ rating, onChange, size = "md" }: StarRatingProps) {
  const sizeClass = size === "sm" ? "h-3.5 w-3.5" : size === "lg" ? "h-6 w-6" : "h-5 w-5";

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <button
          key={i}
          type="button"
          disabled={!onChange}
          onClick={() => onChange?.(i + 1)}
          className={onChange ? "cursor-pointer transition-transform active:scale-110" : "cursor-default"}
        >
          <Star className={`${sizeClass} ${i < rating ? "fill-warning text-warning" : "text-border"}`} />
        </button>
      ))}
    </div>
  );
}
