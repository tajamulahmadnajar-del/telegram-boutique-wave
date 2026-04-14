import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Bell, Package, Tag, Megaphone } from "lucide-react";
import type { Notification } from "@/lib/mock-data";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications — TG Market" }] }),
  component: NotificationsPage,
});

const typeIcons: Record<string, typeof Bell> = {
  order: Package,
  offer: Tag,
  promo: Megaphone,
};

const typeColors: Record<string, string> = {
  order: "bg-primary/10 text-primary",
  offer: "bg-destructive/10 text-destructive",
  promo: "bg-success/10 text-success",
};

function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getNotifications().then((n) => { setNotifications(n); setLoading(false); });
  }, []);

  if (loading) {
    return <div className="p-4"><p className="text-sm text-muted-foreground">Loading…</p></div>;
  }

  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <Bell className="h-16 w-16 text-muted-foreground/30" />
        <h2 className="mt-4 text-lg font-semibold">No notifications</h2>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="mb-4 text-lg font-bold">Notifications</h1>
      <div className="space-y-2">
        {notifications.map((n) => {
          const Icon = typeIcons[n.type] || Bell;
          return (
            <div key={n.id} className={`flex gap-3 rounded-xl border bg-card p-3 ${!n.read ? "border-primary/20" : ""}`}>
              <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${typeColors[n.type] || ""}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <h3 className="text-sm font-medium">{n.title}</h3>
                  {!n.read && <div className="mt-1.5 h-2 w-2 rounded-full bg-primary" />}
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{n.message}</p>
                <p className="mt-1 text-[10px] text-muted-foreground">{n.date}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
