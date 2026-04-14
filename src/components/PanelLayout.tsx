import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { ArrowLeft, Menu, type LucideIcon } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

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
  const [open, setOpen] = useState(false);

  return (
    <div className="mx-auto min-h-screen max-w-4xl bg-background">
      {/* Header */}
      <div className={`sticky top-0 z-50 flex items-center gap-3 ${accentClass} px-4 py-3 text-primary-foreground`}>
        <Link to="/profile" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="flex-1 text-lg font-bold">{title}</h1>
        <button
          onClick={() => setOpen(true)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20"
        >
          <Menu className="h-4 w-4" />
        </button>
      </div>

      {/* Hamburger menu sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-[260px] p-0">
          <SheetHeader className={`${accentClass} px-4 py-4 text-primary-foreground`}>
            <SheetTitle className="text-left text-primary-foreground">{title}</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col py-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <SheetClose asChild key={item.to}>
                  <Link
                    to={item.to as any}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary border-l-3 border-primary"
                        : "text-foreground hover:bg-accent"
                    }`}
                  >
                    <item.icon className="h-4.5 w-4.5" />
                    {item.label}
                  </Link>
                </SheetClose>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Content */}
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}
