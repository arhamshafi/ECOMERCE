import React from 'react'
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
import Loader from '../Components/Loader';
import Loader_2 from "../Components/Loder_2"
import { LuArrowDownUp } from "react-icons/lu";
import { motion } from "framer-motion"
import { IoFilter } from "react-icons/io5";
import { LuArrowUpDown } from "react-icons/lu";
import { MdProductionQuantityLimits } from "react-icons/md";
import { TbRefresh } from "react-icons/tb";
import { HiLogout } from "react-icons/hi";
import { FaCrown } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { useNavigate, useOutletContext } from 'react-router-dom';

function Product_management() {
    const navigate = useNavigate()

    const { searchTerm, setSearchTerm, set_current_page, focus, setfocus, sort, setSort, category, allBrands, categories, cart, setCategory
        , slct_brand, handleBrandChange, max_prc, setMax_prc, prd_loader, products, totalPages, current_page, page_loader, set_slct_brand } = useOutletContext()

    return (
        <>



            <div className={`flex justify-center fixed top-0 left-0 z-20 items-center w-full h-screen backdrop-blur-sm transition-all bg-white/30 duration-200 ease-in-out ${page_loader ? "visible opacity-100" : "invisible opacity-0"} `}> <Loader /> </div>
            <section className='w-full bg-gray-100 min-h-screen flex  pl-[20%] '>
                <div className='w-[20%] fixed top-[60px] left-0 bg-white xb_sh h-screen flex justify-center items-center ' >
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
                        <div className='w-full h-[46%] mt-1 pl-3 overflow-y-auto '>
                            {
                                allBrands && allBrands.map((b, i) => {
                                    return (

                                        <motion.label initial={{ scale: .9 }}
                                            whileInView={{
                                                scale: 1,
                                                transition: {
                                                    type: "spring",   // spring effect
                                                    stiffness: 140,   // spring tightness
                                                    damping: 13,       // bounce control (chhota rakho to zyada jiggle hoga)
                                                    mass: 1,          // weight effect
                                                }
                                            }} key={i} htmlFor={b} className='flex items-center gap-2 mt-2 ' >
                                            <Check_box id={b} checked={slct_brand.includes(b)} onChange={() => handleBrandChange(b)} />
                                            <p className='text-gray-700 text-sm font-bold tracking-[2px]' >{b}</p>
                                        </motion.label>
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





                    <ul className='w-[80%] h-max fixed xb_sh_b top-[58px] bg-white z-20 right-0 text-sm flex flex-wrap items-center gap-3 font-bold pl-5 py-8 '>
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
                                            < motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "tween", duration: .8, ease: "easeInOut", delay: i * 0.15, opacity: { duration: 0.3, delay: i * 0.1 } }} key={i} onClick={() => navigate(`/detail/${crd?._id}`)} className='w-[320px] overflow-hidden hover:-translate-y-2 transition-all duration-200 ease-in-out xb_sh mt-7 h-max bg-white pt-3 pb-5 px-3 gx_sh group rounded-xl relative' >
                                                <div className='w-[30px] h-[30px] rounded-full absolute top-3 right-2.5 bg-orange-500 gx_sh cursor-pointer z-10 transition-all ease-in duration-200 hover:scale-105 text-white xo_sh active:scale-100 flex justify-center items-center ' onClick={(e) => { addWishlist(crd?._id), e.stopPropagation() }} > <IoHeart /> </div>
                                                <div className='w-[30px] h-[30px] rounded-full absolute top-13 right-2.5 bg-orange-500 gx_sh cursor-pointer z-10 transition-all ease-in duration-200 hover:scale-105 text-white xo_sh  active:scale-100 flex justify-center translate-x-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 items-center' onClick={() => navigate(`/detail/${crd?._id}`)} > <IoEye /> </div>
                                                <div className='w-full h-[150px] overflow-hidden ' > <img className='w-full object-contain h-full group-hover:scale-110 transition-all duration-300 ease-in-out ' src={crd?.image} alt="" />  </div>
                                                <div className='w-full h-max flex justify-between items-center mt-3'>
                                                    <div className=' px-2 rounded-sm text-orange-600 bg-orange-600/20 text-sm tracking-[1px] capitalize '>{crd?.brand}</div>
                                                    {crd?.numReviews > 0 && (<div className='w-max flex justify-center items-center gap-1'><FaStar className='text-yellow-400 text-md' /> <p className='text-[15px] text-black/60 '> {crd?.rating} ({crd?.numReviews}) </p> </div>)}


                                                </div>
                                                <h1 className='mt-3 text-black text-[17px] font-bold tb_sh '>{crd?.name}</h1>
                                                <p className='text-[13px] text-black/50 mt-2'>{crd?.description.length > 80 ? `${crd.description.substring(0, 80)}...` : crd.description}</p>
                                                <p className='text-2xl mt-2 text-green-400 font-bold'>$ {crd?.discountedPrice}<span className='line-through text-sm ml-4 mt-4 text-black/40 font-normal '>$ {crd?.price}</span> </p>
                                                <div className='w-full h-[50px] flex mt-4 gap-2 '>
                                                    <button>del</button>
                                                    <button>edit</button>
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

        </>
    )
}

export default Product_management