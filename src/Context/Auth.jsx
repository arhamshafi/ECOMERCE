import { createContext, useContext, useReducer } from "react";
import { Login_service, Register_service } from "../services/Auth_func";
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
        const token = sessionStorage.getItem("token") ? JSON.parse(sessionStorage.getItem("token")) : null
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
            toast.error(err.response?.data?.message || "registration error"  , {
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
            toast.error(err.response?.data?.message || "Login error" , {
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

    const obj = {
        ...state,
        register,
        Login
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
