import { useEffect, useRef } from "react";
import marsImage from "@/assets/mars-planet.png";

interface WasteLocation {
  lat: number;
  lon: number;
  type: string;
  amount: number;
}

const wasteLocations: WasteLocation[] = [
  { lat: 18.5, lon: 77.5, type: 'foam', amount: 180 },
  { lat: 18.3, lon: 77.8, type: 'aluminum', amount: 120 },
  { lat: 18.7, lon: 77.3, type: 'textiles', amount: 160 },
  { lat: 18.4, lon: 77.6, type: 'carbon', amount: 50 }
];

const Mars3DMap = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
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
    let particles: Array<{ x: number; y: number; size: number; speed: number }> = [];
    
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.3 + 0.1,
      });
    }
    
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
      
      // Draw waste location markers
      wasteLocations.forEach(loc => {
        const angle = (loc.lon / 180) * Math.PI + rotation;
        const lat = (loc.lat / 90) * (Math.PI / 2);
        const markerX = centerX + Math.cos(angle) * radius * Math.cos(lat);
        const markerY = centerY + Math.sin(lat) * radius * 0.5;
        
        // Pulsing marker
        const pulse = Math.sin(Date.now() / 500) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(markerX, markerY, 4 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(94, 234, 212, ${0.8 * pulse})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(94, 234, 212, ${0.5 * pulse})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      });
      
      rotation += 0.001;
      requestAnimationFrame(animate);
    };
    
    img.onload = () => animate();
    
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);
  
  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: "transparent" }}
      />
      <div className="absolute top-4 left-4 bg-card/80 backdrop-blur-sm border border-border rounded-lg p-3">
        <h4 className="text-sm font-bold mb-2">Waste Locations - Jezero Crater</h4>
        <div className="space-y-1 text-xs text-muted-foreground">
          {wasteLocations.map((loc, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span>{loc.type}: {loc.amount} kg</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mars3DMap;
