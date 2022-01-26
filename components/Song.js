import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
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
        <Card variant="outlined">
            <CardMedia
                component="img"
                image={image}
                draggable="false"
                alt="Album Cover"
            />
            <CardContent>
                <div className='flex flex-row justify-between'>
                    <div className='max-w-[18ch] whitespace-nowrap'>
                        <h2>{title}</h2>
                        <h3 className='text-sm text-neutral-400  overflow-hidden'>{artist} (ft. {build_features()})</h3>
                    </div>
                    <CardActions>
                        <IconButton onClick={onQueue} aria-label="delete">
                            <PlaylistPlayIcon />
                        </IconButton>
                        <IconButton  onClick={
                            () => {
                                setPlaying(!playing);
                                if(!playing) onPlay();
                                else onPause();
                            }
                        } 
                        aria-label="delete">
                            {play_button_icon()}
                        </IconButton>
                    </CardActions>
                </div>
            </CardContent>
        </Card>
    )
}