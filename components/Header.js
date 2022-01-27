

// Packages //
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HeaderAction from "./HeaderAction";

const variants = {
    hidden: { y: -100 },
    enter: { y: 0 },
    exit: { y: -100 },
} 

export default function Header() {    
    return (
        <motion.header variants={variants} initial="hidden" animate="enter" exit="exit" transition={{ duration: 1 }} className='w-full flex flex-col sm:flex-row items-center justify-start p-4 gap-4 bg-dark border-b-2 border-dark-200'>
            <div className="flex items-center justify-center gap-4 cursor-pointer select-none text-3xl">
                Nearsound
            </div>
            <div className="flex flex-row grow items-center justify-center">
                <form className="flex flex-row items-center justify-center gap-4">
                    <input type="text" className="border border-neutral-700 px-3 py-1 rounded bg-dark text-xl" placeholder="Search For Music..."></input>
                    <Button><SearchIcon/>Search</Button>
                </form>
            </div>
            <HeaderAction/>
        </motion.header>
    )
}