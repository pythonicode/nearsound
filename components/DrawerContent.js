import { Fragment } from "react"

export default function DrawerContent({queue}) {
    return (
        <div className='flex flex-col w-80 h-full bg-dark border-r-2 border-dark-200'>
            {
                queue.map((song, i, q) => (
                    <Fragment key={i}>
                        <div className="flex flex-row items-center justify-start w-full h-20 border-b border-dark-200 p-4">
                            <img src={song.artwork} alt="Song Artwork" width="50px"/>
                        </div>
                    </Fragment>
                ))
            }
        </div>
    )
}