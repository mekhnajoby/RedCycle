import { useEffect, useRef } from "react";
import marsImage from "@/assets/mars-planet.png";

const Mars3D = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Set canvas size
    const updateSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    
    // Load Mars image
    const img = new Image();
    img.src = marsImage;
    
    let rotation = 0;
    let particles: Array<{ x: number; y: number; size: number; speed: number }> = [];
    
    // Create star particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.1,
      });
    }
    
    const animate = () => {
      ctx.fillStyle = "rgba(17, 24, 39, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      particles.forEach((p) => {
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.fillRect(p.x, p.y, p.size, p.size);
        
        p.x += p.speed;
        if (p.x > canvas.width) p.x = 0;
      });
      
      // Draw Mars
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.35;
      
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);
      
      // Draw glow effect
      const gradient = ctx.createRadialGradient(0, 0, radius * 0.8, 0, 0, radius * 1.3);
      gradient.addColorStop(0, "rgba(193, 68, 14, 0)");
      gradient.addColorStop(1, "rgba(193, 68, 14, 0.3)");
      ctx.fillStyle = gradient;
      ctx.arc(0, 0, radius * 1.3, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw Mars planet
      if (img.complete) {
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, -radius, -radius, radius * 2, radius * 2);
      }
      
      ctx.restore();
      
      rotation += 0.002;
      requestAnimationFrame(animate);
    };
    
    img.onload = () => animate();
    
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ background: "transparent" }}
    />
  );
};

export default Mars3D;
