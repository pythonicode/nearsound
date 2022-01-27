import NearLogo from "./NearLogo";
import { useRouter } from "next/router";
import { useNear } from "../context/NearProvider";

export default function HeaderAction() { 
    
    const router = useRouter();
    const { near, wallet } = useNear();

    return (
        <button className='flex flex-row gap-2 items-center text-xl justify-center border border-neutral-700 py-1 px-4 rounded hover:border-white transition-all'>
            <NearLogo/> <code>/connect</code>
        </button>
    )
}