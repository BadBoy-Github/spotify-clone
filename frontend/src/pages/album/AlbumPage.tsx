import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useMusicStore } from "@/store/useMusicStore"
import { usePlayerStore } from "@/store/usePlayerStore"
import { Clock, Music, Music2, Pause, Play } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    if (hours > 0) {
        return `${hours} hr ${minutes.toString().padStart(2, "0")} min ${remainingSeconds.toString().padStart(2, "0")} sec`;
    } else {
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    }
};

const formatDurationTop = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    if (hours > 0) {
        return <div className="font-bold">{hours} hr {minutes.toString().padStart(2, "0")} min {remainingSeconds.toString().padStart(2, "0")} sec</div>
    } else {
        return <div className="font-bold">{minutes} min {remainingSeconds.toString().padStart(2, "0")} sec</div>
    }
};

const AlbumPage = () => {
    const { albumId } = useParams()
    const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore()
    const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore()
    const [sortedSongs, setSortedSongs] = useState(currentAlbum?.songs)
    const [totalDuration, setTotalDuration] = useState(0)

    useEffect(() => {
        if (albumId) fetchAlbumById(albumId)
    }, [fetchAlbumById, albumId])

    useEffect(() => {
        if (currentAlbum) {
            const songs = currentAlbum.songs.slice().reverse()
            setSortedSongs(songs)
            const duration = songs.reduce((acc, song) => acc + song.duration, 0)
            setTotalDuration(duration)
        }
    }, [currentAlbum])

    if (isLoading) return null

    const handlePlayAlbum = () => {
        if (!currentAlbum || !sortedSongs) return

        const isCurrentAlbumPlaying = sortedSongs.some(song => song._id === currentSong?._id)
        if (isCurrentAlbumPlaying) togglePlay()
        else {
            // start playing the album from the beginning
            playAlbum(sortedSongs, 0)
        }
    }

    const handlePlaySong = (index: number) => {
        if (!currentAlbum) return

        if (sortedSongs) {
            playAlbum(sortedSongs?.slice(), index)
        }
    }

    return (
        <div className="h-full">
            <ScrollArea className="h-full rounded-md bg-gradient-to-b from-blue-800 via-blue-900/20
                     to-zinc-900">

                {/* Main Content */}
                <div className="relative min-h-full">

                    {/* bg gradient */}
                    <div
                        className='absolute inset-0 pointer-events-none rounded-md'
                        aria-hidden='true'
                    />

                    {/* Content */}
                    <div className="relative">
                        <div className="flex p-6 gap-6 pb-8">
                            <img src={currentAlbum?.imageUrl} alt={currentAlbum?.title}
                                className='w-[240px] h-[240px] shadow-xl rounded-md' />
                            <div className="flex flex-col justify-end">
                                <p className="text-sm font-medium">Album </p>
                                <h1 className='text-7xl font-bold my-4'>{currentAlbum?.title}</h1>
                                <div className="flex items-center gap-2 text-sm text-zinc-100">
                                    <span className="font-medium text-white">{currentAlbum?.artist}</span>
                                    <span>• {currentAlbum?.songs.length} songs</span>
                                    <span>• {currentAlbum?.releaseYear}</span>
                                </div>
                                
                            
                                <div className="flex items-center justify-center mt-4 text-xs text-blue-500 bg-blue-400/10 w-fit h-fit px-2 py-2 rounded-full">
                                <Music2 className="flex items-center justify-center size-5 mr-1 bg-blue-400/50 p-1 rounded-full text-white"/> 
                                <p className="mr-1">{formatDurationTop(totalDuration)}</p>
                                </div>
                            </div>
                        </div>

                        {/* Play button */}
                        <div className='px-6 pb-4 flex items-center gap-6'>
                            <Button
                                onClick={handlePlayAlbum}
                                size='icon'
                                className='w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-400 
                                hover:scale-105 transition-all'>
                                {isPlaying && sortedSongs && sortedSongs.some((song) => song._id === currentSong?._id) ? (
                                    <Pause className='h-7 w-7 text-black' />
                                ) : (
                                    <Play className='h-7 w-7 text-black' />
                                )}
                            </Button>
                        </div>

                        {/* Table Section */}
                        <div className="bg-black/20 backdrop-blur-sm">

                            {/* Table Header */}
                            <div className='grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm 
                        text-zinc-400 border-b border-white/5'>
                                <div>#</div>
                                <div>Title</div>
                                <div>Released Date</div>
                                <div><Clock className='h-4 w-4' /></div>
                            </div>


                        </div>

                        {/* Songs List */}
                        <div className="px-6">
                            <div className="space-y-2 py-4">
                                {sortedSongs?.map((song, index) => {
                                    const isCurrentSong = currentSong?._id === song._id
                                    return (
                                        <div key={song._id}
                                            onClick={() => handlePlaySong(index)}
                                            className={`grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm 
                                        text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer`}>
                                            <div className="flex items-center justify-center">
                                                {isPlaying && isCurrentSong ? (
                                                    <div className="size-4 flex items-center justify-center">
                                                        <img src="/music.gif" alt="" className="filter invert"/>
                                                    </div>
                                                ) : (
                                                    <span className="group-hover:hidden">{index + 1}</span>
                                                )}
                                                {!isCurrentSong && (
                                                    <Play className='h-4 w-4 text-lg hidden group-hover:block text-blue-600' />
                                                )}
                                                {isCurrentSong && !isPlaying ? (
                                                    <div className="hidden group-hover:block">
                                                        <Music className="size-4 text-blue-600 animate-ping"/>
                                                    </div>
                                                ) : (
                                                    <div></div>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <img src={song.imageUrl} alt={song.title}
                                                    className="size-10" />

                                                <div>
                                                    <div className={`font-medium text-white`}>{song.title}</div>
                                                    <div>{song.artist}</div>
                                                </div>


                                            </div>
                                            <div className="flex items-center" key={song._id}>{song.createdAt.split("T")[0]} </div>

                                            <div className="flex items-center ">{formatDuration(song.duration)}</div>

                                        </div>
                                    )
                                }
                                )}
                            </div>

                        </div>


                    </div>
                </div>

            </ScrollArea>

        </div>
    )
}

export default AlbumPage