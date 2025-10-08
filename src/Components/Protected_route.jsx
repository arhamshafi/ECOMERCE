import React from 'react'
import { useAuth } from '../Context/Auth'
import { Navigate } from 'react-router-dom'


function Protected_route({ children, role }) {

    const { user, isAuthenticated, loading } = useAuth()
    // console.log(user, isAuthenticated);


    if (loading) {
        return <div className='w-full min-h-screen flex justify-center text-2xl font-bold items-center'>LOADING</div>
    }

    if (!isAuthenticated) {
        <Navigate to={"/login"} replace />
        return
    }

    if (role && user?.role !== role) return <Navigate to={"/notfound"} replace />


    return children

}

export default Protected_route