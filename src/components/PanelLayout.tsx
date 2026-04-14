import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { ArrowLeft, type LucideIcon } from "lucide-react";

interface NavItem {
  to: string;
  icon: LucideIcon;
  label: string;
}

interface PanelLayoutProps {
  title: string;
  navItems: NavItem[];
  accentClass?: string;
}

export function PanelLayout({ title, navItems, accentClass = "bg-primary" }: PanelLayoutProps) {
  const location = useLocation();

  return (
    <div className="mx-auto min-h-screen max-w-4xl bg-background">
      {/* Header */}
      <div className={`sticky top-0 z-50 flex items-center gap-3 ${accentClass} px-4 py-3 text-primary-foreground`}>
        <Link to="/profile" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-lg font-bold">{title}</h1>
      </div>

      {/* Horizontal nav tabs */}
      <div className="sticky top-[52px] z-40 border-b bg-card">
        <div className="hide-scrollbar flex overflow-x-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to as any}
                className={`flex shrink-0 items-center gap-1.5 border-b-2 px-3 py-2.5 text-xs font-medium transition-colors ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon className="h-3.5 w-3.5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}
