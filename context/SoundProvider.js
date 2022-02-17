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
    account,
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
    this.account = account;
    this.created = created;
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

export function SoundProvider({ children }) {
  const refreshRate = 100;
  const [playing, setPlaying] = useState(false);

  const [song, setSong] = useState(
    new Song(
      "",
      "https://upload.wikimedia.org/wikipedia/commons/7/71/Black.png",
      "Song Name",
      "Artist"
    )
  );

  const [seek, updateSeek] = useState(0);
  const [duration, setDuration] = useState(0);
  const [queue, setQueue] = useState([]);
  const [seeking, setSeeking] = useState(0);
  const [volume, setVolume] = useState(50);
  const [loop, setLoop] = useState(false);

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
    song.audio.once("end", () => {
      if (queue.length > 0 && !loop) {
        song.audio.unload();
        setSong(queue[0]);
        setQueue(queue.slice(1));
      }
    });
  }, [song, queue]);

  useEffect(() => {
    if (song.artist == "Artist") return;
    stopSeeking();
    startSeeking();
    setPlaying(true);
    setDuration(song.audio.duration());
    song.audio.play();
  }, [song]);

  useEffect(() => {
    song.audio.loop(loop);
  }, [loop]);

  const toggle = () => {
    if (song === undefined || song === null) return;
    if (playing) {
      stopSeeking();
      song.audio.pause();
      setPlaying(false);
    } else {
      song.audio.play();
      setPlaying(true);
      startSeeking();
    }
  };

  const skipForwards = () => {
    if (loop) song.audio.seek(0);
    else if (queue.length > 0) {
      stopAll();
      setSong(queue[0]);
      setQueue(queue.slice(1));
    }
  };

  const skipBackwards = () => {
    song.audio.seek(0);
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

  const shuffle = () => {
    shuffleArray(queue);
    setQueue([...queue]);
  };

  const stopAll = () => {
    setPlaying(false);
    stopSeeking();
    Howler.stop();
  };

  const build_features = (featured) => {
    let str = "";
    if (
      featured === undefined ||
      featured === null ||
      featured.length === 0 ||
      (featured.length === 1 && featured[0] === "")
    )
      return str;
    featured.forEach((feature) => {
      str += feature + ", ";
    });
    str = str.slice(0, -2);
    return "(ft. " + str + ")";
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
    setLoop,
    build_features,
    shuffle,
    skipForwards,
    skipBackwards,
  };

  return (
    <>
      <SoundContext.Provider value={context}>{children}</SoundContext.Provider>
    </>
  );
}
