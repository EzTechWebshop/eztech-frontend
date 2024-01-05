"use server";

import {
  AddWebsiteInfoFieldRequest,
  UpdateWebsiteInfoRequest,
  UpdateWebsiteInfoTextRequest,
} from "@/types/admin-types/admin-website-info-types";
import api from "@/utils/api";

export async function EditWebsiteInfo(
  id: number,
  request: UpdateWebsiteInfoRequest,
) {
  const result = await api.websiteinfo
    .editWebsiteInfo(id, request)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
  return result;
}

export async function AddWebsiteInfoText(
  WebsiteInfoText: AddWebsiteInfoFieldRequest,
) {
  const res = await api.websiteinfo
    .addWebsiteInfoText(WebsiteInfoText)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
  return res;
}

export async function EditWebsiteInfoText(
  id: number,
  request: UpdateWebsiteInfoTextRequest,
) {
  const result = await api.websiteinfo
    .editWebsiteInfoText(id, request)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
  return result;
}

export async function DeleteWebsiteInfoText(id: number) {
  const result = await api.websiteinfo
    .deleteWebsiteInfoText(id)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
  return result;
}
