import React, { useEffect, useState } from 'react'

import { FaUser } from "react-icons/fa6";
import { useOutletContext } from 'react-router-dom';
import { FaAngleDown } from "react-icons/fa6";
import { toast } from 'react-toastify';
import { motion } from "framer-motion"

function UserManagment() {

    const { allusers, role, setRole, userstatus, setuserstatus, search_user, set_search_user } = useOutletContext()
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    console.log(allusers);

    return (
        <>

            <div className='bg-white min-h-screen w-full pt-[70px] px-10'>
                <div className='w-max justify-start flex gap-5 items-center'> <div className='w-[50px] h-[50px] rounded-full bg-cyan-100 text-cyan-500 flex justify-center items-center text-2xl '> <FaUser /> </div>
                    <h1 className='text-black font-bold text-xl '>Users Management</h1>
                </div>
                <div className='w-full h-max  mt-10  flex justify-between items-center gap-4 '>
                    <div className='relative w-[40%] h-max '>
                        <input onChange={(e) => set_search_user(e.target.value)} value={search_user} type="text" className='w-full outline-none focus:border-cyan-500 border-2 border-transparent h-[40px] text-cyan-700 tracking-[1px] rounded-xl bg-gray-100 pl-5 pr-10 xb_sh text-sm font-bold ' placeholder='Search User By Email & Name...' />
                    </div>
                    <div className='w-max h-[40px] flex items-center gap-5 '>
                        <div className="w-[130px] relative">
                            <FaAngleDown
                                className={`absolute right-2 top-3.5 text-sm text-black transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"
                                    }`}
                            />

                            <select
                                className="w-full h-[40px] appearance-none text-sm font-bold px-5 bg-gray-100 rounded-xl outline-none"
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
                                className="w-full h-[40px] appearance-none text-sm font-bold px-5 bg-gray-100 rounded-xl outline-none"
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
            </div>
        </>

    )
}

export default UserManagment