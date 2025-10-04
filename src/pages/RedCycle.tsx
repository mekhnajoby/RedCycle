import { useState } from "react";
import { useWasteManagement } from "@/hooks/useWasteManagement";
import { ResourceHUD } from "@/components/waste/ResourceHUD";
import { WasteInventoryPanel } from "@/components/waste/WasteInventory";
import { ModuleGrid, modules } from "@/components/waste/ModuleGrid";
import { ModulePanel } from "@/components/waste/ModulePanel";
import { CrewPanel } from "@/components/waste/CrewPanel";
import { ProductShelf } from "@/components/waste/ProductShelf";
import { SmartAssistant } from "@/components/waste/SmartAssistant";
import Mars3DMap from "@/components/Mars3DMap";
import { Button } from "@/components/ui/button";
import { RotateCcw, Sparkles } from "lucide-react";
import { toast } from "sonner";

const RedCycle = () => {
  const {
    inventory,
    products,
    resources,
    assignedCrew,
    missionDay,
    currentModule,
    setCurrentModule,
    consumeMaterial,
    addProduct,
    consumeResources,
    assignCrew,
    reset
  } = useWasteManagement();

  const [heldItem, setHeldItem] = useState<string | null>(null);

  const handleDragStart = (key: string) => {
    setHeldItem(key);
  };

  const handleModuleClick = (moduleId: string) => {
    setCurrentModule(moduleId);
    toast.info(`Opened ${modules.find(m => m.id === moduleId)?.title}`);
  };

  const handleProcess = (staged: Array<{ key: string; kg: number }>, full: boolean) => {
    if (staged.length === 0) {
      toast.error("No materials staged");
      return;
    }

    // Calculate crew multiplier
    const crewCount = Object.values(assignedCrew).filter(v => v === currentModule).length;
    const crewMultiplier = 1 + crewCount * 0.25;

    const totalIn = staged.reduce((sum, s) => sum + s.kg, 0);
    const energyCost = Math.max(1, Math.round(totalIn * (full ? 0.6 : 0.2) * (currentModule === 'recycle' ? 1.2 : 1) / crewMultiplier));
    const waterCost = Math.max(0, Math.round(totalIn * (full ? 0.08 : 0.02) / crewMultiplier));
    const crewCost = Math.max(0.1, Math.round(totalIn * (full ? 0.04 : 0.01) / crewMultiplier));

    if (resources.energy < energyCost) {
      toast.error("Not enough energy!");
      return;
    }
    if (resources.crewHours < crewCost) {
      toast.error("Not enough crew hours!");
      return;
    }

    // Consume materials
    staged.forEach(s => consumeMaterial(s.key, s.kg));
    consumeResources(energyCost, waterCost, crewCost);

    // Produce outputs
    const outputs: string[] = [];
    if (currentModule === 'foam') {
      const blocks = Math.round(totalIn * 0.85);
      addProduct('Insulation Blocks', blocks);
      outputs.push(`${blocks} kg insulation`);
    } else if (currentModule === 'habitat') {
      const batting = Math.round(totalIn * 0.6);
      addProduct('Insulation Batting', batting);
      outputs.push(`${batting} kg batting`);
    } else if (currentModule === 'recycle') {
      const frames = Math.round(totalIn * 0.75);
      addProduct('Reworked Frames', frames);
      outputs.push(`${frames} kg frames`);
    } else if (currentModule === 'lab') {
      const filament = Math.round(totalIn * 0.65);
      addProduct('Carbon Filament', filament);
      outputs.push(`${filament} kg filament`);
    } else if (currentModule === 'party') {
      const decor = Math.round(totalIn * 0.7);
      addProduct('Decor Elements', decor);
      outputs.push(`${decor} kg decor`);
    } else if (currentModule === 'storage') {
      const cont = Math.round(totalIn * 0.8);
      addProduct('Storage Containers', cont);
      outputs.push(`${cont} kg containers`);
    }

    toast.success(`Processed: ${outputs.join(', ')}`);
  };

  const handleReset = () => {
    if (confirm('Reset the entire session? This cannot be undone.')) {
      reset();
      toast.info('Session reset');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-mars flex items-center justify-center font-bold text-white text-lg">
                RC
              </div>
              <div>
                <h1 className="text-xl font-bold">RedCycle — Martian Circular Habitat System</h1>
                <p className="text-sm text-muted-foreground">
                  Interactive waste management for Jezero Crater missions
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <ResourceHUD resources={resources} missionDay={missionDay} />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-card/30 backdrop-blur-sm border border-border rounded-xl p-4">
              <WasteInventoryPanel inventory={inventory} onDragStart={handleDragStart} />
            </div>

            <div className="bg-card/30 backdrop-blur-sm border border-border rounded-xl p-4">
              <CrewPanel
                assignedCrew={assignedCrew}
                currentModule={currentModule}
                onAssign={assignCrew}
              />
            </div>

            <SmartAssistant inventory={inventory} />

            <div className="flex gap-2">
              <Button onClick={handleReset} variant="outline" size="sm" className="flex-1">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>

            <div className="bg-card/30 backdrop-blur-sm border border-border rounded-xl p-4">
              <ProductShelf products={products} />
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-6">
            {/* 3D Mars Map */}
            <div className="bg-card/30 backdrop-blur-sm border border-border rounded-xl overflow-hidden" style={{ height: '400px' }}>
              <Mars3DMap />
            </div>

            {/* Modules */}
            <div className="bg-card/30 backdrop-blur-sm border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Jezero Base — Processing Modules</h2>
                <p className="text-sm text-muted-foreground">Click any module to open its workbench</p>
              </div>
              <ModuleGrid onModuleClick={handleModuleClick} currentModule={currentModule} />
            </div>

            {/* Module Panel */}
            <ModulePanel
              currentModule={currentModule}
              inventory={inventory}
              heldItem={heldItem}
              onProcess={handleProcess}
            />
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border mt-12">
        RedCycle — Conceptual tool for in-situ Martian recycling. Prototype UI for education and mission planning.
      </footer>
    </div>
  );
};

export default RedCycle;
