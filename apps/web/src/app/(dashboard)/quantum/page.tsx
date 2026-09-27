'use client';

import React, { useState } from 'react';
import { simulateVQE, predictBindingAffinity } from '@/app/actions/quantum';
import { VQEVisualizer } from '@/components/quantum/VQEVisualizer';
import { BindingAffinityChart } from '@/components/quantum/BindingAffinityChart';
import { GenerativeDrugDesign } from '@/components/quantum/GenerativeDrugDesign';
import { Hexagon } from 'lucide-react';

export default function QuantumDashboard() {
  const [vqeData, setVqeData] = useState<any>(null);
  const [affinityData, setAffinityData] = useState<any>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulate = async (smiles: string) => {
    setIsSimulating(true);
    setVqeData(null);
    setAffinityData(null);
    
    // Simulate complex quantum computations
    const vqeRes = await simulateVQE(smiles);
    const bindRes = await predictBindingAffinity(smiles, "1IEP");
    
    setTimeout(() => {
      setVqeData(vqeRes?.data);
      setAffinityData(bindRes?.data);
      setIsSimulating(false);
    }, 2000); // Artificial delay to simulate quantum execution overhead
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-10">
      
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.15)] relative overflow-hidden bg-gradient-to-br from-black to-[#1a0b2e]">
        <div className="relative z-10">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center w-max gap-1">
            <Hexagon className="h-3 w-3" /> Frontier Tech
          </span>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mt-2">
            Quantum Machine Learning (QML) Drug Discovery
          </h1>
          <p className="text-xs lg:text-sm text-purple-200/60 mt-2 max-w-3xl">
            Hybrid Quantum-Classical Optimization. Offloads complex molecular binding affinity calculations to simulated quantum circuits using the Variational Quantum Eigensolver (VQE) to bypass classical compute bottlenecks.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">
        {/* Left Column - Input */}
        <div className="h-full">
           <GenerativeDrugDesign onSimulate={handleSimulate} />
        </div>

        {/* Center/Right Column - VQE & Binding */}
        <div className="lg:col-span-2 flex flex-col gap-6 h-full">
           <div className="flex-1 overflow-hidden">
             <VQEVisualizer vqeData={vqeData} isSimulating={isSimulating} />
           </div>
           <div className="flex-none h-[180px]">
             <BindingAffinityChart affinityData={affinityData} />
           </div>
        </div>
      </div>

    </div>
  );
}
