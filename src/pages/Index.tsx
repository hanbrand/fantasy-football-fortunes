
import Navbar from "@/components/layout/Navbar";
import UpcomingGames from "@/components/dashboard/UpcomingGames";
import PlayerStats from "@/components/dashboard/PlayerStats";
import PredictionSummary from "@/components/dashboard/PredictionSummary";
import { getUpcomingGames, getTopPlayers, getUserPredictions } from "@/services/mockData";
import { Trophy } from "lucide-react";

const Index = () => {
  const upcomingGames = getUpcomingGames();
  const topPlayers = getTopPlayers();
  const userPredictions = getUserPredictions();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        <header className="mb-8 text-center">
          <div className="inline-block p-3 rounded-full bg-field-light mb-4">
            <Trophy size={32} className="text-highlight animate-pulse-light" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Fantasy Football Predictor</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Advanced ML-powered predictions for fantasy football using Python, scikit-learn, and real-time data processing.
          </p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <UpcomingGames games={upcomingGames} />
          </div>
          <div>
            <PredictionSummary predictions={userPredictions} />
          </div>
        </div>
        
        <div className="mt-6">
          <PlayerStats players={topPlayers} />
        </div>
      </main>
      
      <footer className="bg-field py-4 mt-10">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 Fantasy Football Predictor. All NFL team names and logos are registered trademarks of the NFL.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
