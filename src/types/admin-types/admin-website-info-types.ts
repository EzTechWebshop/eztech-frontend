import {
  WebsiteInfo,
  WebsiteInfoField,
  WebsiteInfoFieldTopic,
} from "@/types/domain-types";

export type AdminManagementWebsiteInfo = {
  aboutUsCount: number;
  contactUsCount: number;
  termsAndConditionsCount: number;
  privacyPolicyCount: number;
  shippingPolicyCount: number;
  returnPolicyCount: number;
  websiteInfo: WebsiteInfo;
  topic: WebsiteInfoFieldTopic;
  websiteInfoFields: WebsiteInfoField[];
};

export type AddWebsiteInfoFieldRequest = {
  title: string;
  description: string;
  topic: WebsiteInfoFieldTopic;
};
export type UpdateWebsiteInfoRequest = {
  name?: string;
  companyName?: string;
  cvr?: string;
  city?: string;
  postalCode?: string;
  address?: string;
  country?: string;
  phoneNumber?: string;
  email?: string;
  facebook?: string;
  instagram?: string;
  trustPilot?: string;
  website?: string;
  footerInfo?: string;
};
export type UpdateWebsiteInfoTextRequest = {
  title?: string;
  description?: string;
  topic?: string;
};
