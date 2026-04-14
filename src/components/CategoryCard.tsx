import { Link } from "@tanstack/react-router";
import type { Category } from "@/lib/mock-data";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      to="/categories"
      search={{ cat: category.id } as any}
      className="group flex flex-col items-center gap-1.5"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-2xl transition-transform group-active:scale-95">
        {category.icon}
      </div>
      <span className="text-[10px] font-medium text-foreground">{category.name}</span>
    </Link>
  );
}

export function CategoryGridCard({ category }: { category: Category }) {
  return (
    <Link
      to="/categories"
      search={{ cat: category.id } as any}
      className="group relative overflow-hidden rounded-xl"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img src={category.image} alt={category.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <div className="text-lg">{category.icon}</div>
          <h3 className="text-sm font-semibold text-white">{category.name}</h3>
          <p className="text-[10px] text-white/70">{category.productCount} products</p>
        </div>
      </div>
    </Link>
  );
}
