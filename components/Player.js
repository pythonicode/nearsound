import { Howler } from "howler";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import DrawerContent from "./DrawerContent";

import { Button, Drawer } from "@mui/material";

import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatIcon from "@mui/icons-material/Repeat";
import RepeatOnIcon from "@mui/icons-material/RepeatOn";
import RepeatOneOnIcon from "@mui/icons-material/RepeatOneOn";
import SavingsIcon from "@mui/icons-material/Savings";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";

import { useSound } from "../context/SoundProvider";

const fancyTime = (duration) => {
  // Hours, minutes and seconds
  let hrs = ~~(duration / 3600);
  let mins = ~~((duration % 3600) / 60);
  let secs = ~~duration % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  let ret = "";

  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }

  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;
  return ret;
};

const build_features = (features) => {
  let str = "";
  if (features === undefined || features === null || features.length === 0)
    return str;
  features.forEach((feature) => {
    str += feature + ", ";
  });
  str = str.slice(0, -2);
  return "(ft. " + str + ")";
};

export default function Player({ currentlyPlaying }) {
  const {
    song,
    queue,
    playing,
    toggle,
    seek,
    duration,
    volume,
    setVolume,
    setSeek,
    updateSeek,
    startSeeking,
    stopSeeking,
  } = useSound();

  const [repeat, setRepeat] = useState("none");
  const [rotation, setRotation] = useState(0);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    Howler.volume(volume / 100);
  }, [volume]);

  const play_pause_button = () => {
    if (playing) return <PauseCircleOutlineIcon fontSize="large" />;
    else return <PlayCircleOutlineIcon fontSize="large" />;
  };

  const repeat_icon = () => {
    if (repeat === "none") return <RepeatIcon />;
    else if (repeat === "queue") return <RepeatOnIcon />;
    else return <RepeatOneOnIcon />;
  };

  const update_repeat = () => {
    if (repeat === "none") setRepeat("queue");
    else if (repeat === "queue") setRepeat("song");
    else setRepeat("none");
  };

  const shuffle = () => {
    setRotation(rotation + 360);
  };

  const variants = {
    hidden: { y: 300 },
    enter: { y: 0 },
    exit: { y: 300 },
  };

  return (
    <motion.footer
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ duration: 1 }}
      className="w-full flex flex-col items-center justify-center py-4 h-32 gap-2 border-t-4 border-double border-dark-100"
    >
      <Drawer
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DrawerContent queue={queue} />
      </Drawer>
      <div className="flex flex-row items-center justify-center gap-2">
        <Button
          onClick={() => {
            setOpen(true);
          }}
          variant="text"
        >
          <QueueMusicIcon sx={{ marginRight: "8px" }} /> QUEUE
        </Button>
        <button
          onClick={update_repeat}
          className="transition-all hover:opacity-75"
        >
          {repeat_icon()}
        </button>
        <motion.button
          onClick={shuffle}
          animate={{ rotate: rotation }}
          className="transition-all hover:opacity-75"
        >
          <ShuffleIcon />
        </motion.button>
        <button className="transition-all hover:opacity-75">
          <SkipPreviousIcon />
        </button>
        <button className="transition-all hover:opacity-75" onClick={toggle}>
          {play_pause_button()}
        </button>
        <button className="transition-all hover:opacity-75">
          <SkipNextIcon />
        </button>
        <input
          value={volume}
          onChange={(event) => setVolume(event.target.value)}
          className="rounded-lg appearance-none bg-white h-1 w-20 cursor-pointer transition-all"
          type="range"
          min="0"
          max="100"
        />
        <Button variant="text">
          <SavingsIcon sx={{ marginRight: "8px" }} /> TIP
        </Button>
      </div>
      <div className="flex flex-row items-center justify-center">
        <div className="text-xs text-light text-neutral-400 mr-2">
          {fancyTime(seek)}
        </div>
        <div
          onMouseEnter={stopSeeking}
          onMouseMove={(e) => {
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            updateSeek((x / rect.width) * duration);
          }}
          onMouseLeave={startSeeking}
          onMouseUp={(e) => {
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            setSeek(x / rect.width);
          }}
          className="w-80 h-1 py-2"
        >
          <div
            className="bg-neutral-400 h-1"
            style={{ width: (seek * 100) / duration + "%" }}
          ></div>
        </div>
        <div className="text-xs text-light text-neutral-400 ml-2">
          {fancyTime(duration)}
        </div>
      </div>
      <div className="text-xs text-light text-neutral-400">
        {song.title} by {song.artist} {build_features(song.featured)}
      </div>
    </motion.footer>
  );
}
