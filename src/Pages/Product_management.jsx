import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { FcFilledFilter } from "react-icons/fc"
import Check_box from '../Components/Check';
import { FaStar } from "react-icons/fa";
import Loader from '../Components/Loader';
import Loader_2 from "../Components/Loder_2"
import { LuArrowDownUp } from "react-icons/lu";
import { toast } from "react-toastify"
import { motion } from "framer-motion"
import { IoFilter } from "react-icons/io5";
import { LuArrowUpDown } from "react-icons/lu";
import { MdProductionQuantityLimits } from "react-icons/md";
import { TbRefresh } from "react-icons/tb";
import { useNavigate, useOutletContext } from 'react-router-dom';
import { FaRegCircleXmark, FaXmark } from "react-icons/fa6";
import { useRef } from 'react';

function Product_management() {

    const { searchTerm, setSearchTerm, set_current_page, focus, setfocus, sort, setSort, category, allBrands, categories, setCategory, handle_del_product
        , slct_brand, handleBrandChange, prd_loader, products, totalPages, current_page, page_loader, set_slct_brand, loader_2 } = useOutletContext()

    const [prd_active, setprd_active] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        discountedPrice: "",
        category: "",
        brand: "",
        stock: "",
        image: "",
        images: [],
        isFeatured: false,
        tags: "",
    });
    // console.log(formData);


    const [previewSingle, setPreview_single] = useState("/noimg.jpeg")
    const [previewarray, setPreview_array] = useState([])
    const [img_Array, setimg_Array] = useState([])
    const fileone = useRef()
    const filetwo = useRef()


    const prd_form_handler = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })

        if (name == "image") {
            const fileObj = e.target.files[0]
            if (fileObj) {
                setFormData({ ...formData, image: fileObj })
                const url = URL.createObjectURL(fileObj)
                setPreview_single(url)
            }
        }
        if (name == "images") {
            const fileObj = e.target.files[0]
            if (fileObj) {
                setFormData({ ...formData, images: img_Array })
                setimg_Array((prev) => [...prev, fileObj])
                const url = URL.createObjectURL(fileObj)
                setPreview_array((prev) => [...prev, url])
            }
        }
    }
    const check_box_handler = (e) => {
        const { checked } = e.target
        setFormData((prev) => ({
            ...prev,
            isfeature: checked
        }))
    }
    const add_product = async () => {
        try {

            const { name, description, price, discountedPrice, category, brand, stock, image, images, tags } = formData

            if (!name || !description || !price || !discountedPrice || !category || !brand || !stock || !image || images.length < 2 || !tags) return toast.error("Fill All requires to post Product")

            const prd_data = new FormData()
            const keys = Object.keys(formData)

            keys.forEach((ele, idx) => {
                if (ele == "images") {
                    formData.images.forEach(img => prd_data.append("images", img))
                } else {
                    prd_data.append(ele, formData[ele])
                }
            })

            for (let pair of prd_data.entries()) {
                console.log(pair[0] + ":", pair[1]);
            }
            // log essy krna ha FormData ko 
            console.log("working");

        } catch (err) {
            toast.error(err?.response?.data?.message || "Invalid error")
        }
    }


    if (loader_2) {
        return (
            <div className='w-full h-screen flex justify-center items-center' ><Loader /></div>
        )
    }
    return (
        <>
            <div className={`fixed top-0 left-0 w-full min-h-screen bg-black/10 backdrop-blur-[2px] transition-all flex justify-center items-center duration-150 ease-in z-30 ${prd_active ? "visible opacity-100" : "invisible opacity-0"} `} onClick={() => setprd_active(false)} >

                {
                    prd_active && (

                        <motion.form initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" } }} exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.5, ease: "easeOut" } }}
                            className='w-[70%] bg-white rounded-2xl py-7 relative ' onClick={(e) => e.stopPropagation()} >
                            <FaRegCircleXmark className='absolute top-7 right-10 text-2xl hover:text-red-500 cursor-pointer ' onClick={() => setprd_active(false)} />
                            <h1 className='font-bold text-black text-xl  text-center ' >Add Product Details</h1>
                            <div className='w-[90%] mx-auto flex justify-between items-center mt-10' >
                                <input name='name' onChange={prd_form_handler} value={formData.name} type="text" className='rounded-lg w-[48%] h-[40px] xb_sh text-sm font-bold pr-10 pl-3 outline-none tracking-[1px] bg-gray-100 ' placeholder='Product Name Here' />
                                <input name='category' onChange={prd_form_handler} value={formData.category} type="text" className='rounded-lg w-[48%] h-[40px] xb_sh text-sm font-bold pr-10 pl-3 outline-none tracking-[1px] bg-gray-100 ' placeholder='Product Related Category Here' />
                            </div>
                            <div className='w-[90%] mx-auto flex justify-between items-center mt-5' >
                                <input name='brand' value={formData.brand} onChange={prd_form_handler} type="text" className='rounded-lg w-[48%] h-[40px] xb_sh text-sm font-bold pr-10 pl-3 outline-none tracking-[1px] bg-gray-100 ' placeholder='Product Related Brand Here' />
                                <input name='stock' value={formData.stock} onChange={prd_form_handler} type="text" className='rounded-lg w-[48%] h-[40px] xb_sh text-sm font-bold pr-10 pl-3 outline-none tracking-[1px] bg-gray-100 ' placeholder='Product Stock Here' />
                            </div>
                            <div className='w-[90%] mx-auto flex justify-between items-center mt-5' >
                                <input name='price' onChange={prd_form_handler} value={formData.price} type="text" className='rounded-lg w-[48%] h-[40px] xb_sh text-sm font-bold pr-10 pl-3 outline-none tracking-[1px] bg-gray-100 ' placeholder='Product Orignal Price Here' />
                                <input name='discountedPrice' onChange={prd_form_handler} value={formData.discountedPrice} type="text" className='rounded-lg w-[48%] h-[40px] xb_sh text-sm font-bold pr-10 pl-3 outline-none tracking-[1px] bg-gray-100 ' placeholder='Product Discounted Price Here' />
                            </div>
                            <input name='description' onChange={prd_form_handler} type="text" className='rounded-lg w-[90%] mx-auto block mt-5 h-[40px] xb_sh text-sm font-bold pr-10 pl-3 outline-none tracking-[1px] bg-gray-100 ' placeholder='Product Related Description Here' />
                            {/* /////////////////// */}




                            <input accept="image/*" ref={fileone} name='image' onChange={prd_form_handler} type="file" className='rounded-lg w-[90%] hidden mt-5 h-[40px] xb_sh text-sm font-bold pr-10 pl-3 outline-none tracking-[1px] bg-gray-100 ' placeholder='Product images Here' />
                            <input accept="image/*" ref={filetwo} name='images' onChange={prd_form_handler} type="file" className='rounded-lg hidden w-[90%] mt-5 h-[40px] xb_sh text-sm font-bold pr-10 pl-3 outline-none tracking-[1px] bg-gray-100 ' placeholder='Product Related Tags Here' />

                            <div className='w-[90%] h-[100px] mt-5 mx-auto flex items-center '>

                                <div className='text-sm  text-black font-bold text-center w-[140px]'>
                                    Display Image Here
                                    <button type='button' className='py-1 px-3 bg-orange-400 text-white rounded-xl text-[12px] mt-2' onClick={() => fileone.current.click()} >Add Image</button>
                                </div>
                                <div className='w-[100px] h-full ml-5 overflow-hidden bg-gray-100 rounded-2xl xb_sh'>
                                    <img src={previewSingle} className='w-full h-full ' alt="" />
                                </div>

                                <div className='text-sm  text-black font-bold text-center ml-[3%] pl-[1.5%] border-l-1 w-[150px]'>
                                    Detial Images Here
                                    <button type='button' disabled={previewarray.length === 4} className={`py-1 px-3 bg-orange-400 ${previewarray.length === 4 ? "opacity-50 " : "opacity-100"} text-white rounded-xl text-[12px] mt-2 `} onClick={() => filetwo.current.click()} >Add Image</button>
                                </div>

                                {
                                    previewarray.map((ele, idx) => {
                                        return (

                                            <div key={idx} className='w-[100px] h-full ml-3 overflow-hidden bg-gray-100 rounded-2xl xb_sh relative '>
                                                <FaXmark className='text-xl text-red-500 absolute top-1 right-1 cursor-pointer ' onClick={() => {
                                                    const url_filter = [...previewarray].filter((ele, i) => i !== idx)
                                                    const img_filter = [...img_Array].filter((ele, i) => i !== idx)
                                                    setPreview_array(url_filter)
                                                    setimg_Array(img_filter)
                                                }} />
                                                <img src={ele} className='w-full h-full' alt="" />
                                            </div>
                                        )
                                    })
                                }

                            </div>

                            {/* //////////////////// */}
                            <input name='tags' onChange={prd_form_handler} value={formData.tags} type="text" className='rounded-lg w-[90%] mx-auto text-black block mt-5 h-[40px] xb_sh text-sm font-bold pr-10 pl-3 outline-none tracking-[1px] bg-gray-100 ' placeholder='Product Related Tags Here' />
                            <label htmlFor="isfeature" className='flex w-[90%] mx-auto mt-5 items-center justify-start gap-2 ' >
                                <input type="checkbox" name="" id="isfeature" onChange={check_box_handler} />
                                <p className='text-sm font-bold '>Featured product </p>
                            </label>
                            <button type='button' className='w-[90%] block mx-auto mt-5 rounded-xl h-[40px] bg-orange-500 text-white font-bold cursor-pointer ox_sh ' onClick={add_product} >Add Product</button>
                        </motion.form>
                    )
                }

            </div>

            <div className={`flex justify-center fixed top-0 left-0 z-20 items-center w-full h-screen backdrop-blur-sm transition-all bg-white/30 duration-200 ease-in-out ${page_loader ? "visible opacity-100" : "invisible opacity-0"} `}> <Loader /> </div>
            <section className='w-full bg-gray-100 min-h-screen flex  pl-[20%] '>
                <div className='w-[20%] fixed top-[60px] left-0 bg-white xb_sh h-screen flex justify-center items-center ' >
                    <FcFilledFilter className='text-9xl opacity-55 animate-bounce img_filter2 mt-40 ' style={{ animation: "bounce 3s infinite" }} />
                    <div className='w-full h-full absolute top-0 left-0 z-10 p-5  '>
                        <div className='relative'>
                            < IoSearch className='absolute right-2.5 top-3.5 text-xl' />
                            <input type="text" onChange={(e) => { setSearchTerm(e.target.value), set_current_page(1) }} value={searchTerm} className={` w-full h-[50px] rounded-xl bg-gray-100 pl-3 pr-8 outline-none border-2  ${focus ? "border-orange-400 xo_sh " : "border-transparent xb_sh"} `}
                                placeholder='Search Products..' onFocus={() => setfocus(true)} onBlur={() => setfocus(false)} />
                        </div>
                        <div className='w-full mt-[15%] flex justify-between items-center '>
                            <h1 className='text-md font-bold'>New Product</h1>
                            <button className='px-3 bg-orange-500 text-white font-semibold text-sm py-0.5 rounded-lg xo_sh cursor-pointer ' onClick={() => setprd_active(true)} > Add </button>
                        </div>

                        <div className='flex justify-between items-center mt-[8%] relative '>


                            <h1 className=' font-bold tracking-[2px] text-md '>SORT</h1>
                            {sort !== "" && (<TbRefresh className='absolute right-7 text-green-400 hover:text-red-400 cursor-pointer     ' onClick={() => { setSort(""), set_current_page(1) }} />)}
                            <IoFilter className='text-gray-400 text-xl ' />
                        </div>
                        <div className='w-full h-[6%] rounded-lg mt-[5%] bg-gray-200 xb_sh_in flex justify-evenly items-center  '>
                            {

                                [{ text: "price_asc", icon: <LuArrowUpDown /> }, { text: "price_dsc", icon: <LuArrowDownUp /> }, { text: "Rating", icon: <LuArrowUpDown /> }].map((ele, idx) => {
                                    return (
                                        <div key={idx} className={` ${ele.text == sort ? "bg-white" : "bg-transparent"} w-[31%] transition-all duration-200 ease-out cursor-pointer h-[80%] rounded-md flex justify-center gap-1 items-center text-[11px] font-bold capitalize text-gray-600 `} onClick={() => setSort(ele.text)}  > {ele.text} {ele.icon} </div>
                                    )
                                })
                            }

                        </div>

                        <div className='flex justify-between items-center mt-[13%] relative '>
                            <h1 className=' font-bold tracking-[2px] text-md '>Brand</h1>
                            {slct_brand.length !== 0 && (<TbRefresh className=' text-green-400 hover:text-red-400 cursor-pointer ' onClick={() => { set_slct_brand([]), set_current_page(1) }} />)}
                        </div>
                        <div className='w-full h-[46%] mt-1 pl-3 overflow-y-auto '>
                            {
                                allBrands && allBrands.map((b, i) => {
                                    return (

                                        <motion.label initial={{ scale: .9 }}
                                            whileInView={{
                                                scale: 1,
                                                transition: {
                                                    type: "spring",   // spring effect
                                                    stiffness: 140,   // spring tightness
                                                    damping: 13,       // bounce control (chhota rakho to zyada jiggle hoga)
                                                    mass: 1,          // weight effect
                                                }
                                            }} key={i} htmlFor={b} className='flex items-center gap-2 mt-2 ' >
                                            <Check_box id={b} checked={slct_brand.includes(b)} onChange={() => handleBrandChange(b)} />
                                            <p className='text-gray-700 text-sm font-bold tracking-[2px]' >{b}</p>
                                        </motion.label>
                                    )
                                })
                            }
                        </div>


                    </div>
                </div>
                {/* /////////////////// PART 2 //////////////////// */}
                <div className='w-full min-h-[100vh] pt-[13%] pb-10 px-5 bg-gray-100 ' >

                    <ul className='w-[80%] h-max fixed xb_sh_b top-[58px] bg-white z-20 right-0 text-sm flex flex-wrap items-center gap-3 font-bold pl-5 py-8 '>
                        <li className={`px-3 cursor-pointer hover:scale-102 active:scale-100 ${!category ? "bg-black" : " bg-orange-500 "} tw_sh tracking-[1px] py-1 text-sm hover:bg-black/60 transition-all duration-200 ease-in-out xb_sh text-white rounded-lg `} onClick={() => { setCategory(""), set_current_page(1) }} > All Categories </li>
                        {
                            categories && (
                                categories.map((ele, idx) => <li key={idx} className={`px-3 cursor-pointer hover:scale-102 active:scale-100 ${category == ele ? "bg-black" : " bg-orange-500 "} tw_sh tracking-[1px] py-1 text-sm hover:bg-black/60 transition-all duration-200 ease-in-out xb_sh text-white rounded-lg `} onClick={() => { setCategory(ele), set_current_page(1) }} > {ele} </li>)
                            )
                        } </ul>

                    <div className='w-full min-h-[40vh] mt-6 flex justify-evenly flex-wrap items-center '>

                        {
                            prd_loader ? (<div className='flex justify-center border bg-amber-300 w-max mx-auto relative mt-15 items-center'> <Loader_2 /> </div>) :
                                products.length == 0 ? (<div className='flex justify-center items-center flex-col gap-7 text-2xl text-gray-400 uppercase tracking-[3px] font-bold  '> <MdProductionQuantityLimits className='text-7xl' /> no product Found...</div>) :
                                    products.map((crd, i) => {

                                        return (
                                            < motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "tween", duration: .8, ease: "easeInOut", delay: i * 0.15, opacity: { duration: 0.3, delay: i * 0.1 } }} key={i} className='w-[320px] overflow-hidden hover:-translate-y-2 transition-all duration-200 ease-in-out xb_sh mt-7 h-max bg-white pt-3 pb-5 px-3 gx_sh group rounded-xl relative' >
                                                <div className='w-full h-[150px] overflow-hidden ' > <img className='w-full object-contain h-full group-hover:scale-110 transition-all duration-300 ease-in-out ' src={crd?.image} alt="" />  </div>
                                                <div className='w-full h-max flex justify-between items-center mt-3'>
                                                    <div className=' px-2 rounded-sm text-orange-600 bg-orange-600/20 text-sm tracking-[1px] capitalize '>{crd?.brand}</div>
                                                    {crd?.numReviews > 0 && (<div className='w-max flex justify-center items-center gap-1'><FaStar className='text-yellow-400 text-md' /> <p className='text-[15px] text-black/60 '> {crd?.rating} ({crd?.numReviews}) </p> </div>)}

                                                </div>
                                                <h1 className='mt-3 text-black text-[17px] font-bold tb_sh '>{crd?.name}</h1>
                                                <p className='text-[13px] text-black/50 mt-2'>{crd?.description.length > 80 ? `${crd.description.substring(0, 80)}...` : crd.description}</p>
                                                <p className='text-2xl mt-2 text-green-400 font-bold'>$ {crd?.discountedPrice}<span className='line-through text-sm ml-4 mt-4 text-black/40 font-normal '>$ {crd?.price}</span> </p>
                                                <div className='w-full h-[50px] flex mt-4 gap-2 '>
                                                    <button className='w-[45%] tw_sh tracking-[2px] cursor-pointer bg-orange-600 text-white font-bold rounded-2xl' onClick={(e) => { handle_del_product(crd?._id), e.stopPropagation() }} >DELETE</button>
                                                    <button className='w-[45%] tw_sh tracking-[2px] cursor-pointer bg-black text-white font-bold rounded-2xl'>EDIT</button>
                                                </div>
                                            </motion.div>
                                        )
                                    })
                        }
                    </div>
                    {
                        totalPages > 1 && (
                            <div className=' mt-10 flex items-center gap-3 '>
                                <button className={` px-3 font-bold tracking-[1px] py-1.5 text-sm rounded-lg cursor-pointer xb_sh bg-gray-300 active:scale-97 transition-all duration-200 ease-linear text-gray-500  ${current_page === 1 ? "opacity-70 scale-90 " : "opacity-100"} `} disabled={current_page === 1} onClick={() => set_current_page(prev => prev - 1)} >Prev Page</button>
                                <p className='text-gray-500 text-sm ' style={{ wordSpacing: "5px" }} > {current_page} OF {totalPages} </p>
                                <button className={`px-3 font-bold tw_sh tracking-[1px] py-1.5 cursor-pointer text-sm rounded-lg xo_sh active:scale-97 bg-orange-500 text-white transition-all duration-200 ease-linear ${current_page === totalPages ? "opacity-70 scale-90 " : "opacity-100"} `} disabled={current_page === totalPages} onClick={() => set_current_page(prev => prev + 1)} >Next Page</button>
                            </div>
                        )
                    }

                </div>
            </section>

        </>
    )
}

export default Product_management