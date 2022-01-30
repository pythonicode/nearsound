// Components //
import Head from 'next/head'
import Header from '../components/Header';
import Player from '../components/Player';
import Song from '../components/Song';

// Packages //
import { useEffect, useState } from "react";
import { useNear } from '../context/NearProvider';
import { useRouter } from 'next/router';

export default function App() {
  
  const router = useRouter();
  const { near, wallet } = useNear();
  const [ show, showPage ] = useState(false);

  const [ sound, setSound ] = useState();

  useEffect(() => {
    if(wallet === undefined) return;
    else if(!wallet.isSignedIn()) router.replace('/home');
    else showPage(true);
  }, [wallet]);

  if(!show) return <main className='"flex flex-col w-screen h-screen max-w-screen max-h-screen text-white bg-dark"'></main>

  return (
    <main className="flex flex-col w-screen h-screen max-w-screen max-h-screen text-white bg-dark">
      <Head>
        <title>Nearsound | Listen Now</title>
        <meta name="description" content="A platform for listening and distributing music." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/> 
      <div id="content" className='flex flex-row flex-wrap w-full h-full max-cols-4 items-start justify-start p-8 gap-4 overflow-y-scroll'>
        <Song image="https://cms-assets.tutsplus.com/cdn-cgi/image/width=360/uploads/users/114/posts/34296/final_image/Final-image.jpg" title="Song Title" artist="Some Artist" features={['dude']}/>
        <Song image="https://cms-assets.tutsplus.com/cdn-cgi/image/width=360/uploads/users/114/posts/34296/final_image/Final-image.jpg" title="Song Title" artist="Some Artist" features={['dude', 'other dude']}/>
        <Song image="https://cms-assets.tutsplus.com/cdn-cgi/image/width=360/uploads/users/114/posts/34296/final_image/Final-image.jpg" title="Song Title" artist="Some Artist" features={['dude', 'other dude']}/>
        <Song image="https://cms-assets.tutsplus.com/cdn-cgi/image/width=360/uploads/users/114/posts/34296/final_image/Final-image.jpg" title="Song Title" artist="Some Artist" features={['dude', 'other dude']}/>
        <Song image="https://cms-assets.tutsplus.com/cdn-cgi/image/width=360/uploads/users/114/posts/34296/final_image/Final-image.jpg" title="Song Title" artist="Some Artist" features={['dude', 'other dude']}/>
        <Song image="https://cms-assets.tutsplus.com/cdn-cgi/image/width=360/uploads/users/114/posts/34296/final_image/Final-image.jpg" title="Song Title" artist="Some Artist" features={['dude', 'other dude']}/>
        <Song image="https://cms-assets.tutsplus.com/cdn-cgi/image/width=360/uploads/users/114/posts/34296/final_image/Final-image.jpg" title="Song Title" artist="Some Artist" features={['dude', 'other dude']}/>
      </div>
      {/* <Pagination count={10} size="small"/> */}
      <Player/>
    </main>
  )
}
