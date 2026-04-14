import { Outlet, useLocation } from "@tanstack/react-router";
import { ArrowLeft, Menu, type LucideIcon } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { InternalNav } from "@/components/InternalNav";

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
      <div className={`sticky top-0 z-50 flex items-center gap-3 ${accentClass} px-4 py-3 text-primary-foreground`}>
        <InternalNav to="/profile" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
          <ArrowLeft className="h-4 w-4" />
        </InternalNav>
        <h1 className="flex-1 text-lg font-bold">{title}</h1>
        <button
          onClick={() => setOpen(true)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20"
        >
          <Menu className="h-4 w-4" />
        </button>
      </div>

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
                  <div>
                    <InternalNav
                      to={item.to as any}
                      className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium transition-colors ${
                        isActive
                          ? "border-l-3 border-primary bg-primary/10 text-primary"
                          : "text-foreground hover:bg-accent"
                      }`}
                    >
                      <item.icon className="h-4.5 w-4.5" />
                      {item.label}
                    </InternalNav>
                  </div>
                </SheetClose>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>

      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}
