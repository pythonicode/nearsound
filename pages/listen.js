// Components //
import Head from 'next/head'
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Player from '../components/Player';
import Song from '../components/Song';

import Grid from '@mui/material/Grid';

// Packages //
import { useEffect, useState } from "react";
import { useNear } from '../context/NearProvider';
import { useRouter } from 'next/router';



export default function App() {
  
  const router = useRouter();
  const { near, wallet } = useNear();

  const [ sound, setSound ] = useState(new Howl({
    src: ['https://bafybeia7xboj3uiveowv5knlrh47sjeyylmftqazkri3mcqa7xix5x6leu.ipfs.dweb.link/'],
    html5: true
  }));

  useEffect(() => {
    if(wallet === undefined) return;
    else if(!wallet.isSignedIn()) router.replace('/');
  }, [wallet]);

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
        <div id="content" className='grow max-cols-4 items-start justify-start p-8'>
          <Grid container spacing={8}>
            <Grid item xs={2}>
              <Song image="https://cms-assets.tutsplus.com/cdn-cgi/image/width=360/uploads/users/114/posts/34296/final_image/Final-image.jpg" title="Song Title" artist="Some Artist" features={['dude', 'other dude']}/>
            </Grid>
            <Grid item xs={2}>
              
            </Grid>
          </Grid>
        </div>
      </div>
      <Player currentlyPlaying={sound}/>
    </main>
  )
}
