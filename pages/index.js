// Components //
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Player from '../components/Player';

// Packages //
import { keyStores, connect, WalletConnection } from 'near-api-js';
import { useEffect, useState } from "react";

export default function Home() {

  const [near, setNear] = useState(undefined);
  const [wallet, setWallet] = useState(undefined);
  const [ connected, setConnected ] = useState(false);

  const setup_near = async() => {
    const config = {
      networkId: "testnet",
      keyStore: new keyStores.BrowserLocalStorageKeyStore(),
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://wallet.testnet.near.org",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://explorer.testnet.near.org",
    };
    // connect to NEAR
    const near_connection = await connect(config);
    setNear(() => {
      return near_connection;
    });
    // create wallet connection
    const wallet_connection = new WalletConnection(near_connection);
    setWallet(() => {
      return wallet_connection;
    });
  }

  const connect_to_near = async () => {
      if(wallet === undefined) alert("Problem connecting to NEAR. Do you have Javascript installed?")
      else {
        wallet.requestSignIn(
          "example-contract.testnet", // contract requesting access
          "NearSound", // optional
          //"http://YOUR-URL.com/success", // optional
          //"http://YOUR-URL.com/failure" // optional
        )
      }
  };

  useEffect(() => {
    if(typeof window !== "undefined") setup_near();
  }, []);

  useEffect(() => {
    if(wallet === undefined) return;
    else if(wallet.isSignedIn()) setConnected(true);
  }, [wallet]);

  return (
    <main className="flex flex-col w-screen h-screen max-w-screen max-h-screen text-white bg-dark">
      <Head>
        <title>NearSound | Decentralized Music</title>
        <meta name="description" content="A platform for listening and distributing music." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header connected={connected} connect={connect_to_near} wallet={wallet}  />
      <div className='flex flex-row grow'>
        <Sidebar/>
        <div id="content" className='grid grow max-cols-4 border border-white items-center justify-center'>
          <code>{connected}</code>
        </div>
      </div>
      <Player/>
    </main>
  )
}
