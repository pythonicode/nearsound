import { Howler } from 'howler';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import DrawerContent from './DrawerContent';

import { Button, Drawer } from '@mui/material';

import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import RepeatOnIcon from '@mui/icons-material/RepeatOn';
import RepeatOneOnIcon from '@mui/icons-material/RepeatOneOn';

import { useSound } from '../context/SoundProvider';

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
}

export default function Player({currentlyPlaying}) {

    const { song, setSong, queue, updateQueue } = useSound();

    const [ playing, setPlaying ] = useState(false);
    const [ repeat, setRepeat ] = useState('none');
    const [ rotation, setRotation ] = useState(0);
    const [ volume, setVolume ] = useState(50);
    const [ seek, setSeek ] = useState(song.audio.seek());
    const [ duration, setDuration ] = useState(song.audio.duration());

    const [ open, setOpen ] = useState(false);

    useEffect(() => {
        const stop = setInterval(() => {
            setSeek(song.audio.seek());
            setDuration(song.audio.duration());
        }, 100);
        return stop;
    }, [song.audio]);

    useEffect(() => {
        Howler.volume(volume/100);
    }, [volume]);
    
    const play_music = () => {
        song.audio.play();
        setPlaying(true);
    }

    const pause_music = () => {
        song.audio.pause();
        setPlaying(false);
    }

    const play_pause_button = () => {
        if(playing) return <button className='transition-all hover:opacity-75' onClick={pause_music}><PauseCircleOutlineIcon fontSize="large"/></button>
        else return <button className='transition-all hover:opacity-75' onClick={play_music}><PlayCircleOutlineIcon fontSize="large"/></button>
    }

    const repeat_icon = () => {
        if(repeat === 'none') return <RepeatIcon/>
        else if(repeat === 'queue') return <RepeatOnIcon/>
        else return <RepeatOneOnIcon/>
    }

    const update_repeat = () => {
        if(repeat === 'none') setRepeat('queue');
        else if(repeat === 'queue') setRepeat('song');
        else setRepeat('none');
    }

    const shuffle = () => {
        setRotation(rotation + 360);
    }

    const variants = {
        hidden: { y: 300 },
        enter: { y: 0 },
        exit: { y: 300 },
    }

    return (
        <motion.footer variants={variants} initial="hidden" animate="enter" exit="exit" transition={{ duration: 1 }} className='w-full flex flex-col items-center justify-center py-4 h-32 gap-2 border-t-4 border-double border-dark-100'>
            <Drawer open={open} onClose={() => { setOpen(false); }}>
                <DrawerContent queue={queue}/>
            </Drawer>
            <div className='flex flex-row items-center justify-center gap-2'>
                <Button onClick={()=>{setOpen(true);}} variant="text">OPEN QUEUE</Button>
                <button onClick={update_repeat} className='transition-all hover:opacity-75'>{repeat_icon()}</button>
                <motion.button onClick={shuffle} animate={{ rotate: rotation }} className='transition-all hover:opacity-75'><ShuffleIcon/></motion.button>
                <button className='transition-all hover:opacity-75'><SkipPreviousIcon/></button>
                {play_pause_button()}
                <button className='transition-all hover:opacity-75'><SkipNextIcon/></button>
                <input onChange={event => setVolume(event.target.value)} className="rounded-lg appearance-none bg-white h-1 w-16 cursor-pointer transition-all" type="range" min="0" max="100"/>
                <Button variant="text">TIP ARTIST</Button>
            </div>
            <div className='flex flex-row items-center justify-center'>
                <div className='text-xs text-light text-neutral-400 mr-2'>{fancyTime(seek)}</div>
                <div className='w-80 h-1'><div className="bg-neutral-400 h-1" style={{width: seek*100/duration + "%"}}></div></div>
                <div className='text-xs text-light text-neutral-400 ml-2'>{fancyTime(duration)}</div>
            </div>
            <div className='text-xs text-light text-neutral-400'>{song.metadata.title} by {song.metadata.artist}</div>
        </motion.footer>
    )
}