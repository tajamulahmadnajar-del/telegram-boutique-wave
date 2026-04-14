export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  rating: number;
  reviewCount: number;
  category: string;
  seller: Seller;
  description: string;
  stock: number;
  isFlashDeal?: boolean;
  flashDealEnds?: string;
  isFeatured?: boolean;
  isTrending?: boolean;
}

export interface Seller {
  id: string;
  name: string;
  avatar: string;
  rating: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
  productCount: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  date: string;
  address: string;
  timeline: OrderTimeline[];
}

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface OrderTimeline {
  status: string;
  date: string;
  description: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Notification {
  id: string;
  type: "order" | "offer" | "promo";
  title: string;
  message: string;
  date: string;
  read: boolean;
}

const sellers: Seller[] = [
  { id: "s1", name: "TechZone", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=TZ", rating: 4.8 },
  { id: "s2", name: "StyleHub", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=SH", rating: 4.6 },
  { id: "s3", name: "GadgetWorld", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=GW", rating: 4.7 },
  { id: "s4", name: "HomeEssentials", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=HE", rating: 4.5 },
  { id: "s5", name: "FitGear", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=FG", rating: 4.9 },
];

const IMG = "https://images.unsplash.com/photo-";

export const categories: Category[] = [
  { id: "electronics", name: "Electronics", icon: "📱", image: `${IMG}1498049794561-7780e7231661?w=400&h=300&fit=crop`, productCount: 42 },
  { id: "fashion", name: "Fashion", icon: "👕", image: `${IMG}1445205170230-053b83016050?w=400&h=300&fit=crop`, productCount: 67 },
  { id: "home", name: "Home & Living", icon: "🏠", image: `${IMG}1556909114-f6e7ad7d3136?w=400&h=300&fit=crop`, productCount: 35 },
  { id: "sports", name: "Sports", icon: "⚽", image: `${IMG}1461896836934-bd45ba054345?w=400&h=300&fit=crop`, productCount: 28 },
  { id: "beauty", name: "Beauty", icon: "💄", image: `${IMG}1596462502278-27bfdc403348?w=400&h=300&fit=crop`, productCount: 51 },
  { id: "books", name: "Books", icon: "📚", image: `${IMG}1495446815901-a7297e633e8d?w=400&h=300&fit=crop`, productCount: 39 },
  { id: "toys", name: "Toys & Games", icon: "🎮", image: `${IMG}1566576912321-d58ddd7a6088?w=400&h=300&fit=crop`, productCount: 24 },
  { id: "grocery", name: "Grocery", icon: "🛒", image: `${IMG}1542838132-92c53300491e?w=400&h=300&fit=crop`, productCount: 88 },
];

export const products: Product[] = [
  {
    id: "p1", name: "Wireless Earbuds Pro", price: 49.99, originalPrice: 79.99,
    image: `${IMG}1590658268037-6bf12f032f55?w=400&h=400&fit=crop`,
    images: [`${IMG}1590658268037-6bf12f032f55?w=800&h=800&fit=crop`, `${IMG}1606220588913-b3aacb4d2f46?w=800&h=800&fit=crop`],
    rating: 4.7, reviewCount: 234, category: "electronics", seller: sellers[0],
    description: "Premium wireless earbuds with active noise cancellation, 30-hour battery life, and crystal-clear sound quality. IPX5 water resistant.",
    stock: 45, isFeatured: true, isFlashDeal: true, flashDealEnds: new Date(Date.now() + 4 * 3600000).toISOString(),
  },
  {
    id: "p2", name: "Slim Fit Denim Jacket", price: 89.99, originalPrice: 129.99,
    image: `${IMG}1551028719-00167b16eac5?w=400&h=400&fit=crop`,
    images: [`${IMG}1551028719-00167b16eac5?w=800&h=800&fit=crop`],
    rating: 4.5, reviewCount: 156, category: "fashion", seller: sellers[1],
    description: "Classic slim-fit denim jacket in premium washed cotton. Versatile and comfortable for any season.",
    stock: 23, isFeatured: true,
  },
  {
    id: "p3", name: "Smart Watch Ultra", price: 199.99, originalPrice: 299.99,
    image: `${IMG}1546868871-af0de0c3b3e4?w=400&h=400&fit=crop`,
    images: [`${IMG}1546868871-af0de0c3b3e4?w=800&h=800&fit=crop`],
    rating: 4.8, reviewCount: 512, category: "electronics", seller: sellers[2],
    description: "Advanced smartwatch with health monitoring, GPS, and 7-day battery life. Titanium case with sapphire crystal display.",
    stock: 12, isTrending: true, isFlashDeal: true, flashDealEnds: new Date(Date.now() + 2 * 3600000).toISOString(),
  },
  {
    id: "p4", name: "Minimalist Desk Lamp", price: 34.99,
    image: `${IMG}1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop`,
    images: [`${IMG}1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop`],
    rating: 4.3, reviewCount: 89, category: "home", seller: sellers[3],
    description: "Modern LED desk lamp with adjustable brightness and color temperature. USB-C charging port built in.",
    stock: 67,
  },
  {
    id: "p5", name: "Yoga Mat Premium", price: 29.99, originalPrice: 49.99,
    image: `${IMG}1544367567-0f2fcb009e0b?w=400&h=400&fit=crop`,
    images: [`${IMG}1544367567-0f2fcb009e0b?w=800&h=800&fit=crop`],
    rating: 4.9, reviewCount: 378, category: "sports", seller: sellers[4],
    description: "Extra thick 6mm eco-friendly yoga mat with alignment lines. Non-slip surface, includes carrying strap.",
    stock: 150, isTrending: true,
  },
  {
    id: "p6", name: "Bluetooth Speaker", price: 39.99, originalPrice: 59.99,
    image: `${IMG}1608043152269-423dbba4e7e1?w=400&h=400&fit=crop`,
    images: [`${IMG}1608043152269-423dbba4e7e1?w=800&h=800&fit=crop`],
    rating: 4.4, reviewCount: 167, category: "electronics", seller: sellers[0],
    description: "Portable waterproof bluetooth speaker with 360° sound. 20-hour playtime, built-in microphone.",
    stock: 88, isFeatured: true,
  },
  {
    id: "p7", name: "Canvas Sneakers", price: 59.99,
    image: `${IMG}1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop`,
    images: [`${IMG}1525966222134-fcfa99b8ae77?w=800&h=800&fit=crop`],
    rating: 4.6, reviewCount: 203, category: "fashion", seller: sellers[1],
    description: "Classic canvas sneakers with cushioned insole. Available in multiple colors.",
    stock: 34, isTrending: true,
  },
  {
    id: "p8", name: "Stainless Steel Water Bottle", price: 24.99,
    image: `${IMG}1602143407151-7111542de6e8?w=400&h=400&fit=crop`,
    images: [`${IMG}1602143407151-7111542de6e8?w=800&h=800&fit=crop`],
    rating: 4.7, reviewCount: 445, category: "sports", seller: sellers[4],
    description: "Double-walled insulated water bottle. Keeps drinks cold 24hrs or hot 12hrs. BPA-free.",
    stock: 200,
  },
  {
    id: "p9", name: "Organic Face Serum", price: 42.99, originalPrice: 59.99,
    image: `${IMG}1556228578-8c89e6adf883?w=400&h=400&fit=crop`,
    images: [`${IMG}1556228578-8c89e6adf883?w=800&h=800&fit=crop`],
    rating: 4.8, reviewCount: 312, category: "beauty", seller: sellers[3],
    description: "Hydrating vitamin C serum with hyaluronic acid. Brightens skin and reduces fine lines.",
    stock: 75, isFeatured: true,
  },
  {
    id: "p10", name: "Mechanical Keyboard RGB", price: 79.99, originalPrice: 119.99,
    image: `${IMG}1618384887929-16ec33fab9ef?w=400&h=400&fit=crop`,
    images: [`${IMG}1618384887929-16ec33fab9ef?w=800&h=800&fit=crop`],
    rating: 4.6, reviewCount: 289, category: "electronics", seller: sellers[2],
    description: "Hot-swappable mechanical keyboard with per-key RGB lighting. Gasket-mount design for a premium typing experience.",
    stock: 31, isTrending: true, isFlashDeal: true, flashDealEnds: new Date(Date.now() + 6 * 3600000).toISOString(),
  },
];

export const reviews: Review[] = [
  { id: "r1", userId: "u1", userName: "Maria K.", userAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Maria", rating: 5, comment: "Absolutely love it! Great quality and fast delivery.", date: "2025-04-10" },
  { id: "r2", userId: "u2", userName: "James L.", userAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=James", rating: 4, comment: "Good product, slightly smaller than expected but works well.", date: "2025-04-08" },
  { id: "r3", userId: "u3", userName: "Sarah M.", userAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah", rating: 5, comment: "Best purchase I've made this year! Highly recommend.", date: "2025-04-05" },
  { id: "r4", userId: "u4", userName: "David P.", userAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=David", rating: 3, comment: "Decent quality for the price. Shipping was a bit slow.", date: "2025-04-01" },
];

export const orders: Order[] = [
  {
    id: "ORD-2024-001", total: 149.98, status: "delivered", date: "2025-04-01", address: "123 Main St, City",
    items: [
      { productId: "p1", name: "Wireless Earbuds Pro", image: products[0].image, price: 49.99, quantity: 1 },
      { productId: "p3", name: "Smart Watch Ultra", image: products[2].image, price: 99.99, quantity: 1 },
    ],
    timeline: [
      { status: "Order Placed", date: "Apr 1, 2025", description: "Your order has been placed" },
      { status: "Processing", date: "Apr 2, 2025", description: "Seller is preparing your order" },
      { status: "Shipped", date: "Apr 3, 2025", description: "Your order is on the way" },
      { status: "Delivered", date: "Apr 5, 2025", description: "Order delivered successfully" },
    ],
  },
  {
    id: "ORD-2024-002", total: 89.99, status: "shipped", date: "2025-04-10", address: "456 Oak Ave, Town",
    items: [
      { productId: "p2", name: "Slim Fit Denim Jacket", image: products[1].image, price: 89.99, quantity: 1 },
    ],
    timeline: [
      { status: "Order Placed", date: "Apr 10, 2025", description: "Your order has been placed" },
      { status: "Processing", date: "Apr 11, 2025", description: "Seller is preparing your order" },
      { status: "Shipped", date: "Apr 12, 2025", description: "Your order is on the way" },
    ],
  },
  {
    id: "ORD-2024-003", total: 34.99, status: "processing", date: "2025-04-13", address: "789 Pine Rd, Village",
    items: [
      { productId: "p4", name: "Minimalist Desk Lamp", image: products[3].image, price: 34.99, quantity: 1 },
    ],
    timeline: [
      { status: "Order Placed", date: "Apr 13, 2025", description: "Your order has been placed" },
      { status: "Processing", date: "Apr 14, 2025", description: "Seller is preparing your order" },
    ],
  },
];

export const notifications: Notification[] = [
  { id: "n1", type: "order", title: "Order Delivered", message: "Your order ORD-2024-001 has been delivered!", date: "2025-04-05", read: true },
  { id: "n2", type: "order", title: "Order Shipped", message: "Your order ORD-2024-002 is on the way!", date: "2025-04-12", read: false },
  { id: "n3", type: "offer", title: "Flash Sale! 🔥", message: "Up to 50% off on electronics. Limited time!", date: "2025-04-14", read: false },
  { id: "n4", type: "promo", title: "New Arrivals", message: "Check out the latest fashion collection!", date: "2025-04-13", read: false },
  { id: "n5", type: "promo", title: "Free Shipping Weekend", message: "Enjoy free shipping on all orders above $25!", date: "2025-04-11", read: true },
];

export const banners = [
  { id: "b1", title: "Summer Sale", subtitle: "Up to 50% Off", image: `${IMG}1607083206968-13611e3d76db?w=800&h=400&fit=crop`, color: "from-blue-500 to-purple-600" },
  { id: "b2", title: "New Arrivals", subtitle: "Fresh styles just dropped", image: `${IMG}1441986300917-64674bd600d8?w=800&h=400&fit=crop`, color: "from-emerald-500 to-teal-600" },
  { id: "b3", title: "Tech Deals", subtitle: "Best prices on gadgets", image: `${IMG}1519389950473-47ba0277781c?w=800&h=400&fit=crop`, color: "from-orange-500 to-red-600" },
];
