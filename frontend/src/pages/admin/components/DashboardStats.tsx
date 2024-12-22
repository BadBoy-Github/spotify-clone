import { useMusicStore } from "@/store/useMusicStore"
import { Library, ListMusic, PlayCircle, Users2 } from "lucide-react";
import StatsCard from "./StatsCard";

const DashboardStats = () => {
  const { stats } = useMusicStore()

  const statsData = [
    {
      icon: ListMusic,
      label: "Total Songs",
      value: stats.totalSongs.toString(),
      bgColor: "bg-blue-500/10",
      iconColor: "text-blue-500",
    },
    {
      icon: Library,
      label: "Total Albums",
      value: stats.totalAlbums.toString(),
      bgColor: "bg-violet-500/10",
      iconColor: "text-violet-500",
    },
    {
      icon: Users2,
      label: "Total Artists",
      value: stats.totalArtists.toString(),
      bgColor: "bg-orange-500/10",
      iconColor: "text-orange-500",
    },
    {
      icon: PlayCircle,
      label: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      bgColor: "bg-sky-500/10",
      iconColor: "text-sky-500",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      {statsData.map((stats) => (
        <StatsCard 
        key={stats.label}
        icon={stats.icon} 
        label={stats.label} 
        value={stats.value} 
        bgColor={stats.bgColor} 
        iconColor={stats.iconColor}/>
      ))}
    </div>
  )
}

export default DashboardStats