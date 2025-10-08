import api from "../utils/Api"


export const order_confirm = async (order_info) => {

    const res = await api.post("/ord/", { order_info })
    const { message, success } = res.data;
    return { message, success }
}

export const get_order_service = async () => {

    const res = await api.get("/ord/get")
    const { success, order } = res.data
    return { success, order }
}

export const cancel_order_Service = async (id) => {

    const res = await api.delete(`/ord/${id}`)
    const { message, success } = res.data
    return { message, success }
}

