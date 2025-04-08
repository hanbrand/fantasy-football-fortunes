
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type Player = {
  id: string;
  name: string;
  position: string;
  team: string;
  stats: {
    passYards?: number;
    rushYards?: number;
    receivingYards?: number;
    touchdowns?: number;
    projectedPoints: number;
  };
};

interface PlayerStatsProps {
  players: Player[];
}

const PlayerStats = ({ players }: PlayerStatsProps) => {
  return (
    <Card className="border-highlight/20">
      <CardHeader className="bg-field-light rounded-t-lg">
        <CardTitle className="text-white">Top Player Projections</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {players.map((player) => (
            <div key={player.id} className="p-3 bg-muted rounded-md">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="font-semibold text-white">{player.name}</span>
                  <div className="text-xs text-muted-foreground">
                    {player.position} • {player.team}
                  </div>
                </div>
                <span className="text-highlight font-semibold">
                  {player.stats.projectedPoints} pts
                </span>
              </div>
              
              <div className="mt-2">
                <Progress 
                  value={player.stats.projectedPoints * 5} 
                  className="h-2 bg-field-light" 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                {player.stats.passYards !== undefined && (
                  <div className="text-muted-foreground">
                    Pass: <span className="text-white">{player.stats.passYards} yds</span>
                  </div>
                )}
                {player.stats.rushYards !== undefined && (
                  <div className="text-muted-foreground">
                    Rush: <span className="text-white">{player.stats.rushYards} yds</span>
                  </div>
                )}
                {player.stats.receivingYards !== undefined && (
                  <div className="text-muted-foreground">
                    Rec: <span className="text-white">{player.stats.receivingYards} yds</span>
                  </div>
                )}
                {player.stats.touchdowns !== undefined && (
                  <div className="text-muted-foreground">
                    TD: <span className="text-white">{player.stats.touchdowns}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerStats;
