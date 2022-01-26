// Components //
import Head from 'next/head'
import Header from '../../components/Header';
import Player from '../../components/Player';
import Roles from '../../components/Roles'
import { MintSong, CreateAd } from '../../components/ActionButtons';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Switch from '@mui/material/Switch';
import NearLogo from '../../components/NearLogo';

import { useState } from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';

const roles = ['admin', 'listener']
const balance = 0;

export default function Account() {

  const router = useRouter();
  const [ ads, setAds ] = useState(true);

  return (
    <main className="flex flex-col w-screen lg:h-screen max-w-screen lg:max-h-screen text-white bg-dark">
      <Head>
        <title>Nearsound | Account</title>
        <meta name="description" content="A platform for listening and distributing music." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <div className='flex flex-col lg:flex-row grow items-start justify-start gap-8 p-8 h-full'>
        <Card sx={{ width: 320 }} variant="outlined">
          <CardContent>
            <div className='flex flex-row items-center justify-between'>
              <h2 className='text-xl font-bold'>Account</h2>
              <div id='roles' className='flex flex-row gap-2'>
                <Roles roles={roles}/>
              </div>
            </div>
            <hr className='border-b-1 my-2'></hr>
            <div className='flex items-center'>
              Play Advertisements
              <Switch
                checked={ads}
                onChange={() => { setAds(!ads) }}
              />
            </div>
          </CardContent>
        </Card>
        <Card sx={{ width: 320 }} variant="outlined">
          <CardContent>
            <div className='flex flex-row items-center justify-between'>
              <h2 className='text-xl font-bold'>Actions</h2>
            </div>
            <hr className='border-b-1 my-2'></hr>
            <MintSong onClick={() => { router.push('/mint') }} roles={roles}/>
            <CreateAd roles={roles}/>
          </CardContent>
        </Card>
        <Card sx={{ width: 320 }} variant="outlined">
          <CardContent>
            <div className='flex flex-row items-center justify-between'>
              <h2 className='text-xl font-bold'>Funding</h2>
            </div>
            <hr className='border-b-1 my-2'></hr>
            <div className='flex flex-row items-center justify-between mt-2'>
              <div className='flex flex-row items-center gap-5 text-xl overflow-x-hidden'>
                <NearLogo/>
                <code>{balance.toFixed(2)}</code>
              </div>
              <Button variant="outlined">Add Funds</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Player/>
    </main>
  )
}
