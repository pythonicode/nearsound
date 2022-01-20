import { useRouter } from "next/router"

export default function Home() {

    const router = useRouter();

    const go_to_app = () => {
        router.replace('/app');
    }

    return (
      <main className="flex flex-col items-center justify-center gap-5 w-screen h-screen max-w-screen max-h-screen text-white bg-dark">
        <h1 className="font-black text-3xl sm:text-4xl md:text-5xl lg:text-8xl">Nearsound.</h1>
        <h3 className="font-light text-xl sm:text-2xl md:text-3xl">Decentralized Music</h3>
        <div className="flex flex-row items-center justify-center gap-5 mt-4 sm:mt-6 lg:mt-8">
            <button onClick={go_to_app} className="bg-gradient-to-tr from-dark-400 to-dark-200 rounded p-4 text-xl hover:opacity-75">Launch App</button>
            <button className="bg-gradient-to-br from-dark-400 to-dark-200 rounded p-4 text-xl hover:opacity-75">Read More</button>
        </div>
      </main>
    )
  }