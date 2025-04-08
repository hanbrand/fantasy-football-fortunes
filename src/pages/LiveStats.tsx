
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import LiveStats from "@/components/stats/LiveStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, LineChart, BarChart } from "lucide-react";

const LiveStatsPage = () => {
  const [activeTab, setActiveTab] = useState("stats");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-white mb-6">Live Player Statistics</h1>
        
        <Card className="border-highlight/20 mb-6">
          <CardHeader className="bg-field-light rounded-t-lg">
            <CardTitle className="text-white">Data Pipeline Stats</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-field-light p-4 rounded-lg">
                <p className="text-muted-foreground text-sm">Data Sources</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-2xl font-bold text-white">7</h3>
                  <Database className="h-5 w-5 text-highlight" />
                </div>
              </div>
              <div className="bg-field-light p-4 rounded-lg">
                <p className="text-muted-foreground text-sm">Processing Time</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-2xl font-bold text-white">3.2s</h3>
                  <LineChart className="h-5 w-5 text-highlight" />
                </div>
              </div>
              <div className="bg-field-light p-4 rounded-lg">
                <p className="text-muted-foreground text-sm">Model Accuracy</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-2xl font-bold text-white">92%</h3>
                  <BarChart className="h-5 w-5 text-highlight" />
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Our automated data pipeline collects real-time player statistics from multiple sources,
              processes the data through our machine learning model, and generates accurate predictions
              with minimal latency.
            </p>
          </CardContent>
        </Card>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="w-full bg-muted mb-4">
            <TabsTrigger value="stats" className="flex-1">All Players</TabsTrigger>
            <TabsTrigger value="qb" className="flex-1">Quarterbacks</TabsTrigger>
            <TabsTrigger value="rb" className="flex-1">Running Backs</TabsTrigger>
            <TabsTrigger value="wr" className="flex-1">Wide Receivers</TabsTrigger>
            <TabsTrigger value="te" className="flex-1">Tight Ends</TabsTrigger>
          </TabsList>
          
          <TabsContent value="stats" className="mt-0">
            <LiveStats />
          </TabsContent>
          <TabsContent value="qb" className="mt-0">
            <LiveStats />
          </TabsContent>
          <TabsContent value="rb" className="mt-0">
            <LiveStats />
          </TabsContent>
          <TabsContent value="wr" className="mt-0">
            <LiveStats />
          </TabsContent>
          <TabsContent value="te" className="mt-0">
            <LiveStats />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default LiveStatsPage;
