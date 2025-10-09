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
import { useNavigate, Link, Navigate } from 'react-router-dom'
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
import { motion, time } from "framer-motion"
import { FaUser } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdOutlinePayments } from "react-icons/md";
import { FaBook } from "react-icons/fa6";
import { FaCity } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import { order_confirm } from '../services/Order_service';

function Cart() {

    const { user, Logout } = useAuth()
    const { cart, loading, remove_cart, Add_to_cart, decreament_quan, fetch_cart, dispatch } = useCart()
    const [nav_list, set_nav_list] = useState(false)
    const navigate = useNavigate()
    const [validation, setValidation] = useState({ delivery: "Standard", name: "", email: "", phone: "", postalcode: "", state: "", payment_method: "cash_on_delivery", city: "", address: "" })
    const [checkOut, setCheckout] = useState(false)
    const [CustomInstructions, setCustomInstructions] = useState("")
    const [slider, setSlider] = useState(0)
    const [inp_error, set_inp_error] = useState(false)
    const [cnfrm_ord, setcnfrm_ord] = useState(false)
    const order_info = {
        cartItem: cart?.item?.map(ele => ({ productId: ele.product._id, quantity: ele.quantity })) || [],
        shipping_info: validation,
        Customer_instr: CustomInstructions,

    }

    // if (!user) {
    //     return <Navigate to="/login" replace />;
    // }

    const slideVariants = {
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
        exit: { opacity: 0, x: -100, transition: { duration: 0.4 } }
    }
    const validation_handler = (e) => {
        const { name, value } = e.target
        setValidation({ ...validation, [name]: value })
    }
    const increase_slider = () => {
        setSlider(prev => {
            if (prev === 0) {
                return prev + 1
            }

            if (prev === 1) {
                if (!validation.name || !validation.email || !validation.phone || !validation.city || !validation.address || !validation.postalcode || !validation.state || !validation.delivery) {
                    set_inp_error(true)
                    return prev
                }
                return prev + 1
            }

            return prev + 1
        })
    }
    const Add_cart = async (id) => {
        const res = await Add_to_cart(id)
    }

    const orderconfirm = async () => {
        setcnfrm_ord(true)
        try {
            const { success, message } = await order_confirm(order_info)
            if (success) {
                toast.success(message, { closeOnClick: true, draggable: true, position: "top-center" })
                setCheckout(false)
                setCustomInstructions("")
                dispatch({ type: "clear_cart" })
                setTimeout(() => {
                    navigate("/profile")
                }, 1500)
            }

        } catch (err) {
            toast.error(err.response?.data?.message || "Invalid Error")
        }
        finally {
            setcnfrm_ord(false)
        }

    }

    useEffect(() => {
        let timer;
        timer = setTimeout(() => {
            set_inp_error(false)
        }, 1500)
        return () => clearTimeout(timer)
    }, [inp_error])

    useEffect(() => {
        if (!checkOut) {
            setValidation({ name: "", email: "", phone: "", address: "", city: "", postalcode: "", state: "", payment_method: "cash_on_delivery", delivery: "Standard" })
            setSlider(0)
        }
    }, [checkOut])

    useEffect(() => {
        const timeout = setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 50)
        fetch_cart()
        return () => clearTimeout(timeout);
    }, [])

    return (

        <PageWrapper>
            <div className={`fixed transition-all duration-400 ease-in-out rounded-xl right-1 bg-white xb_sh w-[200px] h-max z-30 p-2.5 ${nav_list ? "opacity-100 visible top-18 right-3 " : "invisible right-3 opacity-0 top-25 "} `}>
                <Link to={"/profile"} className='w-full h-[35px] bg-gray-100 flex hover:bg-gray-200 transition-all duration-200 ease-in-out cursor-pointer rounded-lg items-center justify-between px-2 '><p className='text-[15px] capitalize font-bold' >{user?.name}</p> <div className='w-[28px] h-[28px] xb_sh rounded-full overflow-hidden '> <img src="./avatar.jpeg" alt="" className='w-full h-full' />  </div></Link>
                <Link to={"/"} className='w-full h-[35px] bg-gray-100 flex hover:bg-gray-200 transition-all duration-200 ease-in-out cursor-pointer rounded-lg items-center justify-between px-2 mt-2 '> <p className='text-[15px] font-bold' > Home </p> <FaHome className='text-green-500' /> </Link>
                <Link to={"/product"} className='w-full h-[35px] bg-gray-100 flex hover:bg-gray-200 transition-all duration-200 ease-in-out cursor-pointer rounded-lg items-center justify-between px-2 mt-2 '> <p className='text-[15px] font-bold' > Product </p>  <HiTemplate className='text-gray-500' /> </Link>
                <Link className='w-full h-[35px] bg-gray-100 flex hover:bg-gray-200 transition-all duration-200 ease-in-out cursor-pointer rounded-lg items-center justify-between px-2 mt-2 '> <p className='text-[15px] font-bold' > Orders List </p> <FaList /> </Link>
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
                                <div className='w-[35px] h-[35px] rounded-full bg-white xb_sh flex justify-center items-center cursor-pointer hover:bg-white/70 transition-all duration-150 ease-out ' > <IoBag /> </div>
                                <div className='w-[35px] h-[35px] rounded-full bg-white xb_sh flex justify-center items-center text-red-500  cursor-pointer hover:bg-gray-100 transition-all duration-150 ease-out '> <IoHeart /> </div>
                                <div onClick={() => set_nav_list(prev => !prev)} className={`min-w-[35px] xb_sh cursor-pointer transition-all ease-in-out duration-200 h-[35px] rounded-2xl bg-white flex items-center ${nav_list ? "justify-center" : "gap-2 pl-3 pr-1"}  `}  > {nav_list ? <FaXmark /> : <> <p className='text-[15px] capitalize font-bold' >{user?.name}</p> <div className='w-[28px] h-[28px] xb_sh rounded-full overflow-hidden '> <img src="./avatar.jpeg" alt="" className='w-full h-full' />  </div> </>} </div>
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

            <div className='w-full min-h-screen pt-15 px-5 pb-5 '>
                <h1 className={`text-black text-3xl mt-[2%] tb_sh `}>Shopping Cart</h1>
                <div className='w-[98%] mx-auto h-max items-center flex justify-between mt-[3%]' >
                    <div className='w-[70%] rounded-2xl  h-full bg-white xb_sh p-4 '>

                        {
                            !checkOut ? (
                                <div className='w-full flex items-center '>
                                    <p className='font-bold text-sm ml-[3%] '>Product Code</p>
                                    <p className='font-bold text-sm ml-[40%] '>Quantity</p>
                                    <p className='font-bold text-sm ml-[13%] '>Total</p>
                                    <p className='font-bold text-sm ml-[13%] '>Action</p>
                                </div>
                            ) : (
                                <div className='w-full flex h-[50px] justify-around items-center mt-3 '>
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

                                !cart || cart?.item?.length == 0 ? (<div className='w-full h-[350px] flex justify-center flex-col  items-center capitalize text-2xl font-bold text-gray-400 ' ><p>no cart items</p> <p className='text-sm text-orange-500 to_sh mt-5 hover:underline cursor-pointer ' onClick={() => navigate("/product")} >view Product</p> </div>) : (
                                    <div className='w-full mx-auto min-h-[300px] relative flex items-center overflow-hidden mt-3 '>
                                        {slider === 0 && (
                                            <motion.div
                                                key="slide0"
                                                variants={slideVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                className="w-[98%] mx-auto bg-white h-[320px] overflow-x-hidden overflow-y-auto mt-3 invisible_scroll "
                                            >
                                                {cart?.item?.map((cart, i) => (
                                                    <motion.div
                                                        initial={{ opacity: 0 , scale:.8 }}
                                                        whileInView={{
                                                            opacity: 1,
                                                            scale: 1,
                                                            transition: {
                                                                type: "spring",   // spring effect
                                                                stiffness: 150,   // spring tightness
                                                                damping: 15,       // bounce control (chhota rakho to zyada jiggle hoga)
                                                                mass: 1,          // weight effect
                                                            }
                                                        }} exit={{ opacity:0 , scale:.8 }}
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
                                                        <p className='font-bold ml-[9%] text-md text-green-400'>$ {cart?.price}</p>
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
                                                className="w-full h-full bg-white "
                                            >
                                                <div className='w-full h-[50px] mt-[3.2%] flex justify-center gap-5 items-center relative '>
                                                    <FaUser className='absolute left-[46%] text-gray-400 ' />
                                                    <MdOutlineAlternateEmail className='absolute right-[5%] text-gray-500 text-lg ' />
                                                    <input type="text" placeholder='Enter Full Name Here' autoComplete='off' className={`w-[45%] bg-gray-100 xb_sh font-bold pr-10 border-gray-500 h-[40px] outline-none rounded-xl pl-3 ${inp_error && !validation.name ? "error" : ""} `} name='name' onChange={validation_handler} value={validation.name} />
                                                    <input type="text" placeholder='Enter Email Here' autoComplete='off' className={`w-[45%] bg-gray-100 xb_sh font-bold pr-10 border-gray-500 h-[40px] outline-none rounded-xl pl-3 ${inp_error && !validation.email ? "error" : ""} `} name='email' onChange={validation_handler} value={validation.email} /> </div>
                                                <div className='w-full h-[50px] mt-[3.2%] flex justify-center gap-5 items-center relative '>
                                                    <FaPhoneFlip className='absolute left-[46%] text-gray-400' />
                                                    <FaBook className='absolute right-[5%] text-gray-400' />
                                                    <input type="number" placeholder='Enter Phone Number Here' autoComplete='off' className={`w-[45%] bg-gray-100 xb_sh pr-10 font-bold border-gray-500 h-[40px] outline-none rounded-xl custom-number-input pl-3 ${inp_error && !validation.phone ? "error" : ""} `} name='phone' onChange={validation_handler} value={validation.phone} />
                                                    <input type="text" placeholder='Enter Address Here' autoComplete='off' className={`w-[45%] bg-gray-100 xb_sh font-bold pr-10 border-gray-500 h-[40px] outline-none rounded-xl pl-3 ${inp_error && !validation.address ? "error" : ""} `} name='address' onChange={validation_handler} value={validation.address} /> </div>
                                                <div className='w-full h-[50px] mt-[3.2%] flex justify-center gap-5 items-center relative'>
                                                    <FaCity className='absolute left-[46%] text-gray-400' />
                                                    <input type="text" placeholder='Enter Your City Here' autoComplete='off' className={`w-[45%] bg-gray-100 xb_sh font-bold pr-10 border-gray-500 h-[40px] outline-none rounded-xl pl-3 ${inp_error && !validation.city ? "error" : ""} `} name='city' onChange={validation_handler} value={validation.city} />
                                                    <input type="text" placeholder='Enter Your State' autoComplete='off' className={`w-[45%] bg-gray-100 xb_sh font-bold pr-10 border-gray-500 h-[40px] outline-none rounded-xl pl-3 ${inp_error && !validation.state ? "error" : ""} `} name='state' onChange={validation_handler} value={validation.state} /> </div>
                                                <div className='w-full h-[50px] mt-[3.2%] flex justify-center gap-5 items-center relative '>
                                                    <input type="number" placeholder='Enter postal Code Here' autoComplete='off' className={` w-[45%] bg-gray-100 xb_sh font-bold pr-10 border-gray-500 h-[40px] outline-none rounded-xl custom-number-input pl-3 ${inp_error && !validation.postalcode ? "error" : ""} `} name='postalcode' onChange={validation_handler} value={validation.postalcode} />
                                                    <input type="text" placeholder='Pakistan' autoComplete='off' className='w-[45%] bg-gray-100 xb_sh  border-gray-500 h-[40px] font-bold outline-none rounded-xl pl-3  ' disabled />
                                                    <img src="/flag.png" className='w-[30px] h-[30px]  absolute right-12  ' alt="" />
                                                </div>
                                                <div className='font-bold text-black text-lg mt-10 flex items-center px-5 gap-2'> <div className='w-[30px] h-[30px] bg-orange-200 rounded-full xo_sh flex justify-center items-center' > <FaShippingFast className='text-xl text-orange-600 ' /> </div> Shipping Methood</div>

                                                <div className='w-[95%] mx-auto h-[90px] mt-4 flex justify-between items-center  '>
                                                    {
                                                        [{ type: "Standard", price: 5, time: "After 7 Days" }, { type: "Express", price: 10, time: "After 4 Days" }, { type: "Over Night", price: 20, time: "After 24 Hours" }].map((ele, i) => {
                                                            return (
                                                                <div key={i} className={` ${validation.delivery == ele.type ? "bg-orange-100 border-orange-400 xo_sh " : "bg-gray-100 border-gray-400 xb_sh "} border-2 transition-all cursor-pointer hover:-translate-y-1  duration-200 ease-in-out p-3 w-[32%] h-full rounded-lg `} onClick={() => setValidation({ ...validation, delivery: ele.type })} >
                                                                    <div className={`w-full flex justify-between items-center font-bold text-xl ${validation.delivery == ele.type ? "text-orange-500 to_sh " : "text-black tb_sh"} `} > <p>{ele.type}</p> <p className='text-md font-normal ' >$ {ele.price}</p> </div>
                                                                    <p className={`${validation.delivery == ele.type ? "text-orange-500" : "text-gray-500"} text-sm mt-3 `} >{ele.time}</p>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                <p className='text-gray-500 ml-5 mt-7' >Customer Instruction ( Optional )</p>
                                                <textarea onChange={(e) => setCustomInstructions(e.target.value)} value={CustomInstructions} className='w-[95%] xb_sh_in bg-gray-100 block mt-4 mx-auto resize-none outline-none h-[100px] px-5 py-3 rounded-xl '  ></textarea>

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
                                                <div className='font-bold text-black text-lg mt-5 flex px-5 gap-2'> <div className='w-[30px] h-[30px] bg-orange-200 rounded-full xo_sh flex justify-center items-center' > <MdOutlinePayments className='text-xl text-orange-600 ' /> </div> Payment Methood</div>
                                                <div className='w-full px-5 h-[100px] mt-10 flex justify-between items-center ' >
                                                    <div className={` ${validation.payment_method == "stripe" ? "border-orange-400 xo_sh bg-orange-100" : " bg-gray-100 xb_sh border-gray-300"} border-2 w-[48%] h-full flex items-center transition-all duration-200  hover:-translate-y-1 cursor-pointer rounded-xl `} onClick={() => setValidation({ ...validation, payment_method: "stripe" })} >
                                                        <div className='h-max w-max text-lg flex items-center px-5 gap-2'> <div className={`w-[50px] h-[50px] rounded-full flex justify-center items-center ${validation.payment_method == "stripe" ? "bg-orange-200 xo_sh " : "bg-gray-200 xg_sh"} `} > <MdOutlinePayments className={`text-3xl ${validation.payment_method == "stripe" ? "text-orange-600 " : "text-gray-600 "}`} /> </div></div>

                                                        <div>
                                                            <h1 className={`text-xl font-bold ${validation.payment_method == "stripe" ? "text-orange-600 " : "text-black "} `} >Credit / Debit Card</h1>
                                                            <p className={`  text-[12px] ${validation.payment_method == "stripe" ? "text-orange-600 " : "text-gray-600 "} `} >Pay securely using your any supported debit/credit card through Stripe</p>
                                                        </div>
                                                    </div>
                                                    <div className={` ${validation.payment_method == "cash_on_delivery" ? "border-orange-400 xo_sh bg-orange-100" : " bg-gray-100 xb_sh border-gray-300"} border-2 transition-all duration-200  hover:-translate-y-1 w-[48%] h-full flex items-center cursor-pointer rounded-xl `} onClick={() => setValidation({ ...validation, payment_method: "cash_on_delivery" })} >
                                                        <div className='h-max w-max text-lg flex items-center px-5 gap-2'> <div className={`w-[50px] h-[50px] rounded-full flex justify-center items-center ${validation.payment_method == "cash_on_delivery" ? "bg-orange-200 xo_sh " : "bg-gray-200 xg_sh"} `} > <FaDollarSign className={`text-3xl ${validation.payment_method == "cash_on_delivery" ? "text-orange-600 " : "text-gray-600 "}`} /> </div></div>

                                                        <div>
                                                            <h1 className={`text-xl font-bold ${validation.payment_method == "cash_on_delivery" ? "text-orange-600 " : "text-black "} `} >Cash On Delivery</h1>
                                                            <p className={`  text-[12px] ${validation.payment_method == "cash_on_delivery" ? "text-orange-600 " : "text-gray-600 "} `} >Make payment in cash upon delivery</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                {
                                                    validation.payment_method == "stripe" && (
                                                        <p className='w-max text-sm text-orange-500 font-bold py-1 px-4 rounded-md mt-5  bg-orange-100 ml-5 ' >Payment will be completed on Stripe’s secure checkout page</p>
                                                    )
                                                }
                                                <button disabled={cnfrm_ord} className={` py-1 text-sm text-white bg-orange-500 ${validation.payment_method == "stripe" ? "mt-5" : "mt-10"} rounded-md ml-5 xo_sh cursor-pointer active:scale-99 transition-all ${cnfrm_ord ? "opacity-50" : "opacity-100"} duration-150 min-w-[100px] px-2 hover:scale-102 `} onClick={orderconfirm} > {cnfrm_ord ? <div className='w-[20px] border-t mx-auto border-r border-b animate-spin rounded-full h-[20px]' ></div> : "Confirm Order"}  </button>

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
                            <button className='w-[28%] h-[40px] text-white tw_sh bg-black rounded-4xl cursor-pointer active:scale-98 transition-all duration-200 ease-in-out  '>Apply</button>
                        </div>
                        <p className='font-bold text-gray-500 text-sm flex justify-between items-center w-full mt-[10%] px-2 '>Sub Total  <span className='text-black text-md'>$ {cart?.totalAmount || 0}</span> </p>
                        <p className='font-bold text-gray-500 text-sm flex justify-between items-center w-full mt-[5%] px-2 '>Tax ( 5% )  <span className='text-black text-md'>$ {((cart?.totalAmount || 0) * 0.05).toFixed(2)} </span> </p>
                        <p className='font-bold text-gray-500 text-sm flex justify-between items-center w-full mt-[5%] px-2 '>Delivery fee <span className='text-black text-md'> ${validation?.delivery == "Standard" ? 5 : validation?.delivery == "Express" ? 10 : 20} </span> </p>
                        <div className='w-full  border-t-2 border-gray-400 mt-[7%] '>
                            <p className='text-black flex justify-between items-center font-bold text-sm mt-[3%]'>Total  <span>$ {(
                                (cart?.totalAmount || 0) +
                                (cart?.totalAmount || 0) * 0.05 +
                                (validation?.delivery === "Standard"
                                    ? 5
                                    : validation?.delivery === "Express"
                                        ? 10
                                        : 20)
                            ).toFixed(2)}</span> </p>
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
                    <button disabled={slider == 2} onClick={increase_slider} className={`py-1 px-5 rounded-lg text-white font-bold xo_sh tracking-[1px] cursor-pointer transition-all duration-200 hover:scale-103 active:scale-100 bg-orange-500 ${slider == 2 ? "opacity-55" : "opacity-100"} `}>Next</button>
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





