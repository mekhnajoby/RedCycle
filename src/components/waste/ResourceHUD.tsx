import { Resources } from "@/hooks/useWasteManagement";
import { Battery, Droplet, Users } from "lucide-react";

interface ResourceHUDProps {
  resources: Resources;
  missionDay: number;
}

export const ResourceHUD = ({ resources, missionDay }: ResourceHUDProps) => {
  return (
    <div className="flex gap-3 flex-wrap">
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg px-4 py-3 min-w-[100px]">
        <div className="flex items-center gap-2 mb-1">
          <Battery className="w-4 h-4 text-accent" />
          <span className="text-xs text-muted-foreground">Energy</span>
        </div>
        <div className="text-lg font-bold text-accent">{resources.energy} kWh</div>
      </div>
      
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg px-4 py-3 min-w-[100px]">
        <div className="flex items-center gap-2 mb-1">
          <Droplet className="w-4 h-4 text-accent" />
          <span className="text-xs text-muted-foreground">Water</span>
        </div>
        <div className="text-lg font-bold text-accent">{resources.water} L</div>
      </div>
      
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg px-4 py-3 min-w-[100px]">
        <div className="flex items-center gap-2 mb-1">
          <Users className="w-4 h-4 text-accent" />
          <span className="text-xs text-muted-foreground">Crew Hrs</span>
        </div>
        <div className="text-lg font-bold text-accent">{resources.crewHours} h</div>
      </div>
      
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg px-4 py-3 min-w-[100px]">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs text-muted-foreground">Mission Day</span>
        </div>
        <div className="text-lg font-bold text-foreground">{missionDay}</div>
      </div>
    </div>
  );
};
