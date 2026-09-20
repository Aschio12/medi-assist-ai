'use client';

import React from 'react';
import { Zap, Globe } from 'lucide-react';

export function EdgeLatencyMonitor() {
  const routes = [
    { path: "/api/ai/chat", runtime: "Vercel Edge", region: "Global (sfo1, iad1, etc.)", latency: "35ms", stream: true },
    { path: "/api/auth/*", runtime: "Node.js (Serverless)", region: "iad1", latency: "120ms", stream: false },
    { path: "/api/compliance", runtime: "Node.js (Serverless)", region: "iad1", latency: "85ms", stream: false }
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
          <Zap className="h-5 w-5 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Edge Compute Routing</h2>
          <p className="text-xs text-zinc-400">Zero-latency API route distributions</p>
        </div>
      </div>

      <div className="space-y-3">
        {routes.map(r => (
          <div key={r.path} className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/5">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono font-bold text-white">{r.path}</span>
                {r.stream && (
                  <span className="text-[9px] bg-cyan-500/20 text-cyan-400 px-1.5 py-0.5 rounded border border-cyan-500/30">
                    STREAMING
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono">
                <span>{r.runtime}</span>
                <span>•</span>
                <span className="flex items-center gap-0.5"><Globe className="h-3 w-3" /> {r.region}</span>
              </div>
            </div>
            
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-zinc-500 font-mono mb-1">P95 Latency</span>
              <span className={`text-lg font-mono font-bold ${r.runtime.includes('Edge') ? 'text-neon-400' : 'text-zinc-300'}`}>
                {r.latency}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
