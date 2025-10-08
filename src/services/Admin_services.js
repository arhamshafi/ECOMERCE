import api from "../utils/Api"


export const get_order_admin_service = async () => {

    const res = await api.get("/admin/")
    const { success, order } = res.data
    return { success, order }
}

export const fetching_user_service = async () => {

    const res = await api.get("/admin/user")
    const { users , success} = res.data
    return {  success , users }
}