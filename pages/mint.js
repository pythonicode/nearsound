import {
  Autocomplete,
  TextField,
  Button,
  Skeleton,
  Stack,
  styled,
} from "@mui/material";
import Header from "../components/Header";
import Player from "../components/Player";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";

import { NFTStorage, Blob } from "nft.storage";

const Input = styled("input")({
  display: "none",
});

export default function Mint() {
  const tags = [
    "Rock",
    "Pop",
    "Indie",
    "Singer/Songwriter",
    "Hip-Hop",
    "Dubstep",
    "Electronic",
    "Rap",
    "Future Bass",
    "Folk",
    "Ethnic",
    "Country",
  ];

  const MAX_UPLOAD_SIZE = 99999999;
  const NFT_STORAGE_API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDcyNUNFQzQ5YjgzQTk0MDFFNjA3N0EzMUZjN2EyOThFMDExNUVkMDAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0MzkyODczMTYxNCwibmFtZSI6InRlc3QifQ.MlaurOnSPr9MGWcGZdRpf93UfnI9C9IMIloMF2KfFGA";
  const client = new NFTStorage({ token: NFT_STORAGE_API_KEY });

  const [loading, setLoading] = useState(false);
  const [artwork, setArtwork] = useState(null);
  const [audio, setAudio] = useState(null);
  const [audioFileName, setAudioFileName] = useState(null);

  const onAudioUpload = (event) => {
    if (
      event.target.files[0] === null ||
      event.target.files[0] === undefined ||
      event.target.files[0].size > MAX_UPLOAD_SIZE
    ) {
      alert("Upload failed. Please upload a .wav file under 100mb.");
      return;
    }
    setAudioFileName(event.target.files[0].name);
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onerror = () => {
      return false;
    };
    reader.onloadend = () => {
      setAudio(event.target.files[0]);
    };
  };

  const onArtworkUpload = (event) => {
    if (event.target.files[0] === null || event.target.files[0] === undefined)
      return;
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onerror = () => {
      return false;
    };
    reader.onloadend = () => {
      let image = new Image();
      image.src = reader.result;
      image.onload = () => {
        if (image.height < 300 || image.height < 300) {
          alert("Dimensions must be over 300px.");
          return false;
        }
        setArtwork(reader.result);
        return true;
      };
    };
  };

  const audio_upload_content = () => {
    if (audio === null)
      return (
        <>
          <MusicNoteIcon /> Upload Audio
        </>
      );
    else
      return (
        <>
          <CheckIcon /> {audioFileName}
        </>
      );
  };

  const artwork_upload_content = () => {
    if (artwork === null)
      return (
        <Stack spacing={1}>
          <Skeleton variant="rectangular" width={210} height={20} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={210} height={120} />
        </Stack>
      );
    else
      return (
        <div className="w-80 h-80 overflow-hidden">
          <img
            className="object-center object-cover"
            src={artwork}
            alt="Song Artwork"
          />
        </div>
      );
  };

  const validate_and_mint = async (e) => {
    e.preventDefault();
    setLoading(true);
    const cid = await client.storeBlob(audio);
    console.log(cid);
  };

  const content = () => {
    if (!loading) {
      return (
        <form
          onSubmit={validate_and_mint}
          className="flex flex-col w-[500px] p-8 gap-4 h-full overflow-y-scroll"
        >
          <h1 className="text-3xl font-bold mb-4">Mint Your Song</h1>
          <label htmlFor="audio-file" className="w-full">
            <Input
              accept=".wav"
              id="audio-file"
              multiple
              type="file"
              onChange={onAudioUpload}
            />
            <Button variant="contained" component="span" fullWidth>
              {audio_upload_content()}
            </Button>
            <div className="text-center text-xs text-neutral-400 p-2">
              Must be <code>.wav</code> format. Limit <code>100mb</code>.
            </div>
          </label>
          <TextField label="Title" variant="outlined" />
          <TextField label="Artist Name" variant="outlined" />
          <Autocomplete
            multiple
            freeSolo
            options={[]}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Featured Artists"
                helperText="Press 'enter' to add multiple artists."
              />
            )}
          />
          <h3 className="text-xl">Upload Artwork (min. 300x300)</h3>
          <label htmlFor="art-file">
            <Input
              accept="image/*"
              id="art-file"
              type="file"
              onChange={onArtworkUpload}
            />
            <Button variant="outline" component="span">
              {artwork_upload_content()}
            </Button>
          </label>
          <Autocomplete
            multiple
            id="tags-standard"
            options={tags}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Tags"
                placeholder="Choose tags the best describe your song."
              />
            )}
          />
          <Button variant="outlined" type="submit">
            MINT
          </Button>
        </form>
      );
    } else return;
  };

  return (
    <main className="flex flex-col items-center w-screen h-screen max-w-screen max-h-screen text-white bg-dark">
      <Header />

      <Player />
    </main>
  );
}
