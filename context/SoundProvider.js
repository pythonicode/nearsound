// Packages //
import { useState, useEffect, useContext, createContext } from "react";
import { Howler, Howl } from "howler";

const SoundContext = createContext();

export function useSound() {
  return useContext(SoundContext);
}

export class Song {
  constructor(src, artwork, title, artist, featured, created = Date.now()) {
    this.audio = new Howl({
      src: [src],
      html5: true,
      preload: "metadata",
    });
    this.artwork = artwork;
    this.title = title;
    this.artist = artist;
    this.featured = featured;
    this.created = created;
  }
}

export function SoundProvider({ children }) {
  const [playing, setPlaying] = useState(false);

  const [song, updateSong] = useState(
    new Song(
      "https://bafybeia7xboj3uiveowv5knlrh47sjeyylmftqazkri3mcqa7xix5x6leu.ipfs.dweb.link/",
      "https://cms-assets.tutsplus.com/cdn-cgi/image/width=360/uploads/users/114/posts/34296/final_image/Final-image.jpg",
      "Pink Soldiers",
      "Unknown Artist",
      []
    )
  );

  const setSong = (song) => {
    song.audio.load();
    updateSong(song);
    console.log(song);
  };

  const [seek, setSeek] = useState(0);
  const [duration, setDuration] = useState(0);
  const [queue, setQueue] = useState([]);
  const [seeking, setSeeking] = useState(0);

  useEffect(() => {
    song.audio.on("load", () => {
      setDuration(song.audio.duration());
    });

    song.audio.on("play", () => {
      setSeeking(
        setInterval(() => {
          setSeek(song.audio.seek());
        }, 100)
      );
    });

    song.audio.on("pause", () => {
      clearInterval(seeking);
    });

    song.audio.on("stop", () => {
      clearInterval(seeking);
    });

    song.audio.on("end", () => {
      clearInterval(seeking);
    });
  }, [song]);

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

  const stopAll = () => {
    setPlaying(false);
    Howler.stop();
  };

  const context = {
    song,
    queue,
    playing,
    seek,
    duration,
    toggle,
    setSong,
    addToQueue,
    upQueue,
    downQueue,
    stopAll,
  };

  return (
    <>
      <SoundContext.Provider value={context}>{children}</SoundContext.Provider>
    </>
  );
}
