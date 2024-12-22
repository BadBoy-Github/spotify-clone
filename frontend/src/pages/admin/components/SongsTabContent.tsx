
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Music } from "lucide-react"
import SongsTable from "./SongsTable"
import AddSongDialogue from "./AddSongDialogue"

const SongsTabContent = () => {
  return (
    <Card className='bg-zinc-800/50 border-zinc-700/50'>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className='flex items-center gap-2'>
              <Music className='size-8 text-blue-500 bg-blue-500/10 p-2 rounded-lg' />
              Songs Library
            </CardTitle>
            <CardDescription>
              Manage your music tracks
            </CardDescription>
          </div>
          <AddSongDialogue />
        </div>
      </CardHeader>
      <CardContent>
        <SongsTable />
      </CardContent>
    </Card>
  )
}

export default SongsTabContent