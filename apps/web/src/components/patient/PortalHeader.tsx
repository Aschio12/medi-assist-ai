'use client';
import { HeartHandshake, PhoneCall, Calendar, Activity, ShieldCheck, Pill } from 'lucide-react';

interface PortalHeaderProps {
  patientName: string;
  adherencePercentage: number;
  onEmergencyClick: () => void;
}

export function PortalHeader({ patientName, adherencePercentage, onEmergencyClick }: PortalHeaderProps) {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-neon-500/30 neon-glow relative overflow-hidden bg-gradient-to-b from-black/80 to-black/95">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Patient Greeting */}
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-neon-500/20 rounded-2xl border border-neon-500/40 text-neon-400">
            <HeartHandshake className="h-7 w-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white tracking-wide">
                Welcome back, {patientName}
              </h2>
              <span className="text-[10px] font-mono font-bold bg-neon-500/20 text-neon-300 border border-neon-500/30 px-2 py-0.5 rounded-full uppercase">
                Care Circle Active
              </span>
            </div>
            <p className="text-zinc-400 text-xs mt-0.5">
              Your personalized health hub: clear doctor notes, daily pill schedules, and 24/7 symptom triage.
            </p>
          </div>
        </div>

        {/* Adherence & Emergency Dispatch */}
        <div className="flex items-center gap-3">
          {/* Adherence Meter */}
          <div className="p-2.5 bg-black/60 border border-white/10 rounded-2xl flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-neon-500/15 border border-neon-500/30 flex items-center justify-center text-neon-400 font-bold text-xs font-mono">
              {adherencePercentage}%
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-zinc-500 font-bold block">Med Adherence</span>
              <span className="text-xs font-semibold text-zinc-200">On Track Today</span>
            </div>
          </div>

          {/* 911 Emergency Fast Button */}
          <button
            onClick={onEmergencyClick}
            className="flex items-center gap-2 px-4 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 font-bold text-xs rounded-2xl transition-all shadow-[0_0_15px_rgba(239,68,68,0.2)]"
          >
            <PhoneCall className="h-4 w-4" />
            <span>Emergency 911</span>
          </button>
        </div>
      </div>
    </div>
  );
}
