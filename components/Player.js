import { Howler, Howl } from 'howler';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import play from '../public/play-64.png';
import pause from '../public/pause-64.png';
import skip_backward from '../public/skip-backward-64.png';
import skip_forward from '../public/skip-forward-64.png';
import loop from '../public/loop-64.png';
import shuffle from '../public/shuffle-64.png';

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
        if(playing) return <button className='play-button' onClick={pause_music}><Image src={pause} alt="pause button" width={"16px"} height={"16px"}/></button>
        else return <button className='play-button' onClick={play_music}><Image src={play} alt="play button" width={"16px"} height={"16px"}/></button>
    }

    return (
        <footer className='w-full flex flex-col items-center justify-center py-4 h-32 gap-2 border-t-4 border-double border-dark-100'>
            <div className='flex flex-row items-center justify-center gap-4'>
                <button className='transition-all hover:opacity-75'><Image src={loop} alt="loop button" width={"16px"} height={"16px"}/></button>
                <button className='transition-all hover:opacity-75'><Image src={shuffle} alt="shuffle button" width={"16px"} height={"16px"}/></button>
                <button className='transition-all hover:opacity-75'><Image src={skip_backward} alt="skip backward button" width={"16px"} height={"16px"}/></button>
                {play_pause_button()}
                <button className='transition-all hover:opacity-75'><Image src={skip_forward} alt="skip forward button" width={"16px"} height={"16px"}/></button>
                <input onChange={event => setVolume(event.target.value)} className="rounded-lg appearance-none bg-neutral-200 h-1 w-20 cursor-pointer accent-neutral-600 hover:accent-neutral-500 transition-all" type="range" min="0" max="100"/>
            </div>
            <div className='flex flex-row items-center justify-center'>
                <div className='text-xs text-light text-neutral-400 mr-2'>{fancyTime(seek)}</div>
                <div className='w-80 h-1'>
                    <div className="bg-neutral-400 h-1" style={{width: seek*100/sound.duration() + "%"}}>

                    </div>
                </div>
                <div className='text-xs text-light text-neutral-400 ml-2'>{fancyTime(sound.duration())}</div>
            </div>
            <div className='text-xs text-light text-neutral-400'>{song.title} by {song.author}</div>
        </footer>
    )
}