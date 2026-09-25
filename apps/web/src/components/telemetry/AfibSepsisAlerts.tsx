'use client';

import React, { useEffect, useState } from 'react';
import { AlertOctagon, BrainCircuit } from 'lucide-react';

export function AfibSepsisAlerts() {
  const [anomaly, setAnomaly] = useState<any>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8015/ws/telemetry');
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.ml_analysis && data.ml_analysis.is_anomaly) {
        setAnomaly(data.ml_analysis);
      } else {
        setAnomaly(null);
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
            <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20">
              <BrainCircuit className="h-5 w-5 text-orange-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">ML Early Warning</h2>
              <p className="text-xs text-zinc-400">LSTM Time-Series Anomaly Detection</p>
            </div>
          </div>
        </div>
      </div>
      
      {anomaly ? (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl animate-pulse">
           <div className="flex items-center gap-3 mb-2">
             <AlertOctagon className="h-5 w-5 text-rose-500" />
             <span className="text-sm font-bold text-rose-500">{anomaly.alert_type.replace(/_/g, ' ')}</span>
           </div>
           <div className="text-xs text-rose-200">
             Critical anomaly detected in real-time telemetry stream. Immediate assessment required.
           </div>
           <div className="mt-3 flex items-center justify-between">
             <span className="text-[10px] font-mono bg-rose-500/20 text-rose-300 px-2 py-1 rounded">
               CONFIDENCE: {(anomaly.confidence * 100).toFixed(1)}%
             </span>
             <button className="text-xs font-bold bg-rose-500 text-white px-3 py-1 rounded hover:bg-rose-600 transition-colors">
               Acknowledge
             </button>
           </div>
        </div>
      ) : (
        <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl flex flex-col items-center justify-center py-8">
           <span className="relative flex h-4 w-4 mb-3">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
           </span>
           <span className="text-sm font-bold text-emerald-500">Telemetry Baseline Stable</span>
           <span className="text-xs text-zinc-500 mt-1">No AFib or Hypoxia signatures detected</span>
        </div>
      )}
    </div>
  );
}
