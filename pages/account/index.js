// Components //
import Head from 'next/head'
import Player from '../../components/Player';

export default function Account() {
  return (
    <main className="flex flex-col w-screen h-screen max-w-screen max-h-screen text-white bg-dark">
      <Head>
        <title>NearSound | Decentralized Music</title>
        <meta name="description" content="A platform for listening and distributing music." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex flex-col grow items-center justify-center'>
          <h1 className='text-5xl font-bold'>Account</h1>
          <hr class="border my-4 w-32"></hr>
          <button className='border rounded p-2 w-80'>Mint a Song</button>
          <button></button>
      </div>
      <Player/>
    </main>
  )
}
