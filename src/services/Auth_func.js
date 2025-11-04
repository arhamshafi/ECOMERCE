import api from "../utils/Api"

export const Register_service = async (formdata) => {

        const res = await api.post("/auth/register", formdata)
        const { token, user, message } = res.data;
        sessionStorage.setItem("active_user", JSON.stringify(user))
        sessionStorage.setItem("token", token)
        return { token, user, message }
}

////////////////////////////  register ////////////////////////

export const Login_service = async (formdata) => {

        const res = await api.post("/auth/login", formdata)
        const { user, token, message } = res.data
        sessionStorage.setItem("active_user", JSON.stringify(user))
        sessionStorage.setItem("token", token)
        return { token, user, message }
}

//////////////////// Login ////////////////////////////

export const update_avatar_service = async (avatar) => {

        const res = await api.put("/auth/avatar", avatar, {
                headers: {
                        "Content-Type": "multipart/form-data"
                }
        })
        const { updateavatar, success } = res.data
        return { updateavatar, success }
}

/////////////////////////// update avatar /////////////////////

export const update_username_service = async (name) => {

        const res = await api.put("/auth/update_name", {name})
        const { message, success , newuser } = res.data
        return { message, success ,newuser }
}