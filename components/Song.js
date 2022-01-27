import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import PauseIcon from '@mui/icons-material/Pause';
import { useState } from 'react';


export default function Song({image, title, artist, features, onPlay, onPause, onQueue}) {

    const [ playing, setPlaying ] = useState(false);

    const build_features = () => {
        let str = "";
        if(features === undefined) return str;
        features.forEach(feature => {
            str += feature + ", "
        });
        str = str.slice(0, -2); 
        return str;
    }

    const play_button_icon = () => {
        if(playing) return <PauseIcon/>
        else return <PlayArrowIcon />
    }

    return (
        <Card sx={{width: 'clamp(200px, 256px, 300px)'}} variant="outlined">
            <CardMedia
                component="img"
                image={image}
                draggable="false"
                alt="Album Cover"
            />
            <CardContent>
                <div className='flex flex-row justify-between w-full'>
                    <div className='overflow-x-hidden whitespace-nowrap'>
                        <h3>{title}</h3>
                        <h5 className='text-xs text-neutral-400'>{artist} (ft. {build_features()})</h5>
                    </div>
                    <div className='flex flex-row'>
                        <IconButton onClick={onQueue} size="small" aria-label="queue">
                            <QueueMusicIcon/>
                        </IconButton>
                        <IconButton size="small" onClick={
                            () => {
                                setPlaying(!playing);
                                if(!playing) onPlay();
                                else onPause();
                            }
                        } 
                        aria-label="play">
                            {play_button_icon()}
                        </IconButton>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}