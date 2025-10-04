import { WasteInventory } from "@/hooks/useWasteManagement";
import { modules } from "./ModuleGrid";
import { Lightbulb } from "lucide-react";

interface SmartAssistantProps {
  inventory: WasteInventory;
}

const moduleForMaterial = (key: string): string => {
  if (['foam_pack'].includes(key)) return 'foam';
  if (['aluminum_struts', 'polycomposite'].includes(key)) return 'recycle';
  if (['textiles', 'bubble_wrap'].includes(key)) return 'habitat';
  if (['carbon_residue'].includes(key)) return 'lab';
  return 'storage';
};

export const SmartAssistant = ({ inventory }: SmartAssistantProps) => {
  let suggestion = '';
  let largestKey = '';
  let largest = 0;

  Object.entries(inventory).forEach(([key, item]) => {
    if (item.kg > largest) {
      largest = item.kg;
      largestKey = key;
    }
  });

  if (largestKey && largest > 30) {
    const moduleId = moduleForMaterial(largestKey);
    const module = modules.find(m => m.id === moduleId);
    suggestion = `You have ${largest} kg of ${inventory[largestKey].name}. Consider processing it at the ${module?.title}.`;
  } else {
    suggestion = 'Maintain balanced processing. Try making decorations or converting carbon residue into filament.';
  }

  return (
    <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
      <h3 className="text-sm font-bold flex items-center gap-2 mb-2 text-accent">
        <Lightbulb className="w-4 h-4" />
        Smart Assistant
      </h3>
      <p className="text-sm text-foreground/90">{suggestion}</p>
    </div>
  );
};
