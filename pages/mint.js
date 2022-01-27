import { Autocomplete, TextField, Button, Skeleton, Stack, styled } from "@mui/material"
import Header from "../components/Header";
import Player from "../components/Player";
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { useState } from "react";

const Input = styled('input')({
    display: 'none',
});

export default function Mint() {
    const tags = [
        'Rock',
        'Pop',
        'Indie',
        'Singer/Songwriter',
        'Hip-Hop',
        'Dubstep',
        'Electronic',
        'Rap',
        'Future Bass',
        'Folk',
        'Ethnic',
        'Country',
    ];

    const [ artwork, setArtwork ] = useState(null);
    const [ audiot, setAudio ] = useState(null);

    const onArtworkUpload  = (event) => {
        if(event.target.files[0] === null || event.target.files[0] === undefined) return;
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onerror = () => { return false; } 
        reader.onloadend = function() {
            let image = new Image();
            image.src = reader.result;
            image.onload = () => {
                if (image.height < 300 || image.height < 300) {
                    alert("Dimensions must be over 300px.");
                    return false;
                }
                setArtwork(reader.result);
                return true;
            }
        }
        
    }

    const artwork_upload_content = () => {
        if(artwork === null) return (
            <Stack spacing={1}>
                <Skeleton variant="rectangular" width={210} height={20}/>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" width={210} height={120} />
            </Stack>
        )
        else return <div className="w-80 h-80 overflow-hidden"><img className="object-center object-cover" src={artwork} alt="Song Artwork"/></div>
    }

    return (
        <main className="flex flex-col items-center w-screen h-screen max-w-screen max-h-screen text-white bg-dark">
            <Header/>
            <form className="flex flex-col w-[500px] p-8 gap-4 h-full overflow-y-scroll">
                <h1 className="text-3xl font-bold mb-4">Mint Your Song</h1>
                <label htmlFor="contained-button-file" className="w-full">
                    <Input accept=".wav" id="contained-button-file" multiple type="file" />
                    <Button variant="contained" component="span" fullWidth>
                        <MusicNoteIcon/> Upload Audio (.wav)
                    </Button>
                </label>
                <p></p>
                <TextField label="Title" variant="outlined" />
                <TextField label="Artist Name" variant="outlined" />
                <Autocomplete
                    multiple
                    freeSolo
                    options={[]}
                    renderInput={(params) => <TextField {...params} label="Featured Artists" helperText="Press 'enter' to add multiple artists."/>}
                />
                <h3 className="text-xl">Upload Artwork (min. 300x300)</h3>
                <label htmlFor="contained-button-file">
                    <Input accept="image/*" id="contained-button-file" type="file" onChange={onArtworkUpload}/>
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
                <Button variant="outlined" type="submit">MINT</Button>
            </form>
            <Player/>
        </main>
    )
}