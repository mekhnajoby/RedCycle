import { useState, useEffect, useRef } from "react";
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
import { Link } from 'react-router-dom';

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
    reset,
    recoveredTotal,
    wastedTotal,
    processMaterials,
    updateMaterial,
    wastePool
  } = useWasteManagement();

  const wastePoolTotal = Object.values(wastePool || {}).reduce((s, v) => s + v, 0);

  const [heldItem, setHeldItem] = useState<string | null>(null);
    const modulePanelRef = useRef<HTMLDivElement | null>(null);
  const [ecoMode, setEcoMode] = useState<boolean>(true);
  const [ultraEco, setUltraEco] = useState<boolean>(false);

  const handleDragStart = (key: string) => {
    setHeldItem(key);
    // scroll the module panel into view so user can drop
    setTimeout(() => {
      try {
        modulePanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } catch (e) {
        // ignore
      }
    }, 80);
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

    // Calculate crew multiplier (affects resource consumption only)
    const crewCount = Object.values(assignedCrew).filter(v => v === currentModule).length;
    const crewMultiplier = 1 + crewCount * 0.25;

    const totalIn = staged.reduce((sum, s) => sum + s.kg, 0);
  // Eco and Ultra Eco multipliers (Ultra Eco reduces resource usage even more)
  const ecoEnergyMul = ultraEco ? 0.1 : ecoMode ? 0.3 : 1;
  const ecoWaterMul = ultraEco ? 0.1 : ecoMode ? 0.3 : 1;
  const energyCost = Math.max(1, Math.round(totalIn * (full ? 0.6 : 0.2) * (currentModule === 'recycle' ? 1.2 : 1) / crewMultiplier * ecoEnergyMul));
  const waterCost = Math.max(0, Math.round(totalIn * (full ? 0.08 : 0.02) / crewMultiplier * ecoWaterMul));
    const crewCost = Math.max(0.1, Math.round(totalIn * (full ? 0.04 : 0.01) / crewMultiplier));

    if (resources.energy < energyCost) {
      toast.error("Not enough energy!");
      return;
    }
    if (resources.crewHours < crewCost) {
      toast.error("Not enough crew hours!");
      return;
    }

    // consume resources
    consumeResources(energyCost, waterCost, crewCost);

  // delegate to processMaterials to compute recovered vs wasted and produce products
  const { recoveredKg, wastedKg, outputs } = processMaterials(currentModule || 'recycle', staged, full ? 'full' : 'quick', ecoMode);

    toast.success(`Processed: ${outputs.join(', ')} — Recovered ${recoveredKg} kg, Wasted ${wastedKg} kg`);
  };

  const handleReset = () => {
    if (confirm('Reset the entire session? This cannot be undone.')) {
      reset();
      toast.info('Session reset');
    }
  };

  // Ensure we start at the top when navigating to this route
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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
            <div className="ml-auto flex items-center gap-3">
              <Button asChild variant="ghost" size="sm">
                <Link to="/">Home</Link>
              </Button>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={ecoMode} onChange={e => { setEcoMode(e.target.checked); if (!e.target.checked) setUltraEco(false); }} />
                Eco Mode
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={ultraEco} onChange={e => { setUltraEco(e.target.checked); if (e.target.checked) setEcoMode(true); }} />
                Ultra Eco
              </label>
            </div>
          </div>
          <div className="mt-4">
            <ResourceHUD resources={{ ...resources, recoveredTotal, wastedTotal, wastePoolTotal } as any} missionDay={missionDay} ecoMode={ecoMode} ultraEco={ultraEco} />
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
            <div className="bg-card/30 backdrop-blur-sm border border-border rounded-xl overflow-hidden" style={{ height: '520px' }}>
              {/* Build locations from inventory (map inventory keys to types and sample coords) */}
              {(() => {
                const mapping: Record<string, { type: string; lat: number; lon: number }> = {
                  'foam_pack': { type: 'foam', lat: 18.5, lon: 77.5 },
                  'polycomposite': { type: 'aluminum', lat: 18.3, lon: 77.8 },
                  'textiles': { type: 'textiles', lat: 18.7, lon: 77.3 },
                  'carbon_residue': { type: 'carbon', lat: 18.4, lon: 77.6 },
                  'aluminum_struts': { type: 'aluminum', lat: 18.31, lon: 77.75 },
                  'bubble_wrap': { type: 'foam', lat: 18.52, lon: 77.6 }
                };

                const locations = Object.entries(inventory).map(([k, v]) => {
                  const m = mapping[k];
                  if (!m) return null;
                  return { lat: m.lat, lon: m.lon, type: m.type, amount: v.kg };
                }).filter(Boolean) as Array<{ lat: number; lon: number; type: string; amount: number }>;

                return <Mars3DMap locations={locations} onEditLocation={(type, index) => {
                  const map: Record<string,string[]> = {
                    foam: ['foam'],
                    aluminum: ['aluminum','polycomposite'],
                    textiles: ['textiles','eva','fabric'],
                    carbon: ['carbon','carbon_residue']
                  };
                  const keys = Object.keys(inventory).filter(k => (map[type] || []).some(s => k.toLowerCase().includes(s)));
                  const key = keys[index] || keys[0] || Object.keys(inventory)[0];
                  const currentKg = inventory[key]?.kg || 0;
                  const input = prompt(`Edit amount for ${inventory[key]?.name || key} (kg):`, String(currentKg));
                  if (!input) return;
                  const parsed = parseInt(input);
                  if (isNaN(parsed)) return alert('Invalid number');
                  updateMaterial(key, parsed);
                }} />;
              })()}
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
            <div ref={modulePanelRef}>
              <ModulePanel
                currentModule={currentModule}
                inventory={inventory}
                heldItem={heldItem}
                onProcess={handleProcess}
              />
            </div>
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
