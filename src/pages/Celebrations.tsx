import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, PartyPopper, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import celebrationsImage from "@/assets/cosmic-celebrations.png";

const Celebrations = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <Link to="/">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="animate-fade-in">
              <h1 className="text-5xl font-bold mb-6 bg-gradient-mars bg-clip-text text-transparent">
                Cosmic Celebrations
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                An astronaut's birthday is approaching! Without traditional party supplies, 
                your crew must get creative with recycled materials from daily operations.
              </p>
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <PartyPopper className="w-5 h-5 text-primary" />
                  Mission Objective
                </h3>
                <p className="text-muted-foreground">
                  Transform everyday habitat materials into festive decorations and party supplies 
                  to celebrate this special occasion and boost crew morale during the long Mars mission.
                </p>
              </div>
            </div>
            
            <div className="relative rounded-lg overflow-hidden shadow-glow animate-fade-in">
              <img 
                src={celebrationsImage} 
                alt="Mars Celebration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-card border-border animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Available Materials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Fabric Items:</strong> Spare clothing, washcloths, and disinfectant wipes made from cotton, cellulose, nylon, or polyester
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Food Packaging:</strong> Plastic wrap, rehydratable pouches, and drink pouches from meal preparations
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Thermal Pouches:</strong> Materials like polyester, polyethylene, aluminum, and nylon from food storage
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Miscellaneous:</strong> Various packaging materials and wrappers from daily supplies
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PartyPopper className="w-5 h-5 text-primary" />
                  Creative Ideas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Banners & Streamers:</strong> Cut fabric and aluminum pouches into decorative strips and shapes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Party Hats:</strong> Fold and shape thermal pouches into festive cone hats
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Confetti:</strong> Punch holes in colored packaging materials for biodegradable celebration confetti
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Gift Wrap:</strong> Use food pouches as unique wrapping paper for small presents
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-card border-border animate-fade-in">
            <CardHeader>
              <CardTitle>Design Considerations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-bold text-foreground mb-2">Crew Morale</h4>
                  <p className="text-sm text-muted-foreground">
                    Celebrations are vital for psychological well-being during long-duration space missions
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">Safety First</h4>
                  <p className="text-sm text-muted-foreground">
                    Ensure decorations don't interfere with life support systems or create hazards
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">Easy Cleanup</h4>
                  <p className="text-sm text-muted-foreground">
                    Design items that can be quickly collected and returned to recycling after the event
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <footer className="py-12 bg-card border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            Mars Waste Recycling Initiative • Jezero Crater Mission
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Celebrations;
