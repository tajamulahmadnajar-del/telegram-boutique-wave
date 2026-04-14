import { products, categories, orders, type Product, type Order } from "./mock-data";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "buyer" | "seller" | "admin";
  status: "active" | "suspended" | "pending";
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
}

export interface SellerApplication {
  id: string;
  userId: string;
  name: string;
  email: string;
  avatar: string;
  shopName: string;
  category: string;
  description: string;
  status: "pending" | "approved" | "rejected";
  appliedDate: string;
}

export interface SellerStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  avgRating: number;
  pendingOrders: number;
  monthlyRevenue: { month: string; revenue: number }[];
  topProducts: { name: string; sold: number; revenue: number }[];
  recentOrders: SellerOrder[];
}

export interface SellerOrder {
  id: string;
  customer: string;
  customerAvatar: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  date: string;
}

export interface SellerProduct extends Product {
  salesCount: number;
  revenue: number;
  views: number;
}

export interface PayoutRecord {
  id: string;
  amount: number;
  status: "completed" | "pending" | "processing";
  date: string;
  method: string;
  reference: string;
}

export interface CommissionSetting {
  categoryId: string;
  categoryName: string;
  rate: number;
}

export interface AdminStats {
  totalUsers: number;
  totalSellers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingApprovals: number;
  monthlyRevenue: { month: string; revenue: number }[];
  ordersByStatus: { status: string; count: number }[];
  topSellers: { name: string; revenue: number; orders: number }[];
  recentActivity: { action: string; user: string; date: string }[];
}

// --- Admin Users ---
export const adminUsers: AdminUser[] = [
  { id: "u1", name: "Maria K.", email: "maria@example.com", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Maria", role: "buyer", status: "active", joinDate: "2025-01-15", totalOrders: 12, totalSpent: 489.50 },
  { id: "u2", name: "James L.", email: "james@example.com", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=James", role: "buyer", status: "active", joinDate: "2025-02-03", totalOrders: 8, totalSpent: 312.00 },
  { id: "u3", name: "Sarah M.", email: "sarah@example.com", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah", role: "seller", status: "active", joinDate: "2024-12-10", totalOrders: 0, totalSpent: 0 },
  { id: "u4", name: "David P.", email: "david@example.com", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=David", role: "buyer", status: "suspended", joinDate: "2025-03-01", totalOrders: 3, totalSpent: 125.99 },
  { id: "u5", name: "Emily R.", email: "emily@example.com", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Emily", role: "seller", status: "active", joinDate: "2025-01-20", totalOrders: 0, totalSpent: 0 },
  { id: "u6", name: "Alex T.", email: "alex@example.com", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Alex", role: "buyer", status: "pending", joinDate: "2025-04-12", totalOrders: 0, totalSpent: 0 },
  { id: "u7", name: "TechZone Admin", email: "techzone@example.com", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=TZ", role: "seller", status: "active", joinDate: "2024-11-01", totalOrders: 0, totalSpent: 0 },
  { id: "u8", name: "StyleHub Admin", email: "stylehub@example.com", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=SH", role: "seller", status: "active", joinDate: "2024-11-15", totalOrders: 0, totalSpent: 0 },
];

// --- Seller Applications ---
export const sellerApplications: SellerApplication[] = [
  { id: "sa1", userId: "u6", name: "Alex T.", email: "alex@example.com", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Alex", shopName: "Alex Electronics", category: "electronics", description: "I sell refurbished electronics and accessories.", status: "pending", appliedDate: "2025-04-12" },
  { id: "sa2", userId: "u9", name: "Lisa W.", email: "lisa@example.com", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Lisa", shopName: "Lisa's Boutique", category: "fashion", description: "Handmade fashion accessories and clothing.", status: "pending", appliedDate: "2025-04-11" },
  { id: "sa3", userId: "u10", name: "Mike B.", email: "mike@example.com", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Mike", shopName: "Mike's Fitness", category: "sports", description: "Fitness equipment and supplements.", status: "approved", appliedDate: "2025-04-05" },
];

// --- Seller Orders ---
export const sellerOrders: SellerOrder[] = [
  { id: "SO-001", customer: "Maria K.", customerAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Maria", items: [{ name: "Wireless Earbuds Pro", quantity: 1, price: 49.99 }], total: 49.99, status: "pending", date: "2025-04-14" },
  { id: "SO-002", customer: "James L.", customerAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=James", items: [{ name: "Bluetooth Speaker", quantity: 2, price: 39.99 }], total: 79.98, status: "processing", date: "2025-04-13" },
  { id: "SO-003", customer: "David P.", customerAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=David", items: [{ name: "Mechanical Keyboard RGB", quantity: 1, price: 79.99 }], total: 79.99, status: "shipped", date: "2025-04-10" },
  { id: "SO-004", customer: "Sarah M.", customerAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah", items: [{ name: "Wireless Earbuds Pro", quantity: 2, price: 49.99 }, { name: "Smart Watch Ultra", quantity: 1, price: 199.99 }], total: 299.97, status: "delivered", date: "2025-04-05" },
  { id: "SO-005", customer: "Emily R.", customerAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Emily", items: [{ name: "Bluetooth Speaker", quantity: 1, price: 39.99 }], total: 39.99, status: "delivered", date: "2025-04-01" },
];

// --- Seller Products ---
export const sellerProducts: SellerProduct[] = products.filter(p => p.seller.id === "s1").map(p => ({
  ...p,
  salesCount: Math.floor(Math.random() * 200) + 20,
  revenue: Math.floor(p.price * (Math.random() * 200 + 20)),
  views: Math.floor(Math.random() * 5000) + 500,
}));

// --- Payouts ---
export const payouts: PayoutRecord[] = [
  { id: "PAY-001", amount: 1250.00, status: "completed", date: "2025-04-01", method: "UPI", reference: "TXN8923456" },
  { id: "PAY-002", amount: 890.50, status: "completed", date: "2025-03-15", method: "Bank Transfer", reference: "TXN7834521" },
  { id: "PAY-003", amount: 2100.00, status: "processing", date: "2025-04-10", method: "UPI", reference: "TXN9012345" },
  { id: "PAY-004", amount: 450.75, status: "pending", date: "2025-04-14", method: "Wallet", reference: "TXN9876543" },
];

// --- Commission Settings ---
export const commissionSettings: CommissionSetting[] = categories.map(c => ({
  categoryId: c.id,
  categoryName: c.name,
  rate: Math.floor(Math.random() * 10) + 5,
}));

// --- Seller Stats ---
export const sellerStats: SellerStats = {
  totalRevenue: 12450.00,
  totalOrders: 156,
  totalProducts: sellerProducts.length,
  avgRating: 4.7,
  pendingOrders: 2,
  monthlyRevenue: [
    { month: "Nov", revenue: 1200 }, { month: "Dec", revenue: 2800 },
    { month: "Jan", revenue: 1900 }, { month: "Feb", revenue: 2100 },
    { month: "Mar", revenue: 2350 }, { month: "Apr", revenue: 2100 },
  ],
  topProducts: [
    { name: "Wireless Earbuds Pro", sold: 89, revenue: 4450 },
    { name: "Bluetooth Speaker", sold: 67, revenue: 2680 },
    { name: "Mechanical Keyboard", sold: 45, revenue: 3600 },
  ],
  recentOrders: sellerOrders,
};

// --- Admin Stats ---
export const adminStats: AdminStats = {
  totalUsers: adminUsers.length,
  totalSellers: adminUsers.filter(u => u.role === "seller").length,
  totalProducts: products.length,
  totalOrders: orders.length + sellerOrders.length,
  totalRevenue: 45680.00,
  pendingApprovals: sellerApplications.filter(s => s.status === "pending").length,
  monthlyRevenue: [
    { month: "Nov", revenue: 5200 }, { month: "Dec", revenue: 8800 },
    { month: "Jan", revenue: 6900 }, { month: "Feb", revenue: 7100 },
    { month: "Mar", revenue: 8350 }, { month: "Apr", revenue: 9330 },
  ],
  ordersByStatus: [
    { status: "Pending", count: 12 }, { status: "Processing", count: 8 },
    { status: "Shipped", count: 15 }, { status: "Delivered", count: 45 },
  ],
  topSellers: [
    { name: "TechZone", revenue: 12450, orders: 156 },
    { name: "FitGear", revenue: 9800, orders: 134 },
    { name: "StyleHub", revenue: 8200, orders: 98 },
    { name: "GadgetWorld", revenue: 7500, orders: 87 },
    { name: "HomeEssentials", revenue: 5400, orders: 65 },
  ],
  recentActivity: [
    { action: "New seller application", user: "Alex T.", date: "2025-04-14" },
    { action: "Order delivered", user: "Maria K.", date: "2025-04-14" },
    { action: "Product listed", user: "TechZone", date: "2025-04-13" },
    { action: "Payout processed", user: "FitGear", date: "2025-04-13" },
    { action: "User suspended", user: "David P.", date: "2025-04-12" },
    { action: "New seller approved", user: "Mike B.", date: "2025-04-11" },
  ],
};
