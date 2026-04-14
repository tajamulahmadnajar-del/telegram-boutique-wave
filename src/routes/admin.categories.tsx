import { createFileRoute } from "@tanstack/react-router";
import { categories } from "@/lib/mock-data";
import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/categories")({
  component: AdminCategories,
});

function AdminCategories() {
  const [cats, setCats] = useState(categories);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newIcon, setNewIcon] = useState("");

  const addCategory = () => {
    if (!newName.trim()) return;
    setCats([...cats, { id: newName.toLowerCase().replace(/\s+/g, "-"), name: newName, icon: newIcon || "📦", image: "", productCount: 0 }]);
    setNewName("");
    setNewIcon("");
    setShowForm(false);
    toast.success("Category added");
  };

  const removeCategory = (id: string) => {
    setCats(cats.filter(c => c.id !== id));
    toast.success("Category removed");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Categories ({cats.length})</h2>
        <Button size="sm" onClick={() => setShowForm(!showForm)}><Plus className="h-3.5 w-3.5" /> Add</Button>
      </div>

      {showForm && (
        <div className="rounded-xl border bg-card p-4 space-y-3">
          <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Category name" className="w-full rounded-lg border bg-background px-3 py-2 text-sm" />
          <input value={newIcon} onChange={e => setNewIcon(e.target.value)} placeholder="Emoji icon (e.g. 📱)" className="w-full rounded-lg border bg-background px-3 py-2 text-sm" />
          <div className="flex gap-2">
            <Button size="sm" onClick={addCategory}>Save</Button>
            <Button size="sm" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {cats.map(c => (
          <div key={c.id} className="flex items-center gap-3 rounded-xl border bg-card px-4 py-3">
            <span className="text-2xl">{c.icon}</span>
            <div className="flex-1">
              <p className="text-sm font-medium">{c.name}</p>
              <p className="text-xs text-muted-foreground">{c.productCount} products</p>
            </div>
            <button className="rounded-md p-1.5 hover:bg-accent"><Edit className="h-3.5 w-3.5 text-muted-foreground" /></button>
            <button className="rounded-md p-1.5 hover:bg-destructive/10" onClick={() => removeCategory(c.id)}>
              <Trash2 className="h-3.5 w-3.5 text-destructive" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
