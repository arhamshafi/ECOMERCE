import React, { useEffect } from 'react'
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
import { FaCartShopping } from "react-icons/fa6";
import { FaShippingFast } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaAmericanSignLanguageInterpreting } from "react-icons/fa";
import { useCart } from '../Context/Cartcontext';
import { motion } from "framer-motion"
import { MdOutlinePayments } from "react-icons/md";

function Cart() {

    const { user, Logout } = useAuth()
    const { cart, loading, remove_cart, Add_to_cart, decreament_quan } = useCart()
    const [nav_list, set_nav_list] = useState(false)
    const navigate = useNavigate()
    const [validation, setValidation] = useState({ delivery: "", name: "", email: "", phone: "", postalcode: "", state: "", payment_method: "", tax: "" })
    const [checkOut, setCheckout] = useState(false)
    const [CustomInstructions, setCustomInstructions] = useState(null)
    const [slider, setSlider] = useState(0)

    const slideVariants = {
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
        exit: { opacity: 0, x: -100, transition: { duration: 0.4 } }
    }

    const Add_cart = async (id) => {
        const res = await Add_to_cart(id)
    }


    useEffect(() => {
        if (!checkOut) {
            setValidation({ delivery: "", name: "", email: "", phone: "", address: "", postalcode: "", state: "", payment_method: "", tax: "" })
            setSlider(0)
        }
    }, [checkOut])

    return (

        <PageWrapper>
            <div className={`fixed transition-all duration-400 ease-in-out rounded-xl right-1 bg-white xb_sh w-[200px] h-max z-30 p-2.5 ${nav_list ? "opacity-100 visible top-18 right-3 " : "invisible right-3 opacity-0 top-25 "} `}>
                <Link to={"/profile"} className='w-full h-[35px] bg-gray-100 flex hover:bg-gray-200 transition-all duration-200 ease-in-out cursor-pointer rounded-lg items-center justify-between px-2 '><p className='text-[15px] font-bold' >{user?.name}</p> <div className='w-[28px] h-[28px] xb_sh rounded-full overflow-hidden '> <img src="./avatar.jpeg" alt="" className='w-full h-full' />  </div></Link>
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
                <button className='py-1 pl-2 pr-4 hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer tw_sh tracking-[2px] active:scale-100 xb_sh text-sm text-white flex items-center gap-2 bg-black rounded-lg' onClick={() => navigate(-1)} > <IoChevronBack /> Back</button>
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
                <h1 className={`text-black text-3xl mt-[2%] tb_sh `}>Shopping Cart</h1>
                <div className='w-[98%] mx-auto h-[65vh] items-center flex justify-between mt-[3%]' >
                    <div className='w-[70%] rounded-2xl  h-full bg-white xb_sh p-4 '>

                        {
                            !checkOut ? (
                                <div className='w-full flex items-center h-[50px] mt-1'>
                                    <p className='font-bold text-sm ml-[3%] '>Product Code</p>
                                    <p className='font-bold text-sm ml-[40%] '>Quantity</p>
                                    <p className='font-bold text-sm ml-[13%] '>Total</p>
                                    <p className='font-bold text-sm ml-[13%] '>Action</p>
                                </div>
                            ) : (
                                <div className='w-full flex h-[50px] justify-around items-center mt-1 '>
                                    <div className='w-[50px] scale-105 h-max pb-2 ' >
                                        <div className={`${slider >= 0 ? "bg-orange-500 -translate-y-1 " : "bg-orange-300  "} text-white flex justify-center items-center transition-all duration-400  ease-in-out w-[30px] mx-auto h-[30px] rounded-full xo_sh `}><FaCartShopping /></div>
                                        <p className={` ${slider >= 0 ? "text-orange-600 " : "text-orange-300"} font-bold text-center text-sm mt-1`} >Cart</p>
                                    </div>
                                    <div className='w-[50px] scale-105 h-max ' >
                                        <div className={`${slider >= 1 ? "bg-orange-500 -translate-y-1" : "bg-orange-300  "} text-white transition-all duration-400  ease-in-out flex justify-center items-center w-[30px] mx-auto h-[30px] rounded-full xo_sh `}><FaShippingFast /></div>
                                        <p className={` ${slider >= 1 ? "text-orange-600 " : "text-orange-300"} font-bold text-center text-sm mt-1`} >Shipping</p>
                                    </div>
                                    <div className='w-[50px] scale-105 h-max ' >
                                        <div className={`${slider >= 2 ? "bg-orange-500 -translate-y-1" : "bg-orange-300  "} text-white transition-all duration-400  ease-in-out flex justify-center items-center w-[30px] mx-auto h-[30px] rounded-full xo_sh `}><MdOutlinePayments /></div>
                                        <p className={` ${slider >= 2 ? "text-orange-600 " : "text-orange-300"} font-bold text-center text-sm mt-1`} >Payment</p>
                                    </div>
                                </div>
                            )
                        }


                        {
                            loading ? (<div className='w-full h-[90%] flex items-center relative justify-center ' > <Loader_2 /> </div>) :

                                !cart || cart?.item?.length == 0 ? (<div className='w-full h-full flex justify-center flex-col  items-center capitalize text-2xl font-bold text-gray-400 ' ><p>no cart items</p> <p className='text-sm text-orange-500 to_sh mt-5 hover:underline cursor-pointer ' onClick={() => navigate("/product")} >view Product</p> </div>) : (
                                    <div className='w-[98%] mx-auto h-[85%] relative overflow-hidden '>

                                        {slider === 0 && (
                                            <motion.div
                                                key="slide0"
                                                variants={slideVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                className="w-full bg-white h-full absolute top-0 left-0 overflow-y-auto mt-3 invisible_scroll "
                                            >
                                                {cart?.item?.map((cart, i) => (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: .8 }}
                                                        whileInView={{
                                                            opacity: 1,
                                                            scale: 1,
                                                            transition: {
                                                                type: "spring",   // spring effect
                                                                stiffness: 150,   // spring tightness
                                                                damping: 15,       // bounce control (chhota rakho to zyada jiggle hoga)
                                                                mass: 1,          // weight effect
                                                            }
                                                        }}
                                                        key={i} className='w-full h-[30%] border-t-2 mt-2 px-4 border-gray-300 flex items-center'>
                                                        <div
                                                            className='rounded-xl w-[100px] h-[80%] bg-gray-200 bg-cover bg-center bg-no-repeat'
                                                            style={{ backgroundImage: `url(${cart?.product?.image})` }}
                                                        ></div>
                                                        <div className='w-[310px] h-max ml-[2%]'>
                                                            <h1 className='font-bold text-black text-lg'>{cart?.product?.name}</h1>
                                                            <p className='text-gray-500 mt-1 text-md'>{cart?.product?.brand}</p>
                                                        </div>
                                                        <div className='w-[100px] border border-gray-400 h-[30px] rounded-2xl px-2 flex justify-between items-center'>
                                                            <FaPlus onClick={() => Add_cart(cart?.product?._id)} className='text-sm cursor-pointer active:scale-90 transition-all duration-200 ease-in' />
                                                            <p className='font-bold text-sm'>{cart.quantity}</p>
                                                            <FaMinus onClick={() => decreament_quan(cart?.product?._id)} className='text-sm cursor-pointer active:scale-90 transition-all duration-200 ease-in' />
                                                        </div>
                                                        <p className='font-bold ml-[9%] text-md text-green-400'>$ {cart.price}</p>
                                                        <MdDelete onClick={() => remove_cart(cart?.product?._id)} className='ml-[13%] text-xl cursor-pointer hover:text-red-600 active:scale-90 transition-all duration-200' />
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                        )}

                                        {slider === 1 && (
                                            <motion.div
                                                key="slide1"
                                                variants={slideVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                className="w-full h-full absolute top-0 left-0 bg-white "
                                            >
                                                <div className='w-full h-[50px] mt-[3.2%] flex justify-center gap-5 items-center '>
                                                    <input type="text" placeholder='Enter Full Name Here' autoComplete='off' className='w-[45%] bg-gray-100 xb_sh font-bold  border-gray-500 h-[40px] outline-none rounded-xl pl-3  ' name='name' />
                                                    <input type="text" placeholder='Enter Email Here' autoComplete='off' className='w-[45%] bg-gray-100 xb_sh font-bold border-gray-500 h-[40px] outline-none rounded-xl pl-3  ' name='email' /> </div>
                                                <div className='w-full h-[50px] mt-[3.2%] flex justify-center gap-5 items-center '>
                                                    <input type="text" placeholder='Enter Phone Number Here' autoComplete='off' className='w-[45%] bg-gray-100 xb_sh font-bold border-gray-500 h-[40px] outline-none rounded-xl pl-3  ' name='phone' />
                                                    <input type="text" placeholder='Enter Address Here' autoComplete='off' className='w-[45%] bg-gray-100 xb_sh font-bold border-gray-500 h-[40px] outline-none rounded-xl pl-3  ' name='address' /> </div>
                                                <div className='w-full h-[50px] mt-[3.2%] flex justify-center gap-5 items-center '>
                                                    <input type="text" placeholder='Enter Your City Here' autoComplete='off' className='w-[45%] bg-gray-100 xb_sh font-bold border-gray-500 h-[40px] outline-none rounded-xl pl-3  ' name='city' />
                                                    <input type="text" placeholder='Enter Your State' autoComplete='off' className='w-[45%] bg-gray-100 xb_sh font-bold border-gray-500 h-[40px] outline-none rounded-xl pl-3  ' name='state' /> </div>
                                                <div className='w-full h-[50px] mt-[3.2%] flex justify-center gap-5 items-center '>
                                                    <input type="text" placeholder='Enter postal Code Here' autoComplete='off' className='w-[45%] bg-gray-100 xb_sh font-bold border-gray-500 h-[40px] outline-none rounded-xl pl-3  ' name='postalcode' />
                                                    <input type="text" placeholder='Pakistan' autoComplete='off' className='w-[45%] bg-gray-100 xb_sh  border-gray-500 h-[40px] font-bold outline-none rounded-xl pl-3  ' disabled /> </div>

                                            </motion.div>
                                        )}

                                        {slider === 2 && (
                                            <motion.div
                                                key="slide2"
                                                variants={slideVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                className="w-full h-full absolute top-0 left-0 bg-white"
                                            >
                                                3
                                            </motion.div>
                                        )}

                                    </div>



                                )
                        }
                    </div>

                    {/* //////////////////// price bar /////////////////////// */}

                    <div className='w-[25%] rounded-2xl bg-white xb_sh p-4 h-max '>
                        <h1 className='text-black font-bold text-xl '>Order Summary</h1>
                        <div className='flex justify-between items-center mt-[5%] '>
                            <input type="text" className='w-[70%] rounded-4xl border border-gray-500 h-[40px] px-3 text-sm' placeholder='Discount Voucher ' />
                            <button className='w-[28%] h-[40px] xb_sh text-white tw_sh bg-black rounded-4xl cursor-pointer active:scale-98 transition-all duration-200 ease-in-out  '>Apply</button>
                        </div>
                        <p className='font-bold text-gray-500 text-sm flex justify-between items-center w-full mt-[10%] px-2 '>Sub Total  <span className='text-black text-md'>$ {cart?.totalAmount}</span> </p>
                        <p className='font-bold text-gray-500 text-sm flex justify-between items-center w-full mt-[5%] px-2 '>Tax ( 5% )  <span className='text-black text-md'>$ {(cart?.totalAmount * 0.05).toFixed(2)} </span> </p>
                        <p className='font-bold text-gray-500 text-sm flex justify-between items-center w-full mt-[5%] px-2 '>Delivery fee <span className='text-black text-md'>{!validation.tax ? "--/--" : `$ ${validation.tax}`} </span> </p>
                        <div className='w-full  border-t-2 border-gray-400 mt-[7%] '>
                            <p className='text-black flex justify-between items-center font-bold text-sm mt-[3%]'>Total  <span> $ {(cart?.totalAmount + cart?.totalAmount * 0.05).toFixed(2)}</span> </p>
                            <div className='w-full mt-[3%] px-2 flex items-center '>
                                <LuShieldCheck className='text-3xl text-green-400 ' />
                                <p className='text-[12px] text-gray-600 capitalize ml-[5%]  '>90 day limited warranty against manufacture detect </p>
                            </div>
                            <button className={`w-full ${checkOut ? "bg-orange-500" : "bg-black"} text-white tw_sh py-2 rounded-3xl mt-[5%] cursor-pointer active:scale-100 hover:scale-103  transition-all duration-200 ease-in `} onClick={() => setCheckout(prev => !prev)} > {checkOut ? "Cancel" : "Check Out"} </button>
                        </div>
                    </div>
                </div>
                {checkOut && (<div className='w-full mt-[2%] flex items-center gap-4 px-2 '>
                    <button onClick={() => setSlider(prev => prev - 1)} disabled={slider == 0} className={`py-1 px-5 rounded-lg text-white font-bold xo_sh tracking-[1px] cursor-pointer transition-all duration-200 hover:scale-103 active:scale-100 bg-orange-500 ${slider == 0 ? "opacity-55" : "opacity-100"} `}>Back</button>
                    <button onClick={() => setSlider(prev => prev + 1)} disabled={slider == 2} className={`py-1 px-5 rounded-lg text-white font-bold xo_sh tracking-[1px] cursor-pointer transition-all duration-200 hover:scale-103 active:scale-100 bg-orange-500 ${slider == 2 ? "opacity-55" : "opacity-100"} `}>Next</button>
                </div>)}
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