import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Gift, Users, Copy, Share2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/refer")({
  head: () => ({ meta: [{ title: "Refer & Earn — TG Market" }] }),
  component: ReferPage,
});

function ReferPage() {
  const referralCode = "ALEX2025";
  const referralLink = `https://t.me/tgmarket_bot?start=${referralCode}`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied!");
  };

  return (
    <div className="pb-20">
      <AppHeader title="Refer & Earn" showBack showSearch={false} />

      <div className="p-4 space-y-4">
        {/* Hero */}
        <div className="rounded-xl bg-gradient-to-br from-primary to-primary/70 p-6 text-center text-primary-foreground">
          <Gift className="mx-auto h-12 w-12" />
          <h2 className="mt-3 text-xl font-bold">Earn $10 per referral!</h2>
          <p className="mt-1 text-sm opacity-90">Invite friends and earn rewards when they make their first purchase.</p>
        </div>

        {/* How it works */}
        <div>
          <h3 className="mb-2 text-sm font-semibold">How it works</h3>
          <div className="space-y-3">
            {[
              { step: "1", title: "Share your link", desc: "Send your unique referral link to friends" },
              { step: "2", title: "Friend signs up", desc: "They join using your referral link" },
              { step: "3", title: "Both earn rewards", desc: "You get $10, they get $5 on first order" },
            ].map((item) => (
              <div key={item.step} className="flex items-center gap-3 rounded-xl border bg-card p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {item.step}
                </div>
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Referral code */}
        <div className="rounded-xl border bg-card p-4 text-center">
          <p className="text-xs text-muted-foreground">Your referral code</p>
          <p className="mt-1 text-2xl font-bold tracking-widest text-primary">{referralCode}</p>
          <div className="mt-3 flex gap-2">
            <button onClick={copyLink} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground">
              <Copy className="h-4 w-4" /> Copy Link
            </button>
            <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-medium">
              <Share2 className="h-4 w-4" /> Share
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border bg-card p-4 text-center">
            <Users className="mx-auto h-5 w-5 text-primary" />
            <p className="mt-1 text-xl font-bold">12</p>
            <p className="text-xs text-muted-foreground">Friends Invited</p>
          </div>
          <div className="rounded-xl border bg-card p-4 text-center">
            <Gift className="mx-auto h-5 w-5 text-primary" />
            <p className="mt-1 text-xl font-bold">$80.00</p>
            <p className="text-xs text-muted-foreground">Total Earned</p>
          </div>
        </div>
      </div>
    </div>
  );
}
