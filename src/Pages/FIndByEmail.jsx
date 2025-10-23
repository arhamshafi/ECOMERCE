import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { MdAlternateEmail } from "react-icons/md";
import { Reset_link_service } from "../services/pass_service";

function FindByEmail() {

    const [email, set_email] = useState("")
    const [loading, setloading] = useState(false)

    const Pass_link = async () => {
        if (!email) return toast.warn("Enter E-Mail To Find")
        try {
            setloading(true)
            const { message, success } = await Reset_link_service(email)
            console.log(message);

            if (success) {
                toast.success(message, { autoClose: 4000 })
                set_email("")
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || "server error reset-pass-link")
        } finally {
            setloading(false)
        }
    }


    return (
        <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: .8, ease: "easeOut" }}
            className="min-h-screen flex justify-center items-center bg-gray-200"
        >
            <div className="w-full h-screen flex justify-center items-center backdrop-blur-md ">
                <motion.div
                    initial={{ scale: .8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.8, type: "spring", stiffness: 120 }}
                    className="w-[500px] h-[300px] bg-white p-5 rounded-2xl xb_sh">
                    <motion.h1 initial={{ width: "10px", margin: "auto" }} animate={{ width: "235px" }} transition={{ delay: 1.5, ease: "easeInOut", duration: ".5" }}
                        className=" text-nowrap overflow-hidden font-bold  text-xl tracking-[1px] tb_sh "> Find Account By Email</motion.h1>
                    <motion.h1 initial={{ opacity: 0, scale: .5 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 2, duration: .5, type: "spring", stiffness: 120 }}
                        className="text-3xl font-bold tb_sh mt-10 tracking-[2px] text-center">
                        🎯AS_Shop
                    </motion.h1>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.3, duration: .5, ease: "easeInOut" }}
                        className="w-[80%] h-[40px] rounded-xl overflow-hidden mx-auto mt-13 relative shadow-sm">
                        <MdAlternateEmail className="absolute top-3 right-3 text-xl text-gray-600 " />
                        <input type="email" name="email" autoComplete="off" onChange={(e) => set_email(e.target.value)} value={email} placeholder="Email Here To Find Your Account" className="w-full h-full bg-gray-200/80 pr-10 pl-5 outline-none font-bold tracking-[1px] text-sm" />
                    </motion.div>
                    <motion.button initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5, duration: .5, ease: "easeInOut" }}
                        onClick={Pass_link} disabled={loading} className={` ${loading ? "text-white/70 bg-blue-600/60" : "text-white bg-blue-600"} w-[80%] h-[40px] mx-auto mt-4 rounded-xl xb_sh font-bold cursor-pointer transition-all duration-200  ease-in-out hover:shadow-2xl hover:scale-101 flex justify-center items-center gap-4 `} >Send Reset Link {loading && <div className="w-[20px] border-t-transparent animate-spin h-[20px] rounded-full border border-white-2   " ></div>}  </motion.button>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default FindByEmail;
