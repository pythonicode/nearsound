import { Fragment, useEffect } from "react";
import { Song, useSound } from "../context/SoundProvider";

import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

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

export default function DrawerContent() {
  const { song, queue, toggle, addToQueue, upQueue, downQueue, playing } =
    useSound();

  const play_or_pause = () => {
    if (playing) return <PauseIcon />;
    else return <PlayArrowIcon />;
  };

  return (
    <div className="flex flex-col w-80 h-full bg-dark border-r-2 border-dark-200 overflow-y-scroll">
      <h3 className="pt-4 px-4 text-xl font-bold">Now Playing</h3>
      <div className="flex flex-row items-center justify-start w-full h-20 border-b-4 border-double border-dark-200 p-4 gap-4">
        <img
          src={song.artwork}
          alt="Song Artwork"
          className="w-12 h-12 object-cover"
        />
        <div className="flex flex-col grow overflow-x-hidden whitespace-nowrap">
          <h3>{song.metadata.title}</h3>
          <p className="text-neutral-500 text-xs">
            {song.metadata.artist} {build_features(song.metadata.featured)}
          </p>
        </div>
        <button onClick={toggle}>{play_or_pause()}</button>
      </div>
      {queue.map((song, i, q) => (
        <Fragment key={i}>
          <div className="flex flex-row items-center justify-start w-full h-20 border-b border-dark-200 p-4 gap-4">
            <img
              src={song.artwork}
              alt="Song Artwork"
              width="50px"
              className="w-12 h-12 object-cover"
            />
            <div className="flex flex-col grow overflow-x-hidden whitespace-nowrap">
              <h3>{song.metadata.title}</h3>
              <p className="text-neutral-500 text-xs">
                {song.metadata.artist} {build_features(song.metadata.featured)}
              </p>
            </div>
            <div className="cursor-pointer flex flex-col">
              <button
                onClick={() => {
                  upQueue(i);
                }}
              >
                <ArrowDropUpIcon />
              </button>
              <button
                onClick={() => {
                  downQueue(i);
                }}
              >
                <ArrowDropDownIcon />
              </button>
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
