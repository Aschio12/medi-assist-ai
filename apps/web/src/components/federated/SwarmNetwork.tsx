'use client';

import React from 'react';
import { Network, Server, ArrowRight } from 'lucide-react';

export function SwarmNetwork({ activeNode, isTraining }: { activeNode: string | null, isTraining: boolean }) {
  
  const nodes = [
    { id: "Mayo Clinic", status: "idle", samples: 12500 },
    { id: "Cleveland Clinic", status: "idle", samples: 8400 },
    { id: "Johns Hopkins", status: "idle", samples: 15200 },
    { id: "Local Edge Server", status: activeNode === "Local Edge Server" && isTraining ? "training" : "idle", samples: 3450 }
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <Network className="h-5 w-5 text-blue-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Federated Swarm Topology</h2>
          <p className="text-xs text-zinc-400">Decentralized Edge Nodes</p>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center gap-4 relative">
        {/* Central Aggregator */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
           <div className={`p-4 rounded-full border-2 ${isTraining ? 'bg-blue-500/20 border-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.5)]' : 'bg-black/50 border-white/10'} transition-all duration-500`}>
             <Server className={`h-8 w-8 ${isTraining ? 'text-blue-400' : 'text-zinc-500'}`} />
           </div>
        </div>

        {/* Nodes */}
        <div className="grid grid-cols-2 gap-x-32 gap-y-12">
          {nodes.map((node, i) => (
            <div key={i} className={`flex flex-col items-center ${i % 2 === 0 ? 'items-end pr-4 text-right' : 'items-start pl-4 text-left'}`}>
               <div className={`p-3 rounded-2xl border ${node.status === 'training' ? 'bg-blue-500/20 border-blue-500/50 animate-pulse' : 'bg-white/5 border-white/10'} mb-2 backdrop-blur-md`}>
                 <Network className={`h-5 w-5 ${node.status === 'training' ? 'text-blue-400' : 'text-zinc-400'}`} />
               </div>
               <div className="font-bold text-xs text-white">{node.id}</div>
               <div className="text-[10px] text-zinc-500 font-mono">n={node.samples}</div>
            </div>
          ))}
        </div>
        
        {/* Connection Lines (visual representation) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10">
           <line x1="25%" y1="25%" x2="50%" y2="50%" stroke={isTraining && activeNode === nodes[0].id ? "#3b82f6" : "#333"} strokeWidth="2" strokeDasharray="4" />
           <line x1="75%" y1="25%" x2="50%" y2="50%" stroke={isTraining && activeNode === nodes[1].id ? "#3b82f6" : "#333"} strokeWidth="2" strokeDasharray="4" />
           <line x1="25%" y1="75%" x2="50%" y2="50%" stroke={isTraining && activeNode === nodes[2].id ? "#3b82f6" : "#333"} strokeWidth="2" strokeDasharray="4" />
           <line x1="75%" y1="75%" x2="50%" y2="50%" stroke={isTraining && activeNode === "Local Edge Server" ? "#3b82f6" : "#333"} strokeWidth="2" strokeDasharray="4" className={isTraining ? 'animate-[dash_1s_linear_infinite]' : ''} />
        </svg>

      </div>
    </div>
  );
}
