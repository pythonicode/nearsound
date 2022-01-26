
// Packages //
import { useState, useEffect, useContext, createContext } from "react";

const SoundContext = createContext();

export function useSound() {
    return useContext(NearContext);
}

export function SoundProvider({ children }) {

    const [song, setSong ] = useState();
    const [queue, updateQueue] = useState([]);

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