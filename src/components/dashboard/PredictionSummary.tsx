
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

type Prediction = {
  id: string;
  game: string;
  prediction: string;
  result: "correct" | "incorrect" | "pending";
  date: string;
};

interface PredictionSummaryProps {
  predictions: Prediction[];
}

const PredictionSummary = ({ predictions }: PredictionSummaryProps) => {
  // Calculate stats
  const totalPredictions = predictions.length;
  const correctPredictions = predictions.filter(p => p.result === "correct").length;
  const accuracy = totalPredictions > 0 
    ? Math.round((correctPredictions / totalPredictions) * 100) 
    : 0;
  
  const pendingPredictions = predictions.filter(p => p.result === "pending");
  
  return (
    <Card className="border-highlight/20">
      <CardHeader className="bg-field-light rounded-t-lg">
        <CardTitle className="text-white">Your Predictions</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-muted p-3 rounded-md text-center">
            <div className="text-2xl font-bold text-white">{totalPredictions}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
          <div className="bg-muted p-3 rounded-md text-center">
            <div className="text-2xl font-bold text-highlight">{accuracy}%</div>
            <div className="text-xs text-muted-foreground">Accuracy</div>
          </div>
          <div className="bg-muted p-3 rounded-md text-center">
            <div className="text-2xl font-bold text-white">{pendingPredictions.length}</div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">Recent Predictions</h3>
          {predictions.slice(0, 3).map((prediction) => (
            <div key={prediction.id} className="prediction-item flex justify-between items-center">
              <div>
                <div className="text-white font-medium">{prediction.game}</div>
                <div className="text-sm text-muted-foreground">{prediction.prediction}</div>
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
      </CardContent>
    </Card>
  );
};

export default PredictionSummary;
