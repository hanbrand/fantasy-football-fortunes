
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Player } from "@/services/mockData";
import { runDataPipeline } from "@/services/dataService";
import { Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const LiveStats = () => {
  const [playerData, setPlayerData] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await runDataPipeline();
      setPlayerData(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Failed to load live stats:", error);
      toast.error("Failed to load live stats");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      const data = await runDataPipeline();
      setPlayerData(data);
      setLastUpdated(new Date());
      toast.success("Stats refreshed successfully");
    } catch (error) {
      console.error("Failed to refresh stats:", error);
      toast.error("Failed to refresh stats");
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <Card className="border-highlight/20">
      <CardHeader className="bg-field-light rounded-t-lg">
        <div className="flex justify-between items-center">
          <CardTitle className="text-white">Live Player Stats</CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-highlight text-highlight hover:bg-field"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            {refreshing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {loading ? (
          <div className="flex justify-center items-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-highlight" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Player</TableHead>
                <TableHead>Pos</TableHead>
                <TableHead>Team</TableHead>
                <TableHead className="text-right">Projected</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {playerData.map((player) => (
                <TableRow key={player.id}>
                  <TableCell className="font-medium">{player.name}</TableCell>
                  <TableCell>{player.position}</TableCell>
                  <TableCell>{player.team}</TableCell>
                  <TableCell className="text-right">
                    <span className="font-mono text-highlight font-bold">
                      {player.stats.projectedPoints}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
      {lastUpdated && (
        <CardFooter className="bg-muted/20 py-2 px-4 text-xs text-muted-foreground">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </CardFooter>
      )}
    </Card>
  );
};

export default LiveStats;
