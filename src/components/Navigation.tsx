import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Rocket className="w-6 h-6 text-primary group-hover:animate-float" />
            <span className="text-xl font-bold bg-gradient-mars bg-clip-text text-transparent">
              RedCycle
            </span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button 
                variant={isActive("/") ? "default" : "ghost"}
                className="transition-all"
              >
                Home
              </Button>
            </Link>
            <Link to="/residence">
              <Button 
                variant={isActive("/residence") ? "default" : "ghost"}
                className="transition-all"
              >
                Residence
              </Button>
            </Link>
            <Link to="/celebrations">
              <Button 
                variant={isActive("/celebrations") ? "default" : "ghost"}
                className="transition-all"
              >
                Celebrations
              </Button>
            </Link>
            <Link to="/discoveries">
              <Button 
                variant={isActive("/discoveries") ? "default" : "ghost"}
                className="transition-all"
              >
                Discoveries
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
