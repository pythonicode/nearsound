import { Howler, Howl } from 'howler';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import RepeatOnIcon from '@mui/icons-material/RepeatOn';
import RepeatOneOnIcon from '@mui/icons-material/RepeatOneOn';

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

export default function Player() {

    const [ playing, setPlaying ] = useState(false);
    const [ repeat, setRepeat ] = useState('none');
    const [ rotation, setRotation ] = useState(0);

    const [ sound, setSound ] = useState(new Howl({
        src: ['https://bafybeia7xboj3uiveowv5knlrh47sjeyylmftqazkri3mcqa7xix5x6leu.ipfs.dweb.link/'],
        html5: true
    }));

    const [ volume, setVolume ] = useState(50);

    const [ song, setSong ] = useState({
        author: "Unknown Artist",
        featuring: [],
        title: "Pink Soldiers"
    });

    const [ seek, setSeek ] = useState(sound.seek());
    const [ duration, setDuration ] = useState(sound.duration());

    useEffect(() => {
        const stop = setInterval(() => {
            setSeek(sound.seek());
        }, 100);
        setDuration(sound.duration());
        return stop;
    }, [sound]);

    useEffect(() => {
        Howler.volume(volume/100);
    }, [volume]);
    
    const play_music = () => {
        sound.play();
        setPlaying(true);
    }

    const pause_music = () => {
        sound.pause();
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

    return (
        <footer className='w-full flex flex-col items-center justify-center py-4 h-32 gap-2 border-t-4 border-double border-dark-100'>
            <div className='flex flex-row items-center justify-center gap-2'>
                <button onClick={update_repeat} className='transition-all hover:opacity-75'>{repeat_icon()}</button>
                <motion.button onClick={shuffle} animate={{ rotate: rotation }} className='transition-all hover:opacity-75'><ShuffleIcon/></motion.button>
                <button className='transition-all hover:opacity-75'><SkipPreviousIcon/></button>
                {play_pause_button()}
                <button className='transition-all hover:opacity-75'><SkipNextIcon/></button>
                <input onChange={event => setVolume(event.target.value)} className="rounded-lg appearance-none bg-white h-1 w-16 cursor-pointer transition-all" type="range" min="0" max="100"/>
            </div>
            <div className='flex flex-row items-center justify-center'>
                <div className='text-xs text-light text-neutral-400 mr-2'>{fancyTime(seek)}</div>
                <div className='w-80 h-1'><div className="bg-neutral-400 h-1" style={{width: seek*100/sound.duration() + "%"}}></div></div>
                <div className='text-xs text-light text-neutral-400 ml-2'>{fancyTime(sound.duration())}</div>
            </div>
            <div className='text-xs text-light text-neutral-400'>{song.title} by {song.author}</div>
        </footer>
    )
}