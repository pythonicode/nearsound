import Image from "next/image";
import logo from "../public/logo.png";

// Packages //
import AccountButton from "./AccountButton";
import { motion } from "framer-motion";

const variants = {
    hidden: { y: -100 },
    enter: { y: 0 },
    exit: { y: -100 },
} 

export default function Header({connected, connect, wallet}) {
    return (
        <motion.header variants={variants} initial="hidden" animate="enter" exit="exit" transition={{ duration: 1 }} className='w-full flex flex-row items-center justify-start p-4 gap-4 bg-dark border-b-2 border-dark-200'>
            <div className="flex items-center justify-center gap-4 cursor-pointer select-none">
                {/* <Image src={logo} alt="Site logo" width={"64px"} height={"64px"}/> */}
                <h1 className='text-3xl font-extralight'>NEARSOUND</h1>
            </div>
            <div className="flex flex-row grow items-center justify-center">
                <form className="flex flex-row items-center justify-center gap-4">
                    <input type="text" className="border border-neutral-700 px-3 py-1 rounded bg-dark text-xl" placeholder="Search For Music..."></input>
                </form>
            </div>
            <AccountButton/>
        </motion.header>
    )
}