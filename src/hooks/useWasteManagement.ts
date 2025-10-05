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
  const [recoveredTotal, setRecoveredTotal] = useState<number>(0);
  const [wastedTotal, setWastedTotal] = useState<number>(0);
  const [wastePool, setWastePool] = useState<{ [key: string]: number }>({});

  // Load from localStorage
  useEffect(() => {
    try {
      const savedInv = localStorage.getItem('redcycle_inv');
      const savedProd = localStorage.getItem('redcycle_prod');
      const savedRes = localStorage.getItem('redcycle_resources');
      const savedDay = localStorage.getItem('redcycle_day');
      const savedCrew = localStorage.getItem('redcycle_crew');
  const savedRecovered = localStorage.getItem('redcycle_recovered');
  const savedWasted = localStorage.getItem('redcycle_wasted');
  const savedPool = localStorage.getItem('redcycle_wastepool');

      if (savedInv) setInventory(JSON.parse(savedInv));
      if (savedProd) setProducts(JSON.parse(savedProd));
      if (savedRes) setResources(JSON.parse(savedRes));
      if (savedDay) setMissionDay(parseInt(savedDay));
      if (savedCrew) setAssignedCrew(JSON.parse(savedCrew));
  if (savedRecovered) setRecoveredTotal(parseFloat(savedRecovered));
  if (savedWasted) setWastedTotal(parseFloat(savedWasted));
  if (savedPool) setWastePool(JSON.parse(savedPool));
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
    localStorage.setItem('redcycle_recovered', recoveredTotal.toString());
    localStorage.setItem('redcycle_wasted', wastedTotal.toString());
    localStorage.setItem('redcycle_wastepool', JSON.stringify(wastePool));
  };

  useEffect(() => {
    save();
  }, [inventory, products, resources, missionDay, assignedCrew, recoveredTotal, wastedTotal, wastePool]);

  const consumeMaterial = (key: string, amount: number) => {
    setInventory(prev => ({
      ...prev,
      [key]: { ...prev[key], kg: Math.max(0, prev[key].kg - amount) }
    }));
  };

  const addToWastePool = (key: string, amount: number) => {
    if (amount <= 0) return;
    setWastePool(prev => ({ ...prev, [key]: (prev[key] || 0) + amount }));
  };

  const consumeFromWastePool = (key: string, amount: number) => {
    if (amount <= 0) return 0;
    let consumed = 0;
    setWastePool(prev => {
      const avail = prev[key] || 0;
      const take = Math.min(avail, amount);
      consumed = take;
      if (take >= avail) {
        const { [key]: _removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [key]: avail - take };
    });
    return consumed;
  };

  const updateMaterial = (key: string, kg: number) => {
    setInventory(prev => ({
      ...prev,
      [key]: { ...prev[key], kg: Math.max(0, kg) }
    }));
  };

  // Process staged materials in a module and compute recovered vs wasted mass
  const processMaterials = (moduleId: string, staged: Array<{ key: string; kg: number }>, mode: 'full' | 'quick' = 'full', optimize: boolean = false) => {
    // staged: array of requested inputs (key, kg)
    const totalIn = staged.reduce((s, x) => s + x.kg, 0);
    // Improved base efficiencies to reduce wastage
    const baseEfficiencies: Record<string, number> = {
      foam: 0.92,
      habitat: 0.78,
      recycle: 0.9,
      lab: 0.82,
      party: 0.85,
      storage: 0.9
    };
    const effKey = moduleId || 'recycle';
    let efficiency = baseEfficiencies[effKey] ?? 0.7;
    // quick mode is faster but less efficient; optimize mode boosts efficiency further
    if (mode === 'quick') efficiency = Math.max(0.35, efficiency * 0.75);
    if (optimize) efficiency = Math.min(0.99, efficiency + 0.08);

  const recoveredKg = Math.round(totalIn * efficiency);
  let wastedKg = Math.max(0, Math.round(totalIn - recoveredKg));


    // Consume inputs: prefer wastePool first for each staged key, then inventory for the remainder
    const consumedFromPool: { [key: string]: number } = {};
    const consumedFromInventory: { [key: string]: number } = {};
    staged.forEach(s => {
      const need = s.kg;
      // consume from pool
      let fromPool = 0;
      if (wastePool[s.key]) {
        fromPool = Math.min(wastePool[s.key], need);
        if (fromPool > 0) {
          // mutate via setter; consumeFromWastePool uses setter internally
          consumeFromWastePool(s.key, fromPool);
          consumedFromPool[s.key] = (consumedFromPool[s.key] || 0) + fromPool;
        }
      }
      const remaining = Math.max(0, need - fromPool);
      if (remaining > 0) {
        consumeMaterial(s.key, remaining);
        consumedFromInventory[s.key] = (consumedFromInventory[s.key] || 0) + remaining;
      }
    });

  // add product depending on module
  const outputs: string[] = [];
    if (moduleId === 'foam') {
      const blocks = recoveredKg;
      addProduct('Insulation Blocks', blocks);
      outputs.push(`${blocks} kg insulation`);
    } else if (moduleId === 'habitat') {
      const batting = recoveredKg;
      addProduct('Insulation Batting', batting);
      outputs.push(`${batting} kg batting`);
    } else if (moduleId === 'recycle') {
      const frames = recoveredKg;
      addProduct('Reworked Frames', frames);
      outputs.push(`${frames} kg frames`);
    } else if (moduleId === 'lab') {
      const filament = recoveredKg;
      addProduct('Carbon Filament', filament);
      outputs.push(`${filament} kg filament`);
    } else if (moduleId === 'party') {
      const decor = recoveredKg;
      addProduct('Decor Elements', decor);
      outputs.push(`${decor} kg decor`);
    } else if (moduleId === 'storage') {
      const cont = recoveredKg;
      addProduct('Storage Containers', cont);
      outputs.push(`${cont} kg containers`);
    } else {
      // fallback: generic recovered product
      addProduct('Recovered Material', recoveredKg);
      outputs.push(`${recoveredKg} kg recovered`);
    }

    // Secondary recovery: attempt to reclaim a portion of the wasted mass using a low-energy secondary pass
    const secondaryEfficiency = (optimize ? 0.55 : 0.4); // fraction of waste that can be salvaged in a second-pass
    const extraRecovered = Math.round(wastedKg * secondaryEfficiency);
    if (extraRecovered > 0) {
      addProduct('Secondary Recovered', extraRecovered);
      outputs.push(`${extraRecovered} kg secondary recovered`);
      wastedKg = Math.max(0, wastedKg - extraRecovered);
    }

    // Add remaining wasted mass back into the wastePool, distributed proportionally to staged inputs
    if (wastedKg > 0 && totalIn > 0) {
      staged.forEach(s => {
        const share = Math.round((s.kg / totalIn) * wastedKg);
        if (share > 0) addToWastePool(s.key, share);
      });
    }

    setRecoveredTotal(prev => prev + recoveredKg + extraRecovered);
    setWastedTotal(prev => prev + wastedKg);

    return { recoveredKg: recoveredKg + extraRecovered, wastedKg, outputs };
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
    setRecoveredTotal(0);
    setWastedTotal(0);
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
    reset,
    // mass-balance
    recoveredTotal,
    wastedTotal,
    processMaterials,
    updateMaterial,
    // waste pool APIs
    wastePool,
    addToWastePool,
    consumeFromWastePool
  };
};
