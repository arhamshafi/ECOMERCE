import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import PageWrapper from "../Components/Motion"
import { IoSearch } from "react-icons/io5";
import { FcFilledFilter } from "react-icons/fc"
import Check_box from '../Components/Check';
import { IoBag } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";
import { BiLogIn } from "react-icons/bi";
import { FaAmericanSignLanguageInterpreting } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";
import { toast } from 'react-toastify';
import { FaStar } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { useAuth } from '../Context/Auth';
import Loader from '../Components/Loader';
import Loader_2 from "../Components/Loder_2"
import { LuArrowDownUp } from "react-icons/lu";
import { motion } from "framer-motion"
import { IoFilter } from "react-icons/io5";
import { LuArrowUpDown } from "react-icons/lu";
import { MdProductionQuantityLimits } from "react-icons/md";
import { TbRefresh } from "react-icons/tb";
import { HiTemplate } from "react-icons/hi";
import { HiLogout } from "react-icons/hi";
import { FaList } from "react-icons/fa6";
import { FaCrown } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { fetch_products_service, get_all_brand_service, get_categories_service } from '../services/Prd_ser';

function Product() {

    const { user, Logout } = useAuth()
    const navigate = useNavigate()
    const [focus, setfocus] = useState(false)
    const [searchParam, setSearchParam] = useSearchParams()
    const [category, setCategory] = useState(searchParam.get("category") || "")
    const [sort, setSort] = useState(searchParam.get("sort") || "")
    const [max_prc, setMax_prc] = useState(searchParam.get("max_prc") || 500)
    const [searchTerm, setSearchTerm] = useState(searchParam.get("search") || "")
    const [current_page, set_current_page] = useState(1)
    const [totalPages, setTotalPages] = useState(null)
    const [categories, setCategories] = useState(null)
    const [page_loader, set_page_loader] = useState(false)
    const [products, set_Products] = useState([])
    const [nav_list, set_nav_list] = useState(false)
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

    ////////////////////////////
    useEffect(() => {
        fetch_products()
    }, [category, current_page, sort, slct_brand, max_prc, searchTerm])
    useEffect(() => {
        const timeout = setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 50)
        fetch_categories()
        fetch_brands()

        return () => clearTimeout(timeout);
    }, [])

    return (
        < PageWrapper >

            <div className={`flex justify-center fixed top-0 left-0 z-20 items-center w-full h-screen backdrop-blur-sm transition-all bg-white/30 duration-200 ease-in-out ${page_loader ? "visible opacity-100" : "invisible opacity-0"} `}> <Loader /> </div>
            <section className='w-full bg-gray-100 min-h-screen flex pl-[20%] '>
                <div className='w-[20%] fixed top-0 left-0 bg-white xb_sh h-screen flex justify-center items-center ' >
                    <FcFilledFilter className='text-9xl opacity-55 animate-bounce img_filter2 mt-40 ' style={{ animation: "bounce 3s infinite" }} />
                    <div className='w-full h-full absolute top-0 left-0 z-10 p-5  '>
                        <div className='relative'>
                            < IoSearch className='absolute right-2.5 top-3.5 text-xl' />
                            <input type="text" onChange={(e) => { setSearchTerm(e.target.value), set_current_page(1) }} value={searchTerm} className={` w-full h-[50px] rounded-xl bg-gray-100 pl-3 pr-8 outline-none border-2  ${focus ? "border-orange-400 xo_sh " : "border-transparent xb_sh"} `}
                                placeholder='Search Products..' onFocus={() => setfocus(true)} onBlur={() => setfocus(false)} />
                        </div>

                        <div className='flex justify-between items-center mt-4 relative '>
                            <h1 className=' font-bold tracking-[2px] text-md '>SORT</h1>
                            {sort !== "" && (<TbRefresh className='absolute right-7 text-green-400 hover:text-red-400 cursor-pointer     ' onClick={() => { setSort(""), set_current_page(1) }} />)}
                            <IoFilter className='text-gray-400 text-xl ' />
                        </div>
                        <div className='w-full h-[6%] rounded-lg mt-3 bg-gray-200 xb_sh_in flex justify-evenly items-center  '>
                            {

                                [{ text: "price_asc", icon: <LuArrowUpDown /> }, { text: "price_dsc", icon: <LuArrowDownUp /> }, { text: "Rating", icon: <LuArrowUpDown /> }].map((ele, idx) => {
                                    return (
                                        <div key={idx} className={` ${ele.text == sort ? "bg-white" : "bg-transparent"} w-[31%] transition-all duration-200 ease-out cursor-pointer h-[80%] rounded-md flex justify-center gap-1 items-center text-[11px] font-bold capitalize text-gray-600 `} onClick={() => setSort(ele.text)}  > {ele.text} {ele.icon} </div>
                                    )
                                })
                            }

                        </div>

                        <div className='flex justify-between items-center mt-3 relative '>
                            <h1 className=' font-bold tracking-[2px] text-md '>Brand</h1>
                            {slct_brand.length !== 0 && (<TbRefresh className=' text-green-400 hover:text-red-400 cursor-pointer ' onClick={() => { set_slct_brand([]), set_current_page(1) }} />)}
                        </div>
                        {/* <h1 className='text-black font-bold mt-4 text-xl tracking-[2px] '>Brands </h1> */}
                        <div className='w-full h-[60%] mt-1 pl-3 overflow-y-auto '>
                            {
                                allBrands && allBrands.map((b, i) => {
                                    return (

                                        <label key={i} htmlFor={b} className='flex items-center gap-2 mt-2 ' >
                                            <Check_box id={b} checked={slct_brand.includes(b)} onChange={() => handleBrandChange(b)} />
                                            <p className='text-gray-700 text-sm font-bold tracking-[2px]' >{b}</p>
                                        </label>
                                    )
                                })
                            }
                        </div>
                        <h1 className='font-bold mt-3'>Max $ </h1>
                        <div className=' flex items-center gap-2 mt-3'>
                            <p className='text-gray-500 text-sm '>$ 32</p>
                            <input type="range" min={32} max={2200} defaultValue={max_prc} onChange={(e) => setMax_prc(e.target.value)} className="
    w-[60%] h-2 rounded-lg cursor-pointer appearance-none
    bg-orange-500
    [&::-webkit-slider-thumb]:appearance-none
    [&::-webkit-slider-thumb]:w-4
    [&::-webkit-slider-thumb]:h-4
    [&::-webkit-slider-thumb]:rounded-full
    [&::-webkit-slider-thumb]:bg-white
    [&::-webkit-slider-thumb]:border
    [&::-webkit-slider-thumb]:border-orange-500
    [&::-webkit-slider-thumb]:shadow-md
    [&::-webkit-slider-thumb]:cursor-pointer
  " />
                            <p className='text-gray-500 text-sm '>$ {max_prc}</p>
                        </div>
                    </div>
                </div>
                {/* /////////////////// PART 2 //////////////////// */}
                <div className='w-full min-h-[100vh] pt-[13%] pb-10 px-5 bg-gray-100 ' >

                    <div className={`fixed transition-all duration-400 ease-in-out rounded-xl right-1 bg-white xb_sh w-[200px] h-max z-30 p-2.5 ${nav_list ? "opacity-100 visible top-18" : "invisible opacity-0 top-25 "} `}>
                        <Link className='w-full h-[35px] bg-gray-100 flex hover:bg-gray-200 transition-all duration-200 ease-in-out cursor-pointer rounded-lg items-center justify-between px-2 '><p className='text-[15px] font-bold' >{user?.name}</p> <div className='w-[28px] h-[28px] xb_sh rounded-full overflow-hidden '> <img src="./avatar.jpeg" alt="" className='w-full h-full' />  </div></Link>
                        <Link to={"/product"} className='w-full h-[35px] bg-gray-100 flex hover:bg-gray-200 transition-all duration-200 ease-in-out cursor-pointer rounded-lg items-center justify-between px-2 mt-2 '> <p className='text-[15px] font-bold' > Products </p> <HiTemplate className='text-gray-500' /> </Link>
                        <Link className='w-full h-[35px] bg-gray-100 flex hover:bg-gray-200 transition-all duration-200 ease-in-out cursor-pointer rounded-lg items-center justify-between px-2 mt-2 '> <p className='text-[15px] font-bold' > Orders List </p> <FaList /> </Link>
                        <Link className='w-full h-[35px] bg-gray-100 flex hover:bg-gray-200 transition-all duration-200 ease-in-out cursor-pointer rounded-lg items-center justify-between px-2 mt-2 '> <p className='text-[15px] font-bold' > Admin Dashboard </p> <FaCrown className='text-yellow-400' /> </Link>
                        <div className='w-full h-[35px] bg-gray-100 flex hover:bg-gray-200 transition-all duration-200 ease-in-out cursor-pointer rounded-lg items-center justify-between px-2 mt-2 ' onClick={() => {
                            const res = Logout()
                            if (res.success) {
                                toast.info("User Log Out",{autoClose:1000})
                                set_nav_list(false)
                            }
                        }} > <p className='text-[15px] font-bold' > Log Out </p> <HiLogout className='text-red-500' /> </div>
                    </div>

                    <div className='w-[80%] h-max bg-white px-5 flex justify-between items-center fixed pt-6 pb-2.5 top-0 right-0 z-20  '>
                        <button className='py-1 pl-2 pr-4 hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer tw_sh tracking-[2px] active:scale-100 xb_sh text-sm text-white flex items-center gap-2 bg-black rounded-lg' onClick={() => navigate("/")} > <IoChevronBack /> Back</button>
                        <div className='flex items-center gap-2  '>
                            {
                                user ? (
                                    <>
                                        <div className='w-[35px] h-[35px] rounded-full bg-white xb_sh flex justify-center items-center cursor-pointer hover:bg-gray-100 transition-all duration-150 ease-out ' onClick={() => toast.success("Comming Soon", {
                                            position: "top-center",
                                            autoClose: 2000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            theme: "colored"
                                        })} > <IoBag /> </div>
                                        <div className='w-[35px] h-[35px] rounded-full bg-white xb_sh flex justify-center items-center text-red-500  cursor-pointer hover:bg-gray-100 transition-all duration-150 ease-out '> <IoHeart /> </div>
                                        {/* <div className='w-max h-[35px] xb_sh rounded-2xl bg-white flex items-center gap-2 pl-3 pr-1 '> <p className='text-[15px] font-bold' > {user?.name} </p> <div className='w-[28px] h-[28px] xb_sh rounded-full overflow-hidden '> <img src="./avatar.jpeg" alt="" className='w-full h-full' />  </div> </div> */}
                                        {/* ///// */}
                                        <div onClick={() => set_nav_list(prev => !prev)} className={`min-w-[35px] xb_sh cursor-pointer transition-all ease-in-out duration-200 h-[35px] rounded-2xl bg-white flex items-center ${nav_list ? "justify-center" : "gap-2 pl-3 pr-1"}  `}  > {nav_list ? <FaXmark /> : <> <p className='text-[15px] font-bold' >{user?.name}</p> <div className='w-[28px] h-[28px] xb_sh rounded-full overflow-hidden '> <img src="./avatar.jpeg" alt="" className='w-full h-full' />  </div> </>} </div>

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

                    <ul className='w-[80%] h-max fixed xb_sh_b top-[66px] bg-white z-20 right-0 text-sm flex flex-wrap items-center gap-3 font-bold pl-5 py-8 '>
                        <li className={`px-3 cursor-pointer hover:scale-102 active:scale-100 ${!category ? "bg-black" : " bg-orange-500 "} tw_sh tracking-[1px] py-1 text-sm hover:bg-black/60 transition-all duration-200 ease-in-out xb_sh text-white rounded-lg `} onClick={() => { setCategory(""), set_current_page(1) }} > All Categories </li>
                        {
                            categories && (
                                categories.map((ele, idx) => <li key={idx} className={`px-3 cursor-pointer hover:scale-102 active:scale-100 ${category == ele ? "bg-black" : " bg-orange-500 "} tw_sh tracking-[1px] py-1 text-sm hover:bg-black/60 transition-all duration-200 ease-in-out xb_sh text-white rounded-lg `} onClick={() => { setCategory(ele), set_current_page(1) }} > {ele} </li>)
                            )
                        } </ul>

                    <div className='w-full min-h-[40vh] mt-6 flex justify-evenly flex-wrap items-center '>

                        {
                            prd_loader ? (<div className='flex justify-center border bg-amber-300 w-max mx-auto relative mt-15 items-center'> <Loader_2 /> </div>) :
                                products.length == 0 ? (<div className='flex justify-center items-center flex-col gap-7 text-2xl text-gray-400 uppercase tracking-[3px] font-bold  '> <MdProductionQuantityLimits className='text-7xl' /> no product Found...</div>) :
                                    products.map((crd, i) => {
                                        return (
                                            < motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "tween", duration: .8, ease: "easeInOut", delay: i * 0.15, opacity: { duration: 0.3, delay: i * 0.1 } }} key={i} className='w-[320px] overflow-hidden hover:-translate-y-2 transition-all duration-200 ease-in-out xb_sh mt-7 h-max bg-white pt-3 pb-5 px-3 gx_sh group rounded-xl relative '>
                                                <div className='w-[30px] h-[30px] rounded-full absolute top-3 right-2.5 bg-orange-500 gx_sh cursor-pointer z-10 transition-all ease-in duration-200 hover:scale-105 text-white xo_sh active:scale-100 flex justify-center items-center '> <IoHeart /> </div>
                                                <div className='w-[30px] h-[30px] rounded-full absolute top-13 right-2.5 bg-orange-500 gx_sh cursor-pointer z-10 transition-all ease-in duration-200 hover:scale-105 text-white xo_sh  active:scale-100 flex justify-center translate-x-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 items-center'  > <IoEye /> </div>
                                                <div className='w-full h-[150px] overflow-hidden ' > <img className='w-full object-contain h-full group-hover:scale-110 transition-all duration-300 ease-in-out ' src={crd?.image} alt="" />  </div>
                                                <div className='w-full h-max flex justify-between items-center mt-3'>
                                                    <div className=' px-2 rounded-sm text-orange-600 bg-orange-600/20 text-sm tracking-[1px] capitalize '>{crd?.brand}</div>
                                                    {crd?.nunumReviews > 0 && (<div className='w-max flex justify-center items-center gap-1'><FaStar className='text-yellow-400 text-md' /> <p className='text-[15px] text-black/60 '> {crd?.rating} ({crd?.numReviews}) </p> </div>)}


                                                </div>
                                                <h1 className='mt-3 text-black text-[17px] font-bold tb_sh '>{crd?.name}</h1>
                                                <p className='text-[13px] text-black/50 mt-2'>{crd?.description.length > 80 ? `${crd.description.substring(0, 80)}...` : crd.description}</p>
                                                <p className='text-2xl mt-2 text-green-400 font-bold'>$ {crd?.discountedPrice}<span className='line-through text-sm ml-4 mt-4 text-black/40 font-normal '>$ {crd?.price}</span> </p>
                                                <div className='w-full h-[50px] flex mt-4 gap-2 '>
                                                    <button className='py-1 px-8 rounded-md bg-orange-500 cursor-pointer xo_sh hover:scale-102 transition-all duration-200 ease-in-out active:scale-100 text-white font-bold text-xl back'>ADD TO CART</button>
                                                    <button className='py-1 px-3 text-2xl bg-black text-red-600 rounded-lg xb_sh cursor-pointer hover:scale-102 active:scale-100 transition-all duration-200 ease-in-out '> <IoHeart /> </button>
                                                </div>
                                            </motion.div>
                                        )
                                    })
                        }
                    </div>
                    {
                        totalPages > 1 && (
                            <div className=' mt-10 flex items-center gap-3 '>
                                <button className={` px-3 font-bold tracking-[1px] py-1.5 text-sm rounded-lg cursor-pointer xb_sh bg-gray-300 active:scale-97 transition-all duration-200 ease-linear text-gray-500  ${current_page === 1 ? "opacity-70 scale-90 " : "opacity-100"} `} disabled={current_page === 1} onClick={() => set_current_page(prev => prev - 1)} >Prev Page</button>
                                <p className='text-gray-500 text-sm ' style={{ wordSpacing: "5px" }} > {current_page} OF {totalPages} </p>
                                <button className={`px-3 font-bold tw_sh tracking-[1px] py-1.5 cursor-pointer text-sm rounded-lg xo_sh active:scale-97 bg-orange-500 text-white transition-all duration-200 ease-linear ${current_page === totalPages ? "opacity-70 scale-90 " : "opacity-100"} `} disabled={current_page === totalPages} onClick={() => set_current_page(prev => prev + 1)} >Next Page</button>
                            </div>
                        )
                    }

                </div>
            </section>
        </ PageWrapper>
    )
}

export default Product