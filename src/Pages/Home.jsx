import React, { useEffect, useState } from 'react'
import { easeInOut, motion } from "framer-motion"
import { IoHeart } from "react-icons/io5";
import Navbar from '../Components/Navbar'
import { LuClipboardList } from "react-icons/lu";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function Home() {

  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 35, seconds: 18 });
  const [user, set_user] = useState(sessionStorage.getItem("active_user") ? JSON.parse(sessionStorage.getItem("active_user")) : "s")

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50)

    return () => clearTimeout(timeout);
  }, []);


  return (
    <div className='w-full min-h-screen bg-gradient-to-tr from-gray-100 to-gray-300 pt-1 pb-10 '>
      <Navbar />

      < motion.div initial={{ scale: .8, opacity: 0, y: 50 }} exit={{ scale: .9, opacity: 0, y: 40, transition: { duration: .4 } }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ ease: "easeInOut", duration: 1, delay: .5 }} className='w-[90%] px-5 h-max py-5 rounded-2xl bg-white mx-auto mt-30 xb_sh flex justify-between items-center '>
        <div className='w-[70%] h-max '>
          <h1 className="text-xl">Welcome to <span className='text-orange-500 to_sh font-bold '>AS SHOP</span> 🎯  </h1>
          <h1 className='text-2xl text-black font-bold mt-5 tb_sh '>Your One-Stop Shop for Everything</h1>
          <p className='text-black/70 text-md mt-5' >Discover a world of quality products at unbeatable prices.
            From fashion and lifestyle to electronics and home essentials — we bring everything to your fingertips.
            Fast delivery, secure checkout, and a shopping experience you’ll love!</p>

        </div>
        <div className='w-[40%] h-[300px] '> <img src="./images.jpeg" className='w-full h-full object-contain ' alt="" /> </div>
      </motion.div>

      <div className='w-[90%] h-[200px] flex justify-between items-center mx-auto mt-10  '>
        <motion.div initial={{ x: -60, opacity: 0, scale: .9 }} exit={{ x: -40, opacity: 0, scale: .95, transition: { duration: .4 } }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ ease: "easeOut", duration: 1, delay: .8 }} className='w-[32%] h-full bg-white xb_sh rounded-2xl p-5 relative '>
          <div className='w-[40px] h-[40px] bg-gray-200 absolute top-6 right-4 flex justify-center rounded-full items-center text-2xl text-red-600 xb_sh '> <IoHeart /> </div>
          <p className='font-bold text-xl tb_sh tracking-[2px] ' >More Products</p>
          <Link to={"/product"} className='text-sm text-gray-500 capitalize mt-2 hover:underline hover:text-orange-500 '> view products </Link>
          <div className='w-full h-[80px] mt-5 flex justify-evenly items-center '>
            <div className='w-[24%] h-full bg-gray-200 rounded-xl group xg_sh '> <img src="./glasses.png" className='w-full group-hover:scale-107 img_filter transition-all duration-200 ease-in-out h-full object-contain' alt="" /> </div>
            <div className='w-[24%] h-full bg-gray-200 rounded-xl group xg_sh '> <img src="./prd_po.png" className='w-full group-hover:scale-107 transition-all img_filter duration-200 ease-in-out h-full object-contain' alt="" /> </div>
            <div className='w-[24%] h-full bg-gray-200 rounded-xl group xg_sh '> <img src="./shrt.png" className='w-full group-hover:scale-107 transition-all duration-200 img_filter ease-in-out h-full object-contain' alt="" /> </div>
          </div>

        </motion.div>
        <motion.div initial={{ y: 40, opacity: 0, scale: .9 }} exit={{ y: 25, opacity: 0, scale: .95, transition: { duration: .4 } }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ ease: "easeOut", duration: 1, delay: .8 }} className='w-[32%] h-full bg-white xb_sh rounded-2xl p-5 relative '>
          <div className='w-[40px] h-[40px] bg-gray-200 absolute top-6 right-4 flex xb_sh justify-center rounded-full items-center text-2xl text-black'> <LuClipboardList /> </div>
          <p className='font-bold text-xl tb_sh tracking-[2px] ' > Orders List  </p>
          <p className=' text-sm text-grey-400 mt-7 ' >Track your recent orders, check delivery status and view details</p>
          <button className={`bg-orange-500 text-white px-3 mt-6 py-1 rounded-lg hover:bg-orange-600 cursor-pointer xo_sh ${user ? "opacity-100" : "opacity-70"} `} disabled={!user} onClick={() => toast.info("working_soon", {
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored"
          })} >
            View List
          </button>

        </motion.div>
        <motion.div initial={{ x: 60, opacity: 0, scale: .9 }} exit={{ x: 40, opacity: 0, scale: .95, transition: { duration: .4 } }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ ease: "easeOut", duration: 1, delay: .8 }} className='w-[32%] h-full bg-white xb_sh rounded-2xl p-5 relative '>
          <h2 className="text-lg font-bold mb-1 text-orange-500 to_sh ">Deal of the Day</h2>

          <h3 className="text-md font-semibold tb_sh ">Samsung Galaxy Buds 2 Pro</h3>
          <p className="text-gray-500 text-sm mt-1.5 ">
            Experience studio-quality with noise cancellation </p>


          <p className="text-xl mt-2 font-bold text-green-600 ">Rs. 39,999 <span className="text-gray-500 text-sm line-through">Rs. 48,000 </span> </p>

          <div className="mt-3 mb-4 text-sm text-gray-700 absolute bottom-0 right-3 ">
            Ends In:{" "}
            <span className="font-bold text-orange-500">
              {String(timeLeft.hours).padStart(2, "0")}h :
              {String(timeLeft.minutes).padStart(2, "0")}m :
              {String(timeLeft.seconds).padStart(2, "0")}s
            </span>
          </div>
          <img src="./air.jpeg" className='w-[90px] h-[50px] object-contain absolute bottom-11 right-6' alt="" />

          <button className={`bg-orange-500 text-white px-3 mt-2 py-1 rounded-lg hover:bg-orange-600 cursor-pointer xo_sh ${user ? "opacity-100" : "opacity-70"} `} disabled={!user} onClick={() => toast.info("working_soon", {
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored"
          })} >
            Shop Now
          </button>
        </motion.div>
      </div>


    </div>
  )
}

export default Home