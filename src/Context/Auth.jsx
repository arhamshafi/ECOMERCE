import { createContext, useContext, useReducer } from "react";



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
            return { ...state, err: action.payload.error, isAuthenticated: false, user: null, token: null, loading: false }

    }


}

export const Auth_provider = ({ children }) => {

    const [state, dispatch] = useReducer(Auth_Reducer, initial_state)


    const obj = {
        ...state
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
