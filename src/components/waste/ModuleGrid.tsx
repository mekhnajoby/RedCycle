import { Factory, Home, Beaker, PartyPopper, Box, Recycle } from "lucide-react";

export interface Module {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  efficient: string[];
}

export const modules: Module[] = [
  {
    id: 'habitat',
    title: 'Habitat Workshop',
    desc: 'Interior outfitting, insulation, furniture from foam & fabrics',
    icon: <Home className="w-6 h-6" />,
    efficient: ['foam_pack', 'textiles']
  },
  {
    id: 'recycle',
    title: 'Recycling Plant',
    desc: 'Aluminum & composite rework, shredding, feedstock recovery',
    icon: <Recycle className="w-6 h-6" />,
    efficient: ['aluminum_struts', 'polycomposite']
  },
  {
    id: 'foam',
    title: 'Foam Lab',
    desc: 'Densify foam into insulation blocks or packing material',
    icon: <Box className="w-6 h-6" />,
    efficient: ['foam_pack']
  },
  {
    id: 'party',
    title: 'Party Hall / Maker Space',
    desc: 'Cosmic celebrations: decorate using recycled bits',
    icon: <PartyPopper className="w-6 h-6" />,
    efficient: ['textiles', 'bubble_wrap', 'plastic_pouches']
  },
  {
    id: 'lab',
    title: 'Science Lab',
    desc: 'Repurpose carbon residue and filter media into tooling & filament',
    icon: <Beaker className="w-6 h-6" />,
    efficient: ['carbon_residue', 'plastic_pouches']
  },
  {
    id: 'storage',
    title: 'Storage & Logistics',
    desc: 'Temporary staging and packaging — makes containers from pouches',
    icon: <Factory className="w-6 h-6" />,
    efficient: ['plastic_pouches', 'bubble_wrap']
  }
];

interface ModuleGridProps {
  onModuleClick: (moduleId: string) => void;
  currentModule: string | null;
}

export const ModuleGrid = ({ onModuleClick, currentModule }: ModuleGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {modules.map((module) => (
        <button
          key={module.id}
          onClick={() => onModuleClick(module.id)}
          className={`
            bg-card/30 backdrop-blur-sm border rounded-xl p-5 text-left
            transition-all hover:scale-105 hover:shadow-glow
            ${currentModule === module.id 
              ? 'border-primary shadow-glow ring-2 ring-primary/20' 
              : 'border-border hover:border-primary/50'
            }
          `}
        >
          <div className="flex items-start gap-3 mb-3">
            <div className="bg-gradient-mars p-2 rounded-lg text-white">
              {module.icon}
            </div>
            <h4 className="font-bold text-foreground flex-1">{module.title}</h4>
          </div>
          <p className="text-sm text-muted-foreground">{module.desc}</p>
        </button>
      ))}
    </div>
  );
};
