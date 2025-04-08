
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { getUpcomingGames } from "@/services/mockData";
import { useState } from "react";
import { toast } from "sonner";

const Predictions = () => {
  const upcomingGames = getUpcomingGames();
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [predictionType, setPredictionType] = useState("spread");
  const [spreadPrediction, setSpreadPrediction] = useState<"home" | "away" | null>(null);
  const [overUnderValue, setOverUnderValue] = useState(47.5);
  const [overUnderPrediction, setOverUnderPrediction] = useState<"over" | "under" | null>(null);

  const selectedGame = upcomingGames.find(game => game.id === selectedGameId);

  const handleSubmitPrediction = () => {
    if (!selectedGame) {
      toast.error("Please select a game to predict");
      return;
    }

    if (predictionType === "spread" && !spreadPrediction) {
      toast.error("Please select a team to cover the spread");
      return;
    }

    if (predictionType === "overunder" && !overUnderPrediction) {
      toast.error("Please select over or under");
      return;
    }

    let predictionMessage = "";
    
    if (predictionType === "spread") {
      const team = spreadPrediction === "home" ? selectedGame.homeTeam : selectedGame.awayTeam;
      predictionMessage = `You predicted ${team} to cover the spread (${selectedGame.spread})`;
    } else {
      predictionMessage = `You predicted ${overUnderPrediction?.toUpperCase()} ${overUnderValue} points`;
    }

    toast.success(predictionMessage, {
      description: "Prediction successfully recorded!",
      duration: 5000,
    });

    // Reset form
    setSelectedGameId(null);
    setSpreadPrediction(null);
    setOverUnderPrediction(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-white mb-6">Make Your Predictions</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="border-highlight/20">
              <CardHeader className="bg-field-light rounded-t-lg">
                <CardTitle className="text-white">Select a Game</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {upcomingGames.map((game) => (
                    <div 
                      key={game.id} 
                      className={`p-3 rounded-md cursor-pointer transition-all duration-200 ${
                        selectedGameId === game.id 
                          ? "bg-field-light border-l-4 border-highlight" 
                          : "bg-muted hover:bg-field-light"
                      }`}
                      onClick={() => setSelectedGameId(game.id)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">{game.awayTeam} @ {game.homeTeam}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {game.date} • {game.time}
                      </div>
                      <div className="text-xs text-highlight mt-1">
                        Spread: {game.spread}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card className="border-highlight/20">
              <CardHeader className="bg-field-light rounded-t-lg">
                <CardTitle className="text-white">Make Your Prediction</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {!selectedGame ? (
                  <div className="text-center p-8">
                    <p className="text-muted-foreground">Select a game from the list to start your prediction</p>
                  </div>
                ) : (
                  <div>
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold text-white mb-2">
                        {selectedGame.awayTeam} @ {selectedGame.homeTeam}
                      </h2>
                      <p className="text-muted-foreground">
                        {selectedGame.date} • {selectedGame.time}
                      </p>
                    </div>
                    
                    <Tabs defaultValue="spread" onValueChange={(value) => setPredictionType(value)}>
                      <TabsList className="w-full bg-muted mb-4">
                        <TabsTrigger value="spread" className="flex-1">Spread</TabsTrigger>
                        <TabsTrigger value="overunder" className="flex-1">Over/Under</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="spread">
                        <div className="space-y-4 p-2">
                          <p className="text-sm text-muted-foreground mb-4">
                            Current Spread: <span className="text-white font-medium">{selectedGame.spread}</span>
                          </p>
                          
                          <RadioGroup 
                            value={spreadPrediction || ""} 
                            onValueChange={(value) => setSpreadPrediction(value as "home" | "away")}
                          >
                            <div className="flex items-center space-x-2 mb-3">
                              <RadioGroupItem value="away" id="away-team" />
                              <Label htmlFor="away-team" className="text-white">
                                {selectedGame.awayTeam} will cover the spread
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="home" id="home-team" />
                              <Label htmlFor="home-team" className="text-white">
                                {selectedGame.homeTeam} will cover the spread
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="overunder">
                        <div className="space-y-6 p-2">
                          <div>
                            <p className="text-sm text-muted-foreground mb-2">Total Points</p>
                            <div className="flex items-center gap-4">
                              <Slider
                                value={[overUnderValue]}
                                min={30}
                                max={65}
                                step={0.5}
                                onValueChange={(value) => setOverUnderValue(value[0])}
                                className="flex-1"
                              />
                              <span className="text-white font-bold w-12 text-center">{overUnderValue}</span>
                            </div>
                          </div>
                          
                          <RadioGroup 
                            value={overUnderPrediction || ""} 
                            onValueChange={(value) => setOverUnderPrediction(value as "over" | "under")}
                          >
                            <div className="flex items-center space-x-2 mb-3">
                              <RadioGroupItem value="over" id="over" />
                              <Label htmlFor="over" className="text-white">
                                OVER {overUnderValue} total points
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="under" id="under" />
                              <Label htmlFor="under" className="text-white">
                                UNDER {overUnderValue} total points
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </TabsContent>
                    </Tabs>
                    
                    <div className="mt-6 text-center">
                      <Button
                        className="bg-highlight text-black hover:bg-highlight/90 font-bold w-full sm:w-auto px-6"
                        onClick={handleSubmitPrediction}
                      >
                        Submit Prediction
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Predictions;
