export type ProductCategory = 
  | 'whey-protein'
  | 'mass-gainers'
  | 'creatine'
  | 'pre-workout'
  | 'vitamins'
  | 'protein-bars'
  | 'shakers'
  | 'gym-accessories';

export interface ProductVariant {
  id: string;
  name: string;
  type: 'weight' | 'flavor' | 'size';
  price: number;
  originalPrice?: number;
  inStock: boolean;
  stockCount: number;
}

export interface NutritionFact {
  label: string;
  perServing: string;
  per100g?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: ProductCategory;
  categoryName: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  variants: ProductVariant[];
  sku: string;
  stock: number;
  isFeatured?: boolean;
  isBestseller?: boolean;
  goal?: 'muscle-building' | 'strength' | 'everyday-nutrition' | 'recovery';
  ingredients?: string[];
  nutritionFacts?: NutritionFact[];
  servingSize?: string;
  servingsPerContainer?: number;
  directions?: string;
  allergens?: string;
  warnings?: string;
  complianceNote?: string;
  tags?: string[];
}

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  slug: string;
  shortDesc: string;
  tagline: string;
  image: string;
}

export interface CartItem {
  id: string; // unique item cart key (productId + variantId)
  product: Product;
  selectedVariant: ProductVariant;
  quantity: number;
}

export interface CustomerAddress {
  fullName: string;
  phone: string;
  email: string;
  addressLine: string;
  landmark?: string;
  city: string;
  state: string;
  pinCode: string;
  instructions?: string;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
export type PaymentMethod = 'UPI' | 'Card' | 'NetBanking' | 'COD';

export interface OrderItem {
  productId: string;
  productName: string;
  brand: string;
  variantName: string;
  unitPrice: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  discountCode?: string;
  shippingFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Pending Verification (Demo)' | 'Simulated Success' | 'Cash on Delivery';
  orderStatus: OrderStatus;
  shippingAddress: CustomerAddress;
  whatsappConfirmationSent?: boolean;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  phone: string;
  whatsapp: string;
  email: string;
  openingHours: string;
  googleMapsUrl: string;
  announcementText: string;
  announcementEnabled: boolean;
  freeShippingThreshold: number;
  defaultShippingFee: number;
  upiId: string;
}

export interface Review {
  id: string;
  productId?: string;
  productName?: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  location?: string;
}
