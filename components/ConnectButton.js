import Image from "next/image";
import near_logo from "../public/near.png"

export default function ConnectButton(props) {
    return (
        <button onClick={props.connect} className='border border-neutral-700 px-4 py-1 rounded hover:border-white transition-all'>
            {/* <Image src={near_logo} layout="responsive"/> */}
            Connect to NEAR
        </button>
    )
}