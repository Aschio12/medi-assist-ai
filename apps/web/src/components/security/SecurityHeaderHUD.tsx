'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Activity, 
  FileCheck,
  ServerCrash
} from 'lucide-react';

export function SecurityHeaderHUD() {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-neon-500/30 neon-glow relative overflow-hidden bg-gradient-to-b from-black/80 to-black/95">
      <div className="absolute top-0 left-1/4 w-96 h-32 bg-neon-500/10 blur-[90px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-96 h-28 bg-emerald-500/10 blur-[90px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl border bg-neon-500/20 border-neon-500/40 shadow-[0_0_20px_rgba(163,230,53,0.2)]">
              <ShieldCheck className="h-7 w-7 text-neon-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-neon-500/20 text-neon-300 border border-neon-500/30">
                  Enterprise Security Operations
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                  SOC 2 TYPE II ACTIVE
                </span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent mt-1">
                WAF, Compliance & Penetration Defense
              </h1>
            </div>
          </div>
          <p className="text-xs lg:text-sm text-zinc-400 mt-2 max-w-3xl leading-relaxed">
            Real-time monitoring of Cloudflare WAF, Upstash Redis rate limiting, NeMo Guardrails prompt injection defenses, and continuous compliance synchronization (Vanta/Drata).
          </p>
        </div>
      </div>

      {/* Top Quick Telemetry Cards */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
        
        {/* WAF Status */}
        <div className="p-4 rounded-2xl bg-black/50 border border-white/10 hover:border-neon-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold">
              Cloudflare WAF
            </span>
            <Lock className="h-3.5 w-3.5 text-neon-400" />
          </div>
          <div className="text-xl font-bold font-mono text-white mt-1.5 flex items-center gap-2">
            ACTIVE
          </div>
          <span className="text-[10px] font-mono text-neon-400 flex items-center gap-1 mt-1">
            0 threats blocked (last 1h)
          </span>
        </div>

        {/* Rate Limiting */}
        <div className="p-4 rounded-2xl bg-black/50 border border-white/10 hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold">
              Edge Rate Limiting
            </span>
            <Activity className="h-3.5 w-3.5 text-cyan-400" />
          </div>
          <div className="text-xl font-bold font-mono text-cyan-400 mt-1.5 flex items-center gap-2">
            STABLE
          </div>
          <span className="text-[10px] font-mono text-zinc-500 mt-1 block">
            Upstash Redis + Token Bucket
          </span>
        </div>

        {/* Guardrails */}
        <div className="p-4 rounded-2xl bg-black/50 border border-white/10 hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold">
              NeMo Guardrails
            </span>
            <ServerCrash className="h-3.5 w-3.5 text-emerald-400" />
          </div>
          <div className="text-xl font-bold font-mono mt-1.5 text-emerald-400">
            ENFORCED
          </div>
          <span className="text-[10px] font-mono text-zinc-500 mt-1 block">
            0 prompt injections detected
          </span>
        </div>

        {/* Compliance */}
        <div className="p-4 rounded-2xl bg-black/50 border border-white/10 hover:border-blue-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold">
              Vanta / Drata Sync
            </span>
            <FileCheck className="h-3.5 w-3.5 text-blue-400" />
          </div>
          <div className="text-xl font-bold font-mono text-blue-400 mt-1.5 flex items-center gap-1.5">
            NO DRIFT
          </div>
          <span className="text-[10px] font-mono text-zinc-500 mt-1 block">
            HIPAA & SOC 2 Continuous Check
          </span>
        </div>
      </div>
    </div>
  );
}
