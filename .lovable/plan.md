
## Telegram Mini App — Multi-Seller Marketplace

### Foundation
- **Telegram SDK simulation**: Create a `TelegramContext` that mocks `window.Telegram.WebApp` (user data, theme params, back button, haptic feedback) so the app works in both browser preview and real Telegram
- **Theme sync**: Extract Telegram theme colors (bg_color, text_color, button_color, etc.) and map them to CSS variables, falling back to Telegram-like defaults
- **Mock data layer**: Central API service with realistic product/category/order/user data, structured so real endpoints can be swapped in later
- **State management**: React context for Cart, Wishlist, User session, and Notifications

### Navigation & Layout
- **Bottom nav bar** with 5 tabs: Home, Categories, Cart (with badge), Orders, Profile
- **Sticky header** with search bar and notification bell
- **Telegram back button** integration (simulated)
- **Smooth page transitions** between routes

### Pages & Features

**Home** (`/`)
- Hero banner slider (auto-rotating featured deals)
- Horizontal-scroll category chips
- Featured products grid, Trending section, Flash deals with countdown timers
- Search bar at top

**Categories** (`/categories`)
- Grid of category cards with icons
- Category detail view with product listing
- Filter sidebar (price range, rating, seller) and sort options

**Product Listing** (reusable component)
- Product cards: image, title, price, discount badge, star rating, quick add-to-cart
- Infinite scroll with skeleton loaders

**Product Details** (`/product/$productId`)
- Image gallery slider
- Price with discount display, stock status
- Seller info card
- Quantity selector, Add to Cart / Buy Now buttons
- Reviews section with star ratings

**Cart** (`/cart`)
- Cart items with quantity +/- controls
- Coupon code input
- Price breakdown (subtotal, discount, total)
- Checkout button

**Checkout** (`/checkout`)
- Address form (name, phone, address fields)
- Payment method selector (UPI, COD, Wallet — UI only)
- Order summary and Confirm button

**Orders** (`/orders`)
- Order list with status badges (Pending/Processing/Shipped/Delivered)
- Order detail page with timeline UI

**Profile** (`/profile`)
- Telegram user info (avatar, name, ID)
- Edit profile form
- Wallet balance card
- Links to Order History, Wishlist, Notifications
- Dark/light mode toggle, Logout

**Wishlist** (`/wishlist`)
- Grid of wishlisted products with remove option

**Notifications** (`/notifications`)
- Notification cards for order updates, offers, promotions

### UI/UX Polish
- Skeleton loaders on all data-dependent views
- Toast notifications (sonner) for cart actions, order placement
- Bottom sheet modals for filters and quick actions
- Smooth animations and transitions
- Lazy-loaded images
- Responsive mobile-first design (optimized for ~390px viewport)

### Component Library
Reusable components: `ProductCard`, `CategoryCard`, `CartItem`, `OrderCard`, `ReviewCard`, `BottomNav`, `BottomSheet`, `Skeleton`, `BannerSlider`, `StarRating`, `QuantitySelector`
