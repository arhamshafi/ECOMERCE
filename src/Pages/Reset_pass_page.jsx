import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { MdAlternateEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { reset_pass_service } from "../services/pass_service";
import { useNavigate, useParams } from "react-router-dom";

function Reset_pass_page() {

    const [loading, setloading] = useState(false)
    const [form, setform] = useState({ password: "", confirm_password: "" })
    const { token } = useParams()
    const navigate = useNavigate()
    // console.log(token);



    const handle_form = (e) => {

        const { value, name } = e.target
        setform({ ...form, [name]: value })
    }

    const reset_pass = async () => {

        const { password, confirm_password } = form
        if (!password || !confirm_password) return toast.warn("Both Must Be Filled ")
        if (password !== confirm_password) return toast.warn("password is not matched")
        if (password.length < 8) return toast.warn("Password must be at least 8 characters")
        if (!/[A-Z]/.test(password)) return toast.warn("Password must contain at least one uppercase letter")
        if (!/[0-9]/.test(password)) return toast.warn("Password must contain at least one number")

        try {
            setloading(true)
            const { message, success } = await reset_pass_service(password, token)
            if (success) {
                toast.success(message)
                setform({ password: "", confirm_password: "" })
                setTimeout(() => navigate("/login"), 3000)

            }
        } catch (err) {
            toast.error(err?.response?.data?.message || "error while reset")
        }
        finally {
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
                    className="w-[500px] h-max bg-white p-5 rounded-2xl xb_sh overflow-hidden ">
                    <motion.h1 initial={{ width: "14px", margin: "auto" }} animate={{ width: "310px" }} transition={{ delay: 1.5, ease: "easeInOut", duration: ".5" }}
                        className=" text-nowrap overflow-hidden font-bold  text-xl tracking-[1px] tb_sh ">Reset Your Account Password</motion.h1>
                    <motion.h1 initial={{ opacity: 0, scale: .5 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 2, duration: .5, type: "spring", stiffness: 120 }}
                        className="text-3xl font-bold tb_sh mt-10 tracking-[2px] text-center">
                        🎯AS_Shop
                    </motion.h1>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.3, duration: .5, ease: "easeInOut" }}
                        className="w-[80%] h-[40px] rounded-xl overflow-hidden mx-auto mt-13 relative shadow-sm">
                        <FaLock className="absolute top-3 right-3 text-lg text-gray-600 " />
                        <input type="password" name="password" autoComplete="off" placeholder="New Password Here" onChange={handle_form} value={form.password} className="w-full h-full bg-gray-200/80 pr-10 pl-5 outline-none font-bold tracking-[1px] text-sm" />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5, duration: .5, ease: "easeInOut" }}
                        className="w-[80%] h-[40px] rounded-xl overflow-hidden mx-auto mt-4 relative shadow-sm">
                        <FaLock className="absolute top-3 right-3 text-lg text-gray-600 " />
                        <input type="password" name="confirm_password" autoComplete="off" placeholder="Confirm Password Here" onChange={handle_form} value={form.confirm_password} className="w-full h-full bg-gray-200/80 pr-10 pl-5 outline-none font-bold tracking-[1px] text-sm" />
                    </motion.div>
                    <motion.button initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.7, duration: .5, ease: "easeInOut" }}
                        onClick={reset_pass} disabled={loading} className={` ${loading ? "text-white/70 bg-blue-600/60" : "text-white bg-blue-600"} w-[80%] h-[40px] mx-auto mt-4 rounded-xl xb_sh font-bold cursor-pointer transition-all duration-200  ease-in-out hover:shadow-2xl hover:scale-101 flex justify-center items-center gap-4 `} >Change Password {loading && <div className="w-[20px] border-t-transparent animate-spin h-[20px] rounded-full border border-white-2   " ></div>}  </motion.button>
                </motion.div>
            </div >
        </motion.div >
    );
}

export default Reset_pass_page;
