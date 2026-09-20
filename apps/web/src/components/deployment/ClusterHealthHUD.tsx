'use client';

import React from 'react';
import { Server, Activity, ArrowUpRight, Cpu } from 'lucide-react';

export function ClusterHealthHUD() {
  const clusters = [
    { name: "eval-engine", region: "aws-us-east-1", replicas: 5, targetReplicas: 5, cpuAvg: "62%", status: "HEALTHY", color: "emerald" },
    { name: "compliance-engine", region: "aws-us-east-1", replicas: 3, targetReplicas: 3, cpuAvg: "28%", status: "HEALTHY", color: "emerald" },
    { name: "presidio-phi", region: "gcp-us-central1", replicas: 2, targetReplicas: 2, cpuAvg: "15%", status: "HEALTHY", color: "cyan" }
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-neon-500/10 border border-neon-500/20 shadow-[0_0_15px_rgba(163,230,53,0.15)]">
            <Server className="h-5 w-5 text-neon-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Kubernetes High Availability</h2>
            <p className="text-xs text-zinc-400">EKS & GKE Microservice Deployments</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-500"></span>
          </span>
          <span className="text-xs font-mono text-neon-400">HPA ACTIVE</span>
        </div>
      </div>

      <div className="space-y-4">
        {clusters.map(cluster => (
          <div key={cluster.name} className="p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-white/10 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">{cluster.name}</span>
                <span className="text-[9px] font-mono uppercase bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded">
                  {cluster.region}
                </span>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border bg-${cluster.color}-500/20 text-${cluster.color}-400 border-${cluster.color}-500/30 flex items-center gap-1`}>
                <Activity className="h-3 w-3" /> {cluster.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-zinc-900 border border-white/5">
                  <Cpu className="h-3.5 w-3.5 text-zinc-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-500 font-mono">CPU Util (HPA)</span>
                  <span className="text-xs font-mono text-white">{cluster.cpuAvg}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-zinc-900 border border-white/5">
                  <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-500 font-mono">Replicas</span>
                  <span className="text-xs font-mono text-white">{cluster.replicas} / {cluster.targetReplicas}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
