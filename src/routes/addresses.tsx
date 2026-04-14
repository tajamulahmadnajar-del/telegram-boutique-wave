import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Plus, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";

export const Route = createFileRoute("/addresses")({
  head: () => ({ meta: [{ title: "My Addresses — TG Market" }] }),
  component: AddressesPage,
});

interface Address {
  id: string;
  label: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  isDefault: boolean;
}

const mockAddresses: Address[] = [
  { id: "a1", label: "Home", name: "Alex Johnson", phone: "+1 234 567 8900", address: "123 Main Street, Apt 4B", city: "New York, NY", pincode: "10001", isDefault: true },
  { id: "a2", label: "Office", name: "Alex Johnson", phone: "+1 234 567 8901", address: "456 Corporate Blvd, Floor 12", city: "New York, NY", pincode: "10005", isDefault: false },
];

function AddressesPage() {
  const [addresses, setAddresses] = useState(mockAddresses);

  return (
    <div className="pb-20">
      <AppHeader title="My Addresses" showBack showSearch={false} />
      <div className="p-4 space-y-3">
        <button className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary/40 py-4 text-sm font-medium text-primary transition-colors hover:bg-primary/5">
          <Plus className="h-4 w-4" /> Add New Address
        </button>

        {addresses.map((addr) => (
          <div key={addr.id} className="rounded-xl border bg-card p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold">{addr.label}</span>
                {addr.isDefault && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">Default</span>
                )}
              </div>
              <div className="flex gap-2">
                <button className="rounded-full p-1.5 hover:bg-accent"><Pencil className="h-3.5 w-3.5 text-muted-foreground" /></button>
                <button className="rounded-full p-1.5 hover:bg-accent"><Trash2 className="h-3.5 w-3.5 text-destructive" /></button>
              </div>
            </div>
            <div className="mt-2 space-y-0.5 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">{addr.name}</p>
              <p>{addr.address}</p>
              <p>{addr.city} - {addr.pincode}</p>
              <p>📞 {addr.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
