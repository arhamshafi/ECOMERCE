import React, { useState } from 'react'
import { useAuth } from "../Context/Auth"
import { motion } from "framer-motion"
import { IoSearch } from "react-icons/io5";
import { IoBag } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";
import { BiLogIn } from "react-icons/bi";
import { FaAmericanSignLanguageInterpreting } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { HiTemplate } from "react-icons/hi";
import { HiLogout } from "react-icons/hi";
import { FaList } from "react-icons/fa6";
import { FaCrown } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

function Navbar() {

  const { user , Logout } = useAuth()
  const navigate = useNavigate()
  const [nav_list, set_nav_list] = useState(false)

  return (
    <motion.div initial={{ opacity: 0, y: -90 }} exit={{ opacity: 0, y: -70, transition: { duration: .3 } }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut", opacity: { duration: 2 } }} className='w-full fixed top-5 left-0'>
      <div className='w-[90%] mx-auto h-[50px] rounded-4xl bg-white/60 backdrop-blur-sm flex justify-between items-center px-5 ' >

        <div className='flex items-center gap-5 relative '>
          <div className='font-bold'>🎯 AS SHOP</div>
          <input type="text" className='w-[300px] h-[35px] bg-white outline-none text-sm xb_sh rounded-3xl pl-2.5 pr-10  ' placeholder='Search Products...' />
          <div className='w-[35px] h-[35px] bg-black absolute right-0  rounded-full flex justify-center items-center '><IoSearch className='text-white text-md ' /></div>
        </div>

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
                <div onClick={() => set_nav_list(prev => !prev)} className={`min-w-[35px] cursor-pointer transition-all ease-in-out duration-200 h-[35px] rounded-2xl bg-white flex items-center ${nav_list ? "justify-center" : "gap-2 pl-3 pr-1"}  `}  > {nav_list ? <FaXmark /> : <> <p className='text-[15px] font-bold' >{user?.name}</p> <div className='w-[28px] h-[28px] xb_sh rounded-full overflow-hidden '> <img src="./avatar.jpeg" alt="" className='w-full h-full' />  </div> </>} </div>
                <div className={`fixed transition-all duration-400 ease-in-out rounded-xl right-1 bg-white xb_sh w-[200px] h-max z-20 p-2.5 ${nav_list ? "opacity-100 visible top-15" : "invisible opacity-0 top-25 "} `}>
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
    </motion.div>
  )
}

export default Navbar