
import { Button } from "@/components/ui/button";
import { Trophy, Crown, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-field shadow-md py-3">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Trophy size={28} className="text-highlight" />
          <span className="text-xl font-bold text-white">Fantasy Football Predictor</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link to="/predictions">
            <Button variant="ghost" className="text-white hover:text-highlight hover:bg-field-light">
              Predictions
            </Button>
          </Link>
          <Link to="/leaderboard">
            <Button variant="ghost" className="text-white hover:text-highlight hover:bg-field-light">
              <Crown size={18} className="mr-1" />
              Leaderboard
            </Button>
          </Link>
          <Link to="/profile">
            <Button variant="outline" className="bg-field-light border-highlight text-white hover:bg-field">
              <UserCircle size={18} className="mr-1" />
              Profile
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
