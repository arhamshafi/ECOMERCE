import api from "../utils/Api"


export const get_categories_service = async () => {

    const res = await api.get("/prd/categories")
    const { categories } = res.data
    return { cate: categories }
}

export const get_all_brand_service = async () => {

    const res = await api.get("/prd/all_brands")
    const { brands } = res.data
    return { brands }
}

export const fetch_products_service = async (param) => {

    const res = await api.get(`/prd/?${param}`)
    const { product, totalProducts, totalPages } = res.data
    return { product, totalProducts, totalPages }
}

export const add_reviews = async (rating, comment, prd_id) => {

    const res = await api.post(`/prd/add_review/${prd_id}`, { rating, comment })
    const { message, cart } = res.data
    return { message, cart }
}

export const fetch_detail_service = async (id) => {

    const res = await api.get(`/prd/detail/${id}`)
    const { success, detail } = res.data
    return { success, detail }
}

export const add_wishlist_Service = async (id) => {

    const res = await api.post(`/prd/addWishlist/${id}`)
    const { success, message } = res.data
    return { success, message }
}
export const get_wishlist_service = async () => {

    const res = await api.get("/prd/getWishlist")
    const { wishlist, success } = res.data
    return { wishlist, success }
}