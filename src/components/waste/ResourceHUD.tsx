import { Resources } from "@/hooks/useWasteManagement";
import { Battery, Droplet, Users } from "lucide-react";

interface ResourceHUDProps {
  resources: Resources;
  missionDay: number;
  recoveredTotal?: number;
  wastedTotal?: number;
  ecoMode?: boolean;
  ultraEco?: boolean;
}

export const ResourceHUD = ({ resources, missionDay, ecoMode, ultraEco }: ResourceHUDProps) => {
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

      {/* Mass balance summary */}
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg px-4 py-3 min-w-[140px]">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs text-muted-foreground">Recovered</span>
        </div>
        <div className="text-lg font-bold text-accent">{(typeof (resources as any).recoveredTotal !== 'undefined') ? (resources as any).recoveredTotal + ' kg' : ''}</div>
      </div>

      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg px-4 py-3 min-w-[140px]">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs text-muted-foreground">Wasted</span>
        </div>
        <div className="text-lg font-bold text-destructive">{(typeof (resources as any).wastedTotal !== 'undefined') ? (resources as any).wastedTotal + ' kg' : ''}</div>
      </div>
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg px-4 py-3 min-w-[140px]">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs text-muted-foreground">Available for Reuse</span>
        </div>
        <div className="text-lg font-bold text-foreground">{(typeof (resources as any).wastePoolTotal !== 'undefined') ? (resources as any).wastePoolTotal + ' kg' : '0 kg'}</div>
      </div>
      <div className="flex items-center ml-2 gap-2">
        <div className={`text-xs px-2 py-1 rounded ${ecoMode ? 'bg-emerald-600 text-white' : 'bg-muted text-foreground'}`}>{ecoMode ? 'Eco Mode ON' : 'Eco Mode OFF'}</div>
        <div className={`text-xs px-2 py-1 rounded ${ultraEco ? 'bg-emerald-800 text-white' : 'bg-muted text-foreground'}`}>{ultraEco ? 'Ultra Eco' : ''}</div>
      </div>
    </div>
  );
};
