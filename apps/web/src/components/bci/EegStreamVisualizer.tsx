'use client';

import React, { useEffect, useState } from 'react';
import { Activity, Radio } from 'lucide-react';

export function EegStreamVisualizer({ onEpochBuffered }: { onEpochBuffered: (buffer: any[]) => void }) {
  const [eegHistory, setEegHistory] = useState<any[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // In a real app, this would connect to wss://...
    // We'll simulate a 10Hz stream
    setIsConnected(true);
    let count = 0;
    
    const interval = setInterval(() => {
      count++;
      const newData = {
        Fp1: Math.sin(count * 0.1) * 20 + (Math.random() * 10 - 5),
        Fp2: Math.sin(count * 0.1 + 0.5) * 20 + (Math.random() * 10 - 5),
        C3: Math.cos(count * 0.2) * 15 + (Math.random() * 8 - 4),
        C4: Math.cos(count * 0.2 + 0.3) * 15 + (Math.random() * 8 - 4)
      };
      
      setEegHistory(prev => {
        const next = [...prev, newData].slice(-50); // Keep last 50 data points
        
        // Trigger inference every 50 frames (simulated 5-second epoch)
        if (count % 50 === 0) {
          onEpochBuffered(next);
        }
        return next;
      });
      
    }, 100); // 10Hz

    return () => clearInterval(interval);
  }, [onEpochBuffered]);

  const channels = ["Fp1", "Fp2", "C3", "C4"];

  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/20">
            <Activity className="h-5 w-5 text-teal-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Live Cortical Telemetry</h2>
            <p className="text-xs text-zinc-400">10-20 System EEG Stream</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
           <Radio className={`h-3 w-3 ${isConnected ? 'text-teal-400 animate-pulse' : 'text-red-500'}`} />
           <span className="text-[10px] font-mono text-zinc-300">{isConnected ? 'WS CONNECTED' : 'OFFLINE'}</span>
        </div>
      </div>
      
      <div className="flex-1 bg-[#121212] rounded-xl border border-white/5 p-4 flex flex-col gap-2 overflow-hidden">
        {channels.map((ch, idx) => (
          <div key={ch} className="flex-1 flex flex-col relative border-b border-white/5 last:border-0">
             <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[10px] font-mono text-teal-300 w-8 z-10 bg-[#121212] py-1">
               {ch}
             </div>
             <div className="flex-1 flex items-center pl-10 h-full">
               {eegHistory.length > 0 && (
                 <svg className="w-full h-full preserve-3d" viewBox="0 0 500 100" preserveAspectRatio="none">
                    <polyline 
                      points={eegHistory.map((d, i) => `${i * 10},${50 - (d[ch as keyof typeof d] || 0)}`).join(' ')}
                      fill="none"
                      stroke={idx % 2 === 0 ? "#2dd4bf" : "#818cf8"} // Alternating teal/indigo
                      strokeWidth="2"
                      className="transition-all duration-75"
                    />
                 </svg>
               )}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
