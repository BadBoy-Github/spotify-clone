import { SignedOut, UserButton } from "@clerk/clerk-react"
import { LayoutDashboardIcon } from "lucide-react"
import { Link } from "react-router-dom"
import SignInAuthButtons from "./SignInAuthButtons"
import { useAuthStore } from "@/store/useAuthStore"
import { buttonVariants } from "./ui/button"
import { cn } from "@/lib/utils"

const TopBar = () => {
    const {isAdmin} = useAuthStore()
  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10">
        <div className="flex gap-2 items-center">
            <img src="/spotify.png" className="size-8" alt="Spotify logo"/>
            <div className="text-xl font-bold px-2">Panda Vibes</div>
        </div>
        <div className="flex items-center gap-4">
            {isAdmin && (
                <Link to={"/admin"} className={cn(buttonVariants({variant: "outline"}))}>
                    <LayoutDashboardIcon className="flex size-4 mr-2"/>
                   <div className="text-sm font-medium text-white">Admin Dashboard</div>
                </Link>
            )}


            <SignedOut>
                <SignInAuthButtons />
            </SignedOut>

            <UserButton />
        </div>
    </div>
  )
}

export default TopBar