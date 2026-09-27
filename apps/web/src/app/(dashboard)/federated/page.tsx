'use client';

import React, { useState } from 'react';
import { aggregateLocalModel } from '@/app/actions/federated';
import { SwarmNetwork } from '@/components/federated/SwarmNetwork';
import { TrainingMetrics } from '@/components/federated/TrainingMetrics';
import { BlockchainLedger } from '@/components/federated/BlockchainLedger';
import { Network, UploadCloud } from 'lucide-react';

export default function FederatedDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSync = async () => {
    setLoading(true);
    // Simulate pushing local edge weights to the global FedAvg aggregator
    const res = await aggregateLocalModel("Local Edge Server", 3450);
    setTimeout(() => {
      setData(res);
      setLoading(false);
    }, 1500); // add slight artificial delay for UX
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-10">
      
      <div className="glass-panel p-6 rounded-3xl border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.15)] relative overflow-hidden bg-gradient-to-b from-[#0a192f] to-black">
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center w-max gap-1">
              <Network className="h-3 w-3" /> Frontier Tech
            </span>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mt-2">
              Federated Swarm Intelligence
            </h1>
            <p className="text-xs lg:text-sm text-blue-200/60 mt-2 max-w-3xl">
              Decentralized AI training across hospital silos using FedAvg. Local PHI never leaves the edge node. Model weight updates are mathematically verified via immutable blockchain provenance.
            </p>
          </div>
          <div className="text-right flex flex-col items-end gap-2">
             <div className="text-[10px] font-mono text-blue-400/50 mb-1">LOCAL EDGE STATUS</div>
             <div className="text-sm font-bold text-emerald-400 font-mono bg-emerald-500/10 px-3 py-1 rounded border border-emerald-500/20">READY</div>
             <button 
               onClick={handleSync}
               disabled={loading}
               className="mt-2 flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-[0_0_15px_rgba(59,130,246,0.4)]"
             >
               <UploadCloud className="h-4 w-4" />
               {loading ? 'Syncing...' : 'Sync Local Weights'}
             </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
        {/* Left Column - Swarm Topology */}
        <div className="lg:col-span-2 h-full">
           <SwarmNetwork activeNode={data?.node_id || null} isTraining={loading} />
        </div>

        {/* Right Column - Metrics & Ledger */}
        <div className="flex flex-col gap-6 h-full">
           <div className="flex-none h-[220px]">
             <TrainingMetrics metrics={data?.federated_metrics} />
           </div>
           
           <div className="flex-1 overflow-hidden">
             <BlockchainLedger receipt={data?.blockchain_receipt} />
           </div>
        </div>
      </div>

    </div>
  );
}
