// Purpose: Domain types for the backend.
import { UUID } from "crypto";

// Based off DTOs from the backend.
export type Cart = {
  id: number;
  totalQuantity: number;
  totalPrice: number;
  cartItems: CartItem[];
};

export type CartItem = {
  id: number;
  quantity: number;
  price: number;
  product: Product;
};

export type Category = {
  id: number;
  name: string;
  description: string;
  totalProducts: number;
};

export type Faq = {
  id: number;
  question: string;
  answer: string;
  createdAt: Date;
};

export type Image = {
  id: number;
  name: string;
  fileName: string;
  altText: string;
};

export type Order = {
  id: number;
  userId: number;
  orderNumber: UUID;
  active: boolean;
  status:
    | "Pending"
    | "Processing"
    | "Shipped"
    | "Completed"
    | "Cancelled"
    | "Refunded";
  statusName:
    | "Pending"
    | "Processing"
    | "Shipped"
    | "Completed"
    | "Cancelled"
    | "Refunded";
  createdAt: Date;
  updatedAt?: Date;
  completedAt?: Date;
  total: number;
  items: OrderItem[];
};

export type OrderItem = {
  id?: number;
  productId: number;
  productName: string;
  productDescription: string;
  price: number;
  quantity: number;
  total: number;
};
export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  sold: number;
  createdAt: Date;
  discount: number;
  discountedPrice: number;
  isDeleted: boolean;
  averageRating: number;
  ratingCount: number;
  thumbnailId: number;
  thumbnail: Image;
  images: Image[];
  categories: Category[];
  ratings: Rating[];
  // Exclusive to the frontend.
  isInWishlist?: boolean;
  isInCart?: boolean;
  userRatings?: Rating[];
  promotions?: Promotion[];
};

export type Rating = {
  id: number;
  rate: number;
  comment?: string;
  createdAt: Date;
};

export type Wishlist = {
  id: number;
  products: Product[];
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  orders: Order[];
  wishlist: Wishlist;
  cart: Cart;
};

export type UserDetails = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
};

export type Promotion = {
  id: number;
  title: string;
  description: string;
  imageUrl: Image;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
};

export type WebsiteInfo = {
  id: number;
  name: string;
  companyName: string;
  cvr: string;
  city: string;
  postalCode: string;
  address: string;
  country: string;
  phoneNumber: string;
  email: string;
  facebook: string;
  instagram: string;
  trustPilot: string;
  website: string;
  websiteInfoFields: WebsiteInfoField[];
  websiteMessage?: string;
  footerInfo: string;
  weeklyOpeningHours: OpeningHours[];
  specialOpeningHours: OpeningHoursSpecial[];
};

export type OpeningHours = {
  id: number;
  dayOfWeek: DayOfWeek;
  openTime: Date | null;
  closeTime: Date | null;
  isClosed: boolean;
};
export type OpeningHoursSpecial = {
  id: number;
  title: string;
  description: string;
  date: Date;
  endDate?: Date;
  openTime: Date | null;
  closeTime: Date | null;
  isClosed: boolean;
};

export enum DayOfWeek {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

export type WebsiteInfoField = {
  id: number;
  type: WebsiteInfoFieldTopic;
  title: string;
  description: string;
};

// Website info field topics.
export type WebsiteInfoFieldTopic =
  | "AboutUs"
  | "ContactUs"
  | "TermsAndConditions"
  | "PrivacyPolicy"
  | "ShippingPolicy"
  | "ReturnPolicy";
export const WebsiteInfoFieldTopics: WebsiteInfoFieldTopic[] = [
  "AboutUs",
  "ContactUs",
  "TermsAndConditions",
  "PrivacyPolicy",
  "ShippingPolicy",
  "ReturnPolicy",
];
export const WebsiteInfoFieldTopicNames: {
  [key in WebsiteInfoFieldTopic]: string;
} = {
  AboutUs: "About Us",
  ContactUs: "Contact Us",
  TermsAndConditions: "Terms & Conditions",
  PrivacyPolicy: "Privacy Policy",
  ShippingPolicy: "Shipping Policy",
  ReturnPolicy: "Return Policy",
};
