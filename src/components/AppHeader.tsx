import { Link, useNavigate } from "@tanstack/react-router";
import { Search, Bell, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { notifications } from "@/lib/mock-data";

interface AppHeaderProps {
  title?: string;
  showBack?: boolean;
  showSearch?: boolean;
}

export function AppHeader({ title, showBack = false, showSearch = true }: AppHeaderProps) {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate({ to: "/categories", search: { q: query.trim() } as any });
      setSearchOpen(false);
      setQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-card/95 backdrop-blur-md">
      <div className="mx-auto flex h-12 max-w-lg items-center gap-3 px-4">
        {showBack && (
          <button onClick={() => window.history.back()} className="flex-shrink-0 rounded-full p-1 transition-colors hover:bg-accent">
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}

        {title && !searchOpen && <h1 className="flex-1 truncate text-base font-semibold">{title}</h1>}

        {showSearch && !searchOpen && !title && (
          <button onClick={() => setSearchOpen(true)} className="flex flex-1 items-center gap-2 rounded-full bg-secondary px-3.5 py-1.5 text-sm text-muted-foreground transition-colors">
            <Search className="h-4 w-4" />
            <span>Search products…</span>
          </button>
        )}

        {searchOpen && (
          <form onSubmit={handleSearch} className="flex flex-1 items-center gap-2">
            <div className="flex flex-1 items-center gap-2 rounded-full bg-secondary px-3.5 py-1.5">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products…"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <button type="button" onClick={() => setSearchOpen(false)} className="text-sm text-primary">
              Cancel
            </button>
          </form>
        )}

        {!searchOpen && (
          <Link to="/notifications" className="relative flex-shrink-0 rounded-full p-1.5 transition-colors hover:bg-accent">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-destructive px-1 text-[9px] font-bold text-destructive-foreground">
                {unreadCount}
              </span>
            )}
          </Link>
        )}
      </div>
    </header>
  );
}
