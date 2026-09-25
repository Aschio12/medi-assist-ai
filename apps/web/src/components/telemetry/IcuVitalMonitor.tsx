'use client';

import React, { useEffect, useState } from 'react';
import { HeartPulse, Wind, Stethoscope } from 'lucide-react';

export function IcuVitalMonitor() {
  const [vitals, setVitals] = useState({ hr: 0, spo2: 0 });
  const [device, setDevice] = useState('Awaiting connection...');

  useEffect(() => {
    // Connect to WebSocket Telemetry Engine
    const ws = new WebSocket('ws://localhost:8015/ws/telemetry');
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.vitals) {
        setVitals({
           hr: data.vitals.hr,
           spo2: data.vitals.spo2
        });
        setDevice(`${data.device} (${data.patient_id})`);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-neon-500/10 border border-neon-500/20">
              <Stethoscope className="h-5 w-5 text-neon-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">ICU Vitals</h2>
              <p className="text-xs text-zinc-400">Live IoMT Telemetry</p>
            </div>
          </div>
          <div className="text-[10px] font-mono text-neon-400 bg-neon-500/10 px-2 py-1 rounded-lg border border-neon-500/20">
            {device}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-black/40 border border-white/5 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
           <HeartPulse className="h-6 w-6 text-rose-500 mb-2 opacity-50 absolute right-4 top-4" />
           <span className="text-xs text-zinc-400 font-bold mb-1 z-10">Heart Rate</span>
           <span className={`text-4xl font-mono font-bold z-10 ${vitals.hr > 115 ? 'text-rose-500 animate-pulse' : 'text-white'}`}>
             {vitals.hr || '--'}
           </span>
           <span className="text-[10px] text-zinc-500 font-mono mt-1 z-10">BPM</span>
        </div>
        
        <div className="p-4 bg-black/40 border border-white/5 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
           <Wind className="h-6 w-6 text-cyan-500 mb-2 opacity-50 absolute right-4 top-4" />
           <span className="text-xs text-zinc-400 font-bold mb-1 z-10">SpO2</span>
           <span className={`text-4xl font-mono font-bold z-10 ${vitals.spo2 < 92 && vitals.spo2 > 0 ? 'text-rose-500 animate-pulse' : 'text-white'}`}>
             {vitals.spo2 || '--'}
           </span>
           <span className="text-[10px] text-zinc-500 font-mono mt-1 z-10">%</span>
        </div>
      </div>
    </div>
  );
}
