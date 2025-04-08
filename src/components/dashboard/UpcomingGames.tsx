
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { scrapeGameImages } from "@/services/scrapingService";
import ScrapedImage from "@/components/common/ScrapedImage";

type Game = {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  spread: string;
  predictionsCount: number;
};

interface GameWithImage extends Game {
  imageUrl?: string;
  imageAlt?: string;
}

interface UpcomingGamesProps {
  games: Game[];
}

const UpcomingGames = ({ games }: UpcomingGamesProps) => {
  const [gamesWithImages, setGamesWithImages] = useState<GameWithImage[]>([]);
  const [loadingImages, setLoadingImages] = useState(true);

  useEffect(() => {
    const fetchGameImages = async () => {
      setLoadingImages(true);
      
      try {
        // Create a copy of games to add images to
        const updatedGames: GameWithImage[] = [...games];
        
        // Process each game sequentially to avoid too many parallel requests
        for (let i = 0; i < updatedGames.length; i++) {
          const game = updatedGames[i];
          const images = await scrapeGameImages(game.homeTeam, game.awayTeam);
          
          if (images.length > 0) {
            updatedGames[i] = {
              ...game,
              imageUrl: images[0].url,
              imageAlt: images[0].alt
            };
          }
        }
        
        setGamesWithImages(updatedGames);
      } catch (error) {
        console.error("Error fetching game images:", error);
      } finally {
        setLoadingImages(false);
      }
    };
    
    if (games.length > 0) {
      fetchGameImages();
    }
  }, [games]);

  return (
    <Card className="border-highlight/20">
      <CardHeader className="bg-field-light rounded-t-lg">
        <CardTitle className="text-white">Upcoming Games</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {gamesWithImages.map((game) => (
            <div key={game.id} className="p-3 bg-muted rounded-md flex justify-between items-center">
              <div className="flex gap-3">
                <ScrapedImage 
                  src={game.imageUrl} 
                  alt={game.imageAlt} 
                  fallback={`${game.homeTeam[0]}${game.awayTeam[0]}`}
                  size="lg"
                  className="hidden sm:block"
                />
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">{game.awayTeam} @ {game.homeTeam}</span>
                    <span className="text-sm text-muted-foreground ml-2">Spread: {game.spread}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {game.date} • {game.time}
                  </div>
                  <div className="text-xs text-highlight mt-1">
                    {game.predictionsCount} predictions made
                  </div>
                </div>
              </div>
              <Link to={`/predictions/${game.id}`}>
                <Button variant="outline" className="border-highlight text-highlight hover:bg-field-light">
                  Predict
                </Button>
              </Link>
            </div>
          ))}
          {loadingImages && games.length !== gamesWithImages.length && (
            <div className="text-center p-4 text-muted-foreground">
              Loading game previews...
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingGames;
