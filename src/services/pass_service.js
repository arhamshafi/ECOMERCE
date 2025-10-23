import api from "../utils/Api"

export const Reset_link_service = async (email) => {

    const res = await api.post("/reset/reset_link", { email })
    const { message, success } = res.data
    return { message, success }
}
export const reset_pass_service = async (pass , token) => {

    console.log(token);
    
    const res = await api.post("/reset/reset_pass", { pass , token })
    const { message, success } = res.data
    return { message, success }
}