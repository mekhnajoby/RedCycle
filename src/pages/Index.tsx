import Navigation from "@/components/Navigation";
// Mars3D replaced with external NASA Eyes iframe
import { Button } from "@/components/ui/button";
import { Sparkles, Recycle, Rocket } from "lucide-react";
// ...existing code...

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 opacity-100">
          <iframe
            src="https://eyes.nasa.gov/apps/solar-system/#/mars"
            title="NASA Eyes - Mars"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-mars bg-clip-text text-transparent">
              Mars Waste Recycling Initiative
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Pioneering sustainable solutions for waste management on the Red Planet. 
              Building a circular economy for humanity's future on Mars.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" className="text-lg px-8 animate-glow-pulse" asChild>
                <a href="/redcycle">
                  <Rocket className="mr-2 w-5 h-5" />
                  Launch RedCycle
                </a>
              </Button>
              <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
                <a href="#the-challenge">
                  <Recycle className="mr-2 w-5 h-5" />
                  Learn More
                </a>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </section>
      
  {/* Mission Overview */}
  <section id="the-challenge" className="py-20 bg-card relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              The Challenge
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              On Mars, millions of miles from Earth, waste management becomes critical. 
              Space explorers need sanitation facilities and recycling plants to process waste 
              and keep new worlds clean. Unlike the International Space Station, Mars missions 
              cannot return waste to Earth for processing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-background rounded-lg border border-border hover:border-primary transition-all">
              <div className="w-16 h-16 bg-gradient-mars rounded-full flex items-center justify-center mx-auto mb-4">
                <Recycle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Sustainable Systems</h3>
              <p className="text-muted-foreground">
                Develop innovative recycling systems for Mars habitat operations
              </p>
            </div>
            
            <div className="text-center p-6 bg-background rounded-lg border border-border hover:border-primary transition-all">
              <div className="w-16 h-16 bg-gradient-mars rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Circular Economy</h3>
              <p className="text-muted-foreground">
                Maximize resource recovery and minimize waste generation
              </p>
            </div>
            
            <div className="text-center p-6 bg-background rounded-lg border border-border hover:border-primary transition-all">
              <div className="w-16 h-16 bg-gradient-mars rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Mission Ready</h3>
              <p className="text-muted-foreground">
                Prepare for long-duration missions to the Red Planet
              </p>
            </div>
          </div>
        </div>
      </section>
      
  {/* Mission Scenarios removed per request */}
      
      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            Mars Waste Recycling Initiative • Jezero Crater Mission
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Building a sustainable future for humanity among the stars
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
