import { useEffect, useRef, useState } from "react";
import marsImage from "@/assets/mars-planet.png";

interface WasteLocation {
  lat: number;
  lon: number;
  type: string;
  amount: number;
}

interface Mars3DMapProps {
  locations?: WasteLocation[];
  onEditLocation?: (type: string, index: number) => void;
}

const typeColors: Record<string, string> = {
  foam: '255,165,0',       // orange-ish
  aluminum: '192,192,192', // silver/gray
  textiles: '75,192,192',  // teal
  carbon: '94,234,212'     // mint
};

const Mars3DMap = ({ locations, onEditLocation }: Mars3DMapProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  // Build the locations array used by both canvas rendering and the legend
  const wasteLocationsToRender: WasteLocation[] = (locations && locations.length) ? locations : [
    { lat: 18.5, lon: 77.5, type: 'foam', amount: 180 },
    { lat: 18.3, lon: 77.8, type: 'aluminum', amount: 120 },
    { lat: 18.7, lon: 77.3, type: 'textiles', amount: 160 },
    { lat: 18.4, lon: 77.6, type: 'carbon', amount: 50 }
  ];

  // Aggregate totals by type for the legend
  const totalsByType: Record<string, number> = wasteLocationsToRender.reduce((acc, loc) => {
    acc[loc.type] = (acc[loc.type] || 0) + loc.amount;
    return acc;
  }, {} as Record<string, number>);

  // Compute weighted centroids per type (lat/lon weighted by amount)
  const centroids: WasteLocation[] = (() => {
    const groups: Record<string, { latSum: number; lonSum: number; amount: number }> = {};
    wasteLocationsToRender.forEach(loc => {
      if (!groups[loc.type]) groups[loc.type] = { latSum: 0, lonSum: 0, amount: 0 };
      groups[loc.type].latSum += loc.lat * loc.amount;
      groups[loc.type].lonSum += loc.lon * loc.amount;
      groups[loc.type].amount += loc.amount;
    });

    return Object.entries(groups).map(([type, g]) => ({
      type,
      amount: g.amount,
      lat: g.latSum / g.amount,
      lon: g.lonSum / g.amount
    } as WasteLocation));
  })();

  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const updateSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    
    const img = new Image();
    img.src = marsImage;
    
  let rotation = 0;
  let rafId = 0;
  let particles: Array<{ x: number; y: number; size: number; speed: number }> = [];
    
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.3 + 0.1,
      });
    }
    
    // compute marker positions used for hover/click hit testing
    const getMarkerPositions = (rot: number) => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.3;
      const positions: Array<{ x: number; y: number; loc: WasteLocation }> = [];
      centroids.forEach(loc => {
        const angle = (loc.lon / 180) * Math.PI + rot;
        const lat = (loc.lat / 90) * (Math.PI / 2);
        const markerX = centerX + Math.cos(angle) * radius * Math.cos(lat);
        const markerY = centerY + Math.sin(lat) * radius * 0.5;
        positions.push({ x: markerX, y: markerY, loc });
      });
      if (selectedType) {
        wasteLocationsToRender.filter(l => l.type === selectedType).forEach(loc => {
          const angle = (loc.lon / 180) * Math.PI + rot;
          const lat = (loc.lat / 90) * (Math.PI / 2);
          const markerX = centerX + Math.cos(angle) * radius * Math.cos(lat);
          const markerY = centerY + Math.sin(lat) * radius * 0.5;
          positions.push({ x: markerX, y: markerY, loc });
        });
      }
      return positions;
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const positions = getMarkerPositions(rotation);
      let found = null as null | { x:number; y:number; loc: WasteLocation; index?: number };
      // check centroids first
      for (let i = 0; i < centroids.length; i++) {
        const p = positions[i];
        const dx = x - p.x; const dy = y - p.y;
        if (dx*dx + dy*dy < 20*20) { found = { x: p.x, y: p.y, loc: p.loc, index: i }; break; }
      }
      // check per-location markers when a type is selected
      if (!found && selectedType) {
        const locs = wasteLocationsToRender.filter(l => l.type === selectedType);
        for (let i = 0; i < locs.length; i++) {
          const p = positions[centroids.length + i];
          const dx = x - p.x; const dy = y - p.y;
          if (dx*dx + dy*dy < 12*12) { found = { x: p.x, y: p.y, loc: p.loc, index: i }; break; }
        }
      }

      if (found && tooltipRef.current) {
        tooltipRef.current.style.display = 'block';
        tooltipRef.current.style.left = `${found.x + 12}px`;
        tooltipRef.current.style.top = `${found.y + 12}px`;
        tooltipRef.current.innerText = `${found.loc.type}: ${found.loc.amount} kg`;
      } else if (tooltipRef.current) {
        tooltipRef.current.style.display = 'none';
      }
    };

    const handlePointerLeave = () => {
      if (tooltipRef.current) tooltipRef.current.style.display = 'none';
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const positions = getMarkerPositions(rotation);
      // if a type is selected, check per-location markers for edit
      if (selectedType && onEditLocation) {
        const locs = wasteLocationsToRender.filter(l => l.type === selectedType);
        for (let i = 0; i < locs.length; i++) {
          const p = positions[centroids.length + i];
          const dx = x - p.x; const dy = y - p.y;
          if (dx*dx + dy*dy < 12*12) { onEditLocation(selectedType, i); return; }
        }
      }
      // otherwise check centroid clicks to toggle selection
      for (let i = 0; i < centroids.length; i++) {
        const p = positions[i];
        const dx = x - p.x; const dy = y - p.y;
        if (dx*dx + dy*dy < 20*20) { setSelectedType(prev => prev === p.loc.type ? null : p.loc.type); return; }
      }
    };

    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerleave', handlePointerLeave);
    canvas.addEventListener('click', handleClick);

    // cleanup helper
    const removeListeners = () => {
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
      canvas.removeEventListener('click', handleClick);
    };

    
    const animate = () => {
      ctx.fillStyle = "rgba(5, 6, 10, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      particles.forEach((p) => {
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.fillRect(p.x, p.y, p.size, p.size);
        p.x += p.speed;
        if (p.x > canvas.width) p.x = 0;
      });
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.3;
      
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);
      
      // Glow effect
      const gradient = ctx.createRadialGradient(0, 0, radius * 0.8, 0, 0, radius * 1.3);
      gradient.addColorStop(0, "rgba(193, 68, 14, 0)");
      gradient.addColorStop(1, "rgba(193, 68, 14, 0.4)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, radius * 1.3, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw Mars
      if (img.complete) {
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, -radius, -radius, radius * 2, radius * 2);
      }
      
      ctx.restore();
      
      // Draw centroid markers (one per waste type)
      centroids.forEach(loc => {
        const angle = (loc.lon / 180) * Math.PI + rotation;
        const lat = (loc.lat / 90) * (Math.PI / 2);
        const markerX = centerX + Math.cos(angle) * radius * Math.cos(lat);
        const markerY = centerY + Math.sin(lat) * radius * 0.5;
        // Pulsing marker scaled by total amount
        const pulse = Math.sin(Date.now() / 500) * 0.3 + 0.7;
        const size = Math.max(6, Math.min(20, (loc.amount / 60) * pulse));
        ctx.beginPath();
        ctx.arc(markerX, markerY, size, 0, Math.PI * 2);
        const rgb = typeColors[loc.type] || '94,234,212';
        // Dim non-selected types when a type is selected
        const alphaMul = selectedType && selectedType !== loc.type ? 0.25 : 1;
        ctx.fillStyle = `rgba(${rgb}, ${0.85 * pulse * alphaMul})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(${rgb}, ${0.5 * pulse * alphaMul})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // If a type is selected, draw all original locations for that type
      if (selectedType) {
        const locs = wasteLocationsToRender.filter(l => l.type === selectedType);
        locs.forEach(loc => {
          const angle = (loc.lon / 180) * Math.PI + rotation;
          const lat = (loc.lat / 90) * (Math.PI / 2);
          const markerX = centerX + Math.cos(angle) * radius * Math.cos(lat);
          const markerY = centerY + Math.sin(lat) * radius * 0.5;
          const pulse = Math.sin(Date.now() / 300) * 0.3 + 0.7;
          const size = Math.max(3, Math.min(8, (loc.amount / 40) * pulse));
          ctx.beginPath();
          ctx.arc(markerX, markerY, size, 0, Math.PI * 2);
          const rgb = typeColors[loc.type] || '94,234,212';
          ctx.fillStyle = `rgba(${rgb}, ${0.95 * pulse})`;
          ctx.fill();
          ctx.strokeStyle = `rgba(${rgb}, ${0.6 * pulse})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        });
      }
      
      rotation += 0.001;
      rafId = requestAnimationFrame(animate);
    };
    
  img.onload = () => animate();
    
    return () => {
      window.removeEventListener("resize", updateSize);
      cancelAnimationFrame(rafId);
      removeListeners();
    };
  }, [locations, selectedType]);
  
  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: "transparent" }}
      />
      <div ref={tooltipRef as any} className="absolute z-50 pointer-events-none bg-card/90 text-xs text-foreground px-2 py-1 rounded" style={{display:'none', transform:'translate(-6px,-6px)'}} />
      <div className="absolute top-4 left-4 bg-card/80 backdrop-blur-sm border border-border rounded-lg p-3">
        <h4 className="text-sm font-bold mb-2">Waste Locations - Jezero Crater</h4>
        <div className="space-y-1 text-xs text-muted-foreground">
          {
            // Aggregate totals by type so the legend shows each type once
            Object.entries(totalsByType).map(([type, amount], idx) => {
              const rgb = typeColors[type] || '94,234,212';
              const color = `rgba(${rgb},1)`;
              const isSelected = selectedType === type;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedType(isSelected ? null : type)}
                  className={`flex items-center gap-2 w-full text-left ${isSelected ? 'underline' : ''}`}
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                  <span className="flex-1">{type}: {amount} kg</span>
                  {isSelected ? <span className="text-xs text-muted-foreground">(showing locations)</span> : null}
                </button>
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Mars3DMap;
