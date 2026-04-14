import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { BannerSlider } from "@/components/BannerSlider";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { FlashDealCard } from "@/components/FlashDealCard";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";
import { InternalNav } from "@/components/InternalNav";
import type { Product, Category } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TG Market — Your Marketplace" },
      { name: "description", content: "Shop the best deals on electronics, fashion, home and more." },
    ],
  }),
  component: HomePage,
});

function SectionHeader({ title, linkTo }: { title: string; linkTo?: string }) {
  return (
    <div className="flex items-center justify-between px-4 pt-5 pb-2">
      <h2 className="text-base font-bold">{title}</h2>
      {linkTo && (
        <InternalNav to={linkTo as any} className="flex items-center gap-0.5 text-xs font-medium text-primary">
          See all <ChevronRight className="h-3.5 w-3.5" />
        </InternalNav>
      )}
    </div>
  );
}

function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [featured, setFeatured] = useState<Product[]>([]);
  const [trending, setTrending] = useState<Product[]>([]);
  const [flashDeals, setFlashDeals] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getCategories(), api.getFeaturedProducts(), api.getTrendingProducts(), api.getFlashDeals()])
      .then(([cats, feat, trend, flash]) => {
        setCategories(cats);
        setFeatured(feat);
        setTrending(trend);
        setFlashDeals(flash);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="space-y-4 p-4">
        <Skeleton className="aspect-[2/1] w-full rounded-2xl" />
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-20 w-14 flex-shrink-0 rounded-2xl" />)}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="aspect-[3/4] rounded-xl" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="pb-2">
      <div className="px-4 pt-3">
        <BannerSlider />
      </div>

      <SectionHeader title="Categories" linkTo="/categories" />
      <div className="flex gap-4 overflow-x-auto px-4 pb-1 hide-scrollbar">
        {categories.map((cat) => <CategoryCard key={cat.id} category={cat} />)}
      </div>

      {flashDeals.length > 0 && (
        <>
          <SectionHeader title="⚡ Flash Deals" />
          <div className="flex gap-3 overflow-x-auto px-4 pb-1 hide-scrollbar">
            {flashDeals.map((p) => (
              <div key={p.id} className="w-36 flex-shrink-0">
                <FlashDealCard product={p} />
              </div>
            ))}
          </div>
        </>
      )}

      <SectionHeader title="Featured" />
      <div className="grid grid-cols-2 gap-3 px-4">
        {featured.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>

      <SectionHeader title="Trending Now 🔥" />
      <div className="grid grid-cols-2 gap-3 px-4">
        {trending.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
