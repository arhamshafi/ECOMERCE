import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
import { IoMdCart } from "react-icons/io";


function Product() {

    const navigate = useNavigate()
    const [focus, setfocus] = useState(false)
    const [user, set_user] = useState(sessionStorage.getItem("active_user") ? JSON.parse(sessionStorage.getItem("active_user")) : "s")
    const [categories, set_categories] = useState([])

    useEffect(() => {
        const timeout = setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 50)

        return () => clearTimeout(timeout);
    }, []);

    return (
        < PageWrapper >
            <section className='w-full bg-gray-100 min-h-screen flex  '>

                <div className='w-[20%] bg-white xb_sh h-[100vh] flex justify-center items-center  relative ' >

                    <FcFilledFilter className='text-9xl opacity-85 animate-bounce img_filter2 ' style={{ animation: "bounce 3s infinite" }} />

                    <div className='w-full h-full absolute top-0 left-0 z-10 p-5  '>

                        <div className='relative'>
                            < IoSearch className='absolute right-2.5 top-3.5 text-xl' />
                            <input type="text" className={` w-full h-[50px] rounded-xl bg-gray-100 pl-3 pr-8 outline-none border-2  ${focus ? "border-orange-400 xo_sh " : "border-transparent xb_sh"} `}
                                placeholder='Search Products..' onFocus={() => setfocus(true)} onBlur={() => setfocus(false)} />
                        </div>

                        <h1 className='text-black font-bold mt-7 text-2xl tb_sh tracking-[2px] '>Brands : </h1>

                        <label htmlFor="el" className='flex items-center gap-2 mt-2 ' >
                            <Check_box id="el" />
                            <p className='text-black font-bold tracking-[2px]' >brand</p>
                        </label>




                    </div>

                </div>
                {/* /////////////////// PART 2 //////////////////// */}

                <div className='w-[80%] h-[100vh] py-17 relative ' >
                    <div className='w-full h-max bg-gray-100 px-5 flex justify-between items-center absolute pt-6 top-0 left-0  '>
                        <button className='py-1 pl-2 pr-4 hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer tw_sh tracking-[2px] active:scale-100 xb_sh text-sm text-white flex items-center gap-2 bg-black rounded-lg' onClick={() => navigate("/")} > <IoChevronBack /> Back</button>
                        <div className='flex items-center gap-2 '>
                            {
                                user ? (
                                    <>
                                        <div className='w-[35px] h-[35px] rounded-full bg-white ob_sh flex justify-center items-center cursor-pointer hover:bg-white/70 transition-all duration-150 ease-out ' onClick={() => toast.success("Comming Soon", {
                                            position: "top-center",
                                            autoClose: 2000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            theme: "colored"
                                        })} > <IoBag /> </div>
                                        <div className='w-[35px] h-[35px] rounded-full bg-white ob_sh flex justify-center items-center text-red-500  cursor-pointer hover:bg-white/70 transition-all duration-150 ease-out '> <IoHeart /> </div>
                                        <div className='w-max h-[35px] rounded-2xl bg-white flex items-center gap-2 pl-3 pr-1 '> <p className='text-[15px] font-bold' >Arham Shafi</p> <div className='w-[28px] h-[28px] xb_sh rounded-full overflow-hidden '> <img src="./avatar.jpeg" alt="" className='w-full h-full' />  </div> </div>
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
                    {/* ////////////  nav_2 // */}

                    <div className='w-full h-[50px] underline  text-sm flex items-center justify-center font-bold '> Category here soon .. </div>

                    <div className='w-full h-max border mt-3 flex justify-evenly items-center '>
                        {/* ////////////////// CARD ///////////////// */}
                        <div className='w-[280px] mt-5 h-max bg-white pt-3 pb-5 px-3 gx_sh group rounded-xl relative '>
                            <div className='w-[30px] h-[30px] rounded-full absolute top-3 right-2.5 bg-orange-500 gx_sh cursor-pointer z-10 transition-all ease-in duration-200 hover:scale-105 text-white xo_sh active:scale-100 flex justify-center items-center '> <IoHeart /> </div>
                            <div className='w-[30px] h-[30px] rounded-full absolute top-13 right-2.5 bg-orange-500 gx_sh cursor-pointer z-10 transition-all ease-in duration-200 hover:scale-105 text-white xo_sh  active:scale-100 flex justify-center translate-x-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 items-center'  > <IoEye /> </div>
                            <div className='w-full h-[150px] overflow-hidden ' > <img className='w-full object-contain h-full group-hover:scale-110 transition-all duration-300 ease-in-out ' src="./prd_po.png" alt="" />  </div>
                            <div className='w-full h-max mt-2 flex justify-between items-center '>
                                <div className=' px-2 rounded-sm text-pink-600 bg-pink-600/20 tracking-[1px] capitalize '></div>
                                <div className='w-max flex justify-center items-center gap-1'><FaStar className='text-yellow-400 text-md' /> <p className='text-[15px] text-black/60 '>4.8 (128)</p> </div>
                            </div>
                            <h1 className='mt-2 text-black text-lg font-bold tb_sh '></h1>
                            <p className='text-[13px] text-black/50 mt-2'>des</p>
                            <p className='text-3xl mt-2 text-green-400 font-bold'> $ 12 <span className='line-through text-lg -mt-4 text-black/40 font-normal '>$ 12</span> </p>
                            <div className='w-full h-[50px] flex mt-3 gap-2 '>
                                <button className='py-1 px-8 rounded-md bg-orange-500 cursor-pointer xo_sh hover:scale-102 transition-all duration-200 ease-in-out active:scale-100 text-white font-bold text-xl back'>ADD TO CART</button>
                                <button className='py-1 px-3 text-2xl bg-black text-red-600 rounded-lg xb_sh cursor-pointer hover:scale-102 active:scale-100 transition-all duration-200 ease-in-out '> <IoHeart /> </button>
                            </div>
                        </div>
                    </div>

                </div>

            </section>
        </ PageWrapper>
    )
}

export default Product