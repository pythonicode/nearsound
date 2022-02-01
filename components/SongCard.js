import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";

import { Snackbar, Alert } from "@mui/material";

import { useState } from "react";
import { Song, useSound } from "../context/SoundProvider";

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

export default function SongCard({ src, image, title, artist, featured }) {
  const { setSong, addToQueue } = useSound();
  const [snackbar, setSnackbar] = useState(false);

  return (
    <>
      <Card sx={{ width: "256px" }} variant="outlined">
        <img className="object-cover w-64 h-64" src={image} alt="Song Image" />
        <CardContent>
          <div className="flex flex-row justify-between w-full">
            <div className="overflow-x-hidden whitespace-nowrap">
              <h3>{title}</h3>
              <h5 className="text-xs text-neutral-400">
                {artist} {build_features(featured)}
              </h5>
            </div>
            <div className="flex flex-row">
              <IconButton
                onClick={() => {
                  addToQueue(Song(src, image, title, artist, featured));
                  setSnackbar(true);
                }}
                size="small"
                aria-label="queue"
              >
                <QueueMusicIcon />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => {
                  const song = Song(src, image, title, artist, featured);
                  setSong(song);
                }}
                aria-label="play"
              >
                <PlayArrowIcon />
              </IconButton>
            </div>
          </div>
        </CardContent>
      </Card>
      <Snackbar
        open={snackbar}
        autoHideDuration={6000}
        onClose={() => {
          setSnackbar(false);
        }}
      >
        <Alert severity="success" color="info">
          Added <span className="font-bold">{title}</span> to queue!
        </Alert>
      </Snackbar>
    </>
  );
}