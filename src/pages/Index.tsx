import Navigation from "@/components/Navigation";
import Mars3D from "@/components/Mars3D";
import ScenarioCard from "@/components/ScenarioCard";
import { Button } from "@/components/ui/button";
import { Sparkles, Recycle, Rocket } from "lucide-react";
import residenceImage from "@/assets/residence-renovation.png";
import celebrationsImage from "@/assets/cosmic-celebrations.png";
import discoveriesImage from "@/assets/daring-discoveries.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 opacity-60">
          <Mars3D />
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
              <Button size="lg" variant="secondary" className="text-lg px-8">
                <Recycle className="mr-2 w-5 h-5" />
                Learn More
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
      <section className="py-20 bg-card relative">
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
      
      {/* Scenario Modules */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Mission Scenarios
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore three critical waste management scenarios on Mars at Jezero Crater. 
              Each module addresses unique challenges in sustainable resource utilization.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <ScenarioCard
              title="Residence Renovations"
              description="Repurpose inflatable habitat structures, aluminum frames, and foam packaging into useful materials for Mars base expansion."
              image={residenceImage}
              link="/residence"
              delay={0}
            />
            
            <ScenarioCard
              title="Cosmic Celebrations"
              description="Transform everyday materials like clothing, wipes, and food packaging into creative party supplies for astronaut morale."
              image={celebrationsImage}
              link="/celebrations"
              delay={100}
            />
            
            <ScenarioCard
              title="Daring Discoveries"
              description="Reuse experimental equipment and extracted carbon from oxygen production to create valuable tools and materials."
              image={discoveriesImage}
              link="/discoveries"
              delay={200}
            />
          </div>
        </div>
      </section>
      
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
