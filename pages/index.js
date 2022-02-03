// Components //
import Head from "next/head";
import Header from "../components/Header";
import Player from "../components/Player";
import SongCard from "../components/SongCard";

// Packages //
import { useEffect, useState } from "react";
import { useNear } from "../context/NearProvider";
import { useDatabase } from "../context/DatabaseProvider";
import { useRouter } from "next/router";
import { Song } from "../context/SoundProvider";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://svbfmmdezfkyrkvqrojn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzkyNTMwMiwiZXhwIjoxOTU5NTAxMzAyfQ.0CWFaWRuOcsn46u9zbrUAkXd3ZC7b7pft7M3QTtaBqk"
);

const songs = [
  {
    src: "https://bafybeia7xboj3uiveowv5knlrh47sjeyylmftqazkri3mcqa7xix5x6leu.ipfs.dweb.link/",
    artwork: "https://i.ytimg.com/vi/xl7KwvnIswA/maxresdefault.jpg",
    title: "Pink Soldiers",
    artist: "SWOLEBOY",
    featured: [],
    created: 10000,
  },
  {
    src: "https://ipfs.io/ipfs/bafybeicg4svmhmgu5oiep276qtjrivmynr7rxf52koc7qmjajggrlwwpd4",
    artwork:
      "https://musicrow.com/wp-content/uploads/2020/12/Thats-Life-Willie-Frank.jpg",
    title: "Curtain",
    artist: "Willie",
    featured: ["ahmoo", "RXM"],
    created: 10000,
  },
];

const song_objects = songs.map(
  (song) =>
    new Song(
      song.src,
      song.artwork,
      song.title,
      song.artist,
      song.featured,
      song.created
    )
);

export async function getServerSideProps() {
  const { data, error } = await supabase.from("songs").select();
  return {
    props: { data },
  };
}

export default function App({ data }) {
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
        {song_objects.map((song, i) => {
          return <SongCard key={i} song={song} />;
        })}
      </div>
      {/* <Pagination count={10} size="small"/> */}
      <Player />
    </main>
  );
}
