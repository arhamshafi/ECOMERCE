import api from "../utils/Api"

export const get_prd_service = async () => {

    const res = await api.get("/prd/")
    const { product } = res.data
}