// Components //
import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Player from '../components/Player';

// Packages //
import { keyStores, connect, WalletConnection } from 'near-api-js';
import { useEffect, useState } from "react";
import { useNear } from '../context/NearProvider';
import { useRouter } from 'next/router';

export default function App() {
  
  const router = useRouter();
  const { near, wallet } = useNear();

  useEffect(() => {
    if(wallet === undefined || !wallet.isSignedIn()) router.replace('/');
  });

  return (
    <main className="flex flex-col w-screen h-screen max-w-screen max-h-screen text-white bg-dark">
      <Head>
        <title>Nearsound | Listen Now</title>
        <meta name="description" content="A platform for listening and distributing music." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <div className='flex flex-row grow'>
        <Sidebar/>
        <div id="content" className='grid grow max-cols-4 items-start justify-start'>
          
        </div>
      </div>
      <Player/>
    </main>
  )
}
