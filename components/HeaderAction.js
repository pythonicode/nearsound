import NearLogo from "./NearLogo";
import { useRouter } from "next/router";

export default function HeaderAction() { 
    const router = useRouter();
    return (
        <button className='flex flex-row gap-2 items-center justify-center border border-neutral-700 py-2 px-4 rounded hover:border-white transition-all'>
            <NearLogo/> <code>/connect</code>
        </button>
    )
}