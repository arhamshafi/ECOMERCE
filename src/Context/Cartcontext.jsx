import { useReducer } from "react";
import { useAuth } from "./Auth";
import { useEffect } from "react";
import { Add_cart_service, Cart_service } from "../services/Cart_services";
import { useContext } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";


const CartContext = createContext()
const initailState = { cart: null, loading: false }

const Cart_Reducer = (state, action) => {
    switch (action.type) {
        case "set_loading":
            return { ...state, loading: true }
        case "set_cart":
            return { ...state, loading: false, cart: action.payload }
        case "clear_cart":
            return { ...state, cart: null }
        default:
            return state
    }
}

export const Cart_Provider = ({ children }) => {

    const [state, dispatch] = useReducer(Cart_Reducer, initailState)
    const { isAuthenticated, token } = useAuth()

    useEffect(() => {
        if (isAuthenticated && token) {
            fetch_cart()
        } else {
            dispatch({ type: "clear_cart" })
        }
    }, [isAuthenticated, token])

    const fetch_cart = async () => {
        dispatch({ type: "set_loading" })
        try {
            const { cart } = await Cart_service()
            dispatch({ type: "set_cart", payload: cart })

        } catch (err) {
            throw new Error(err.respose?.data?.message || "error at fetching cart")
        }
    }

    const Add_to_cart = async (id) => {
        dispatch({type : "set_loading"})
        try {
            const { success , message , cart } = await Add_cart_service(id)
            dispatch({ type: "set_cart" , payload : cart })
            toast.success( message ,{ closeOnClick:true , draggable:true })
            
        } catch (err) {
            toast.error(err?.response?.data?.message || "Error_On dding")
        }
    }


    const value = {
        ...state,
        Add_to_cart
    }
    return (
        <CartContext.Provider value={value} >{children}</CartContext.Provider>
    )

}

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error("useCart must be use within a CartProvider")
    }
    return context
}