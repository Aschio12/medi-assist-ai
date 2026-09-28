'use client';

import React, { useState } from 'react';
import { simulateSeir, simulateSpatial } from '@/app/actions/epi';
import { EpiSimulationCanvas } from '@/components/epi/EpiSimulationCanvas';
import { EpiStatsPanel } from '@/components/epi/EpiStatsPanel';
import { Play, Activity } from 'lucide-react';

export default function EpidemiologyDashboard() {
  const [seirData, setSeirData] = useState<any>(null);
  const [spatialData, setSpatialData] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcess = async () => {
    setIsProcessing(true);
    
    // Simulate RK4 SEIR ODEs
    const seirRes = await simulateSeir(0.4, 0.2, 0.1, 10000, 50);
    setSeirData(seirRes?.data);
    
    // Simulate Spatial ABM Cellular Automata
    const abmRes = await simulateSpatial(100, 0.4, 0.2, 0.1, 0.05, 50);
    setSpatialData(abmRes);
    
    setIsProcessing(false);
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-10">
      
      <div className="glass-panel p-6 rounded-3xl border border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.15)] relative overflow-hidden bg-gradient-to-br from-black to-slate-900">
        <div className="relative z-10 flex justify-between items-end">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 flex items-center w-max gap-1">
              <Activity className="h-3 w-3" /> Agent-Based Model (ABM)
            </span>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent mt-2">
              Epidemiological Outbreak Simulator
            </h1>
            <p className="text-xs lg:text-sm text-red-200/60 mt-2 max-w-3xl">
              Solves SEIR differential equations using 4th-Order Runge-Kutta numerical integration and visualizes spatial pathogen diffusion via Cellular Automata stochastic matrices.
            </p>
          </div>
          <div>
             <button 
                onClick={handleProcess} 
                disabled={isProcessing} 
                className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600/40 text-red-300 border border-red-500/50 text-sm font-bold px-5 py-3 rounded-xl transition-all disabled:opacity-50"
             >
                <Play className={`h-4 w-4 ${isProcessing ? 'animate-pulse' : ''}`} /> 
                {isProcessing ? 'Simulating RK4 Integration...' : 'Run Simulation'}
             </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
        <div className="h-full">
           <EpiSimulationCanvas spatialData={spatialData} />
        </div>
        <div className="h-full">
           <EpiStatsPanel seirData={seirData} spatialData={spatialData} />
        </div>
      </div>

    </div>
  );
}
