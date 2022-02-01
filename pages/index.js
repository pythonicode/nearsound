// Components //
import Head from "next/head";
import Header from "../components/Header";
import Player from "../components/Player";
import SongCard from "../components/SongCard";

// Packages //
import { useEffect, useState } from "react";
import { useNear } from "../context/NearProvider";
import { useRouter } from "next/router";

export default function App() {
  const router = useRouter();
  const { near, wallet } = useNear();
  const [show, showPage] = useState(false);

  const [sound, setSound] = useState();

  useEffect(() => {
    if (wallet === undefined) return;
    else if (!wallet.isSignedIn()) router.replace("/home");
    else showPage(true);
  }, [wallet]);

  if (!show)
    return (
      <main className='"flex flex-col w-screen h-screen max-w-screen max-h-screen text-white bg-dark"'></main>
    );

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
        <SongCard
          src="https://bafybeia7xboj3uiveowv5knlrh47sjeyylmftqazkri3mcqa7xix5x6leu.ipfs.dweb.link/"
          image="https://i.ytimg.com/vi/xl7KwvnIswA/maxresdefault.jpg"
          title="Pink Soldiers"
          artist="SWOLEBOY"
        />
        <SongCard
          src="https://bafybeicg4svmhmgu5oiep276qtjrivmynr7rxf52koc7qmjajggrlwwpd4.ipfs.dweb.link/"
          image="https://cms-assets.tutsplus.com/cdn-cgi/image/width=360/uploads/users/114/posts/34296/final_image/Final-image.jpg"
          title="GIRLS GIRLS GIRLS (Athens Remix)"
          artist="Julia Alfrida"
        />
        <SongCard
          src="https://bafybeib3l5mflb23rwxw3s2nnbn2plyr4f4sx65kesz6tca22dvogsqbeu.ipfs.dweb.link/"
          image="https://preview.redd.it/likh3uvgkso61.jpg?width=640&crop=smart&auto=webp&s=3aa66f5b1078ede0064de0670ba09710741c3306"
          title="Curtain"
          artist="Willie"
          featured={["Ahmoo", "RXM"]}
        />
      </div>
      {/* <Pagination count={10} size="small"/> */}
      <Player />
    </main>
  );
}
