export default function Sidebar() {
    return (
        <div id="sidebar" className='flex flex-col w-80 h-full items-center border-r border-dark-400 border-double'>
          <h2 className="text-xl mt-8 mb-2 font-bold">UP NEXT</h2>
          <div className='w-full px-4 py-2 border-t-2 border-dark-300'>
            Song Name by Song Artist
          </div>
          <div className='w-full px-4 py-2 border-t-2 border-dark-300'>
            Song Name by Song Artist
          </div>
        </div>
    )
}