import { useRouter } from "next/router"
import Image from "next/image";
import Particles from "react-tsparticles";
import Head from "next/head";
import NearLogo from "../components/NearLogo";

import { useNear } from "../context/NearProvider";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Home() {

    const router = useRouter();
    const { near, wallet } = useNear();
    const [loaded, setLoaded] = useState(false);

    const particlesInit = (main) => {
      console.log(main); 
      // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    };
  
    const particlesLoaded = (container) => {
      console.log(container);
      setLoaded(true);
    };

    const connect_to_near = () => {
      if(wallet === undefined) alert("Problem connecting to NEAR. Do you have Javascript installed?")
      else if(wallet.isSignedIn()) router.push('/listen');
      else {
        wallet.requestSignIn(
          "example-contract.testnet", // contract requesting access
          "NearSound", // optional
        )
      }
  };

  const variants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  } 

  return (
    <motion.main variants={variants} initial="hidden" animate="enter" exit="exit" transition={{ duration: 3 }} className="flex flex-col items-center justify-center gap-2 w-screen h-screen max-w-screen max-h-screen text-white bg-dark">
      <div className="absolute w-full h-full top-0 left-0">
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: "#121212",
              },
            },
            fpsLimit: 60,
            particles: {
              color: {
                value: "#ffffff",
              },
              move: {
                direction: "none",
                enable: true,
                outMode: "bounce",
                random: true,
                speed: 1,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 50,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                random: true,
                value: 5,
              },
            },
            detectRetina: false,
          }}
        />
      </div>
      <Head>
        <title>Nearsound | Listen Now</title>
        <meta name="description" content="A platform for listening and distributing music." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="absolute flex flex-col items-center justify-center gap-2 w-screen h-screen max-w-screen max-h-screen top-0 left-0 z-10">
        <Image src='/../public/landing.gif' width={"225px"} height={"225px"}/>
        <h1 className="font-black text-5xl sm:text-6xl lg:text-8xl">Nearsound.</h1>
        <h3 className="font-extralight text-lg sm:text-xl lg:text-2xl">Decentralized Music Protocol</h3>
        <button onClick={connect_to_near} className='flex flex-row gap-2 items-center justify-center text-xl border border-neutral-700 py-4 px-8 mt-8 rounded hover:border-white transition-all'>
          <NearLogo/> <code>/explore</code>
        </button>
      </div>
    </motion.main>
  )
}