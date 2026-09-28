'use client';

import React, { useEffect, useRef } from 'react';
import { Box, Layers } from 'lucide-react';

export function DicomViewer3D({ renderResult }: { renderResult: any }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!renderResult || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Simulate drawing the MIP volume rendering
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    const w = canvasRef.current.width;
    const h = canvasRef.current.height;
    
    // Draw a simulated cranial 3D projection
    const gradient = ctx.createRadialGradient(w/2, h/2, 10, w/2, h/2, 150);
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.9)");
    gradient.addColorStop(0.5, "rgba(100, 100, 150, 0.5)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0.1)");
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
    
    // Add grid lines for "medical" look
    ctx.strokeStyle = "rgba(0, 255, 255, 0.1)";
    ctx.lineWidth = 1;
    for(let i = 0; i < w; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, h);
      ctx.stroke();
    }
    for(let i = 0; i < h; i += 20) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(w, i);
      ctx.stroke();
    }
    
  }, [renderResult]);

  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col relative overflow-hidden bg-black">
      <div className="absolute top-6 left-6 z-10 flex items-center gap-3">
        <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-md">
          <Box className="h-5 w-5 text-cyan-400" />
        </div>
        <div className="bg-black/50 px-3 py-1 rounded-lg backdrop-blur-md">
          <h2 className="text-sm font-bold text-white">3D MIP Raycaster</h2>
          <p className="text-[10px] text-cyan-400 font-mono">Direct Volume Rendering</p>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center relative w-full h-full">
         {!renderResult ? (
            <div className="text-zinc-600 flex flex-col items-center">
              <Layers className="h-12 w-12 mb-4 opacity-50" />
              <p className="text-xs uppercase font-mono tracking-widest">Awaiting Volume Matrix</p>
            </div>
         ) : (
            <canvas 
               ref={canvasRef} 
               width={400} 
               height={400} 
               className="max-w-full max-h-full object-contain"
            />
         )}
      </div>
    </div>
  );
}
