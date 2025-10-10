import React, { useEffect, useState } from 'react'

import PageWrapper from '../Components/Motion'
import { FaHome, FaList } from "react-icons/fa";
import { useAuth } from '../Context/Auth';
import { IoChevronBack } from "react-icons/io5";
import { IoBag } from "react-icons/io5";
import { HiTemplate } from "react-icons/hi";
import { FaUser, FaXmark } from "react-icons/fa6";
import { IoHeart } from "react-icons/io5";
import { BiLogIn } from "react-icons/bi";
import { FaAmericanSignLanguageInterpreting } from "react-icons/fa";
import { toast } from 'react-toastify';
import { FaCrown } from "react-icons/fa";
import { fetch_product_admin_service, get_order_admin_service, fetching_user_service, change_userStatus_Service, change_blocked_Status_Service, del_Users_Service } from '../services/Admin_services';
import { useNavigate, Link, Outlet, useSearchParams } from 'react-router-dom';
import { useCart } from '../Context/Cartcontext';
import { fetch_products_service, get_all_brand_service, get_categories_service } from '../services/Prd_ser';





function AdminDashboard() {

    const navigate = useNavigate()
    const { user } = useAuth()
    const { cancel_order , cart } = useCart()
    const [loader, setLoader] = useState(false)
    const [nav_list, set_nav_list] = useState(false)
    // const [product, setProduct] = useState([])
    const [ord, setord] = useState([])
    const [allusers, set_allusers] = useState([])
    const [role, setRole] = useState("")
    const [userstatus, setuserstatus] = useState("")
    const [search_user, set_search_user] = useState("")
    const [search_order, set_searchOrder] = useState("")
    const [orderstatus, setorderstatus] = useState("")
    //////////

    const [focus, setfocus] = useState(false)
    const [searchParam, setSearchParam] = useSearchParams()
    const [category, setCategory] = useState(searchParam.get("category") || "")
    const [sort, setSort] = useState(searchParam.get("sort") || "")
    const [max_prc, setMax_prc] = useState(searchParam.get("max_prc") || 2200)
    const [searchTerm, setSearchTerm] = useState(searchParam.get("search") || "")
    const [current_page, set_current_page] = useState(1)
    const [totalPages, setTotalPages] = useState(null)
    const [categories, setCategories] = useState(null)
    const [page_loader, set_page_loader] = useState(false)
    const [products, set_Products] = useState([])
    const [prd_loader, set_prd_loader] = useState(false)
    const [allBrands, setAllBrands] = useState(searchParam.get("brands") ? searchParam.get("brands").split(",") : [])
    const [slct_brand, set_slct_brand] = useState([])


    const fetch_categories = async () => {
        // yhan categories fethc knri  distinc
        set_page_loader(true)
        try {
            const { cate } = await get_categories_service()
            setCategories(cate)
            set_page_loader(false)
        } catch (err) {
            console.log(err.response?.data?.message || "get_all_cate err");
            set_page_loader(false)
        }
    }
    const fetch_brands = async () => {
        set_page_loader(true)
        try {
            const { brands } = await get_all_brand_service()
            setAllBrands(brands)
        } catch (err) {
            console.log(err.response?.data?.message || "allBrands_fetch_error");
        }
        finally {
            set_page_loader(false)
        }
    }
    const param_update = () => {
        const param = new URLSearchParams()
        if (category) param.set("category", category)
        if (current_page) param.set("page", current_page)
        if (sort) param.set("sort", sort)
        if (max_prc) param.set("max_prc", max_prc)
        if (searchTerm) param.set("search", searchTerm)
        if (slct_brand.length > 0) {
            param.set("brands", slct_brand.join(","))
        }
        param.set("limit", 9)
        setSearchParam(param)
        return param
    }
    const fetch_products = async () => {
        set_prd_loader(true)
        try {

            const param = param_update()
            const { product, totalProducts, totalPages } = await fetch_products_service(param)
            set_Products(product)
            setTotalPages(totalPages)
            set_prd_loader(false)

        } catch (err) {
            console.log("fetching_product_error :", err);
            set_prd_loader(false)
        }
    }
    const handleBrandChange = (brand) => {
        set_slct_brand((prev) => {
            if (prev.includes(brand)) {
                // already selected hai to remove kardo
                return prev.filter((b) => b !== brand);
            } else {
                // otherwise add kardo
                return [...prev, brand];
            }
        });
    }
    useEffect(() => {
        fetch_products()
    }, [category, current_page, sort, slct_brand, max_prc, searchTerm])

    /////////

    const filteration = () => {
        const params = new URLSearchParams()
        if (orderstatus) params.set("orderstatus", orderstatus)
        if (userstatus) params.set("userstatus", userstatus)
        if (search_user) params.set("search_user", search_user)
        if (role) params.set("role", role)
        if (search_order) params.set("search_order", search_order)
        return params.toString()
    }


    const get_all_users = async () => {
        setLoader(true)
        try {

            const param = filteration()
            const { users, success } = await fetching_user_service(param)
            if (success) {
                set_allusers(users)
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || "error while fetching user")
        }
        finally {
            setLoader(false)

        }
    }
    const fetch_order = async () => {
        setLoader(true)
        try {

            const params = filteration()
            const { success, order } = await get_order_admin_service(params)
            if (success) {
                setord(order)
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || "error while fetching order")
        }
        finally {
            setLoader(false)
        }
    }
    const handle_cancel_order = async (id) => {

        const res = await cancel_order(id)
        if (res.success) {
            fetch_order()
        }
    }
    const handle_userstatus = async (id) => {
        try {
            const res = await change_userStatus_Service(id)
            if (res.success) {
                get_all_users()
                toast.success(res.message)
            }
        } catch (err) {
            toast.error(err?.response?.data?.message)
        }
    }
    const handle_block_user = async (id) => {
        try {
            const { success, message } = await change_blocked_Status_Service(id)
            if (success) {
                toast.success(message)
                get_all_users()
            }
        } catch (err) {
            toast.error(err?.response?.data?.message)
        }
    }
    const handle_del_user_by_Admin = async (id) => {
        try {
            const { success, message } = await del_Users_Service(id)
            if (success) {
                toast.success(message)
                get_all_users()
            }
        } catch (err) {
            toast.error(err?.response?.data?.message)
        }
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 50)
        fetch_order()
        get_all_users()
        fetch_categories()
        fetch_brands()
        return () => clearTimeout(timeout);
    }, [orderstatus, role, search_order, userstatus, search_user])

    return (
        <PageWrapper>
            <div className={`fixed transition-all duration-400 ease-in-out rounded-xl right-1 bg-white xb_sh w-[230px] h-max z-30 p-2.5 ${nav_list ? "opacity-100 visible top-18 right-3 " : "invisible right-3 opacity-0 top-25 "} `}>
                {user?.role == "admin" &&
                    <Link to={"/admin"} className='w-full h-[35px] bg-gray-100 flex hover:bg-gray-200 transition-all duration-200 ease-in-out cursor-pointer rounded-lg items-center justify-between px-2 '> <p className='text-[15px] font-bold' > Admin Dashboard </p> <FaCrown className='text-yellow-400' /> </Link>
                }
                <Link to={"/admin/ord_managment"} className='w-full h-[35px] bg-gray-100 flex hover:bg-gray-200 transition-all duration-200 ease-in-out cursor-pointer rounded-lg items-center justify-between mt-2 px-2 '><p className='text-[15px] font-bold' > Orders Managment </p><FaList className='text-yellow-600' /></Link>
                <Link to={"/admin/product_managment"} className='w-full h-[35px] bg-gray-100 flex hover:bg-gray-200 transition-all duration-200 ease-in-out cursor-pointer rounded-lg items-center justify-between px-2 mt-2 '><p className='text-[15px] font-bold' > Products Managment </p><HiTemplate className='text-gray-500' /></Link>
                <Link to={"/admin/user_managment"} className='w-full h-[35px] bg-gray-100 flex hover:bg-gray-200 transition-all duration-200 ease-in-out cursor-pointer rounded-lg items-center justify-between px-2 mt-2 '> <p className='text-[15px] font-bold' >Users Management </p> <FaUser className='text-cyan-500' />  </Link>
                <Link to={"/"} className='w-full h-[35px] bg-gray-100 flex hover:bg-gray-200 transition-all duration-200 ease-in-out cursor-pointer rounded-lg items-center justify-between px-2 mt-2 '> <p className='text-[15px] font-bold ' > Home </p> <FaHome className='text-green-500' /> </Link>
            </div>
            <div className='w-full h-max xb_sh bg-white px-5 flex justify-between items-center fixed py-3 top-0 right-0 z-20  '>
                <button className='py-1 pl-2 pr-4 hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer tw_sh tracking-[2px] active:scale-100 xb_sh text-sm text-white flex items-center gap-2 bg-black rounded-lg' onClick={() => navigate(-1)} > <IoChevronBack /> Back</button>
                <div className='flex items-center gap-2  '>
                    {
                        user ? (
                            <>
                                <Link to={"/cart"} className='w-[35px] h-[35px] xb_sh rounded-full bg-white flex justify-center items-center cursor-pointer hover:bg-white/70 transition-all duration-150 ease-out ' > <IoBag /> </Link>
                                <div className='w-[35px] h-[35px] rounded-full bg-white xb_sh flex justify-center items-center text-red-500  cursor-pointer hover:bg-gray-100 transition-all duration-150 ease-out '> <IoHeart /> </div>
                                <div onClick={() => set_nav_list(prev => !prev)} className={`min-w-[35px] xb_sh cursor-pointer transition-all ease-in-out duration-200 h-[35px] rounded-2xl bg-white flex items-center ${nav_list ? "justify-center" : "gap-2 pl-3 pr-1"}  `}  > {nav_list ? <FaXmark /> : <> <p className='text-sm font-bold pr-2' >Manage AS Shop 🎯 </p> </>} </div>
                            </>

                        ) : (
                            <>
                                <button className='py-1 px-3 text-black rounded-lg cursor-pointer bg-white flex hover:scale-103 xb_sh transition-all font-bold active:scale-100 ease-out duration-200 items-center gap-2 ' onClick={() => navigate("/login")} >Login <BiLogIn /></button>
                                <button className='py-1 px-3 text-white rounded-lg ml-1 cursor-pointer bg-black flex hover:scale-103  xb_sh font-bold transition-all ease-out active:scale-100 duration-200 items-center gap-2 ' onClick={() => navigate("/register")} >Sign Up <FaAmericanSignLanguageInterpreting /></button>
                            </>
                        )
                    }
                </div>
            </div>
            {/* ////////////////////// */}


            <Outlet context={{
                ord, handle_cancel_order, allusers, orderstatus, setorderstatus, search_order, set_searchOrder, role, setRole, userstatus, setuserstatus, search_user, set_search_user, loader,
                handle_userstatus, handle_block_user, handle_del_user_by_Admin ,handleBrandChange , searchTerm , setSearchTerm , set_current_page , focus ,setfocus , sort , setSort , category , setCategories ,allBrands 
                ,slct_brand , handleBrandChange ,max_prc , setMax_prc , nav_list , prd_loader , products, totalPages , current_page  , page_loader , categories  , cart , setCategory , set_slct_brand  }} />
        </PageWrapper>
    )
}

export default AdminDashboard