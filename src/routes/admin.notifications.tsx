import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Send, Bell, Megaphone, Tag } from "lucide-react";

export const Route = createFileRoute("/admin/notifications")({
  component: AdminNotifications,
});

interface AdminNotif {
  id: string;
  title: string;
  message: string;
  target: string;
  type: string;
  sentDate: string;
}

function AdminNotifications() {
  const [notifs, setNotifs] = useState<AdminNotif[]>([
    { id: "an1", title: "Flash Sale Announcement", message: "Up to 50% off on electronics!", target: "All Users", type: "promo", sentDate: "2025-04-14" },
    { id: "an2", title: "New Feature: Wishlist", message: "Save your favorite products!", target: "All Users", type: "update", sentDate: "2025-04-12" },
    { id: "an3", title: "Seller Commission Update", message: "New commission rates effective May 1", target: "Sellers", type: "info", sentDate: "2025-04-10" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState("all");

  const sendNotification = () => {
    if (!title.trim() || !message.trim()) return;
    setNotifs([{ id: `an${Date.now()}`, title, message, target, type: "custom", sentDate: new Date().toISOString().split("T")[0] }, ...notifs]);
    setTitle("");
    setMessage("");
    setShowForm(false);
    toast.success("Notification sent (mock)");
  };

  const typeIcons: Record<string, any> = { promo: Tag, update: Bell, info: Megaphone, custom: Send };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Notifications</h2>
        <Button size="sm" onClick={() => setShowForm(!showForm)}><Send className="h-3.5 w-3.5" /> Send</Button>
      </div>

      {showForm && (
        <div className="rounded-xl border bg-card p-4 space-y-3">
          <h3 className="text-sm font-semibold">Send Notification</h3>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="w-full rounded-lg border bg-background px-3 py-2 text-sm" />
          <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Message" className="w-full rounded-lg border bg-background px-3 py-2 text-sm" rows={3} />
          <select value={target} onChange={e => setTarget(e.target.value)} className="w-full rounded-lg border bg-background px-3 py-2 text-sm">
            <option value="all">All Users</option>
            <option value="buyers">Buyers Only</option>
            <option value="sellers">Sellers Only</option>
          </select>
          <div className="flex gap-2">
            <Button size="sm" onClick={sendNotification}>Send</Button>
            <Button size="sm" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {notifs.map(n => {
          const Icon = typeIcons[n.type] || Bell;
          return (
            <div key={n.id} className="flex items-start gap-3 rounded-xl border bg-card p-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{n.title}</p>
                <p className="text-xs text-muted-foreground">{n.message}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px]">{n.target}</span>
                  <span className="text-[10px] text-muted-foreground">{n.sentDate}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
