import React, { useEffect, useState } from 'react'

import { FaUser } from "react-icons/fa6";
import { useOutletContext } from 'react-router-dom';
import { FaAngleDown } from "react-icons/fa6";
import { motion } from "framer-motion"
import { useAuth } from '../Context/Auth';
import { FaUserCheck } from "react-icons/fa";
import { FaUserMinus } from "react-icons/fa";
import { BiCheckShield } from "react-icons/bi";
import { BiShieldMinus } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";

function UserManagment() {

    const { user } = useAuth()
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const { allusers, role, setRole, userstatus, setuserstatus, search_user, set_search_user, handle_userstatus, handle_block_user, handle_del_user_by_Admin } = useOutletContext()

    return (
        <>

            <div className='bg-gray-100 min-h-screen w-full pt-[70px] px-10'>
                <div className='w-max justify-start flex gap-5 items-center'> <div className='w-[50px] xb_sh h-[50px] rounded-full bg-cyan-100 text-cyan-500 flex justify-center items-center text-2xl '> <FaUser /> </div>
                    <h1 className='text-black font-bold text-xl '>Users Management</h1>
                </div>
                <div className='w-full h-max  mt-10  flex justify-between items-center gap-4 '>
                    <div className='relative w-[40%] h-max '>
                        <input onChange={(e) => set_search_user(e.target.value)} value={search_user} type="text" className='w-full outline-none focus:border-cyan-500 border-2 border-transparent h-[40px] text-cyan-700 tracking-[1px] rounded-xl bg-white pl-5 pr-10 xb_sh text-sm font-bold ' placeholder='Search User By Email & Name...' />
                    </div>
                    <div className='w-max h-[40px] flex items-center gap-5 '>
                        <div className="w-[130px] relative">
                            <FaAngleDown
                                className={`absolute right-2 top-3.5 text-sm text-black transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"
                                    }`}
                            />

                            <select
                                className="w-full h-[40px] appearance-none text-sm font-bold px-5 bg-white xb_sh rounded-xl outline-none"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                onFocus={() => setIsOpen(true)}
                                onBlur={() => setIsOpen(false)}
                            >
                                <option className="bg-white text-sm" value="">Role </option>
                                <option className="bg-white text-sm" value="admin">Admin</option>
                                <option className="bg-white text-sm" value="user">User</option>
                            </select>
                        </div>
                        <div className="w-[130px] relative">
                            <FaAngleDown
                                className={`absolute right-2 top-3.5 text-sm text-black transition-transform duration-300 ${isOpen2 ? "rotate-180" : "rotate-0"
                                    }`}
                            />

                            <select
                                className="w-full h-[40px] appearance-none text-sm font-bold px-5 bg-white xb_sh rounded-xl outline-none"
                                value={userstatus}
                                onChange={(e) => setuserstatus(e.target.value)}
                                onFocus={() => setIsOpen2(true)}
                                onBlur={() => setIsOpen2(false)}
                            >
                                <option className="bg-white" value="">Status</option>
                                <option className="bg-white" value="active">Active</option>
                                <option className="bg-white" value="block">Blocked</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className='w-full h-max mt-10 ' >
                    <div className='w-full flex border-gray-500 items-center border-b-2 pb-1 pl-5 '>
                        <div className='w-[27%] text-gray-500 text-md font-bold ' >User Name</div>
                        <div className='w-[13%] text-center text-gray-500 ml-[4.5%] text-md font-bold ' >Products In Cart</div>
                        <div className='w-[13%] text-center text-gray-500 ml-[4.5%] text-md font-bold ' >Ordered Products</div>
                        <div className='w-[13%] text-center text-gray-500 ml-[4.5%] text-md font-bold ' >User Role</div>
                        <div className='w-[13%] text-center text-gray-500 ml-[4.5%] text-md font-bold ' >Action</div>
                    </div>

                    <div className='w-full h-max mt-10'>
                        {
                            allusers?.map((ele, idx) => {
                                const isCurrentAdmin = ele?._id == user?._id
                                return (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            scale: 1,
                                            transition: {
                                                opacity: { delay: 0.3 * idx, duration: .4 },
                                                y: { duration: .4, delay: 0.3 * idx }
                                            }
                                        }}
                                        whileHover={{
                                            x: 5,
                                            backgroundColor: "#f5f5f5",
                                            transition: { backgroundColor: { duration: 1 } }
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 100,
                                            damping: 8,
                                            duration: 0.4,
                                        }}
                                        key={idx}
                                        className='w-full h-[80px] bg-white xb_sh rounded-2xl flex items-center pl-5 mt-5'
                                    >
                                        <div className='w-[27%] text-black text-md font-bold capitalize'>{ele.name}</div>
                                        <div className='w-[13%] text-black ml-[4.5%] text-md font-bold text-center'>none</div>
                                        <div className='w-[13%] text-black ml-[4.5%] text-md font-bold text-center'>none</div>
                                        <div className='w-[13%] text-black ml-[4.5%] text-md capitalize font-bold text-center'>{ele.role}</div>
                                        <div className='w-[13%] flex justify-evenly items-center text-black ml-[4.5%] text-md font-bold'>
                                            {isCurrentAdmin ? (
                                                <p className='text-gray-400'>You</p>
                                            ) : (
                                                <>
                                                    <p onClick={() => handle_userstatus(ele?._id)} > {ele?.role == "admin" ? <FaUserMinus className='text-2xl text-blue-600 cursor-pointer' /> : <FaUserCheck className='text-xl text-green-600 cursor-pointer' />} </p>
                                                    <p onClick={() => handle_block_user(ele?._id)}> {ele?.blocked == true ? <BiShieldMinus className='text-2xl text-purple-600 cursor-pointer' /> : <BiCheckShield className='text-2xl cursor-pointer text-blue-600 ' />}   </p>
                                                    <p onClick={() => handle_del_user_by_Admin(ele?._id)} ><MdOutlineDelete className='text-2xl text-red-600 cursor-pointer ' /></p>
                                                </>
                                            )}
                                        </div>
                                    </motion.div>

                                )
                            })
                        }

                    </div>

                </div>

            </div>
        </>

    )
}

export default UserManagment