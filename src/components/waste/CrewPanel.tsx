import { User } from "lucide-react";

interface CrewPanelProps {
  assignedCrew: { [key: string]: string | null };
  currentModule: string | null;
  onAssign: (crewId: string, moduleId: string | null) => void;
}

export const CrewPanel = ({ assignedCrew, currentModule, onAssign }: CrewPanelProps) => {
  const crewIds = ['crew1', 'crew2', 'crew3', 'crew4'];

  const handleCrewClick = (crewId: string) => {
    if (!currentModule) return;
    
    if (assignedCrew[crewId] === currentModule) {
      onAssign(crewId, null);
    } else {
      onAssign(crewId, currentModule);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold">Crew Assignment</h3>
      <p className="text-sm text-muted-foreground">
        Click an astronaut to assign them to the selected module — increases process speed
      </p>
      
      <div className="flex gap-3 flex-wrap">
        {crewIds.map((crewId, idx) => {
          const isAssigned = !!assignedCrew[crewId];
          const isAssignedToCurrentModule = assignedCrew[crewId] === currentModule;
          
          return (
            <button
              key={crewId}
              onClick={() => handleCrewClick(crewId)}
              disabled={!currentModule}
              className={`
                w-16 h-16 rounded-xl border-2 flex items-center justify-center
                transition-all hover:scale-105
                ${isAssignedToCurrentModule
                  ? 'border-primary bg-primary/20 shadow-glow' 
                  : isAssigned
                  ? 'border-muted bg-muted/10'
                  : 'border-border bg-card/30 hover:border-primary/50'
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
              title={isAssigned ? `Assigned to ${assignedCrew[crewId]}` : 'Unassigned'}
            >
              <User className={`w-6 h-6 ${isAssignedToCurrentModule ? 'text-primary' : 'text-muted-foreground'}`} />
            </button>
          );
        })}
      </div>
    </div>
  );
};
