
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getLeaderboard } from "@/services/mockData";
import { Trophy, Medal, Flame } from "lucide-react";

const Leaderboard = () => {
  const leaderboardData = getLeaderboard();
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Prediction Leaderboard</h1>
        </div>
        
        <Card className="border-highlight/20">
          <CardHeader className="bg-field-light rounded-t-lg flex flex-row items-center justify-between">
            <CardTitle className="text-white">Top Predictors</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              {leaderboardData.map((user, index) => {
                // Calculate accuracy percentage
                const accuracy = Math.round((user.correctPredictions / user.totalPredictions) * 100);
                
                return (
                  <div 
                    key={user.id} 
                    className={`p-4 rounded-md flex items-center justify-between ${
                      index === 0 
                        ? "bg-field-light border-l-4 border-highlight" 
                        : "bg-muted"
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="mr-4 text-xl font-bold text-highlight w-6 text-center">
                        {index === 0 ? (
                          <Trophy size={24} className="text-highlight" />
                        ) : index === 1 ? (
                          <Medal size={22} className="text-highlight/80" />
                        ) : index === 2 ? (
                          <Medal size={20} className="text-highlight/60" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={user.avatar} alt={user.username} />
                        <AvatarFallback className="bg-field-light text-white">
                          {user.username.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <div className="font-semibold text-white">{user.username}</div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          <span className="mr-2">
                            {user.correctPredictions} / {user.totalPredictions} correct
                          </span>
                          {user.winStreak > 2 && (
                            <Badge className="bg-field-light text-highlight text-xs px-2 py-0 h-5">
                              <Flame size={12} className="mr-1" /> {user.winStreak} streak
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-highlight">{accuracy}%</div>
                      <div className="text-xs text-muted-foreground">Accuracy</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Leaderboard;
