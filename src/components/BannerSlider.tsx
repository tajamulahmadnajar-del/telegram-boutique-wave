import { useEffect, useState } from "react";
import { banners } from "@/lib/mock-data";

export function BannerSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % banners.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${current * 100}%)` }}>
        {banners.map((banner) => (
          <div key={banner.id} className="relative min-w-full aspect-[2/1]">
            <img src={banner.image} alt={banner.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <p className="text-xs font-medium text-white/80">{banner.subtitle}</p>
              <h2 className="text-xl font-bold text-white">{banner.title}</h2>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-2 right-3 flex gap-1">
        {banners.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`h-1.5 rounded-full transition-all ${i === current ? "w-4 bg-white" : "w-1.5 bg-white/50"}`} />
        ))}
      </div>
    </div>
  );
}
