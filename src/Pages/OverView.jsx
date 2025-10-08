import React from 'react'
import { FaStar, FaUser } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa";
import { AiOutlineStock } from "react-icons/ai";
import { FaList } from "react-icons/fa";
import { HiTemplate } from "react-icons/hi";
import { motion } from "framer-motion"

function OverView() {
    return (
        <div className='w-full min-h-screen bg-white pt-[60px] px-5 pb-10 '>
            <h1 className='text-xl font-bold text-black uppercase tracking-[1px] tb_sh mt-5' >Admin Dashboard</h1>
            <p className='text-xl mt-5 text-black ' >👋 Welcome <b className='ml-3' >Muhammad Arham Shafi Butt</b></p>
            <div className='flex items-center gap-3 h-[40px]  px-7 mt-5'>
                <p className='text-gray-500 tracking-[1px] text-sm w-max '>arhambutt2923@gmail.com</p>
                <div className='h-full border'></div>
                <p className='text-gray-500 tracking-[1px] w-max text-sm'>AS Shop 🎯 : ADMIN</p>
            </div>

            <div className='w-full flex justify-between items-center mt-10 px-3'>

                {
                    [
                        { text: "text-purple-600", info: "Total Products", icon: <HiTemplate />, bg: "bg-purple-100" },
                        { text: "text-red-600", info: "Active Users", icon: <FaUser />, bg: "bg-red-100" },
                        { text: "text-yellow-600", info: "Orders Recieved", icon: <FaList />, bg: "bg-yellow-100" },
                        { text: "text-red-600", info: "Out Of Stock", icon: <AiOutlineStock />, bg: "bg-red-100" },
                        { text: "text-green-600", info: "Total Revenue", icon: <FaDollarSign />, bg: "bg-green-100" }
                    ].map((ele, idx) => {
                        return (
                            <div key={idx} className={`w-[19%] h-[100px] p-5 rounded-xl ${ele.bg} flex items-center shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer`} >
                                <div className={`w-[30px] h-[30px] bord flex justify-center items-center rounded-full ${ele.text} bg-white shadow-inner text-md`} >{ele.icon}</div>
                                <div className="ml-5 flex flex-col justify-center">
                                    <p className={` ${ele.text} text-sm font-semibold tracking-wide`}>{ele.info}</p>
                                    <p className={` ${ele.text} text-md font-extrabold`}>233</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div className='w-[97%] py-2 mx-auto mt-10 flex justify-between'>
                <div className='w-[48%] py-5 bg-gray-100 xb_sh rounded-xl '>
                    <h1 className='font-bold ml-5  text-lg'>Recent Products 🎯</h1>
                    <div className='w-full h-[320px] mt-5 '>

                        <motion.div whileHover={{ x: 5 }} initial={{ opacity: 0, x: -10, scale: 0.90 }} whileInView={{
                            opacity: 1, x: 0, scale: 1, transition: {
                                x: { type: "spring", stiffness: 130, damping: 12, duration: 0.3 },
                                scale: { type: "spring", stiffness: 130, damping: 12, duration: 0.3 },
                                opacity: { duration: 0.4, delay: 0.3 }, // 👈 ye sirf opacity me delay karega
                            },
                        }} exit={{ opacity: 0 }} className='w-[95%] mx-auto mt-3 rounded-xl h-[90px] bg-white xb_sh  flex items-center gap-4 '>
                            <div className='w-[90px] h-[70px] ml-4 rounded-lg bg-gray-100 '></div>
                            <div className='w-[57%] h-max '>
                                <h1 className='font-bold text-xl'>Name Here</h1>
                                <p className='text-sm mt-1' >price Here</p>
                            </div>
                            <div className=' bg-green-200 rounded-2xl flex items-center gap-3 px-4 text-sm py-1 w-max '> In Stock </div>
                        </motion.div>


                    </div>
                </div>
                {/* ///////////  border 2 // */}
                <div className='w-[48%] py-5 bg-gray-100 xb_sh rounded-xl '>
                    <h1 className='font-bold ml-5  text-lg'>Top Rated Products ⭐</h1>
                    <div className='w-full h-[310px] mt-3 invisible_scroll overflow-y-auto ' >
                        <motion.div whileHover={{ x: 5 }} initial={{ opacity: 0, x: -10, scale: 0.90 }} whileInView={{
                            opacity: 1, x: 0, scale: 1, transition: {
                                x: { type: "spring", stiffness: 130, damping: 12, duration: 0.3 },
                                scale: { type: "spring", stiffness: 130, damping: 12, duration: 0.3 },
                                opacity: { duration: 0.4, delay: 0.3 }
                            },
                        }} exit={{ opacity: 0 }} className='w-[95%] mx-auto mt-3 rounded-xl h-[90px] bg-white xb_sh  flex items-center gap-4 '>
                            <div className='w-[90px] h-[70px] ml-4 rounded-lg bg-gray-100'></div>
                            <div className='w-[57%] h-max '>
                                <h1 className='font-bold text-xl'>Name Here</h1>
                                <p className='text-sm mt-1' >price Here</p>
                            </div>
                            <div className='flex items-center gap-1 text-lg w-max  -ml-2'>
                                {
                                    [1, 2, 3, 4, 5].map(star => (
                                        <FaStar key={star} className='text-yellow-400' />
                                    ))
                                }
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default OverView