import {
  Autocomplete,
  TextField,
  Button,
  Skeleton,
  Stack,
  styled,
  Alert,
  Tooltip,
} from "@mui/material";
import Header from "../../components/Header";
import Player from "../../components/Player";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import CheckIcon from "@mui/icons-material/Check";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { utils } from "near-api-js";

import { NFTStorage, Blob } from "nft.storage";
import LinearProgress from "@mui/material/LinearProgress";
import { CircularProgress } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useNear, decode } from "../../context/NearProvider";
import NearLogin from "../../components/NearLogin";

import imageCompression from "browser-image-compression";

const DEFAULT_TAGS = [
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

const Input = styled("input")({
  display: "none",
});

const COMPRESSION_OPTIONS = {
  maxSizeMB: 20, // 99 MB maximum
  maxWidthOrHeight: 1000, // width/height scaled down to 1000px
};

export default function Mint() {
  const router = useRouter();

  const MAX_UPLOAD_SIZE = 99999999;
  const CHARACTER_LIMIT = 64;
  const NFT_STORAGE_API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDcyNUNFQzQ5YjgzQTk0MDFFNjA3N0EzMUZjN2EyOThFMDExNUVkMDAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0MzkyODczMTYxNCwibmFtZSI6InRlc3QifQ.MlaurOnSPr9MGWcGZdRpf93UfnI9C9IMIloMF2KfFGA";
  const client = new NFTStorage({ token: NFT_STORAGE_API_KEY });

  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState(
    "This can take a few seconds."
  );

  const [minting, setMinting] = useState(false);

  const [artwork, setArtwork] = useState(null);
  const [audio, setAudio] = useState(null);

  const [audioFileName, setAudioFileName] = useState(null);
  const [artworkURL, setArtworkURL] = useState(null);

  const [title, setTitle] = useState("");
  const [featured, setFeatured] = useState([]);
  const [tags, setTags] = useState([]);

  const [state, setState] = useState("mint");
  const [error, setError] = useState(false);

  const [token, setToken] = useState(null);

  const {
    near,
    wallet,
    signedIn,
    contract,
    connected,
    artist,
    getTransaction,
    costPerByte,
  } = useNear();

  const { transactionHashes } = router.query;
  useEffect(async () => {
    if (!connected) return;
    if (transactionHashes == undefined) {
      setLoading(false);
      return;
    }
    const tx = await getTransaction(transactionHashes, wallet.getAccountId());
    if (tx.status.SuccessValue != undefined) {
      const event = tx.receipts_outcome[0].outcome.logs[0];
      const log = JSON.parse(event.slice(event.indexOf(":") + 1));
      const _args = Buffer.from(
        JSON.stringify({
          token_id: log.data[0].token_ids[0],
        })
      ).toString("base64");
      const _token = await near.connection.provider.query({
        request_type: "call_function",
        finality: "final",
        account_id: "nearsound.testnet",
        method_name: "nft_token",
        args_base64: _args,
      });
      console.log(_token);
      setToken(decode(_token.result));
      setState("success");
      setLoading(false);
    } else setLoading(false);
  }, [transactionHashes, connected]);

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

  const onArtworkUpload = async (event) => {
    const uploaded = event.target.files[0];
    if (uploaded === null || uploaded === undefined) return;
    const compressed = await imageCompression(uploaded, COMPRESSION_OPTIONS);
    const reader = new FileReader();
    reader.readAsDataURL(compressed);
    reader.onerror = () => {
      return false;
    };
    reader.onloadend = () => {
      let image = new Image();
      image.src = reader.result;
      image.onload = () => {
        if (image.height < 300 || image.height < 300) {
          alert("Artwork dimensions must be over 300px.");
          return false;
        }
        setArtworkURL(reader.result);
        setArtwork(compressed);
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
          <Skeleton variant="rectangular" width={256} height={16} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={256} height={180} />
        </Stack>
      );
    else
      return (
        <img
          className="w-64 h-64 overflow-hidden object-center object-cover"
          src={artworkURL}
          alt="Song Artwork"
        />
      );
  };

  const calculate_cost = () => {
    let total_cost = BigInt(0);
    const token_id_len = uuidv4().length;
    for (let i = 0; i < tags.length; i++)
      total_cost += BigInt(tags[i].length + token_id_len) * BigInt(costPerByte);
    for (let i = 0; i < featured.length; i++)
      total_cost +=
        BigInt(featured[i].length + token_id_len) * BigInt(costPerByte);
    total_cost += BigInt((title.length + token_id_len) * costPerByte);
    total_cost += BigInt((artist.length + token_id_len) * costPerByte);
    total_cost += BigInt(128 * costPerByte); // For IPFS metadata + buffer
    return total_cost.toString();
  };

  const validate_and_mint = async (e) => {
    e.preventDefault();
    if (audio == null) {
      alert("Audio is missing. Please upload and try again.");
      return;
    }
    if (artwork == null) {
      alert("Artwork is missing. Please upload and try again.");
      return;
    }
    setMinting(true);
    const _audio = client.storeBlob(audio);
    const _artwork = client.storeBlob(artwork);
    const [audio_cid, artwork_cid] = await Promise.all([_audio, _artwork]);
    setLoadingText("Redirecting to NEAR wallet for confirmation.");
    const metadata = {
      title: title,
      audio: "https://ipfs.io/ipfs/" + audio_cid,
      media: "https://ipfs.io/ipfs/" + artwork_cid,
      featured: featured.join(" "),
      description: tags.join(" "),
    };
    await contract.nft_mint(
      {
        token_id: uuidv4(),
        metadata,
        receiver_id: wallet.getAccountId(),
      },
      300000000000000,
      calculate_cost()
    );
    setState("success");
    setMinting(false);
  };

  const content = () => {
    if (!connected || loading) {
      return (
        <>
          <CircularProgress />
        </>
      );
    }
    if (!signedIn) {
      return (
        <>
          <h3 className="mb-2">
            You must connect to NEAR before accessing this page.
          </h3>
          <NearLogin />
        </>
      );
    }
    if (artist == "No Artist") {
      <>
        <h3 className="mb-2">
          You must create an artist account before minting.
        </h3>
        <Button
          onClick={() => {
            router.push("/account/artist");
          }}
          variant="outlined"
        >
          Create Artist Account
        </Button>
      </>;
    }
    if (minting) {
      return (
        <>
          <h3 className="text-xl font-bold">Minting</h3>
          <LinearProgress sx={{ width: "clamp(200px, 300px, 500px)" }} />
          <p className="mt-2 font-sm text-neutral-500">{loadingText}</p>
        </>
      );
    }
    if (state == "mint") {
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
          <TextField
            required
            value={title}
            error={error}
            onChange={(e) => {
              if (e.target.value?.length > CHARACTER_LIMIT) {
                setTitle(e.target.value.slice(0, CHARACTER_LIMIT));
                setError(true);
              } else {
                setError(false);
                setTitle(e.target.value);
              }
            }}
            label="Title"
            variant="outlined"
            helperText={"Maximum " + CHARACTER_LIMIT + " characters."}
          />
          <TextField
            value={artist}
            label="Artist"
            variant="outlined"
            disabled
          />
          <Autocomplete
            multiple
            freeSolo
            options={[]}
            value={featured}
            onChange={(e, value) => {
              setFeatured(value);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Featured Artists (Optional)" />
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
            value={tags}
            onChange={(e, value) => {
              setTags(value);
            }}
            options={DEFAULT_TAGS}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Tags (Optional)"
                placeholder="Choose tags the best describe your song."
              />
            )}
          />
          <Button variant="outlined" type="submit">
            Mint
          </Button>
          <p className="w-full text-center text-sm text-neutral-500">
            Estimated Total Cost:{" "}
            {utils.format.formatNearAmount(calculate_cost())} NEAR
          </p>
        </form>
      );
    }
    if (state == "success") {
      return (
        <div className="flex flex-col items-center justify-center h-full w-full gap-2 overflow-y-scroll">
          <img
            className="w-64 h-64 overflow-hidden object-center object-cover rounded"
            src={token.metadata.media}
            alt="Song Artwork"
            draggable="false"
          />
          <hr className="m-2 border w-20 border-neutral-50 rounded" />
          <h1 className="text-3xl font-bold cursor-default">
            {token.metadata.title}
          </h1>
          <h3 className="cursor-default">{token.metadata.artist}</h3>
          <hr className="m-2 border w-20 border-neutral-50 rounded" />
          <code className="cursor-default">Transaction Details</code>
          <Tooltip title="Hash">
            <code className="text-xs max-[32ch] overflow-x-hidden cursor-pointer">
              {transactionHashes}
            </code>
          </Tooltip>
          <hr className="m-2 border w-20 border-neutral-50 rounded" />
          <div className="flex flex-row gap-4 mt-2 w-64">
            <Button
              onClick={() => {
                router.push("/");
              }}
              variant="outlined"
              fullWidth
            >
              Back to Menu
            </Button>
          </div>
        </div>
      );
    }
  };

  return (
    <main className="flex flex-col items-center w-screen h-screen max-w-screen max-h-screen text-white bg-dark">
      <Head>
        <title>Nearsound | Mint A Song</title>
        <meta
          name="description"
          content="Mint an NFT song on the NEAR protocol blockchain."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex flex-col items-center justify-center h-full w-full gap-2">
        {content()}
      </div>
      <p className="p-2 font-xs text-gray-500">Nearsound 2022</p>
    </main>
  );
}
