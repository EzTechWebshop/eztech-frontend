"use server";

import { CreateFaqRequest, EditFaqRequest } from "@/types/admin-types/admin-faq-types";
import api from "@/utils/api";

export async function CreateFaq(request: CreateFaqRequest) {
    const result = await api.faq
        .addFaq(request)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err.response.data;
        });
    return result;
}

export async function EditFaq(id: number, request: EditFaqRequest) {
    const result = await api.faq
        .editFaq(id, request)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err.response.data;
        });
    return result;
}

export async function DeleteFaq(id: number) {
    const result = await api.faq
        .deleteFaq(id)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err.response.data;
        });
    return result;
}
