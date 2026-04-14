import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Globe, Bell, Lock, Eye, Smartphone, ChevronRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — TG Market" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [language, setLanguage] = useState("English");

  return (
    <div className="pb-20">
      <AppHeader title="Settings" showBack showSearch={false} />

      <div className="p-4 space-y-4">
        {/* Notifications */}
        <div>
          <h2 className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Notifications</h2>
          <div className="overflow-hidden rounded-xl border bg-card">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="flex items-center gap-3">
                <Bell className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Push Notifications</span>
              </div>
              <button onClick={() => setPushEnabled(!pushEnabled)} className={`relative h-6 w-11 rounded-full transition-colors ${pushEnabled ? "bg-primary" : "bg-muted"}`}>
                <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${pushEnabled ? "translate-x-5" : ""}`} />
              </button>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <Bell className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Email Notifications</span>
              </div>
              <button onClick={() => setEmailEnabled(!emailEnabled)} className={`relative h-6 w-11 rounded-full transition-colors ${emailEnabled ? "bg-primary" : "bg-muted"}`}>
                <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${emailEnabled ? "translate-x-5" : ""}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div>
          <h2 className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Preferences</h2>
          <div className="overflow-hidden rounded-xl border bg-card">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Language</span>
              </div>
              <span className="text-sm text-muted-foreground">{language}</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <Smartphone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Currency</span>
              </div>
              <span className="text-sm text-muted-foreground">USD ($)</span>
            </div>
          </div>
        </div>

        {/* Security */}
        <div>
          <h2 className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Security</h2>
          <div className="overflow-hidden rounded-xl border bg-card">
            {[
              { icon: Lock, label: "Change Password" },
              { icon: Eye, label: "Privacy Settings" },
              { icon: Smartphone, label: "Two-Factor Authentication" },
            ].map((item) => (
              <button key={item.label} className="flex w-full items-center gap-3 border-b px-4 py-3 last:border-0 transition-colors hover:bg-accent">
                <item.icon className="h-4 w-4 text-muted-foreground" />
                <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground">App Version 1.0.0</p>
      </div>
    </div>
  );
}
