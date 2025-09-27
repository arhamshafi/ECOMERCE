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