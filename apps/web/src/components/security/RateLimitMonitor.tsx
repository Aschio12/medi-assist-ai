'use client';

import React from 'react';
import { Activity, ShieldAlert, Cpu } from 'lucide-react';

export function RateLimitMonitor() {
  const limits = [
    {
      id: "Global API",
      algorithm: "Sliding Window",
      limit: "100 req / 10s",
      current_load: 12,
      status: "HEALTHY",
      color: "cyan"
    },
    {
      id: "AI Generation",
      algorithm: "Token Bucket",
      limit: "10 req / 1m",
      current_load: 3,
      status: "HEALTHY",
      color: "neon"
    },
    {
      id: "Auth Endpoints",
      algorithm: "Fixed Window",
      limit: "5 attempts / 15m",
      current_load: 0,
      status: "IDLE",
      color: "emerald"
    }
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
          <Activity className="h-5 w-5 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Upstash Edge Rate Limiting</h2>
          <p className="text-xs text-zinc-400">Live request monitoring and mitigation rules.</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {limits.map(rule => (
          <div key={rule.id} className="p-4 rounded-2xl border bg-black/40 border-white/5 hover:border-cyan-500/30 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-white">{rule.id}</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border bg-${rule.color}-500/20 text-${rule.color}-400 border-${rule.color}-500/30`}>
                {rule.status}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-3.5 w-3.5 text-zinc-500" />
                  <span className="text-xs text-zinc-400">Algorithm</span>
                </div>
                <span className="text-xs font-mono text-zinc-300">
                  {rule.algorithm}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cpu className="h-3.5 w-3.5 text-zinc-500" />
                  <span className="text-xs text-zinc-400">Enforcement Limit</span>
                </div>
                <span className="text-xs font-mono text-white">
                  {rule.limit}
                </span>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-white/5">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] text-zinc-500 font-mono">Current Load (Est)</span>
                <span className="text-[10px] text-cyan-400 font-mono">{rule.current_load}%</span>
              </div>
              <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-cyan-500 rounded-full`}
                  style={{ width: `${rule.current_load}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
