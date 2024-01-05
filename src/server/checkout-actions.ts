"use server";

import api from "@/utils/api";

export async function CheckOutGetProductById(productId: number) {
  const result = await api.catalog
    .getProductById(productId)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
  return result;
}
