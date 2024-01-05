import { Faq } from "@/types/domain-types";

export type AdminManagementFaqs = {
  totalFaqs: number;
  search: string;
  faqs: Faq[];
};
export type CreateFaqRequest = {
  question: string;
  answer: string;
};
export type EditFaqRequest = {
  question?: string;
  answer?: string;
};
