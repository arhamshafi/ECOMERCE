import React, { useEffect } from 'react'
import PageWrapper from '../Components/Motion'

import { useState } from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom'
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
import { get_order_service } from '../services/Order_service';
import { motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { useCart } from '../Context/Cartcontext';


function Profile() {

    const { user, Logout } = useAuth()
    const { cancel_order } = useCart()
    const [nav_list, set_nav_list] = useState(false)
    const [ord, setOrd] = useState(null)
    const navigate = useNavigate()
    const [order_items, setOrdItems] = useState(0)
    const [Spended, set_spended] = useState(0)
    const [ordercost, setordercost] = useState(0)

    // if (!user) {
    //     return <Navigate to="/login" replace />;
    // }

    useEffect(() => {
        if (ord && ord.length > 0) {
            const totalItems = ord.reduce((acc, ele) => acc + (ele?.orderItems?.length || 0), 0)
            const total_prc = ord.reduce((acc, ele) => acc + (ele?.orderSummary?.totalAmount || 0), 0)
            const money = ord?.filter(ele => ele?.ispaid)?.reduce((acc, ele) => acc + (ele?.orderSummary?.totalAmount || 0), 0)
            setOrdItems(totalItems)
            set_spended(money)
            setordercost(total_prc)
        }
    }, [ord])

    const fetch_order = async () => {
        try {
            const { order, success } = await get_order_service()
            if (success) {
                setOrd(order)
            }
        } catch (err) {
            console.log(err?.response?.data?.message || "Error While Fetching Order List");
            setOrd(err?.response?.data?.order)
        }
    }

    const handle_cancel_order = async (id) => {

        const res = await cancel_order(id)
        if (res.success) {
            fetch_order()
        }
    }
    useEffect(() => {
        const timeout = setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 50)
        fetch_order()
        return () => clearTimeout(timeout);
    }, [])


    return (

        <PageWrapper>
            <div className=' min-h-screen w-full pt-[80px] px-5 pb-10 ' >
                <div className={`fixed transition-all duration-400 ease-in-out rounded-xl right-1 bg-white xb_sh w-[200px] h-max z-30 p-2.5 ${nav_list ? "opacity-100 visible top-18 right-3 " : "invisible right-3 opacity-0 top-25 "} `}>
                    <Link className='w-full h-[35px] bg-gray-100 flex hover:bg-gray-200 transition-all duration-200 ease-in-out cursor-pointer rounded-lg items-center justify-between px-2 '><p className='text-[15px] font-bold' >{user?.name}</p> <div className='w-[28px] h-[28px] xb_sh rounded-full overflow-hidden '> <img src="./avatar.jpeg" alt="" className='w-full h-full' />  </div></Link>
                    <Link to={"/"} className='w-full h-[35px] bg-gray-100 flex hover:bg-gray-200 transition-all duration-200 ease-in-out cursor-pointer rounded-lg items-center justify-between px-2 mt-2 '> <p className='text-[15px] font-bold' > Home </p> <FaHome className='text-green-500' /> </Link>
                    <Link to={"/product"} className='w-full h-[35px] bg-gray-100 flex hover:bg-gray-200 transition-all duration-200 ease-in-out cursor-pointer rounded-lg items-center justify-between px-2 mt-2 '> <p className='text-[15px] font-bold' > Product </p>  <HiTemplate className='text-gray-500' /> </Link>
                    {user?.role == "admin" &&
                        <Link to={"/admin"} className='w-full h-[35px] bg-gray-100 flex hover:bg-gray-200 transition-all duration-200 ease-in-out cursor-pointer rounded-lg items-center justify-between px-2 mt-2 '> <p className='text-[15px] font-bold' > Admin Dashboard </p> <FaCrown className='text-yellow-400' /> </Link>
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
                                <p className='text-sm text-orange-400 font-bold ml-2' >{order_items}</p>

                            </div>
                            <div className='w-max h-max flex items-center'>
                                <div className=' font-bold text-cyan-500 text-sm pr-2 border-r-2 w-max ' >Profile</div>
                                <p className='text-sm text-cyan-400 font-bold ml-2 capitalize ' > {user?.role} </p>
                            </div>
                            <div className='w-max h-max flex items-center'>
                                <div className=' font-bold text-purple-500 text-sm pr-2 border-r-2 w-max ' >Ordered Items Amount</div>
                                <p className='text-sm text-purple-400 font-bold ml-2 w-max ' >$ {ordercost} </p>
                            </div>
                            <div className='w-max h-max flex items-center'>
                                <div className=' font-bold text-green-500 text-sm pr-2 border-r-2 w-max ' >Spended Amount</div>
                                <p className='text-sm text-green-400 font-bold ml-2 w-max ' >$ {Spended} </p>
                            </div>
                        </div>
                    </div>

                </div>
                <h1 className='text-2xl font-bold mt-5 ml-15' >Your Orders </h1>
                <div className='w-[90%] mt-10 mx-auto '>

                    {
                        !ord || ord.length == 0 ? (
                            <div className='w-full flex justify-center mt-20'> <p className='font-bold text-gray-500 tracking-[2px] text-3xl '>No Order Placed </p> </div>
                        ) : (
                            ord?.map((ele, idx) => {

                                return (

                                    <motion.div key={idx} initial={{ opacity: 0, scale: 0.90 }}

                                        whileInView={{
                                            opacity: 1,
                                            scale: 1,
                                            transition: {
                                                type: "spring",
                                                stiffness: 150,
                                                damping: 10,
                                            }
                                        }}
                                        exit={{
                                            opacity: 0,
                                            scale: 0.8,
                                            transition: {
                                                type: "spring",
                                                stiffness: 100,
                                                damping: 15,
                                                duration: 0.3,
                                                delay: 0
                                            }
                                        }}
                                        className='w-full h-max p-5 bg-white xb_sh overflow-hidden rounded-xl relative mt-8 flex justify-between '>
                                        <div className='absolute top-0 left-0 w-[10px] h-full bg-orange-500'></div>
                                        <div className='w-[27%] h-full pl-2 border-r-2 border-gray-400'>
                                            <h1 className='text-xl font-bold text-black' >Shipping Info</h1>
                                            <p className='capitalize text-md font-bold mt-10' > orderId : <span className='text-gray-500 '>{ele?.orderId}</span></p>
                                            <p className='capitalize text-md font-bold mt-2' > name : <span className='text-gray-500 '>{ele?.shippingInfo?.name}</span></p>
                                            <p className='text-md mt-2 font-bold ' > E-mail : <span className='text-gray-500 '>{ele?.shippingInfo?.email}</span></p>
                                            <p className='text-md mt-2 font-bold ' > Phone : <span className='text-gray-500  '>0{ele?.shippingInfo?.phone}</span></p>
                                            <p className='text-md mt-2 font-bold capitalize' > Address : <span className='text-gray-500  '>{ele?.shippingInfo?.address}</span></p>
                                            <p className='text-md mt-2 font-bold capitalize' > City : <span className='text-gray-500  '>{ele?.shippingInfo?.city}</span></p>
                                            <p className='text-md mt-2 font-bold capitalize' > postal code : <span className='text-gray-500  '>{ele?.shippingInfo?.postalCode}</span></p>
                                            <p className='text-md mt-2 font-bold capitalize' > Shipping Method : <span className='text-yellow-500  '>{ele?.orderSummary?.shippingCost == 5 ? "Standard" : ele?.orderSummary?.shippingCost == 10 ? "Express" : "Over Night"}</span></p>
                                            <p className='text-md mt-2 font-bold capitalize' > payment method : <span className='text-green-500  '>{ele?.shippingInfo?.paymentMethod}</span></p>
                                            <p className='text-md mt-2 font-bold capitalize' > payment : <span className={` ${ele?.ispaid ? "text-green-500" : "text-red-500"} text-gray-500 `} >{ele?.ispaid ? "paid" : "unpaid"}</span></p>
                                            <button className='bg-red-600 xr_sh cursor-pointer active:scale-98 transition-all duration-150 rounded-lg mt-10 py-1 px-3 text-white tw_sh ' onClick={() => handle_cancel_order(ele._id)} >Cancel Order</button>
                                        </div>
                                        <div className='w-[70%] h-full '>
                                            <h1 className='text-xl font-bold text-black' >Order Items</h1>
                                            <div className='w-full overflow-y-auto h-[300px] '>

                                                {
                                                    ele.orderItems.map((item, i) => {
                                                        return (
                                                            <motion.div key={i} whileHover={{ x: 5 }} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                                                                transition={{ type: "spring", stiffness: 300, duration: .5 }}
                                                                className='w-[95%] bg-gray-200 xb_sh h-[80px] mt-4 flex ml-2 items-center px-5 rounded-lg gap-5 ' >
                                                                <p className='font-bold text-black'>{i + 1} : </p>
                                                                <div className='w-[80px] h-[60px] xb_sh rounded-lg bg-cover bg-center ' style={{ backgroundImage: `url(${item?.productId?.image})` }} ></div>
                                                                <div className="w-[300px] ">
                                                                    <p className="font-bold text-md tracking-[1px]">
                                                                        {item?.productId?.name?.length > 30
                                                                            ? item.productId.name.slice(0, 30) + "..."
                                                                            : item?.productId?.name}
                                                                    </p>
                                                                </div>
                                                                <div className='w-[140px] font-bold'> Quantity : <span className='text-gray-400'>{item?.quantity}</span>  </div>
                                                                <div className='w-[100px] font-bold text-green-500 '> $ {item?.productId?.discountedPrice} </div>
                                                            </motion.div>
                                                        )
                                                    })
                                                }
                                            </div>

                                            <div className='w-full flex justify-between mt-10 items-center'>
                                                <h1 className='text-xl font-bold text-black'>Order Summary  </h1>
                                                <p className={` px-3 py-0.5 rounded-md capitalize font-bold tracking-[1px] text-sm ${ele?.orderStatus == "pending" || ele?.orderStatus == "cancelled" ? "text-red-500 bg-red-200" : ele?.orderStatus == "confirmed" ? "text-yellow-500 bg-yellow-200" : ele?.orderStatus == "processing" ? "text-purple-600 bg-purple-200" : "text-green-500 bg-green-200"} `}> {ele?.orderStatus}</p>

                                            </div>
                                            <div className='flex items-center mt-5 gap-5'>
                                                <p className='text-md font-bold capitalize ' > SubToal : <span className='text-gray-500  '> $ {ele?.orderSummary?.subTotal}</span></p> +
                                                <p className='text-md font-bold capitalize ' > Tax (5%) : <span className='text-gray-500  '> $ {ele?.orderSummary?.tax}</span></p> +
                                                <p className='text-md font-bold capitalize ' > Shipping Cost : <span className='text-gray-500  '> $ {ele?.orderSummary?.shippingCost}</span></p> +
                                                <p className='text-md font-bold capitalize ' > Total Amount : <span className='text-gray-500  '> $ {ele?.orderSummary?.totalAmount}</span></p>

                                            </div>
                                            <p className='py-1 px-4 w-max rounded-lg bg-red-200 flex items-center text-red-600 mt-5 text-sm'>
                                                <b>Note:</b> <FiAlertCircle className='ml-2 pr-2 text-2xl' /> You are not able to cancel the order once it is shipped.
                                            </p>

                                        </div>


                                    </motion.div>
                                )
                            })
                        )
                    }



                </div>






            </div>


        </PageWrapper >
    )
}

export default Profile