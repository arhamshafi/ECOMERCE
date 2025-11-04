import { createContext, useContext, useReducer } from "react";
import { Login_service, Register_service, update_avatar_service, update_username_service } from "../services/Auth_func";
import { toast } from "react-toastify";
import { useEffect } from "react";


const Auth_context = createContext()

const initial_state = {
    loading: false,
    user: null,
    token: null,
    isAuthenticated: false,
    err: null
}


const Auth_Reducer = (state, action) => {

    switch (action.type) {
        case "auth_start":
            return {
                ...state, loading: true, err: null
            }
        case "auth_success":
            return {
                ...state, isAuthenticated: true, err: null, loading: false,
                user: action.payload.user, token: action.payload.token
            }
        case "update_Avatar":
            return { ...state, user: action.payload }
        case "update_user":
            return { ...state, user: action.payload }
        case "auth_fail":
            return { ...state, err: action.payload, isAuthenticated: false, user: null, token: null, loading: false }

        default:
            return state
    }
}

export const Auth_provider = ({ children }) => {

    const [state, dispatch] = useReducer(Auth_Reducer, initial_state)



    useEffect(() => {
        const user = sessionStorage.getItem("active_user") ? JSON.parse(sessionStorage.getItem("active_user")) : null
        const token = sessionStorage.getItem("token") ? sessionStorage.getItem("token") : null
        dispatch({ type: "auth_success", payload: { user, token } })
    }, [])


    const register = async (formdata) => {
        dispatch({ type: "auth_start" })
        try {
            const { token, user, message } = await Register_service(formdata)
            dispatch({ type: "auth_success", payload: { token, user } })
            toast.success(message, {
                position: "top-center",
                draggable: true,
                closeOnClick: true,
                theme: "colored",
                pauseOnHover: true
            })
            return { success: true }

        } catch (err) {
            toast.error(err.response?.data?.message || "registration error", {
                position: "top-center",
                draggable: true,
                closeOnClick: true,
                theme: "colored",
                pauseOnHover: true
            })
            dispatch({ type: "auth_fail", payload: err.response?.data?.message || "register error" })
            return { success: false }
        }
    }

    const Login = async (formdata) => {
        dispatch({ type: "auth_start" })
        try {

            const { token, user, message } = await Login_service(formdata)
            dispatch({ type: "auth_success", payload: { token, user } })
            toast.success(message, {
                position: "top-center",
                draggable: true,
                closeOnClick: true,
                theme: "colored",
                pauseOnHover: true
            })
            return { success: true }

        } catch (err) {
            toast.error(err.response?.data?.message || "Login error", {
                position: "top-center",
                draggable: true,
                closeOnClick: true,
                theme: "colored",
                pauseOnHover: true
            })
            dispatch({ type: "auth_fail", payload: err.response?.data?.message || "Login Error" })
            return { success: false }
        }
    }

    const update_avatar = async (avatar) => {
        try {

            const formdata = new FormData()
            formdata.append("avatar", avatar)
            const { updateavatar, success } = await update_avatar_service(formdata)
            if (success) {
                dispatch({ type: "update_Avatar", payload: updateavatar })
                sessionStorage.setItem("active_user", JSON.stringify(updateavatar))
            }
        } catch (err) {
            console.log(err);
        }
    }

    const update_username = async (name) => {
        try {

            const { message, success, newuser } = await update_username_service(name)
            if (success) {
                dispatch({ type: "update_user", payload: newuser })
                sessionStorage.setItem("active_user", JSON.stringify(newuser))
                return { success: true, message }
            }
            return { success: false, message: message || "Failed to update" };
        } catch (err) {
            return { success: false, message: "Something went wrong" };

        }
    }


    const Logout = () => {
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("active_user")
        dispatch({ type: "auth_fail", payload: "log out" })
        return { success: true }
    }

    const obj = {
        ...state,
        register,
        Login,
        Logout,
        update_avatar,
        update_username
    }

    return (
        <Auth_context.Provider value={obj} > {children} </Auth_context.Provider>
    )
}


export const useAuth = () => {
    const context = useContext(Auth_context)
    if (!context) {
        throw new Error("useAuth must be use within an  Auth_provider")
    }
    return context;
}
