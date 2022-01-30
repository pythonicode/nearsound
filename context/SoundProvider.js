// Packages //
import { useState, useEffect, useContext, createContext } from "react";
import { Howl } from "howler";

const SoundContext = createContext();

export function useSound() {
    return useContext(SoundContext);
}

export function Song(src, artwork, title, artist, featured, created=Date.now()) {
    return {
        audio: new Howl({
            src: [src],
            html5: true
        }),
        artwork: artwork,
        metadata: {
            title: title,
            artist: artist,
            featured: featured,
            created: created,
        }
    }
}

export function SoundProvider({ children }) {

    const [ song, setSong ] = useState(
        Song(
            'https://bafybeia7xboj3uiveowv5knlrh47sjeyylmftqazkri3mcqa7xix5x6leu.ipfs.dweb.link/',
            'https://cms-assets.tutsplus.com/cdn-cgi/image/width=360/uploads/users/114/posts/34296/final_image/Final-image.jpg',
            'Pink Soldiers',
            'Unknown Artist',
            [],
    ));
    const [ queue, updateQueue ] = useState([Song(
        'https://bafybeia7xboj3uiveowv5knlrh47sjeyylmftqazkri3mcqa7xix5x6leu.ipfs.dweb.link/',
        'https://cms-assets.tutsplus.com/cdn-cgi/image/width=360/uploads/users/114/posts/34296/final_image/Final-image.jpg',
        'Pink Soldiers',
        'Unknown Artist',
        [],
    )]);

    const context = {
        song,
        setSong,
        queue,
        updateQueue,
    }

    return (
        <>
            <SoundContext.Provider value={context}>
                {children}
            </SoundContext.Provider>
        </>
    );
}