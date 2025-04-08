
import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, RefreshCw, TrendingUp, MessageSquare, ExternalLink } from "lucide-react";
import { enrichDataWithScrapedSources } from "@/services/scrapingService";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface ScrapedArticle {
  id: string;
  title: string;
  source: string;
  summary: string;
  url: string;
  publishedAt: string;
  relevance: number;
}

const NewsScrapingPanel = () => {
  const [query, setQuery] = useState("NFL");
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState<ScrapedArticle[]>([]);
  const [sentiment, setSentiment] = useState<{ score: number; count: number; trending: boolean } | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (refreshQuery?: string) => {
    try {
      setLoading(true);
      const targetQuery = refreshQuery || query;
      
      if (!targetQuery.trim()) {
        toast.error("Please enter a search term");
        setLoading(false);
        return;
      }
      
      const data = await enrichDataWithScrapedSources(targetQuery);
      
      setNews(data.news);
      setSentiment(data.sentiment);
      setLastUpdated(data.lastUpdated);
      
      if (refreshQuery) {
        setQuery(refreshQuery);
        toast.success(`Data updated for "${refreshQuery}"`);
      }
    } catch (error) {
      console.error("Error fetching scraped data:", error);
      toast.error("Failed to retrieve data");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData();
  };

  // Format relative time (e.g., "2 hours ago")
  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  // Get color for sentiment score
  const getSentimentColor = (score: number) => {
    if (score >= 0.7) return "text-green-500";
    if (score >= 0.4) return "text-yellow-500";
    return "text-red-500";
  };

  // Predefined search suggestions
  const searchSuggestions = [
    "Patrick Mahomes", 
    "Chiefs", 
    "49ers", 
    "Justin Jefferson",
    "Fantasy Football"
  ];

  return (
    <Card className="border-highlight/20">
      <CardHeader className="bg-field-light rounded-t-lg">
        <div className="flex justify-between items-center">
          <CardTitle className="text-white">Live News Scraper</CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-highlight text-highlight hover:bg-field"
            onClick={() => fetchData(query)}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Scraping
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
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a player, team, or topic..."
              className="flex-1"
              disabled={loading}
            />
            <Button 
              type="submit"
              disabled={loading || !query.trim()} 
              className="bg-highlight text-black hover:bg-highlight/90"
            >
              Search
            </Button>
          </div>
        </form>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {searchSuggestions.map((suggestion) => (
            <Badge 
              key={suggestion}
              variant="outline" 
              className="cursor-pointer hover:bg-muted"
              onClick={() => fetchData(suggestion)}
            >
              {suggestion}
            </Badge>
          ))}
        </div>
        
        {sentiment && (
          <div className="bg-field-light/20 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-white">Social Media Sentiment</h3>
              {sentiment.trending && (
                <Badge variant="outline" className="bg-highlight/20 text-highlight border-highlight">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Trending
                </Badge>
              )}
            </div>
            <div className="flex justify-between items-center">
              <div>
                <span className={`text-xl font-bold ${getSentimentColor(sentiment.score)}`}>
                  {(sentiment.score * 100).toFixed(0)}%
                </span>
                <span className="text-xs text-muted-foreground ml-2">positive sentiment</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MessageSquare className="h-3 w-3 mr-1" />
                {sentiment.count.toLocaleString()} mentions
              </div>
            </div>
          </div>
        )}
        
        <h3 className="font-semibold text-white mb-3">
          {loading ? "Retrieving latest news..." : `Latest News for "${query}"`}
        </h3>
        
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-md p-3">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/4 mb-3" />
                <Skeleton className="h-3 w-full mb-1" />
                <Skeleton className="h-3 w-full mb-1" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            ))}
          </div>
        ) : news.length > 0 ? (
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
            {news.map((article) => (
              <div key={article.id} className="border rounded-md p-3 hover:bg-muted/10 transition-colors">
                <h4 className="font-medium text-white mb-1">{article.title}</h4>
                <div className="flex items-center text-xs text-muted-foreground mb-2">
                  <span className="font-medium text-highlight">{article.source}</span>
                  <span className="mx-2">•</span>
                  <span>{getRelativeTime(article.publishedAt)}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{article.summary}</p>
                <a 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs inline-flex items-center text-highlight hover:underline"
                >
                  Read full article <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No news articles found. Try a different search term.
          </div>
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

export default NewsScrapingPanel;
