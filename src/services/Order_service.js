import api from "../utils/Api"


export const order_confirm = async (order_info) => {

    const res = await api.post("/ord/", { order_info })
    const { message, success } = res.data;
    return { message, success }
}