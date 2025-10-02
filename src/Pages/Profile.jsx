import React from 'react'
import PageWrapper from '../Components/Motion'

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { IoChevronBack } from "react-icons/io5";
import { toast } from 'react-toastify';
import { useAuth } from '../Context/Auth'
import { FaAmericanSignLanguageInterpreting } from "react-icons/fa";
import { IoBag } from "react-icons/io5";
import { BiLogIn } from "react-icons/bi";
import { IoHeart } from "react-icons/io5";
import { HiTemplate } from "react-icons/hi";
import { HiLogout } from "react-icons/hi";
import { FaCrown } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";

function Profile() {

    const { user, Logout } = useAuth()
    const [nav_list, set_nav_list] = useState(false)
    const navigate = useNavigate()

    return (

        <PageWrapper>
            <div className=' min-h-screen w-full pt-[80px] px-5 ' >
                <div className={`fixed transition-all duration-400 ease-in-out rounded-xl right-1 bg-white xb_sh w-[200px] h-max z-30 p-2.5 ${nav_list ? "opacity-100 visible top-18 right-3 " : "invisible right-3 opacity-0 top-25 "} `}>
                    <Link className='w-full h-[35px] bg-gray-100 flex hover:bg-gray-200 transition-all duration-200 ease-in-out cursor-pointer rounded-lg items-center justify-between px-2 '><p className='text-[15px] font-bold' >{user?.name}</p> <div className='w-[28px] h-[28px] xb_sh rounded-full overflow-hidden '> <img src="./avatar.jpeg" alt="" className='w-full h-full' />  </div></Link>
                    <Link to={"/"} className='w-full h-[35px] bg-gray-100 flex hover:bg-gray-200 transition-all duration-200 ease-in-out cursor-pointer rounded-lg items-center justify-between px-2 mt-2 '> <p className='text-[15px] font-bold' > Home </p> <FaHome className='text-green-500' /> </Link>
                    <Link to={"/product"} className='w-full h-[35px] bg-gray-100 flex hover:bg-gray-200 transition-all duration-200 ease-in-out cursor-pointer rounded-lg items-center justify-between px-2 mt-2 '> <p className='text-[15px] font-bold' > Product </p>  <HiTemplate className='text-gray-500' /> </Link>
                    {user?.role == "admin" &&
                        <Link className='w-full h-[35px] bg-gray-100 flex hover:bg-gray-200 transition-all duration-200 ease-in-out cursor-pointer rounded-lg items-center justify-between px-2 mt-2 '> <p className='text-[15px] font-bold' > Admin Dashboard </p> <FaCrown className='text-yellow-400' /> </Link>
                    }
                    <div className='w-full h-[35px] bg-gray-100 flex hover:bg-gray-200 transition-all duration-200 ease-in-out cursor-pointer rounded-lg items-center justify-between px-2 mt-2 ' onClick={() => {
                        const res = Logout()
                        if (res.success) {
                            toast.info("User Log Out", { autoClose: 1000 })
                            set_nav_list(false)
                        }
                    }} > <p className='text-[15px] font-bold' > Log Out </p> <HiLogout className='text-red-500' /> </div>
                </div>
                <div className='w-full h-max xb_sh bg-white px-5 flex justify-between items-center fixed py-3  top-0 right-0 z-20  '>
                    <button className='py-1 pl-2 pr-4 hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer tw_sh tracking-[2px] active:scale-100 xb_sh text-sm text-white flex items-center gap-2 bg-black rounded-lg' onClick={() => navigate(-1)} > <IoChevronBack /> Back</button>
                    <div className='flex items-center gap-2  '>
                        {
                            user ? (
                                <>
                                    <Link to={"/cart"} className='w-[35px] h-[35px] rounded-full bg-white xb_sh flex justify-center items-center cursor-pointer hover:bg-white/70 transition-all duration-150 ease-out ' > <IoBag /> </Link>
                                    <div className='w-[35px] h-[35px] rounded-full bg-white xb_sh flex justify-center items-center text-red-500  cursor-pointer hover:bg-gray-100 transition-all duration-150 ease-out '> <IoHeart /> </div>
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

                <div className='w-full h-max flex items-center ' >
                    <div className='w-[250px] h-[250px] rounded-full overflow-hidden xb_sh '> <img src="/avatar.jpeg" className='w-full h-full' alt="" /> </div>
                    <div className='ml-[3%]'>
                        <h1 className='font-bold text-black text-5xl tb_sh ' >{user?.name}</h1>
                        <h1 className='font-bold text-gray-500 mt-1 text-xl' >{user?.email}</h1>
                        <div className='flex mt-7 items-center gap-[8%] tracking-[.5px] '>
                            <div className='w-max h-max flex items-center '>
                                <div className=' font-bold text-orange-500 text-sm pr-2 border-r-2 w-max ' >Ordered Items </div>
                                <p className='text-sm text-orange-400 font-bold ml-2' > 30 </p>
                            </div>
                            <div className='w-max h-max flex items-center'>
                                <div className=' font-bold text-cyan-500 text-sm pr-2 border-r-2 w-max ' >Profile</div>
                                <p className='text-sm text-cyan-400 font-bold ml-2 capitalize ' > {user?.role} </p>
                            </div>
                            <div className='w-max h-max flex items-center'>
                                <div className=' font-bold text-green-500 text-sm pr-2 border-r-2 w-max ' >Spended Amount</div>
                                <p className='text-sm text-green-400 font-bold ml-2' > 30 </p>
                            </div>
                        </div>
                    </div>
                </div>



            </div>


        </PageWrapper>
    )
}

export default Profile