import { useState, useEffect } from "react";

export interface WasteItem {
  name: string;
  kg: number;
}

export interface Product {
  name: string;
  kg: number;
  qty: number;
}

export interface Resources {
  energy: number;
  water: number;
  crewHours: number;
}

export interface WasteInventory {
  [key: string]: WasteItem;
}

export interface ProductInventory {
  [key: string]: Product;
}

const initialInventory: WasteInventory = {
  'aluminum_struts': { name: 'Aluminum struts', kg: 120 },
  'polycomposite': { name: 'Carbon-fiber composites', kg: 220 },
  'foam_pack': { name: 'Packaging foam', kg: 180 },
  'bubble_wrap': { name: 'Bubble wrap', kg: 60 },
  'textiles': { name: 'Fabrics & clothing', kg: 160 },
  'EVA_waste': { name: 'EVA fabrics & liners', kg: 80 },
  'plastic_pouches': { name: 'Food pouches', kg: 90 },
  'nitrile_gloves': { name: 'Small plastics & gloves', kg: 10 },
  'carbon_residue': { name: 'Carbon residue', kg: 50 }
};

export const useWasteManagement = () => {
  const [inventory, setInventory] = useState<WasteInventory>(initialInventory);
  const [products, setProducts] = useState<ProductInventory>({});
  const [resources, setResources] = useState<Resources>({ energy: 120, water: 120, crewHours: 6 });
  const [assignedCrew, setAssignedCrew] = useState<{ [key: string]: string | null }>({});
  const [missionDay, setMissionDay] = useState(1);
  const [currentModule, setCurrentModule] = useState<string | null>(null);

  // Load from localStorage
  useEffect(() => {
    try {
      const savedInv = localStorage.getItem('redcycle_inv');
      const savedProd = localStorage.getItem('redcycle_prod');
      const savedRes = localStorage.getItem('redcycle_resources');
      const savedDay = localStorage.getItem('redcycle_day');
      const savedCrew = localStorage.getItem('redcycle_crew');

      if (savedInv) setInventory(JSON.parse(savedInv));
      if (savedProd) setProducts(JSON.parse(savedProd));
      if (savedRes) setResources(JSON.parse(savedRes));
      if (savedDay) setMissionDay(parseInt(savedDay));
      if (savedCrew) setAssignedCrew(JSON.parse(savedCrew));
    } catch (e) {
      console.error('Failed to load saved state:', e);
    }
  }, []);

  // Save to localStorage
  const save = () => {
    localStorage.setItem('redcycle_inv', JSON.stringify(inventory));
    localStorage.setItem('redcycle_prod', JSON.stringify(products));
    localStorage.setItem('redcycle_resources', JSON.stringify(resources));
    localStorage.setItem('redcycle_day', missionDay.toString());
    localStorage.setItem('redcycle_crew', JSON.stringify(assignedCrew));
  };

  useEffect(() => {
    save();
  }, [inventory, products, resources, missionDay, assignedCrew]);

  const consumeMaterial = (key: string, amount: number) => {
    setInventory(prev => ({
      ...prev,
      [key]: { ...prev[key], kg: Math.max(0, prev[key].kg - amount) }
    }));
  };

  const addProduct = (name: string, kg: number) => {
    const id = name.replace(/\s+/g, '_');
    setProducts(prev => ({
      ...prev,
      [id]: {
        name,
        kg: (prev[id]?.kg || 0) + kg,
        qty: (prev[id]?.qty || 0) + Math.max(1, Math.round(kg / 5))
      }
    }));
  };

  const consumeResources = (energy: number, water: number, crew: number) => {
    setResources(prev => ({
      energy: Math.max(0, prev.energy - energy),
      water: Math.max(0, prev.water - water),
      crewHours: Math.max(0, prev.crewHours - crew)
    }));
  };

  const assignCrew = (crewId: string, moduleId: string | null) => {
    setAssignedCrew(prev => ({ ...prev, [crewId]: moduleId }));
  };

  const reset = () => {
    setInventory(initialInventory);
    setProducts({});
    setResources({ energy: 120, water: 120, crewHours: 6 });
    setAssignedCrew({});
    setMissionDay(1);
    setCurrentModule(null);
    localStorage.clear();
  };

  return {
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
  };
};
