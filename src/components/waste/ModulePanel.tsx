import { useState } from "react";
import { Button } from "@/components/ui/button";
import { modules } from "./ModuleGrid";
import { WasteInventory } from "@/hooks/useWasteManagement";
import { AlertCircle, Zap } from "lucide-react";

interface StagedMaterial {
  key: string;
  kg: number;
}

interface ModulePanelProps {
  currentModule: string | null;
  inventory: WasteInventory;
  heldItem: string | null;
  onProcess: (staged: StagedMaterial[], quick: boolean) => void;
}

export const ModulePanel = ({ currentModule, inventory, heldItem, onProcess }: ModulePanelProps) => {
  const [staged, setStaged] = useState<StagedMaterial[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const module = modules.find(m => m.id === currentModule);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    if (!heldItem || !currentModule) return;
    
    const avail = inventory[heldItem]?.kg || 0;
    const take = Math.max(1, Math.min(avail, Math.round(avail * 0.2)));
    
    if (take <= 0) return;
    
    setStaged(prev => [...prev, { key: heldItem, kg: take }]);
  };

  const handleProcess = (quick: boolean) => {
    if (staged.length === 0) return;
    onProcess(staged, quick);
    setStaged([]);
  };

  if (!module) {
    return (
      <div className="bg-card/30 backdrop-blur-sm border border-border rounded-xl p-6">
        <h3 className="text-xl font-bold mb-2">Select a Module</h3>
        <p className="text-sm text-muted-foreground">
          Click a module from the grid above to open its workbench. Then drag inventory items here to start processing.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card/30 backdrop-blur-sm border border-primary/30 rounded-xl p-6 space-y-4">
      <div>
        <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
          {module.icon}
          {module.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-2">{module.desc}</p>
      </div>

      <div>
        <label className="text-sm font-semibold text-muted-foreground block mb-2">
          Drop Zone
        </label>
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`
            min-h-[220px] md:min-h-[260px] border-2 border-dashed rounded-lg p-4 transition-all
            flex justify-center text-center
            ${staged.length === 0 ? 'items-center' : 'items-start flex-col gap-3'}
            ${dragOver 
              ? 'border-primary bg-primary/10' 
              : 'border-border bg-background/50'
            }
          `}
        >
          {staged.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Drop materials here to process
            </p>
          ) : (
            <p className="text-sm text-muted-foreground w-full text-center">
              {`${staged.length} material(s) staged — drag more or process`}
            </p>
          )}
        </div>
      </div>

      {staged.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-semibold text-muted-foreground">Staged Materials</label>
          <div className="space-y-1">
            {staged.map((item, idx) => (
              <div key={idx} className="bg-background/50 rounded px-3 py-2 text-sm">
                <span className="text-foreground font-medium">{inventory[item.key]?.name}</span>
                <span className="text-muted-foreground ml-2">— {item.kg} kg</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {staged.length > 0 && (
        <div className="flex gap-2">
          <Button onClick={() => handleProcess(true)} className="flex-1">
            <Zap className="w-4 h-4 mr-2" />
            Full Process
          </Button>
          <Button onClick={() => handleProcess(false)} variant="secondary" className="flex-1">
            <AlertCircle className="w-4 h-4 mr-2" />
            Quick Process
          </Button>
        </div>
      )}
    </div>
  );
};
