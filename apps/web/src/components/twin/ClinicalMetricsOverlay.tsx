import { Activity, Thermometer, Wind, Droplets } from 'lucide-react';

export function ClinicalMetricsOverlay() {
  return (
    <div className="glass-panel rounded-3xl p-6">
      <h3 className="text-sm uppercase tracking-widest text-zinc-500 font-bold mb-4">Live Telemetry</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <Activity className="h-4 w-4 text-neon-400 mb-2" />
          <div className="text-2xl font-bold text-white font-mono">112</div>
          <div className="text-[10px] text-zinc-400 uppercase">Heart Rate (bpm)</div>
        </div>
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4">
          <Droplets className="h-4 w-4 text-red-400 mb-2" />
          <div className="text-2xl font-bold text-red-400 font-mono">88/54</div>
          <div className="text-[10px] text-red-400/80 uppercase">Blood Pressure</div>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4">
          <Thermometer className="h-4 w-4 text-amber-400 mb-2" />
          <div className="text-2xl font-bold text-amber-400 font-mono">38.4</div>
          <div className="text-[10px] text-amber-400/80 uppercase">Temp (°C)</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <Wind className="h-4 w-4 text-neon-400 mb-2" />
          <div className="text-2xl font-bold text-white font-mono">24</div>
          <div className="text-[10px] text-zinc-400 uppercase">Resp Rate</div>
        </div>
      </div>
    </div>
  );
}
