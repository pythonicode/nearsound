import { useRouter } from "next/router"
import Image from "next/image";

import landing from '../public/landing.gif';
import near_logo from "../public/near-logo.png"

export default function Home() {

    const router = useRouter();

    const go_to_app = () => {
        router.replace('/app');
    }

    return (
      <main className="flex flex-col items-center justify-center gap-5 w-screen h-screen max-w-screen max-h-screen text-white bg-dark">
        <Image src={landing} width={"225px"} height={"225px"}/>
        <h1 className="font-black text-3xl sm:text-4xl md:text-5xl lg:text-8xl">Nearsound.</h1>
        <h3 className="font-light text-xl sm:text-2xl md:text-3xl">Decentralized Music</h3>
        <button className='flex flex-row gap-2 items-center justify-center text-xl border border-neutral-700 py-4 px-8 mt-8 rounded hover:border-white transition-all'>
          <Image src={near_logo} width={"20px"} height={"20px"}/> <code>/connect</code>
        </button>
      </main>
    )
  }