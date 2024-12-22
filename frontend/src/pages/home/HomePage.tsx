import TopBar from "@/components/TopBar"
import { useMusicStore } from "@/store/useMusicStore"
import { useEffect, useState } from "react"
import FeaturedSection from "./components/FeaturedSection"
import { ScrollArea } from "@/components/ui/scroll-area"
import SectionGrid from "./components/SectionGrid"
import { usePlayerStore } from "@/store/usePlayerStore"

const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return "Good Morning"
  if (hour < 16) return "Good Afternoon"
  if (hour < 20) return "Good Evening"
  return "Good Night"
}

const HomePage = () => {
  const {
    fetchFeaturedSongs,
    fetchMadeForYouSongs,
    fetchTrendingSongs,
    isLoading,
    madeForYouSongs,
    trendingSongs,
    featuredSongs
  } = useMusicStore()

  const { initializeQueue } = usePlayerStore()
  const [greeting] = useState(getGreeting())

  useEffect(() => {
    fetchFeaturedSongs()
    fetchTrendingSongs()
    fetchMadeForYouSongs()
  }, [fetchFeaturedSongs, fetchTrendingSongs, fetchMadeForYouSongs])

  useEffect(() => {
    if (madeForYouSongs.length > 0 && featuredSongs.length > 0 && trendingSongs.length > 0) {
      const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs]
      initializeQueue(allSongs)
    }
  }, [initializeQueue, madeForYouSongs, trendingSongs, featuredSongs])

  return (
    <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
      <TopBar />
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">
            ✌️ {greeting}
          </h1>
          <FeaturedSection />

          <div className="space-y-8">
            <SectionGrid title="Made For You" songs={madeForYouSongs} isLoading={isLoading} />
            <SectionGrid title="Trending" songs={trendingSongs} isLoading={isLoading} />
          </div>
        </div>
      </ScrollArea>
    </main>
  )
}

export default HomePage