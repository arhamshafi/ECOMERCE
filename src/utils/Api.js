import axios from "axios"

const Api_BAse_Url = import.meta.env.VITE_API_URL || "http://localhost:7654/ar_shop"

const api = axios.create({
    baseURL: Api_BAse_Url,
    headers: {
        "Content-Type": "application/json"
    }
})

api.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("token")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response) => response, (error) => {
        if (error.response?.status == 401) {
            sessionStorage.removeItem("token")
            sessionStorage.removeItem("active_user")
            window.location.href = "/login"
        }
        return Promise.reject(error)
    }
)

export default api