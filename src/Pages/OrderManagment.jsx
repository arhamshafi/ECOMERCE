import React, { useEffect, useState } from 'react'
import { FaList } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { FiAlertCircle } from "react-icons/fi";
import { useOutletContext } from 'react-router-dom';
import Loader_2 from "../Components/Loder_2"
import { motion } from "framer-motion"


function OrderManagment() {

    const { ord, handle_cancel_order, orderstatus, setorderstatus, search_order, set_searchOrder, loader } = useOutletContext()
    const [isOpen, setIsOpen] = useState(false)

    if (loader) {
        return (
            <div className='w-full min-h-screen flex justify-center items-center'> <Loader_2 /> </div>
        )
    }


    return (

        <div className='w-full pt-[60px] min-h-screen bg-white '>
            <div className='w-max flex items-center gap-4 mt-10 ml-5  '>
                <div className='w-[50px] h-[50px] bg-yellow-200 text-yellow-600 rounded-full flex justify-center items-center '><FaList /></div>
                <h1 className='text-black text-xl font-bold '>Orders Managment</h1>
            </div>

            <div className='w-[90%] mx-auto mt-5 h-[50px] flex items-center justify-between '>
                <div className='w-[500px] h-full'>
                    <input onChange={(e) => set_searchOrder(e.target.value)} value={search_order} type="text" className='w-full h-full xb_sh px-5 border-transparent border-2 focus:border-yellow-400 outline-none text-md font-bold rounded-xl bg-gray-100' placeholder='Search Order By Order ID' />
                </div>
                <div className="w-[130px] relative">
                    <FaAngleDown
                        className={`absolute right-2 top-3.5 text-sm text-black transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"
                            }`}
                    />

                    <select
                        className="w-full h-[40px] appearance-none text-sm font-bold px-5 bg-gray-100 rounded-xl outline-none"
                        value={orderstatus}
                        onFocus={() => setIsOpen(true)}
                        onBlur={() => setIsOpen(false)}
                        onChange={(e) => setorderstatus(e.target.value)}
                    >
                        <option className="bg-white" value="">All</option>
                        <option className="bg-white" value="pending">Pending</option>
                        <option className="bg-white" value="confirmed">Confirmed</option>
                        <option className="bg-white" value="processing">Processing</option>
                        <option className="bg-white" value="shipped">Shipped</option>
                        <option className="bg-white" value="delivered">Delivered</option>
                        <option className="bg-white" value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            <div className='w-[90%] mt-10 mx-auto '>

                {
                    !ord || ord.length == 0 ? (
                        <div className='w-full flex min-h-[60vh] justify-center  items-center flex-col '> <FiAlertCircle className='text-7xl text-gray-300 ' />  <p className='font-bold text-gray-400 mt-10 tracking-[2px] text-3xl '>No Order Placed </p> </div>
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
                                        <p className='text-md font-bold mt-10' > orderId : <span className='text-gray-500 '>{ele?.orderId}</span></p>
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
                                        <div className='w-full overflow-y-auto h-[300px] pb-5'>

                                            {
                                                ele.orderItems?.map((item, i) => {
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

    )
}

export default OrderManagment