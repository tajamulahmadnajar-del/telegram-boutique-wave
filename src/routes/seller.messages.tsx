import { createFileRoute } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/seller/messages")({
  head: () => ({ meta: [{ title: "Messages — Seller Panel" }] }),
  component: SellerMessagesPage,
});

const conversations = [
  { id: "conv1", customer: "Maria K.", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Maria", lastMessage: "Is the earbuds available in black?", time: "2m ago", unread: 2 },
  { id: "conv2", customer: "James L.", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=James", lastMessage: "When will my order ship?", time: "15m ago", unread: 1 },
  { id: "conv3", customer: "Sarah M.", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah", lastMessage: "Thanks for the fast delivery!", time: "1h ago", unread: 0 },
  { id: "conv4", customer: "David P.", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=David", lastMessage: "Can I change the size?", time: "3h ago", unread: 0 },
  { id: "conv5", customer: "Emily R.", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Emily", lastMessage: "Do you offer bulk discounts?", time: "1d ago", unread: 0 },
];

function SellerMessagesPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Messages</h2>

      <div className="overflow-hidden rounded-xl border bg-card">
        {conversations.map((conv) => (
          <button key={conv.id} className="flex w-full items-center gap-3 border-b px-4 py-3 text-left last:border-0 transition-colors hover:bg-accent">
            <div className="relative">
              <img src={conv.avatar} alt={conv.customer} className="h-10 w-10 rounded-full" />
              {conv.unread > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground">
                  {conv.unread}
                </span>
              )}
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">{conv.customer}</p>
                <span className="text-[10px] text-muted-foreground">{conv.time}</span>
              </div>
              <p className={`truncate text-xs ${conv.unread > 0 ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                {conv.lastMessage}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
