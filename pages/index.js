// Components //
import Head from "next/head";
import Header from "../components/Header";
import Player from "../components/Player";
import SongCard from "../components/SongCard";

// Packages //
import { useEffect, useState } from "react";
import { useNear } from "../context/NearProvider";
import { useRouter } from "next/router";
import { Song } from "../context/SoundProvider";

const songs = [
  {
    src: "https://bafybeia7xboj3uiveowv5knlrh47sjeyylmftqazkri3mcqa7xix5x6leu.ipfs.dweb.link/",
    artwork: "https://i.ytimg.com/vi/xl7KwvnIswA/maxresdefault.jpg",
    title: "Pink Soldiers",
    artist: "SWOLEBOY",
    featured: [],
    created: 10000,
  },
];

export default function App() {
  const { near, wallet, redirect, setRedirect } = useNear();

  const router = useRouter();

  const [show, showPage] = useState(false);
  const [sound, setSound] = useState();

  useEffect(() => {
    if (wallet === undefined || wallet === null) return;
    if (redirect && !wallet.isSignedIn()) router.replace("/home");
    else showPage(true);
  }, [wallet]);

  if (!show) {
    return (
      <main className="flex flex-col w-screen h-screen max-w-screen max-h-screen text-white bg-dark" />
    );
  }

  return (
    <main className="flex flex-col w-screen h-screen max-w-screen max-h-screen text-white bg-dark">
      <Head>
        <title>Nearsound | Listen Now</title>
        <meta
          name="description"
          content="A platform for listening and distributing music."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div
        id="content"
        className="flex flex-row flex-wrap w-full h-full max-cols-4 items-start justify-start p-8 gap-4 overflow-y-scroll"
      >
        {songs.map((song, i) => {
          return (
            <SongCard
              key={i}
              song={
                new Song(
                  song.src,
                  song.artwork,
                  song.title,
                  song.artist,
                  song.featured,
                  song.created
                )
              }
            />
          );
        })}
      </div>
      {/* <Pagination count={10} size="small"/> */}
      <Player />
    </main>
  );
}
