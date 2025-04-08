
// Mock data for Fantasy Football app
export interface Game {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  spread: string;
  predictionsCount: number;
}

export interface Player {
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
}

export interface Prediction {
  id: string;
  game: string;
  prediction: string;
  result: "correct" | "incorrect" | "pending";
  date: string;
}

export interface LeaderboardEntry {
  id: string;
  username: string;
  avatar: string;
  correctPredictions: number;
  totalPredictions: number;
  winStreak: number;
}

// Mock Upcoming Games
export const getUpcomingGames = (): Game[] => [
  {
    id: "game1",
    homeTeam: "Chiefs",
    awayTeam: "Ravens",
    date: "Sun, Oct 8",
    time: "8:20 PM ET",
    spread: "KC -3.5",
    predictionsCount: 1247
  },
  {
    id: "game2",
    homeTeam: "Cowboys",
    awayTeam: "49ers",
    date: "Mon, Oct 9",
    time: "7:15 PM ET",
    spread: "SF -1.5",
    predictionsCount: 982
  },
  {
    id: "game3",
    homeTeam: "Bills",
    awayTeam: "Bengals",
    date: "Sun, Oct 8",
    time: "1:00 PM ET",
    spread: "BUF -2.5",
    predictionsCount: 873
  },
  {
    id: "game4",
    homeTeam: "Eagles",
    awayTeam: "Rams",
    date: "Sun, Oct 8",
    time: "4:25 PM ET",
    spread: "PHI -4.0",
    predictionsCount: 741
  }
];

// Mock Top Players
export const getTopPlayers = (): Player[] => [
  {
    id: "player1",
    name: "Patrick Mahomes",
    position: "QB",
    team: "KC",
    stats: {
      passYards: 335,
      touchdowns: 3,
      projectedPoints: 24.6
    }
  },
  {
    id: "player2",
    name: "Christian McCaffrey",
    position: "RB",
    team: "SF",
    stats: {
      rushYards: 128,
      receivingYards: 42,
      touchdowns: 2,
      projectedPoints: 22.8
    }
  },
  {
    id: "player3",
    name: "Justin Jefferson",
    position: "WR",
    team: "MIN",
    stats: {
      receivingYards: 156,
      touchdowns: 1,
      projectedPoints: 19.7
    }
  }
];

// Mock User Predictions
export const getUserPredictions = (): Prediction[] => [
  {
    id: "pred1",
    game: "Bills vs. Jets",
    prediction: "Bills -3.5",
    result: "correct",
    date: "Oct 2"
  },
  {
    id: "pred2",
    game: "Packers vs. Lions",
    prediction: "Over 47.5",
    result: "incorrect",
    date: "Oct 1"
  },
  {
    id: "pred3",
    game: "Chiefs vs. Ravens",
    prediction: "Chiefs ML",
    result: "pending",
    date: "Oct 8"
  },
  {
    id: "pred4",
    game: "Cowboys vs. 49ers",
    prediction: "49ers -1.5",
    result: "pending",
    date: "Oct 9"
  }
];

// Mock Leaderboard
export const getLeaderboard = (): LeaderboardEntry[] => [
  {
    id: "user1",
    username: "PredictionKing",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PredictionKing",
    correctPredictions: 87,
    totalPredictions: 112,
    winStreak: 5
  },
  {
    id: "user2",
    username: "FootballGuru",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=FootballGuru",
    correctPredictions: 79,
    totalPredictions: 105,
    winStreak: 3
  },
  {
    id: "user3",
    username: "SportsBettor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SportsBettor",
    correctPredictions: 73,
    totalPredictions: 98,
    winStreak: 0
  },
  {
    id: "user4",
    username: "GridironGambler",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=GridironGambler",
    correctPredictions: 67,
    totalPredictions: 94,
    winStreak: 2
  },
  {
    id: "user5",
    username: "NFLExpert",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NFLExpert",
    correctPredictions: 58,
    totalPredictions: 89,
    winStreak: 1
  }
];
