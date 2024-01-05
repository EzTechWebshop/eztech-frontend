import { auth } from "@/app/api/auth/[...nextauth]/options";
import { AddCategoryRequest } from "@/types/admin-types/admin-category-types";
import {
  CreateFaqRequest,
  EditFaqRequest,
} from "@/types/admin-types/admin-faq-types";
import {
  AddWebsiteInfoFieldRequest,
  AdminManagementWebsiteInfo,
  UpdateWebsiteInfoRequest,
  UpdateWebsiteInfoTextRequest,
} from "@/types/admin-types/admin-website-info-types";
import { Cart, Order, UserDetails, WebsiteInfo } from "@/types/domain-types";
import {
  ChangeCartItemQuantityRequest,
  ChangeUserPasswordRequest,
  GetUserOrdersResponse,
  UpdateUserDetailsRequest,
} from "@/types/user-types";
import axios from "axios";
import { CreateOrderRequest } from "@/types/checkout-types";
import {
  AddProductRequest,
  UpdateProductRequest,
} from "@/types/admin-types/admin-product-types";
import { CatalogPromotions } from "@/types/public-types";
import {
  AddPromotionRequest,
  UpdatePromotionRequest,
} from "@/types/admin-types/admin-promotion-types";

const basePath = process.env.NEXT_PUBLIC_API_URL;

const unprotectedApi = axios.create({
  baseURL: basePath,
});

unprotectedApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);
async function protectedApi() {
  const session = await auth();
  const accessToken = session?.user.accessToken;
  const api = axios.create({
    baseURL: basePath,
    headers: {
      Authorization: `Bearer ${accessToken || ""}`,
    },
  });
  return api;
}

// Preserved for admin
const management = {
  getProductManagement: async (searchQuery?: string) => {
    const api = await protectedApi();
    const res = await api.get(
      `/api/admin/management/get-products${
        searchQuery ? `${searchQuery}` : ""
      }`,
    );
    return res;
  },
  getCategoryManagement: async (searchQuery?: string) => {
    const api = await protectedApi();
    const res = await api.get(
      `/api/admin/management/get-categories${
        searchQuery ? `${searchQuery}` : ""
      }`,
    );
    return res;
  },
  getOrderManagement: async (searchQuery?: string) => {
    const api = await protectedApi();
    const res = await api.get(
      `/api/admin/management/get-orders${searchQuery ? `${searchQuery}` : ""}`,
    );
    return res;
  },
  getFaqManagement: async () => {
    const api = await protectedApi();
    const res = await api.get(`/api/admin/management/get-faqs`);
    return res;
  },
  getWebsiteInfoManagement: async (searchQuery?: string) => {
    const api = await protectedApi();
    const res = await api.get(
      `/api/admin/management/get-website-info${
        searchQuery ? `${searchQuery}` : ""
      }`,
    );
    return res;
  },
  getPromotionManagement: async (searchQuery?: string) => {
    const api = await protectedApi();
    const res = await api.get(
      `/api/admin/management/get-promotions${
        searchQuery ? `${searchQuery}` : ""
      }`,
    );
    return res;
  },
};
const product = {
  getProducts: async (searchQuery?: string) => {
    const api = await protectedApi();
    const res = await api.get(
      `/api/admin/get-products${searchQuery ? `${searchQuery}` : ""}`,
    );
    return res;
  },
  getProductById: async (productId: number) => {
    const api = await protectedApi();
    const res = await api.get(`/api/admin/get-product-by-id/${productId}`);
    return res;
  },
  addProduct: async (product: AddProductRequest) => {
    const api = await protectedApi();
    const res = await api.post(`/api/admin/product/`, product);
    return res;
  },
  removeProduct: async (productId: number) => {
    const api = await protectedApi();
    const res = await api.delete(
      `/api/admin/product/remove-product/${productId}`,
    );
    return res;
  },
  restoreProduct: async (productId: number) => {
    const api = await protectedApi();
    const res = await api.post(
      `/api/admin/product/restore-product/${productId}`,
    );
    return res;
  },
  updateProduct: async (id: number, product: UpdateProductRequest) => {
    const api = await protectedApi();
    const res = await api.patch(`/api/admin/product/${id}`, product);
    return res;
  },
  // Manage product categories
  addCategoryToProduct: async (productId: number, categoryId: number) => {
    const api = await protectedApi();
    const res = await api.post(
      `/api/admin/product/${productId}/add-category/${categoryId}`,
    );
    return res;
  },
  removeCategoryFromProduct: async (productId: number, categoryId: number) => {
    const api = await protectedApi();
    const res = await api.post(
      `/api/admin/product/${productId}/remove-category/${categoryId}`,
    );
    return res;
  },
  // Image Management
  async addProductImage(productId: number, image: any) {
    const api = await protectedApi();
    const res = await api.post(
      `/api/admin/product/${productId}/add-image`,
      image,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return res.data;
  },
  async deleteProductImage(productId: number, imageId: number) {
    const api = await protectedApi();
    const res = await api.delete(
      `/api/admin/product/${productId}/remove-image/${imageId}`,
    );
    return res.data;
  },
  async setProductThumbnail(productId: number, imageId: number) {
    const api = await protectedApi();
    const res = await api.post(
      `/api/admin/product/${productId}/set-thumbnail/${imageId}`,
    );
    return res.data;
  },
};
const category = {
  getCategories: async (searchQuery?: string) => {
    const api = await protectedApi();
    const res = await api.get(
      `/api/admin/category${searchQuery ? `${searchQuery}` : ""}`,
    );
    return res;
  },
  createCategory: async (request: AddCategoryRequest) => {
    const api = await protectedApi();
    const res = await api.post(`/api/admin/category`, request);
    return res;
  },
  updateCategory: async (categoryId: number, categoryName: string) => {
    const api = await protectedApi();
    const res = await api.put(`/api/admin/admin/update-category`, {
      categoryId,
      categoryName,
    });
    return res;
  },
  deleteCategory: async (categoryId: number) => {
    const api = await protectedApi();
    const res = await api.delete(`/api/admin/category/${categoryId}`);
    return res;
  },
};
const order = {
  getOrders: async (searchQuery?: string) => {
    const api = await protectedApi();
    const res = await api.get(
      `/api/admin/get-orders${searchQuery ? `${searchQuery}` : ""}`,
    );
    return res;
  },
  getOrderByOrderNumber: async (orderNumber: string) => {
    const api = await protectedApi();
    const res = await api.get<Order>(`/api/order/${orderNumber}`);
    return res;
  },
  changeOrderStatus: async (orderId: number, status: string) => {
    const api = await protectedApi();
    const res = await api.post(`/api/order/${orderId}/change-status/${status}`);
    return res;
  },
  addOrder: async (request: CreateOrderRequest) => {
    const api = await protectedApi();
    const res = await api.post("/api/order", request);
    return res;
  },
};
const faq = {
  getFaqs: async () => {
    const api = await protectedApi();
    const res = await api.get(`/api/admin/get-faqs`);
    return res;
  },
  addFaq: async (request: CreateFaqRequest) => {
    const api = await protectedApi();
    const res = await api.post(`/api/admin/faq`, request);
    return res;
  },
  editFaq: async (id: number, request: EditFaqRequest) => {
    const api = await protectedApi();
    const res = await api.patch(`/api/admin/faq/${id}`, request);
    return res;
  },
  deleteFaq: async (id: number) => {
    const api = await protectedApi();
    const res = await api.delete(`/api/admin/faq/${id}`);
    return res;
  },
};
const websiteinfo = {
  getWebsiteInfo: async (searchQuery?: string) => {
    const api = await protectedApi();
    const res = await api.get<AdminManagementWebsiteInfo>(
      `/api/admin/get-website-info${searchQuery ? `${searchQuery}` : ""}}`,
    );
    return res;
  },
  addWebsiteInfoText: async (request: AddWebsiteInfoFieldRequest) => {
    const api = await protectedApi();
    const res = await api.post(`/api/admin/websiteinfo/add-info-text`, request);
    return res;
  },
  editWebsiteInfo: async (id: number, request: UpdateWebsiteInfoRequest) => {
    const api = await protectedApi();
    const res = await api.patch(`/api/admin/websiteinfo/${id}`, request);
    return res;
  },
  editWebsiteInfoText: async (
    id: number,
    request: UpdateWebsiteInfoTextRequest,
  ) => {
    const api = await protectedApi();
    const res = await api.patch(
      `/api/admin/websiteinfo/update-info-text/${id}`,
      request,
    );
    return res;
  },
  deleteWebsiteInfoText: async (id: number) => {
    const api = await protectedApi();
    const res = await api.delete(
      `/api/admin/websiteinfo/delete-info-text/${id}`,
    );
    return res;
  },
};
const dashboard = {
  getDashboard: async () => {
    const api = await protectedApi();
    const res = await api.get(`/api/admin/dashboard`);
    return res;
  },
};
const promotion = {
  getPromotions: async (searchQuery?: string) => {
    const api = await protectedApi();
    const res = await api.get(
      `/api/admin/get-promotions${searchQuery ? `${searchQuery}` : ""}`,
    );
    return res;
  },
  addPromotion: async (request: AddPromotionRequest) => {
    const api = await protectedApi();
    const res = await api.post(`/api/admin/promotion`, request);
    return res;
  },
  editPromotion: async (id: number, request: UpdatePromotionRequest) => {
    const api = await protectedApi();
    const res = await api.patch(`/api/admin/promotion/${id}`, request);
    return res;
  },
  deletePromotion: async (id: number) => {
    const api = await protectedApi();
    const res = await api.delete(`/api/admin/promotion/${id}`);
    return res;
  },
  // Image
  addPromotionImage: async (productId: number, image: any) => {
    const api = await protectedApi();
    const res = await api.post(
      `/api/admin/promotion/${productId}/add-image`,
      image,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return res;
  },
};

// Preserved for users
const user = {
  getUserDetails: async () => {
    const api = await protectedApi();
    const res = await api.get<UserDetails>("/api/user/get-details");
    return res;
  },
  updateUserDetails: async (request: UpdateUserDetailsRequest) => {
    const api = await protectedApi();
    const res = await api.patch("/api/user/update-details", request);
    return res;
  },
  changePassword: async (request: ChangeUserPasswordRequest) => {
    const api = await protectedApi();
    const res = await api.post("/api/auth/update-password", request);
    return res;
  },
  getUserOrders: async (searchQuery?: string) => {
    const api = await protectedApi();
    const res = await api.get<GetUserOrdersResponse>(
      "/api/user/get-orders" + (searchQuery ? `${searchQuery}` : ""),
    );
    return res;
  },
};
const cart = {
  getCart: async () => {
    const api = await protectedApi();
    const res = await api.get<Cart>(`/api/cart/get-cart`);
    return res;
  },
  getUserOrders: async (searchQuery?: string) => {
    const api = await protectedApi();
    const res = await api.get<GetUserOrdersResponse>(
      "/api/user/get-orders" + (searchQuery ? `${searchQuery}` : ""),
    );
    return res;
  },
  addProductToCart: async (productId: number) => {
    const api = await protectedApi();
    const res = await api.post(`/api/cart/add-to-cart/${productId}`);
    return res;
  },
  changeQuantity: async (request: ChangeCartItemQuantityRequest) => {
    const api = await protectedApi();
    const res = await api.post(`/api/cart/change-quantity`, request);
    return res;
  },
  removeFromCart: async (cartItemId: number) => {
    const api = await protectedApi();
    const res = await api.delete(`/api/cart/remove-from-cart/${cartItemId}`);
    return res;
  },
};
const wishlist = {
  getWishlist: async () => {
    const api = await protectedApi();
    const res = await api.get(`/api/wishlist/get-wishlist`);
    return res;
  },
  addToWishlist: async (productId: number) => {
    const api = await protectedApi();
    const res = await api.post(`/api/wishlist/add-item/${productId}`);
    return res;
  },
  removeFromWishlist: async (productId: number) => {
    const api = await protectedApi();
    const res = await api.delete(`/api/wishlist/remove-item/${productId}`);
    return res;
  },
};
// Public api for all users
const catalog = {
  getProducts: async (searchQuery?: string) => {
    const res = await unprotectedApi.get(
      `/api/catalog/get-products${searchQuery ? `${searchQuery}` : ""}`,
    );
    return res;
  },
  getProductById: async (productId: number) => {
    const res = await unprotectedApi.get(
      `/api/catalog/get-product-by-id/${productId}`,
    );
    return res;
  },
  getFaqs: async () => {
    const res = await unprotectedApi.get(`/api/catalog/get-faq`);
    return res;
  },
  getWebsiteInfo: async () => {
    const res = await unprotectedApi.get<WebsiteInfo>(
      `/api/catalog/get-website-info`,
    );
    return res;
  },
  getPromotions: async () => {
    const res = await unprotectedApi.get<CatalogPromotions>(
      `/api/catalog/get-promotions`,
    );
    return res;
  },
};

const api = {
  unprotectedApi,
  protectedApi,
  // preserved for admin
  management,
  product,
  category,
  order,
  faq,
  websiteinfo,
  dashboard,
  promotion,
  // public api for all users
  catalog,
  user,
  // public api preserved for logged in users
  cart,
  wishlist,
};
export default api;
