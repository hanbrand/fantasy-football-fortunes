
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type Game = {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  spread: string;
  predictionsCount: number;
};

interface UpcomingGamesProps {
  games: Game[];
}

const UpcomingGames = ({ games }: UpcomingGamesProps) => {
  return (
    <Card className="border-highlight/20">
      <CardHeader className="bg-field-light rounded-t-lg">
        <CardTitle className="text-white">Upcoming Games</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {games.map((game) => (
            <div key={game.id} className="p-3 bg-muted rounded-md flex justify-between items-center">
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
              <Link to={`/predictions/${game.id}`}>
                <Button variant="outline" className="border-highlight text-highlight hover:bg-field-light">
                  Predict
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingGames;
