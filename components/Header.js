import Image from "next/image";
import logo from "../public/logo.png";

// Packages //

import ConnectButton from "./ConnectButton";
import AccountButton from "./AccountButton";

export default function Header({connected, connect, wallet}) {

    const header_button = () => {
        if(connected) return <AccountButton wallet={wallet}/>
        else return <ConnectButton connect={connect}/>
    }

    return (
        <header className='w-full flex flex-row items-center justify-start p-4 gap-4 bg-dark border-b-2 border-dark-200'>
            <div className="flex items-center justify-center gap-4 cursor-pointer select-none">
                <Image src={logo} alt="Site logo" width={"64px"} height={"64px"}/>
                <h1 className='text-3xl font-semibold'>NEARSOUND</h1>
            </div>
            <div className="flex flex-row grow items-center justify-center">
                <form className="flex flex-row items-center justify-center gap-4">
                    <input type="text" className="border border-neutral-700 px-3 py-1 rounded bg-dark text-xl" placeholder="Search For Music..."></input>
                </form>
            </div>
            {header_button()}
        </header>
    )
}