

// Packages //

import ConnectButton from "./ConnectButton";
import AccountButton from "./AccountButton";

export default function Header({connected, connect, wallet}) {

    const header_button = () => {
        if(connected) return <AccountButton wallet={wallet}/>
        else return <ConnectButton connect={connect}/>
    }

    return (
        <header className='w-full flex flex-row items-center justify-start p-4 gap-4'>
            <h1 className="text-3xl font-bold">Logo</h1>
            <div className="flex flex-row grow items-center justify-center">
                <form className="flex flex-row items-center justify-center gap-4">
                    <input type="text" className="border border-neutral-700 px-3 py-1 rounded bg-dark"></input>
                </form>
            </div>
            {header_button()}
        </header>
    )
}