import React, { useEffect, useState } from 'react'

import { FaUser } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { fetching_user_service } from "../services/Admin_services"
import { motion } from "framer-motion"

function UserManagment() {

    const [allusers, set_allusers] = useState([])
    console.log(allusers);

    const options = [
        { value: '', label: 'All' },
        { value: 'user', label: 'User' },
        { value: 'admin', label: 'Admin' },
        { value: 'block', label: 'Block' },
    ];
    const [selected, setSelected] = useState(options[0])
    // console.log(selected.value);  yan value mily ge select option ki 


    const handleChange = (selectedOption) => {
        setSelected(selectedOption);
    }

    const get_all_users = async () => {
        try {
            const { users, success } = await fetching_user_service()
            if (success) {
                set_allusers(users)
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || "error while fetching user")
        }
    }
    useEffect(() => {
        const timeout = setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 50)
        get_all_users()
        return () => clearTimeout(timeout);
    }, [])


    return (
        <>
            {/* <div className={`fixed transition-all duration-400 ease-in-out rounded-xl right-1 bg-white xb_sh w-[230px] h-max z-30 p-2.5 ${nav_list ? "opacity-100 visible top-18 right-3 " : "invisible right-3 opacity-0 top-25 "} `}>
                <Link to={"/admin"} className='w-full h-[35px] bg-gray-100 flex hover:bg-gray-200 transition-all duration-200 ease-in-out cursor-pointer rounded-lg items-center justify-between px-2  '> <p className='text-[15px] font-bold' > Admin Dashboard </p> <FaCrown className='text-yellow-400' /> </Link>
                <Link to={"/admin/ord_managment"} className='w-full h-[35px] bg-gray-100 flex hover:bg-gray-200 transition-all duration-200 ease-in-out cursor-pointer rounded-lg items-center mt-2 justify-between px-2 '><p className='text-[15px] font-bold' > Orders Managment </p><FaList className='text-yellow-600' /></Link>
                <Link className='w-full h-[35px] bg-gray-100 flex hover:bg-gray-200 transition-all duration-200 ease-in-out cursor-pointer rounded-lg items-center justify-between px-2 mt-2 '><p className='text-[15px] font-bold' > Products Managment </p><HiTemplate className='text-gray-500' /></Link>
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
            </div> */}
            <div className='bg-white min-h-screen w-full pt-[70px] px-10'>
                <div className='w-max justify-start flex gap-5 items-center'> <div className='w-[50px] h-[50px] rounded-full bg-cyan-100 text-cyan-500 flex justify-center items-center text-2xl '> <FaUser /> </div>
                    <h1 className='text-black font-bold text-xl '>Users Management</h1>
                </div>
                <div className='w-full h-max  mt-10  flex justify-start items-center gap-4 '>
                    <div className='relative w-[40%] -h-max '>
                        <input type="text" className='w-full outline-none focus:border-cyan-500 border-2 border-transparent h-[40px] text-cyan-700 tracking-[1px] rounded-xl bg-gray-100 pl-5 pr-10 xb_sh text-sm font-bold ' placeholder='Search User By Email & Name...' />
                    </div>
                    <Select
                        options={options}
                        defaultValue={options[0]}
                        value={selected}
                        onChange={handleChange}
                        styles={{
                            control: (base) => ({
                                ...base,
                                backgroundColor: '#f3f4f6',
                                borderRadius: '12px',
                                border: 'none',
                                color: '#0e7490',
                                fontWeight: 'bold'
                            }),
                            option: (base, { isFocused, isSelected }) => ({
                                ...base,
                                backgroundColor: isSelected
                                    ? '#bae6fd'
                                    : isFocused
                                        ? '#e0f2fe'
                                        : 'white',
                                color: '#0e7490',
                                cursor: 'pointer',
                            }),
                        }}
                    />
                </div>
            </div>
        </>

    )
}

export default UserManagment