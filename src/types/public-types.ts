import { Category, Faq, Product, Promotion } from "@/types/domain-types";

export type CatalogProducts = {
  totalProducts: number;
  page: number;
  pageSize: number;
  totalPages: number;
  search: string;
  sort: string;
  categoryId: number | null;
  products: Product[];
};

export type CatalogFaqs = {
  totalFaqs: number;
  faqs: Faq[];
};

export type CatalogPromotions = {
  promotionCount: number;
  promotions: Promotion[];
};
