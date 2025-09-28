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

