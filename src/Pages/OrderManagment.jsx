import React, { useEffect, useState } from 'react'
import PageWrapper from '../Components/Motion'
import { FaList } from "react-icons/fa";
import { useAuth } from '../Context/Auth';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { motion } from "framer-motion"



function OrderManagment() {


    // console.log(ord);
    const { ord } = useOutletContext()
    console.log(ord);


    return (


        <div className='w-full pt-[60px] min-h-screen bg-white '>
            <div className='w-max flex items-center gap-4 mt-10 ml-5  '>
                <div className='w-[50px] h-[50px] bg-yellow-200 text-yellow-600 rounded-full flex justify-center items-center '><FaList /></div>
                <h1 className='text-black text-xl font-bold '>Orders Managment</h1>
            </div>

            <div className='w-[90%] mx-auto mt-10 border'></div>


        </div>

    )
}

export default OrderManagment