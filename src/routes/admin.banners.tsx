import { createFileRoute } from "@tanstack/react-router";
import { Image, Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/admin/banners")({
  head: () => ({ meta: [{ title: "Banners — Admin Panel" }] }),
  component: AdminBannersPage,
});

const banners = [
  { id: "b1", title: "Summer Sale", subtitle: "Up to 50% Off", image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=400&h=200&fit=crop", active: true, position: 1 },
  { id: "b2", title: "New Arrivals", subtitle: "Fresh styles just dropped", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=200&fit=crop", active: true, position: 2 },
  { id: "b3", title: "Tech Deals", subtitle: "Best prices on gadgets", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=200&fit=crop", active: true, position: 3 },
  { id: "b4", title: "Flash Friday", subtitle: "24-hour mega deals", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop", active: false, position: 4 },
];

function AdminBannersPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Banners & Promotions</h2>
        <button className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground">
          <Plus className="h-3.5 w-3.5" /> Add Banner
        </button>
      </div>

      <div className="space-y-3">
        {banners.map((banner) => (
          <div key={banner.id} className="overflow-hidden rounded-xl border bg-card">
            <div className="relative h-28">
              <img src={banner.image} alt={banner.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-2 left-3 text-white">
                <p className="text-sm font-bold">{banner.title}</p>
                <p className="text-[11px] opacity-80">{banner.subtitle}</p>
              </div>
              <div className="absolute top-2 right-2 flex gap-1">
                <span className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${banner.active ? "bg-emerald-500 text-white" : "bg-gray-500 text-white"}`}>
                  {banner.active ? "Live" : "Draft"}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-[11px] text-muted-foreground">Position: #{banner.position}</span>
              <div className="flex gap-1">
                <button className="rounded-full p-1.5 hover:bg-accent">
                  {banner.active ? <EyeOff className="h-3.5 w-3.5 text-muted-foreground" /> : <Eye className="h-3.5 w-3.5 text-muted-foreground" />}
                </button>
                <button className="rounded-full p-1.5 hover:bg-accent"><Pencil className="h-3.5 w-3.5 text-muted-foreground" /></button>
                <button className="rounded-full p-1.5 hover:bg-accent"><Trash2 className="h-3.5 w-3.5 text-destructive" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
