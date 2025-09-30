import api from "../utils/Api"

export const Cart_service = async () => {

    const res = await api.get("/cart/")
    const { success , cart } = res.data
    return { cart, success }
}

export const Add_cart_service = async (prd_id) => {

    const res = await api.post(`/cart/add`,{ prd_id })
    const { success , message , cart } = res.data
    return { success , message , cart }
   
}