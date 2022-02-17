// Components //
import Head from "next/head";
import Header from "../../components/Header";
import Player from "../../components/Player";
import Roles from "../../components/Roles";
import { MintSong, CreateArtist } from "../../components/ActionButtons";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Switch from "@mui/material/Switch";
import NearLogo from "../../components/NearLogo";
import NearLogin from "../../components/NearLogin";

import { useNear } from "../../context/NearProvider";
import { useState, useEffect } from "react";
import { Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";

const balance = 0;

export default function Account() {
  const router = useRouter();
  const [ads, setAds] = useState(true);

  const { wallet, signedIn, connected, roles } = useNear();

  const content = () => {
    if (!connected) {
      return (
        <div className="flex flex-col grow items-center justify-center gap-8 p-8 h-full">
          <CircularProgress />
        </div>
      );
    }
    if (!signedIn) {
      return (
        <div className="flex flex-col grow items-center justify-center gap-8 p-8 h-full">
          <h3 className="mb-4">
            You must connect to NEAR before accessing this page.
          </h3>
          <NearLogin />
        </div>
      );
    }
    return (
      <div className="flex flex-col lg:flex-row grow items-start justify-start gap-8 p-8 h-full">
        <Card sx={{ width: 320 }} variant="outlined">
          <CardContent>
            <div className="flex flex-row items-center justify-between">
              <h2 className="text-xl font-bold">Account</h2>
              <div id="roles" className="flex flex-row gap-2">
                <Roles roles={roles} />
              </div>
            </div>
            <hr className="border-b-1 my-2"></hr>
            <div className="flex items-center">
              Play Advertisements
              <Switch
                checked={ads}
                onChange={() => {
                  setAds(!ads);
                }}
              />
            </div>
          </CardContent>
        </Card>
        <Card sx={{ width: 320 }} variant="outlined">
          <CardContent>
            <div className="flex flex-row items-center justify-between">
              <h2 className="text-xl font-bold">Actions</h2>
            </div>
            <hr className="border-b-1 my-2"></hr>
            <MintSong
              onClick={() => {
                router.push("/account/mint");
              }}
              roles={roles}
            />
            <CreateArtist
              onClick={() => {
                router.push("/account/artist");
              }}
              roles={roles}
            />
          </CardContent>
        </Card>
        <Card sx={{ width: 320 }} variant="outlined">
          <CardContent>
            <div className="flex flex-row items-center justify-between">
              <h2 className="text-xl font-bold">Funding</h2>
            </div>
            <hr className="border-b-1 my-2"></hr>
            <div className="flex flex-row items-center justify-between mt-2">
              <div className="flex flex-row items-center gap-5 text-xl overflow-x-hidden">
                <NearLogo />
                <code className="overflow-x-hidden whitespace-nowrap w-fit">
                  {balance.toFixed(2)}
                </code>
              </div>
              <Button variant="outlined">Add Funds</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <main className="flex flex-col items-center justify-center w-screen lg:h-screen max-w-screen lg:max-h-screen text-white bg-dark">
      <Head>
        <title>Nearsound | Account</title>
        <meta
          name="description"
          content="A platform for listening and distributing music."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {content()}
      <Player />
    </main>
  );
}
