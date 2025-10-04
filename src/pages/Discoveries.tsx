import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Beaker, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import discoveriesImage from "@/assets/daring-discoveries.png";

const Discoveries = () => {
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
                Daring Discoveries
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Your oxygen extraction experiments have succeeded! Now you have surplus carbon 
                and used equipment available for innovative applications.
              </p>
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <Beaker className="w-5 h-5 text-primary" />
                  Mission Objective
                </h3>
                <p className="text-muted-foreground">
                  Repurpose experimental equipment and extracted carbon from CO2 processing 
                  into valuable tools and materials that support continued scientific research on Mars.
                </p>
              </div>
            </div>
            
            <div className="relative rounded-lg overflow-hidden shadow-glow animate-fade-in">
              <img 
                src={discoveriesImage} 
                alt="Mars Laboratory"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-card border-border animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  Recyclable Elements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">EVA Waste:</strong> Extravehicular activity materials including cargo transfer bags made of Nomex, nylon, and polyester
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Filter Materials:</strong> Mesh instruments and filters used in oxygen extraction processes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Extracted Carbon:</strong> Surplus carbon material from CO2 processing experiments
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Lab Supplies:</strong> Resealable bags, nitrile gloves, and protective equipment from research activities
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Beaker className="w-5 h-5 text-primary" />
                  Potential Applications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Carbon Composites:</strong> Create reinforced materials using extracted carbon for structural repairs
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Filtration Systems:</strong> Repurpose mesh materials into new filters for air and water purification
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Storage Solutions:</strong> Transform EVA bags into durable containers for samples and equipment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Research Tools:</strong> Fabricate specialized instruments from recycled laboratory materials
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
                  <h4 className="font-bold text-foreground mb-2">Scientific Value</h4>
                  <p className="text-sm text-muted-foreground">
                    Prioritize applications that support ongoing research and future experiments
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">Material Properties</h4>
                  <p className="text-sm text-muted-foreground">
                    Consider the unique characteristics of carbon and specialty materials in design
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">Innovation Potential</h4>
                  <p className="text-sm text-muted-foreground">
                    Explore novel uses that could set precedents for future Mars missions
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

export default Discoveries;
