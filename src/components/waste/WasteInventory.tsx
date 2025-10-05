import { WasteInventory } from "@/hooks/useWasteManagement";
import { Package } from "lucide-react";

interface WasteInventoryProps {
  inventory: WasteInventory;
  onDragStart: (key: string) => void;
}

export const WasteInventoryPanel = ({ inventory, onDragStart }: WasteInventoryProps) => {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-bold flex items-center gap-2">
        <Package className="w-5 h-5 text-primary" />
        Waste Inventory
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Drag items to modules for processing
      </p>
      
      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
        {Object.entries(inventory).map(([key, item]) => (
          <div
            key={key}
            draggable
            onDragStart={() => onDragStart(key)}
            onClick={() => onDragStart(key)}
            className="bg-card/30 border border-border rounded-lg p-3 hover:border-primary/50 transition-all cursor-grab active:cursor-grabbing"
          >
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <div className="font-semibold text-foreground">{item.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{key}</div>
              </div>
              <div className="bg-primary/10 border border-primary/30 rounded-lg px-3 py-2 hover:bg-primary/20 transition-colors">
                <div className="text-sm font-bold text-primary">{item.kg} kg</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
