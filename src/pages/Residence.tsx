import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Layers, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import residenceImage from "@/assets/residence-renovation.png";
import ScenarioDetail from '@/components/ScenarioDetail';

const Residence = () => {
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
                Residence Renovations
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Your crew has landed on Mars and inflated the habitat. Now the aluminum cube frame 
                and foam packaging materials are available for innovative reuse.
              </p>
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <Layers className="w-5 h-5 text-primary" />
                  Mission Objective
                </h3>
                <p className="text-muted-foreground">
                  Transform structural elements and packaging materials from habitat setup into 
                  functional items that support daily operations and enhance the living environment 
                  on Mars.
                </p>
              </div>
            </div>
            
            <div className="relative rounded-lg overflow-hidden shadow-glow animate-fade-in">
              <img 
                src={residenceImage} 
                alt="Mars Habitat"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <ScenarioDetail
            title="Step-by-step Reuse Plan"
            steps={[
              { title: 'Survey & Sort', details: 'Inventory aluminum struts, foam, and composites; tag damaged vs reusable pieces.' },
              { title: 'Disassemble', details: 'Remove fasteners and separate aluminum from composite joints for safe reworking.' },
              { title: 'Process Foam', details: 'Shred foam, compress into insulation blocks in the foam module using low energy runs.' },
              { title: 'Repurpose Frames', details: 'Cut and re-bend aluminum struts into shelving and mounts via the recycle module.' },
              { title: 'Finish & Test', details: 'Assemble shelving, attach mounts, and perform structural checks before deployment.' }
            ]}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-card border-border animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-primary" />
                  Recyclable Materials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Aluminum Structures:</strong> Lightweight frames and struts from habitat support system
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Polymer Composites:</strong> Carbon fiber and plastic resin materials from structural components
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Foam Packaging:</strong> Zotek F30 foam used for cushioning during transport
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Protective Materials:</strong> Bubble wrap and air cushion bags from equipment protection
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  Potential Applications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Shelving Systems:</strong> Repurpose aluminum struts into modular storage solutions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Insulation Panels:</strong> Transform foam packaging into thermal insulation for equipment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Work Tables:</strong> Combine composites and aluminum into functional workstations
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Equipment Mounts:</strong> Create specialized holders and brackets for tools
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
                  <h4 className="font-bold text-foreground mb-2">Resource Efficiency</h4>
                  <p className="text-sm text-muted-foreground">
                    Maximize use of available materials while minimizing energy consumption and waste generation
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">Structural Integrity</h4>
                  <p className="text-sm text-muted-foreground">
                    Ensure repurposed items maintain safety standards for the pressurized habitat environment
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">Modularity</h4>
                  <p className="text-sm text-muted-foreground">
                    Design flexible systems that can be reconfigured as mission needs evolve over time
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

export default Residence;
