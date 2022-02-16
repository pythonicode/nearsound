// Packages //
import { useState, useEffect, useContext, createContext } from "react";
import { Howler, Howl } from "howler";

const SoundContext = createContext();

export function useSound() {
  return useContext(SoundContext);
}

export class Song {
  constructor(
    src,
    artwork,
    title,
    artist,
    featured = [],
    created = Date.now()
  ) {
    this.audio = new Howl({
      src: [src],
      html5: true,
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

  const [song, setSong] = useState(new Song("", "", "Song Name", "Artist"));

  const startSeeking = () => {
    setSeeking(
      setInterval(() => {
        updateSeek(song.audio.seek());
        setDuration(song.audio.duration());
      }, refreshRate)
    );
  };

  const stopSeeking = () => {
    clearInterval(seeking);
  };

  useEffect(() => {
    console.log(song);
    if (song.artist == "Artist") return;
    startSeeking();
    setPlaying(true);
    setDuration(song.audio.duration());
    song.audio.play();
  }, [song]);

  const [seek, updateSeek] = useState(0);
  const [duration, setDuration] = useState(0);
  const [queue, setQueue] = useState([]);
  const [seeking, setSeeking] = useState(0);
  const [volume, setVolume] = useState(50);

  const toggle = () => {
    if (song === undefined || song === null) return;
    if (playing) {
      song.audio.pause();
      clearInterval(seeking);
      setPlaying(false);
    } else {
      startSeeking();
      song.audio.play();
      setPlaying(true);
    }
  };

  const setSeek = (value) => {
    song.audio.seek(value * duration);
    updateSeek(value * duration);
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
    stopSeeking();
    Howler.stop();
  };

  const context = {
    song,
    queue,
    playing,
    seek,
    duration,
    volume,
    setVolume,
    toggle,
    setSong,
    addToQueue,
    upQueue,
    downQueue,
    stopAll,
    setSeek,
    updateSeek,
    startSeeking,
    stopSeeking,
  };

  return (
    <>
      <SoundContext.Provider value={context}>{children}</SoundContext.Provider>
    </>
  );
}
