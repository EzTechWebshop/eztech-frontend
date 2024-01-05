"use server";
import {
  AddProductRequest,
  UpdateProductRequest,
} from "@/types/admin-types/admin-product-types";
import api from "@/utils/api";

export async function GetProductById(productId: number) {
  const result = await api.product
    .getProductById(productId)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
  return result;
}

export async function AddProduct(product: AddProductRequest) {
  const res = await api.product
    .addProduct(product)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
  return res;
}

export async function RemoveProduct(productId: number) {
  const result = await api.product
    .removeProduct(productId)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
  return result;
}

export async function RestoreProduct(productId: number) {
  const result = await api.product
    .restoreProduct(productId)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
  return result;
}

export async function UpdateProduct(id: number, product: UpdateProductRequest) {
  const result = await api.product
    .updateProduct(id, product)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
  return result;
}

export async function AddCategoryToProduct(
  productId: number,
  categoryId: number,
) {
  const result = await api.product
    .addCategoryToProduct(productId, categoryId)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
  return result;
}
export async function RemoveCategoryFromProduct(
  productId: number,
  categoryId: number,
) {
  const result = await api.product
    .removeCategoryFromProduct(productId, categoryId)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
  return result;
}

export async function RemoveCategoryFromProduct2(
  productId: number,
  categoryId: number,
) {
  const result = await api.product
    .removeCategoryFromProduct(productId, categoryId)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
  return result;
}

// Image Related Functions
export async function SetProductThumbnail(productId: number, imageId: number) {
  const result = await api.product
    .setProductThumbnail(productId, imageId)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response.data;
    });
  return result;
}
export async function AddProductImage(productId: number, image: any) {
  const result = await api.product
    .addProductImage(productId, image)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response.data;
    });
  return result;
}
export async function DeleteProductImage(productId: number, imageId: number) {
  const result = await api.product
    .deleteProductImage(productId, imageId)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response.data;
    });
  return result;
}
