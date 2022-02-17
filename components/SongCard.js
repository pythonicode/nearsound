import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";

import { Snackbar, Alert } from "@mui/material";

import { useEffect, useState } from "react";
import { Song, useSound } from "../context/SoundProvider";

export default function SongCard({ song }) {
  const { setSong, addToQueue, stopAll, play, build_features } = useSound();
  const [snackbar, setSnackbar] = useState(false);

  return (
    <>
      <Card sx={{ width: "256px" }} variant="outlined">
        <img
          className="object-cover w-64 h-64"
          src={song.artwork}
          alt="Song Art"
        />
        <CardContent>
          <div className="flex flex-row justify-between w-full">
            <div className="overflow-x-hidden whitespace-nowrap">
              <h3>{song.title}</h3>
              <h5 className="text-xs text-neutral-400">
                {song.artist} {build_features(song.featured)}
              </h5>
            </div>
            <div className="flex flex-row">
              <IconButton
                onClick={() => {
                  song.audio.load();
                  addToQueue(song);
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
                  stopAll();
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
          Added <span className="font-bold">{song.title}</span> to queue!
        </Alert>
      </Snackbar>
    </>
  );
}
