import Head from "next/head";
import NearLogin from "../../components/NearLogin";
import { CircularProgress } from "@mui/material";
import { Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useNear } from "../../context/NearProvider";
import { utils } from "near-api-js";

function Artist() {
  const { wallet, contract, signedIn } = useNear();
  const [loading, setLoading] = useState(true);
  const [artist, setArtist] = useState("");

  useEffect(() => {
    if (wallet != undefined) setLoading(false);
  });

  const create_artist = async (e) => {
    e.preventDefault();
    await contract.create_artist(
      {
        artist_name: artist,
      },
      300000000000000, // attached GAS (optional)
      utils.format.parseNearAmount("0.01") // attached deposit in yoctoNEAR (optional)
    );
  };

  const content = () => {
    if (loading) {
      return (
        <>
          <CircularProgress />
        </>
      );
    }
    if (!signedIn) {
      return (
        <>
          <h3 className="mb-4">
            You must connect to NEAR before accessing this page.
          </h3>
          <NearLogin />
        </>
      );
    }
    return (
      <form
        onSubmit={create_artist}
        className="flex flex-col w-[500px] p-8 gap-4 h-full overflow-y-scroll"
      >
        <h1 className="text-3xl font-bold">Choose Your Artist Name</h1>
        <code className="mb-4">{wallet?.getAccountId()}</code>
        <TextField
          value={artist}
          onChange={(e) => {
            setArtist(e.target.value);
          }}
          label="Artist Name"
          required
        ></TextField>
        <Button variant="outlined" type="submit">
          Confirm
        </Button>
      </form>
    );
  };

  return (
    <main className="flex flex-col items-center w-screen h-screen max-w-screen max-h-screen text-white bg-dark">
      <Head>
        <title>Nearsound | Create An Artist</title>
        <meta
          name="description"
          content="Claim an Artist account on the NEAR protocol blockchain."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="p-8 text-3xl font-bold font-mono">nearsound / minting</h1>
      <div className="flex flex-col items-center justify-center h-full w-full gap-2 text-center">
        {content()}
      </div>
      <p className="p-2 font-xs text-gray-500">Nearsound 2022</p>
    </main>
  );
}

export default Artist;
