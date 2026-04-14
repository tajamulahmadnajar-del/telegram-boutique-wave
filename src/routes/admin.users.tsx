import { createFileRoute } from "@tanstack/react-router";
import { adminUsers } from "@/lib/admin-mock-data";
import { useState } from "react";
import { toast } from "sonner";
import { Search, Ban, CheckCircle } from "lucide-react";

export const Route = createFileRoute("/admin/users")({
  component: AdminUsers,
});

function AdminUsers() {
  const [users, setUsers] = useState(adminUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filtered = users
    .filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
    .filter(u => roleFilter === "all" || u.role === roleFilter);

  const toggleStatus = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === "active" ? "suspended" as const : "active" as const } : u));
    toast.success("User status updated");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Users ({users.length})</h2>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." className="w-full rounded-lg border bg-background pl-9 pr-3 py-2 text-sm" />
      </div>

      <div className="flex gap-2">
        {["all", "buyer", "seller", "admin"].map(r => (
          <button key={r} onClick={() => setRoleFilter(r)} className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${roleFilter === r ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            {r}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map(u => (
          <div key={u.id} className="flex items-center gap-3 rounded-xl border bg-card p-3">
            <img src={u.avatar} alt="" className="h-10 w-10 rounded-full" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{u.name}</p>
              <p className="truncate text-xs text-muted-foreground">{u.email}</p>
              <div className="mt-0.5 flex items-center gap-2">
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary capitalize">{u.role}</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${u.status === "active" ? "bg-success/10 text-success" : u.status === "suspended" ? "bg-destructive/10 text-destructive" : "bg-warning/10 text-warning"}`}>{u.status}</span>
              </div>
            </div>
            <button onClick={() => toggleStatus(u.id)} className="rounded-md p-2 hover:bg-accent">
              {u.status === "active" ? <Ban className="h-4 w-4 text-destructive" /> : <CheckCircle className="h-4 w-4 text-success" />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
