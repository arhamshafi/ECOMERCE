import { motion } from "framer-motion";

export default function PageWrapper({ children }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40, transition: { duration: .4 } }}
            transition={{ duration: .8, ease: "easeInOut", y: { duration: 1.2 } }}
            className="w-full h-full"
        >
            {children}
        </motion.div>
    );
}
