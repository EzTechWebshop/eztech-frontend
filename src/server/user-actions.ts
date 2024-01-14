'use server'

import {
    ChangeUserPasswordRequest,
    UpdateUserDetailsRequest,
} from '@/types/user-types'
import api from '@/utils/api'

export async function ChangeUserPassword(request: ChangeUserPasswordRequest) {
    const result = await api.user
        .changePassword(request)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err.response.data
        })
    return result
}

export async function UpdateUserDetails(request: UpdateUserDetailsRequest) {
    const result = await api.user
        .updateUserDetails(request)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err.response.data
        })
    return result
}
