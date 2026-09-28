'use client';

import React, { useEffect, useRef } from 'react';
import { Activity, Bug } from 'lucide-react';

export function EpiSimulationCanvas({ spatialData }: { spatialData: any }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!spatialData || !spatialData.history) return;
    const history = spatialData.history;
    const finalStep = history[history.length - 1];
    const grid = finalStep.grid;
    if (!grid) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = grid.length;
    const cellSize = canvas.width / size;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const state = grid[i][j];
        // 0=S, 1=E, 2=I, 3=R, 4=D
        if (state === 0) ctx.fillStyle = "rgba(255,255,255,0.1)"; // Susceptible
        else if (state === 1) ctx.fillStyle = "rgba(234,179,8,0.8)"; // Exposed (Yellow)
        else if (state === 2) ctx.fillStyle = "rgba(239,68,68,1.0)"; // Infectious (Red)
        else if (state === 3) ctx.fillStyle = "rgba(59,130,246,0.8)"; // Recovered (Blue)
        else if (state === 4) ctx.fillStyle = "rgba(0,0,0,0.8)"; // Dead

        ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
      }
    }
  }, [spatialData]);

  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col relative overflow-hidden bg-black/60">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/20">
          <Bug className="h-5 w-5 text-red-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Spatial ABM Engine</h2>
          <p className="text-xs text-zinc-400">Cellular Automata Diffusion Grid</p>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center bg-black border border-white/5 p-4 rounded-xl">
         {!spatialData ? (
            <div className="text-zinc-600 flex flex-col items-center">
              <Activity className="h-10 w-10 mb-3 opacity-50" />
              <p className="text-sm font-mono uppercase">Awaiting SEIR Simulation</p>
            </div>
         ) : (
            <canvas 
               ref={canvasRef} 
               width={400} 
               height={400} 
               className="max-w-full max-h-full object-contain image-rendering-pixelated rounded-lg shadow-[0_0_20px_rgba(239,68,68,0.2)]"
            />
         )}
      </div>
    </div>
  );
}
