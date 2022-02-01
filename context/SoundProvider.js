// Packages //
import { useState, useEffect, useContext, createContext } from "react";
import { Howl } from "howler";

const SoundContext = createContext();

export function useSound() {
  return useContext(SoundContext);
}

export function Song(
  src,
  artwork,
  title,
  artist,
  featured,
  created = Date.now()
) {
  return {
    audio: new Howl({
      src: [src],
      html5: true,
    }),
    artwork: artwork,
    metadata: {
      title: title,
      artist: artist,
      featured: featured,
      created: created,
    },
  };
}

export function SoundProvider({ children }) {
  const [playing, setPlaying] = useState(false);

  const [song, setSong] = useState(
    Song(
      "https://bafybeia7xboj3uiveowv5knlrh47sjeyylmftqazkri3mcqa7xix5x6leu.ipfs.dweb.link/",
      "https://cms-assets.tutsplus.com/cdn-cgi/image/width=360/uploads/users/114/posts/34296/final_image/Final-image.jpg",
      "Pink Soldiers",
      "Unknown Artist",
      []
    )
  );

  const [queue, setQueue] = useState([]);

  const toggle = () => {
    if (song === undefined || song === null) return;
    if (playing) {
      song.audio.pause();
      setPlaying(false);
    } else {
      song.audio.play();
      setPlaying(true);
    }
  };

  const addToQueue = (song) => {
    setQueue([...queue, song]);
  };

  const upQueue = (index) => {
    if (index <= 0) return;
    const arr = [...queue];
    [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
    setQueue(arr);
  };

  const downQueue = (index) => {
    if (index >= queue.length - 1) return;
    const arr = [...queue];
    [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
    setQueue(arr);
  };

  const context = {
    song,
    queue,
    playing,
    toggle,
    setSong,
    addToQueue,
    upQueue,
    downQueue,
  };

  return (
    <>
      <SoundContext.Provider value={context}>{children}</SoundContext.Provider>
    </>
  );
}
