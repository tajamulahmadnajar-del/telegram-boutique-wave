import { products, categories, orders, reviews, notifications, banners, type Product, type Category, type Order, type Review, type Notification } from "./mock-data";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const api = {
  async getProducts(params?: { category?: string; sort?: string; minPrice?: number; maxPrice?: number; minRating?: number; seller?: string; search?: string }): Promise<Product[]> {
    await delay(300);
    let result = [...products];
    if (params?.category) result = result.filter((p) => p.category === params.category);
    if (params?.search) {
      const q = params.search.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (params?.minPrice) result = result.filter((p) => p.price >= params.minPrice!);
    if (params?.maxPrice) result = result.filter((p) => p.price <= params.maxPrice!);
    if (params?.minRating) result = result.filter((p) => p.rating >= params.minRating!);
    if (params?.seller) result = result.filter((p) => p.seller.id === params.seller);
    if (params?.sort === "price_asc") result.sort((a, b) => a.price - b.price);
    else if (params?.sort === "price_desc") result.sort((a, b) => b.price - a.price);
    else if (params?.sort === "popular") result.sort((a, b) => b.reviewCount - a.reviewCount);
    return result;
  },

  async getProduct(id: string): Promise<Product | undefined> {
    await delay(200);
    return products.find((p) => p.id === id);
  },

  async getCategories(): Promise<Category[]> {
    await delay(200);
    return categories;
  },

  async getOrders(): Promise<Order[]> {
    await delay(300);
    return orders;
  },

  async getOrder(id: string): Promise<Order | undefined> {
    await delay(200);
    return orders.find((o) => o.id === id);
  },

  async getReviews(productId: string): Promise<Review[]> {
    await delay(200);
    return reviews;
  },

  async getNotifications(): Promise<Notification[]> {
    await delay(200);
    return notifications;
  },

  async getBanners() {
    await delay(100);
    return banners;
  },

  async getFeaturedProducts(): Promise<Product[]> {
    await delay(300);
    return products.filter((p) => p.isFeatured);
  },

  async getTrendingProducts(): Promise<Product[]> {
    await delay(300);
    return products.filter((p) => p.isTrending);
  },

  async getFlashDeals(): Promise<Product[]> {
    await delay(300);
    return products.filter((p) => p.isFlashDeal);
  },
};
