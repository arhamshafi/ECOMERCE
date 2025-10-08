import React, { useState } from 'react'
import PageWrapper from '../Components/Motion'
import { HiLogout } from "react-icons/hi";
import { FaList } from "react-icons/fa6";
import { FaCrown } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { useAuth } from '../Context/Auth';
import { IoChevronBack } from "react-icons/io5";
import { toast } from 'react-toastify';
import { IoBag } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import { HiTemplate } from "react-icons/hi";
import { IoHeart } from "react-icons/io5";
import { BiLogIn } from "react-icons/bi";
import { FaAmericanSignLanguageInterpreting } from "react-icons/fa";
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useRef } from 'react';
import { useEffect } from 'react';
import { add_reviews } from '../services/Prd_ser';
import { fetch_detail_service } from "../services/Prd_ser";
import { useCart } from '../Context/Cartcontext';
import Loader from '../Components/Loader';

function Detail() {

    const { user, Logout } = useAuth()
    const { Add_to_cart , cart } = useCart()
    const navigate = useNavigate()
    const [nav_list, set_nav_list] = useState(false)
    const [img_idx, set_img_idx] = useState(0)
    const [cus_review, setCus_review] = useState(false)
    const [rating_num, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setcomment] = useState("")
    const ref_comment = useRef()
    const { id } = useParams()
    const [detail_prd, set_detail_prd] = useState(null)



    const fecth_detail_prd = async (id) => {
        try {
            const { success, detail } = await fetch_detail_service(id)
            if (success) {
                set_detail_prd(detail)
                sessionStorage.setItem("prd_detail", JSON.stringify(detail._id))
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || "Error On Detail Fetching")
        }
    }

    const Submit_review = async () => {
        try {
            if (rating_num == 0 || !comment) {
                toast.warning("Stars or Comment Must be Needed to Proceed ", {
                    closeOnClick: true,
                    draggable: true,
                    position: "top-right",
                })
                return
            }

            const { message, cart } = await add_reviews(rating_num, comment, id)

            sessionStorage.setItem("prd_detail", JSON.stringify(id))
            set_detail_prd(cart)
            setRating(0)
            setcomment("")
            setCus_review(false)
            toast.success(message, {
                closeOnClick: true,
                draggable: true,
                autoClose: 1500
            })
        } catch (err) {
            toast.error(err.response?.data?.message, {
                closeOnClick: true,
                draggable: true,
                autoClose: 1500
            } || "Error in Review")
        }
    }

    const Add_cart = async (id) => {
        const res = await Add_to_cart(id)
        if (res.success) {
            toast.success(res.message, { closeOnClick: true, draggable: true, position: "top-center" })
        }
    }

    useEffect(() => {
        if (id) {
            fecth_detail_prd(id)
        }
    }, [id])

    useEffect(() => {
        const timeout = setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 50)
        return () => clearTimeout(timeout);
    }, [])

    useEffect(() => {
        if (cus_review) {
            ref_comment.current?.focus();
        }
    }, [cus_review])

    if (!detail_prd) {
        return (
            <PageWrapper>
                <div className="w-full h-screen flex justify-center items-center">
                    <Loader />
                </div>
            </PageWrapper>
        )
    }

    return (
        <PageWrapper>

            <div className='w-full h-max xb_sh bg-white px-5 flex justify-between items-center fixed py-3 top-0 right-0 z-20  '>
                <button className='py-1 pl-2 pr-4 hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer tw_sh tracking-[2px] active:scale-100 xb_sh text-sm text-white flex items-center gap-2 bg-black rounded-lg' onClick={() => navigate(-1)} > <IoChevronBack /> Back</button>
                <div className='flex items-center gap-2  '>
                    {
                        user ? (
                            <>
                                <Link to={"/cart"} className='w-[35px] h-[35px] xb_sh rounded-full bg-white flex justify-center items-center cursor-pointer hover:bg-white/70 transition-all duration-150 ease-out ' > <IoBag /> </Link>
                                <div className='w-[35px] h-[35px] rounded-full bg-white xb_sh flex justify-center items-center text-red-500  cursor-pointer hover:bg-gray-100 transition-all duration-150 ease-out '> <IoHeart /> </div>
                                <div onClick={() => set_nav_list(prev => !prev)} className={`min-w-[35px] xb_sh cursor-pointer transition-all ease-in-out duration-200 h-[35px] rounded-2xl bg-white flex items-center ${nav_list ? "justify-center" : "gap-2 pl-3 pr-1"}  `}  > {nav_list ? <FaXmark /> : <> <p className='text-[15px] capitalize font-bold' >{user?.name}</p> <div className='w-[28px] h-[28px] xb_sh rounded-full overflow-hidden '> <img src="/avatar.jpeg" alt="" className='w-full h-full' />  </div> </>} </div>
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
            <div className='w-full min-h-screen bg-gray-100'>
                <div className={`fixed transition-all duration-400 ease-in-out rounded-xl right-1 bg-white xb_sh w-[200px] h-max z-30 p-2.5 ${nav_list ? "opacity-100 visible top-18 right-3 " : "invisible right-3 opacity-0 top-25 "} `}>
                    <Link to={"/profile"} className='w-full h-[35px] bg-gray-100 flex hover:bg-gray-200 transition-all duration-200 ease-in-out cursor-pointer rounded-lg items-center justify-between px-2 '><p className='text-[15px] capitalize font-bold' >{user?.name}</p> <div className='w-[28px] h-[28px] xb_sh rounded-full overflow-hidden '> <img src="/avatar.jpeg" alt="" className='w-full h-full' />  </div></Link>
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
                {/* /////////////////////////////////////// */}

                <div className='w-full min-h-screen px-5 py-[70px] '>
                    <div className='w-[95%] h-[500px] pt-4 px-10 bg-white xb_sh rounded-xl mx-auto mt-6 gx_sh flex gap-5 ' >
                        {/* PART _one */}
                        <div className='w-[40%] h-full flex  justify-center items-center flex-col '>
                            <div className='w-full h-[60%] rounded-xl overflow-hidden bg-gray-100 gx_sh relative  '><img src={detail_prd?.images[img_idx]?.url} className='w-full h-full object-contain  ' alt="" /></div>
                            <div className='w-full h-max mt-5 flex gap-2 flex-wrap'>

                                {detail_prd?.images?.map((img, i) => {
                                    return (
                                        <div key={i} className='w-[23%] h-[70px] group bx_sh rounded-lg overflow-hidden ' onClick={() => set_img_idx(i)} ><img src={img.url} className='w-full h-full group-hover:scale-115  transition-all duration-300 ease-in-out object-cover' alt="" /></div>
                                    )
                                })}
                            </div>
                        </div>
                        {/* PART _two */}
                        <div className='w-[57%] h-full px-5 '>
                            <h1 className='font-bold text-black tb_sh text-3xl mt-10 '>{detail_prd?.name}</h1>
                            <div className={`flex items-center gap-1 mt-0.5 text-gray-400 `} >
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <FaStar key={star} className={`text-xl ${star <= detail_prd?.rating ? "text-yellow-400" : "text-black/40"} `} />
                                ))}
                                <p className='ml-2 text-md text-black/50'>( {detail_prd?.numReviews} {detail_prd?.numReviews == 1 ? "review" : "reviews"} )</p> <p className='text-green-600 text-sm ml-4'>in stock ({detail_prd?.stock})</p>

                            </div>
                            <p className='text-2xl tg_sh font-bold mt-5 text-green-500 '>$ {detail_prd?.discountedPrice} <span className='text-black/30 text-sm line-through ml-1 ' style={{ textShadow: "none" }} >$ {detail_prd?.price} </span> <span className='w-max px-2 py-[3px] rounded-sm text-[13px] ml-5 font-normal bg-red-500/20 rx_sh text-red-600 ' style={{ textShadow: "none" }} >OFF {detail_prd?.discount}% </span>  </p>
                            <p className='text-black/80 mt-5 text-lg font-normal  '>{detail_prd?.description}</p>
                            <p className='flex items-center text-black/60 tracking-[1px] text-sm gap-2 mt-3'> <FaClockRotateLeft /> Return in 30 days</p>
                            <ul className='flex gap-5 mt-5 items-center flex-wrap'>
                                {detail_prd?.tags?.map((ele, idx) => {
                                    return (
                                        <li key={idx} className='py-0 px-2 bg-cyan-500/20 capitalize cx_sh text-cyan-600 rounded-sm  '> {ele} </li>
                                    )
                                })}
                            </ul>
                            <div className='w-full flex items-center gap-3 h-max mt-7 '>
                                <button className={`  ${ cart?.item?.some(ele => ele.product?._id == detail_prd?._id) ? "opacity-70" : "opacity-100" } w-[60%] cursor-pointer hover:scale-102 transition-all duration-200 ease-in-out py-2 rounded-md back text-white bg-orange-500 xo_sh text-xl font-bold tracking-[1px] active:scale-100 `} onClick={() => Add_cart(detail_prd?._id)} > { cart?.item?.some(ele => ele.product?._id == detail_prd?._id) ? "Already Added" : "🛒 Add To Cart" } </button>
                                <div className='w-[45px] inner_sh h-[45px] rounded-lg flex justify-center items-center text-xl hover:text-lg transition-all duration-200 ease-in-out cursor-pointer  text-red-500 bg-black xb_xh '> <IoHeart /> </div>
                            </div>
                        </div>
                    </div>

                    {/* ///////////// Reviews  */}

                    <div className='w-full mt-10 px-10' >
                        <div className='flex items-center justify-between'>
                            <h1 className='text-3xl capitalize font-bold text-black tb_sh '>Customer reviews</h1>
                            <button className={`py-1 px-3 back rounded-lg text-xl bg-orange-500 xo_sh cursor-pointer active:scale-95 transition-all duration-200 ease-out ${!cus_review ? "visible" : "invisible"} font-bold text-white ts_sh `} onClick={() => setTimeout(() => {
                                setCus_review(true)
                            }, 200)} >Add Review</button>
                        </div>

                        <div className={` w-full h-max mt-10 p-5 bg-white xb_sh rounded-2xl ${cus_review ? "block" : "hidden"} `}>
                            <p className='text-black/80 font-bold text-xl mt-3 '>Rating : </p>
                            <div className="flex gap-1 mt-2 items-center ">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <FaStar
                                        key={star}
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHover(star)}
                                        onMouseLeave={() => setHover(0)}
                                        className={`cursor-pointer active:scale-90 transition-all duration-200 ease-out text-2xl ${star <= (hover || rating_num) ? "text-yellow-400" : "text-black/40"} `} />
                                ))}
                                <p className='text-black/70 text-sm ml-3 font-bold ' >( {` ${rating_num} / 5 `} ) Stars  </p>
                            </div>
                            <p className='text-black/80 text-lg mt-5 capitalize font-normal '>write your review : </p>
                            <textarea className='w-full h-[150px] border-2 mt-2 resize-none rounded-2xl border-black/40  outline-none focus:border-orange-500  text-md p-4 ' ref={ref_comment} placeholder='Write Here Your Experince With This Product ... ' onChange={(e) => setcomment(e.target.value)} value={comment} ></textarea>
                            <div className='flex items-center gap-3 mt-3'>
                                <button className='py-1 px-3 back rounded-lg text-xl bg-orange-500 xo_sh cursor-pointer active:scale-95 transition-all duration-200 ease-out font-bold text-white ts_sh ' onClick={Submit_review} >Submit</button>
                                <button className='py-1 px-3 bg-black/10 rounded-lg gx_sh text-xl cursor-pointer active:scale-95 transition-all duration-200 ease-out text-gray-500 font-bold ' onClick={() => { setCus_review(false), setRating(0), setcomment("") }} >Cancel</button>
                            </div>
                        </div>



                        {/* ///////  reviews ///////////////////*/}


                        <div className='w-full mt-10 text-center '>
                            {
                                detail_prd?.reviews?.map((ele, idx) => {

                                    return (
                                        <div key={idx} className='w-full flex bg-white rounded-2xl py-4 pl-5 xb_sh mt-4'>
                                            <div className='w-[50px] h-[50px] xg_sh rounded-full overflow-hidden '><img src="/avatar.jpeg" className='w-full h-full' alt="" /></div>
                                            <div className='w-[90%] ml-[2%] h-max '>
                                                <div className='flex justify-between items-center  '>

                                                    <h1 className='text-black font-bold text-left text-md '> {ele?.user?.name} </h1>
                                                    <div className={`flex items-center gap-1 mt-0.5 text-gray-400 `} >
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <FaStar key={star} className={`text-xl ${star <= ele?.rating ? "text-yellow-400" : "text-black/40"} `} />
                                                        ))}</div>
                                                </div>
                                                <p className='text-gray-500 text-left mt-[-1px] text-sm '>{ele?.user?.email}</p>
                                                <p className='text-left mt-3 text-gray-600 font-bold tracking-[.5px] capitalize '>{ele?.comment}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>



                    </div>
                </div>
            </div>

        </PageWrapper>
    )
}

export default Detail