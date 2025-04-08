
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { getTopPlayers } from "@/services/mockData";
import { scrapeImages } from "@/services/scrapingService";
import ScrapedImage from "@/components/common/ScrapedImage";

interface PlayerWithImage {
  id: string;
  name: string;
  position: string;
  team: string;
  imageUrl?: string;
  imageAlt?: string;
  stats: {
    passYards?: number;
    rushYards?: number;
    receivingYards?: number;
    touchdowns?: number;
    projectedPoints: number;
  };
}

const LiveStats = () => {
  const [players, setPlayers] = useState<PlayerWithImage[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchPlayersWithImages = async () => {
      setLoading(true);
      
      try {
        // Get player data
        const playerData = getTopPlayers();
        const playersWithImages: PlayerWithImage[] = [...playerData];
        
        // Fetch images for each player
        for (let i = 0; i < playersWithImages.length; i++) {
          const player = playersWithImages[i];
          const images = await scrapeImages(player.name, { type: 'player', limit: 1 });
          
          if (images.length > 0) {
            playersWithImages[i] = {
              ...player,
              imageUrl: images[0].url,
              imageAlt: images[0].alt
            };
          }
        }
        
        setPlayers(playersWithImages);
      } catch (error) {
        console.error("Error fetching player images:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPlayersWithImages();
  }, []);
  
  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }
  
  return (
    <div className="rounded-lg border border-highlight/20 overflow-hidden">
      <Table>
        <TableHeader className="bg-field-light">
          <TableRow>
            <TableHead className="text-white w-[50px]">#</TableHead>
            <TableHead className="text-white">Player</TableHead>
            <TableHead className="text-white">Position</TableHead>
            <TableHead className="text-white">Team</TableHead>
            <TableHead className="text-white">Stats</TableHead>
            <TableHead className="text-white text-right">Projected</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((player, index) => (
            <TableRow key={player.id} className="hover:bg-field-light/10">
              <TableCell className="font-medium text-white">{index + 1}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <ScrapedImage 
                    src={player.imageUrl} 
                    alt={player.imageAlt || player.name}
                    size="sm"
                    shape="circle"
                  />
                  <span className="font-semibold text-white">{player.name}</span>
                </div>
              </TableCell>
              <TableCell>{player.position}</TableCell>
              <TableCell>{player.team}</TableCell>
              <TableCell>
                <div className="text-sm">
                  {player.stats.passYards !== undefined && (
                    <span className="mr-2">Pass: {player.stats.passYards} yds</span>
                  )}
                  {player.stats.rushYards !== undefined && (
                    <span className="mr-2">Rush: {player.stats.rushYards} yds</span>
                  )}
                  {player.stats.receivingYards !== undefined && (
                    <span className="mr-2">Rec: {player.stats.receivingYards} yds</span>
                  )}
                  {player.stats.touchdowns !== undefined && (
                    <span>TD: {player.stats.touchdowns}</span>
                  )}
                </div>
                <Progress value={80} className="h-1 mt-2" />
              </TableCell>
              <TableCell className="text-right">
                <span className="font-bold text-highlight">
                  {player.stats.projectedPoints.toFixed(1)}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LiveStats;
