import { usePlayerStore } from "@/store/usePlayerStore"
import { useEffect, useRef } from "react"

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const previousSongRef = useRef<string | null>(null)

  const { currentSong, isPlaying, playNext } = usePlayerStore()

  // to handle play and pause logic
  useEffect(() => {
    if (isPlaying) audioRef.current?.play()
    else audioRef.current?.pause()
  }, [isPlaying])

  // to handle song ends
  useEffect(() => {
    const audio = audioRef.current

    const handleEnded = () => {
      playNext()
    }

    audio?.addEventListener("ended", handleEnded)

    return () => audio?.removeEventListener("ended", handleEnded)
  }, [playNext])

  // to handle song changes
  useEffect(() => {
    if(!audioRef.current || !currentSong) return

    const audio = audioRef?.current

    // check if this is a new song
    const isSongChange = previousSongRef.current !== currentSong.audioUrl
    if(isSongChange) {
      audio.src = currentSong.audioUrl
      // reset the playback
      audio.currentTime = 0

      previousSongRef.current = currentSong?.audioUrl
      if(isPlaying) audio.play()
    }
  },[currentSong, isPlaying])

  return (
    <audio ref={audioRef} />
  )
}

export default AudioPlayer