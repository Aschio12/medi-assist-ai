'use client';

import React, { useState } from 'react';
import { syncEdgeWeights, aggregateGlobalModel } from '@/app/actions/federated';
import { NodeTopologyMap } from '@/components/federated/NodeTopologyMap';
import { WeightAggregationChart } from '@/components/federated/WeightAggregationChart';
import { EncryptionStatus } from '@/components/federated/EncryptionStatus';
import { Network, RefreshCw } from 'lucide-react';

export default function FederatedLearningDashboard() {
  const [syncCount, setSyncCount] = useState(0);
  const [globalWeights, setGlobalWeights] = useState<number[] | null>(null);
  const [isAggregating, setIsAggregating] = useState(false);

  const simulateSyncRound = async () => {
    setIsAggregating(true);
    setSyncCount(0);
    setGlobalWeights(null);

    // Simulate 6 edge nodes connecting and syncing
    for(let i=0; i<6; i++) {
      await new Promise(r => setTimeout(r, 600)); // UI delay
      const mockWeights = Array.from({length: 8}, () => Math.random() * 2 - 1);
      await syncEdgeWeights(`HOSP-${i}`, mockWeights, 1000);
      setSyncCount(prev => prev + 1);
    }

    // Aggregate
    const res = await aggregateGlobalModel();
    if (res?.new_global_weights) {
      setGlobalWeights(res.new_global_weights);
    }
    
    setIsAggregating(false);
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-10">
      
      <div className="glass-panel p-6 rounded-3xl border border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.15)] relative overflow-hidden bg-gradient-to-br from-black to-[#002233]">
        <div className="relative z-10 flex justify-between items-end">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center w-max gap-1">
              <Network className="h-3 w-3" /> Enterprise AI
            </span>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent mt-2">
              Federated Learning Coordinator
            </h1>
            <p className="text-xs lg:text-sm text-cyan-200/60 mt-2 max-w-3xl">
              Decentralized AI model training across secure hospital silos. Patient data never leaves the local network; only homomorphically encrypted neural network weight updates (FedAvg) are synchronized to the global model.
            </p>
          </div>
          <div>
             <button 
                onClick={simulateSyncRound} 
                disabled={isAggregating} 
                className="flex items-center gap-2 bg-cyan-600/20 hover:bg-cyan-600/40 text-cyan-300 border border-cyan-500/50 text-sm font-bold px-5 py-3 rounded-xl transition-all disabled:opacity-50"
             >
                <RefreshCw className={`h-4 w-4 ${isAggregating ? 'animate-spin' : ''}`} /> 
                {isAggregating ? 'Syncing Edge Nodes...' : 'Initiate FedAvg Round'}
             </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">
        {/* Left Column - Topology */}
        <div className="h-full">
           <NodeTopologyMap syncCount={syncCount} />
        </div>

        {/* Center - Encryption */}
        <div className="h-full">
           <EncryptionStatus isAggregated={globalWeights !== null} />
        </div>

        {/* Right - Global Model Weights */}
        <div className="h-full">
           <WeightAggregationChart globalWeights={globalWeights} />
        </div>
      </div>

    </div>
  );
}
