'use client';

import React, { useState, useEffect } from 'react';
import { SecurityHeaderHUD } from '@/components/security/SecurityHeaderHUD';
import { RateLimitMonitor } from '@/components/security/RateLimitMonitor';
import { Loader2, ServerCrash, ShieldCheck, FileCheck } from 'lucide-react';

export default function SecurityDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [complianceData, setComplianceData] = useState<any>(null);

  useEffect(() => {
    // Simulate fetching the SOC 2 / HIPAA compliance state from our new API route
    const fetchCompliance = async () => {
      try {
        const res = await fetch('/api/compliance/status', {
          headers: {
            'Authorization': 'Bearer simulated-vanta-token'
          }
        });
        if (res.ok) {
          const data = await res.json();
          setComplianceData(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCompliance();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-2rem)] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 text-neon-500 animate-spin" />
          <p className="text-zinc-400 font-mono text-sm animate-pulse">Initializing Security Hub...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-10">
      <SecurityHeaderHUD />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Rate Limits & Guardrails */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <RateLimitMonitor />
          
          <div className="glass-panel p-6 rounded-3xl border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <ServerCrash className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">NeMo Guardrails</h2>
                <p className="text-xs text-zinc-400">Prompt injection and jailbreak screening.</p>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3">
               <div className="flex items-center justify-between">
                 <span className="text-xs font-mono text-zinc-400">Flow: Reject Diagnosis</span>
                 <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 rounded-full border border-emerald-500/30">ACTIVE</span>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-xs font-mono text-zinc-400">Flow: Reject Jailbreak</span>
                 <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 rounded-full border border-emerald-500/30">ACTIVE</span>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-xs font-mono text-zinc-400">Flow: Redact PHI</span>
                 <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 rounded-full border border-emerald-500/30">ACTIVE</span>
               </div>
            </div>
          </div>
        </div>

        {/* Right Column: SOC 2 & HIPAA Compliance Sync */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <FileCheck className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Continuous Compliance Monitoring</h2>
              <p className="text-xs text-zinc-400">Vanta / Drata Integration (SOC 2 Type II, HIPAA)</p>
            </div>
          </div>

          <div className="space-y-4">
            {complianceData?.controls?.map((control: any) => (
              <div key={control.id} className="p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-blue-500/30 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-blue-400">{control.id}</span>
                    <span className="text-sm font-semibold text-white">{control.name}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border bg-emerald-500/20 text-emerald-400 border-emerald-500/30 flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" /> {control.status}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed pl-1">
                  Evidence: {control.evidence}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-500">
            <span>Last Vanta Sync: {complianceData ? new Date(complianceData.last_audit).toLocaleString() : 'N/A'}</span>
            <span className={complianceData?.drift_detected ? "text-red-400" : "text-blue-400"}>
              {complianceData?.drift_detected ? "DRIFT DETECTED" : "NO ARCHITECTURAL DRIFT DETECTED"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
