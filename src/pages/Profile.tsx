
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getUserPredictions } from "@/services/mockData";
import { Check, X, Trophy, ArrowUpRight } from "lucide-react";

const Profile = () => {
  const userPredictions = getUserPredictions();
  
  // Calculate stats
  const totalPredictions = userPredictions.length;
  const correctPredictions = userPredictions.filter(p => p.result === "correct").length;
  const incorrectPredictions = userPredictions.filter(p => p.result === "incorrect").length;
  const pendingPredictions = userPredictions.filter(p => p.result === "pending").length;
  
  const accuracy = totalPredictions > 0 
    ? Math.round((correctPredictions / (correctPredictions + incorrectPredictions)) * 100) 
    : 0;
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Card className="border-highlight/20">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start">
                <Avatar className="h-20 w-20 mb-4 sm:mb-0 sm:mr-6">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser" alt="Profile" />
                  <AvatarFallback className="bg-field-light text-white text-xl">
                    U
                  </AvatarFallback>
                </Avatar>
                
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl font-bold text-white mb-1">FootballFan123</h1>
                  <p className="text-muted-foreground mb-3">Member since October 2023</p>
                  
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <Badge className="bg-field-light text-highlight">
                      <Trophy size={14} className="mr-1" /> Rank: 34
                    </Badge>
                    {accuracy >= 70 && (
                      <Badge className="bg-field-light text-highlight">
                        Pro Predictor
                      </Badge>
                    )}
                    {correctPredictions >= 10 && (
                      <Badge className="bg-field-light text-highlight">
                        10+ Correct Picks
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="border-highlight/20">
            <CardHeader className="bg-field-light rounded-t-lg">
              <CardTitle className="text-white">Stats Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Accuracy</span>
                    <span className="text-sm font-medium text-highlight">{accuracy}%</span>
                  </div>
                  <Progress value={accuracy} className="h-2 bg-field-light" />
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-muted p-3 rounded-md">
                    <div className="text-lg font-bold text-white">{correctPredictions}</div>
                    <div className="text-xs text-muted-foreground">Correct</div>
                  </div>
                  <div className="bg-muted p-3 rounded-md">
                    <div className="text-lg font-bold text-white">{incorrectPredictions}</div>
                    <div className="text-xs text-muted-foreground">Incorrect</div>
                  </div>
                  <div className="bg-muted p-3 rounded-md">
                    <div className="text-lg font-bold text-white">{pendingPredictions}</div>
                    <div className="text-xs text-muted-foreground">Pending</div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Best Categories</h3>
                  <div className="space-y-2">
                    <div className="bg-muted p-2 rounded-md flex justify-between">
                      <span className="text-sm text-white">Spread Predictions</span>
                      <span className="text-sm text-highlight">76%</span>
                    </div>
                    <div className="bg-muted p-2 rounded-md flex justify-between">
                      <span className="text-sm text-white">Over/Under</span>
                      <span className="text-sm text-highlight">68%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="lg:col-span-2">
            <Card className="border-highlight/20">
              <CardHeader className="bg-field-light rounded-t-lg">
                <CardTitle className="text-white">Prediction History</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <Tabs defaultValue="all">
                  <TabsList className="w-full bg-muted mb-4">
                    <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                    <TabsTrigger value="correct" className="flex-1">Correct</TabsTrigger>
                    <TabsTrigger value="incorrect" className="flex-1">Incorrect</TabsTrigger>
                    <TabsTrigger value="pending" className="flex-1">Pending</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all">
                    <div className="space-y-3">
                      {userPredictions.map((prediction) => (
                        <div
                          key={prediction.id}
                          className="prediction-item flex justify-between items-center"
                        >
                          <div>
                            <div className="text-white font-medium">{prediction.game}</div>
                            <div className="text-sm text-muted-foreground flex items-center">
                              {prediction.prediction}
                              <span className="mx-2">•</span>
                              {prediction.date}
                            </div>
                          </div>
                          <div className="flex items-center">
                            {prediction.result === "pending" ? (
                              <Badge variant="outline" className="bg-muted-foreground/20 text-white">
                                Pending
                              </Badge>
                            ) : prediction.result === "correct" ? (
                              <Badge className="bg-green-600 hover:bg-green-700">
                                <Check size={14} className="mr-1" /> Correct
                              </Badge>
                            ) : (
                              <Badge className="bg-destructive hover:bg-destructive/90">
                                <X size={14} className="mr-1" /> Incorrect
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="correct">
                    <div className="space-y-3">
                      {userPredictions
                        .filter(p => p.result === "correct")
                        .map((prediction) => (
                          <div
                            key={prediction.id}
                            className="prediction-item flex justify-between items-center"
                          >
                            <div>
                              <div className="text-white font-medium">{prediction.game}</div>
                              <div className="text-sm text-muted-foreground flex items-center">
                                {prediction.prediction}
                                <span className="mx-2">•</span>
                                {prediction.date}
                              </div>
                            </div>
                            <Badge className="bg-green-600 hover:bg-green-700">
                              <Check size={14} className="mr-1" /> Correct
                            </Badge>
                          </div>
                        ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="incorrect">
                    <div className="space-y-3">
                      {userPredictions
                        .filter(p => p.result === "incorrect")
                        .map((prediction) => (
                          <div
                            key={prediction.id}
                            className="prediction-item flex justify-between items-center"
                          >
                            <div>
                              <div className="text-white font-medium">{prediction.game}</div>
                              <div className="text-sm text-muted-foreground flex items-center">
                                {prediction.prediction}
                                <span className="mx-2">•</span>
                                {prediction.date}
                              </div>
                            </div>
                            <Badge className="bg-destructive hover:bg-destructive/90">
                              <X size={14} className="mr-1" /> Incorrect
                            </Badge>
                          </div>
                        ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="pending">
                    <div className="space-y-3">
                      {userPredictions
                        .filter(p => p.result === "pending")
                        .map((prediction) => (
                          <div
                            key={prediction.id}
                            className="prediction-item flex justify-between items-center"
                          >
                            <div>
                              <div className="text-white font-medium">{prediction.game}</div>
                              <div className="text-sm text-muted-foreground flex items-center">
                                {prediction.prediction}
                                <span className="mx-2">•</span>
                                {prediction.date}
                              </div>
                            </div>
                            <Badge variant="outline" className="bg-muted-foreground/20 text-white">
                              Pending
                            </Badge>
                          </div>
                        ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
