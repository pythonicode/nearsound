import Image from "next/image";
import near_logo from "../public/near-logo.png"

export default function ConnectButton(props) {
    return (
        <button onClick={props.connect} className='flex flex-row gap-2 items-center justify-center text-xl border bg-dark-300 border-neutral-700 py-2 px-4 rounded hover:border-white transition-all'>
            Connect with <Image src={near_logo} width={"20px"} height={"20px"}/>
        </button>
    )
}