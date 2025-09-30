import React from 'react'
import PageWrapper from '../Components/Motion'
import { useAuth } from '../Context/Auth'
import { useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import { toast } from 'react-toastify';
import { IoBag } from "react-icons/io5";
import { BiLogIn } from "react-icons/bi";
import { IoHeart } from "react-icons/io5";
import { HiTemplate } from "react-icons/hi";
import { HiLogout } from "react-icons/hi";
import { FaList } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { FaCrown } from "react-icons/fa";
import { LuShieldCheck } from "react-icons/lu";
import { FaXmark } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { useNavigate, Link } from 'react-router-dom'
import { FaMinus } from "react-icons/fa";
import { GrTwitter } from "react-icons/gr";
import { MdFacebook } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { SiWhatsapp } from "react-icons/si";
import Loader_2 from "../Components/Loder_2"
import { FaPinterest } from "react-icons/fa";
import { FaAmericanSignLanguageInterpreting } from "react-icons/fa";
import { useCart } from '../Context/Cartcontext';

function Cart() {

    const { user, Logout } = useAuth()
    const { cart, loading } = useCart()
    const [nav_list, set_nav_list] = useState(false)
    const navigate = useNavigate()
    const cartData = cart && cart.length > 0 ? cart[0] : null
    console.log(cartData);



    return (
        <PageWrapper>
            <div className={`fixed transition-all duration-400 ease-in-out rounded-xl right-1 bg-white xb_sh w-[200px] h-max z-30 p-2.5 ${nav_list ? "opacity-100 visible top-18 right-3 " : "invisible right-3 opacity-0 top-25 "} `}>
                <Link className='w-full h-[35px] bg-gray-100 flex hover:bg-gray-200 transition-all duration-200 ease-in-out cursor-pointer rounded-lg items-center justify-between px-2 '><p className='text-[15px] font-bold' >{user?.name}</p> <div className='w-[28px] h-[28px] xb_sh rounded-full overflow-hidden '> <img src="./avatar.jpeg" alt="" className='w-full h-full' />  </div></Link>
                <Link to={"/"} className='w-full h-[35px] bg-gray-100 flex hover:bg-gray-200 transition-all duration-200 ease-in-out cursor-pointer rounded-lg items-center justify-between px-2 mt-2 '> <p className='text-[15px] font-bold' > Home </p> <FaHome className='text-green-500' /> </Link>
                <Link to={"/product"} className='w-full h-[35px] bg-gray-100 flex hover:bg-gray-200 transition-all duration-200 ease-in-out cursor-pointer rounded-lg items-center justify-between px-2 mt-2 '> <p className='text-[15px] font-bold' > Product </p>  <HiTemplate className='text-gray-500' /> </Link>
                <Link className='w-full h-[35px] bg-gray-100 flex hover:bg-gray-200 transition-all duration-200 ease-in-out cursor-pointer rounded-lg items-center justify-between px-2 mt-2 '> <p className='text-[15px] font-bold' > Orders List </p> <FaList /> </Link>
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
                <button className='py-1 pl-2 pr-4 hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer tw_sh tracking-[2px] active:scale-100 xb_sh text-sm text-white flex items-center gap-2 bg-black rounded-lg' onClick={() => { navigate(-1), setTimeout(() => sessionStorage.removeItem("prd_detail"), 1000) }} > <IoChevronBack /> Back</button>
                <div className='flex items-center gap-2  '>
                    {
                        user ? (
                            <>
                                <div className='w-[35px] h-[35px] rounded-full bg-white xb_sh flex justify-center items-center cursor-pointer hover:bg-white/70 transition-all duration-150 ease-out ' > <IoBag /> </div>
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

            <div className='w-full min-h-screen pt-15 px-5 '>
                <h1 className='text-black text-3xl mt-[2%] tb_sh '>Shopping Cart</h1>
                <div className='w-[98%] mx-auto h-[60vh] flex justify-between mt-[3%]' >
                    <div className='w-[70%] rounded-2xl bg-white xb_sh p-4 '>
                        <div className='w-full flex items-center'>
                            <p className='font-bold text-sm ml-[3%] '>Product Code</p>
                            <p className='font-bold text-sm ml-[40%] '>Quantity</p>
                            <p className='font-bold text-sm ml-[13%] '>Total</p>
                            <p className='font-bold text-sm ml-[13%] '>Action</p>
                        </div>

                        {
                            loading ? (<div className='w-full h-[90%] flex items-center relative justify-center ' > <Loader_2 /> </div>) :

                                !cartData || cartData?.item.length == 0 ? (<div className='w-full h-full flex justify-center items-center capitalize font-bold text-gray-400 ' >no cart items</div>) : (
                                    <div className='w-[98%] mx-auto h-[90%] overflow-y-auto invisible_scroll mt-3 '>

                                        {
                                            cartData?.item.map((cart, i) => {
                                                return (
                                                    <div key={i} className='w-full h-[29.5%] mt-3 border-t-2 px-4 border-gray-300 flex items-center '>
                                                        <div className=' rounded-xl w-[10%] h-[80%] bg-gray-200 '></div>
                                                        <div className='w-max h-max ml-[2%] '>
                                                            <h1 className='font-bold text-black text-xl '>{cart.product.name} </h1>
                                                            <p className=' text-gray-400 text-md ' >Brand Here</p>
                                                        </div>
                                                        <div className='w-[100px] border border-gray-400 h-[30px] rounded-2xl ml-[26%] px-2 flex justify-between items-center '>
                                                            <FaPlus className='text-sm cursor-pointer active:scale-90 transition-all duration-200 ease-in ' />
                                                            <p className='font-bold text-sm'> {cart.quantity} </p>
                                                            <FaMinus className='text-sm cursor-pointer active:scale-90 transition-all duration-200 ease-in' />
                                                        </div>
                                                        <p className='font-bold ml-[11%] text-md text-green-400 '>$ {cart.price}</p>
                                                        <MdDelete className='ml-[14%] text-xl cursor-pointer hover:text-red-600 active:scale-90 transition-all duration-200 ' />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                        }

                    </div>

                    {/* //////////////////// price bar /////////////////////// */}

                    <div className='w-[25%] rounded-2xl bg-white xb_sh p-4 '>
                        <h1 className='text-black font-bold text-xl '>Order Summary</h1>
                        <div className='flex justify-between items-center mt-[5%] '>
                            <input type="text" className='w-[70%] rounded-4xl border border-gray-500 h-[40px] px-3 text-sm' placeholder='Discount Voucher ..' />
                            <button className='w-[28%] h-[40px] xb_sh text-white tw_sh bg-black rounded-4xl cursor-pointer active:scale-98 transition-all duration-200 ease-in-out  '>Apply</button>
                        </div>
                        <p className='font-bold text-gray-500 text-sm flex justify-between items-center w-full mt-[10%] px-2 '>Sub Total  <span className='text-black text-md'>1000 USD </span> </p>
                        <p className='font-bold text-gray-500 text-sm flex justify-between items-center w-full mt-[5%] px-2 '>Discount ( 0% )  <span className='text-black text-md'> -0 USD </span> </p>
                        <p className='font-bold text-gray-500 text-sm flex justify-between items-center w-full mt-[5%] px-2 '>Delivery fee <span className='text-black text-md'>Free </span> </p>
                        <div className='w-full  border-t-2 border-gray-400 mt-[7%] '>
                            <p className='text-black flex justify-between items-center font-bold text-sm mt-3'>Total  <span>$12313 USD</span> </p>
                            <div className='w-full mt-[3%] px-2 flex items-center '>
                                <LuShieldCheck className='text-3xl text-green-400 ' />
                                <p className='text-[12px] text-gray-600 capitalize ml-[5%]  '>90 day limited warranty against manufacture detect </p>
                            </div>
                            <button className='w-full bg-black text-white tw_sh py-2 rounded-3xl mt-[5%] cursor-pointer active:scale-98 transition-all duration-200 ease-in ' >Check Out</button>
                        </div>
                    </div>
                </div>
                <div className='w-full h-[7vh] mt-[2%] flex justify-center items-center gap-5 '>
                    <button className=' hover:-translate-y-1 transition-all duration-200 ease-in-out cursor-pointer text-white bg-black rounded-2xl py-2 px-2 capitalize'><GrTwitter /></button>
                    <button className=' hover:-translate-y-1 transition-all duration-200 ease-in-out cursor-pointer text-white bg-blue-600 rounded-2xl py-2 px-2 capitalize'><MdFacebook /></button>
                    <button className=' hover:-translate-y-1 transition-all duration-200 ease-in-out cursor-pointer text-white bg-orange-600 rounded-2xl py-2 px-2 capitalize'><FaInstagram /></button>
                    <button className=' hover:-translate-y-1 transition-all duration-200 ease-in-out cursor-pointer text-white bg-red-600 rounded-2xl py-2 px-2 capitalize'><FaPinterest /></button>
                    <button className=' hover:-translate-y-1 transition-all duration-200 ease-in-out cursor-pointer text-white bg-green-600 rounded-2xl py-2 px-2 capitalize'><SiWhatsapp /></button>
                </div>
            </div>
        </PageWrapper>
    )
}

export default Cart