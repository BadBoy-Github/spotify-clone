
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Album } from "lucide-react";
import AlbumTable from "./AlbumTable";
import AddAlbumDialogue from "./AddAlbumDialogue";


const AlbumsTabContent = () => {
  return (
    <Card className='bg-zinc-800/50 border-zinc-700/50'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='flex items-center gap-2'>
              <Album className='size-8 text-violet-500 bg-violet-500/10 p-2 rounded-lg' />
              Albums Library
            </CardTitle>
            <CardDescription>Manage your album collection</CardDescription>
          </div>
          <AddAlbumDialogue />
        </div>
      </CardHeader>

      <CardContent>
        <AlbumTable />
      </CardContent>

     
    </Card>
  );
};
export default AlbumsTabContent;