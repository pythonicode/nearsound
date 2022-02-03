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
  const refreshRate = 100;
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
    setSeeking(
      setInterval(() => {
        setSeek(song.audio.seek());
        setDuration(song.audio.duration());
      }, refreshRate)
    );
    setPlaying(true);
    console.log(song.audio);
    console.log(song.audio.duration());
    setDuration(song.audio.duration());
    console.log(duration);
    song.audio.play();
  };

  const [seek, setSeek] = useState(0);
  const [duration, setDuration] = useState(0);
  const [queue, setQueue] = useState([]);
  const [seeking, setSeeking] = useState(0);

  const toggle = () => {
    if (song === undefined || song === null) return;
    if (playing) {
      song.audio.pause();
      clearInterval(seeking);
      setPlaying(false);
    } else {
      setSeeking(
        setInterval(() => {
          setSeek(song.audio.seek());
          setDuration(song.audio.duration());
        }, refreshRate)
      );
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
    clearInterval(seeking);
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
