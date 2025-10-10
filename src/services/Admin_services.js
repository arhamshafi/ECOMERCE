import { toast } from "react-toastify"
import api from "../utils/Api"


export const get_order_admin_service = async (params) => {

    const res = await api.get(`/admin/?${params}`)
    const { success, order } = res.data
    return { success, order }
}

export const fetching_user_service = async (params) => {

    const res = await api.get(`/admin/user?${params}`)
    const { users, success } = res.data
    return { success, users }
}

export const fetch_product_admin_service = async () => {

    const res = await api.get("/admin/product")
    const { product, success } = res.data
    return { product, success }
}

export const change_userStatus_Service = async (id) => {

    const res = await api.put(`/admin/toogle_userStatus/${id}`)
    const { success, message } = res.data
    return { success, message }
}

export const change_blocked_Status_Service = async (id) => {

    const res = await api.put(`/admin/toogle_blockStatus/${id}`)
    const { success, message } = res.data
    return { success, message }
}

export const del_Users_Service = async (id) => {

    const res = await api.delete(`/admin/${id}`)
    const { success, message } = res.data
    return { success, message }
}
