'use client';
import { useState } from 'react';
import { DischargeIntervention } from '@/app/actions/risk_stratification';
import { ShieldCheck, Check, Plus, Video, Pill, Radio, Calendar, ExternalLink } from 'lucide-react';

interface DischargeInterventionsProps {
  interventions: DischargeIntervention[];
  onToggleOrder: (id: string) => void;
}

export function DischargeInterventions({ interventions, onToggleOrder }: DischargeInterventionsProps) {
  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'TELEHEALTH':
        return <Video className="h-4 w-4 text-neon-400" />;
      case 'PHARMACY':
        return <Pill className="h-4 w-4 text-purple-400" />;
      case 'RPM':
        return <Radio className="h-4 w-4 text-cyan-400" />;
      default:
        return <Calendar className="h-4 w-4 text-amber-400" />;
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-neon-400" />
          <h3 className="font-bold text-white text-sm">
            Evidence-Based Discharge Care Bundles
          </h3>
        </div>
        <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold">CMS HRRP Mitigations</span>
      </div>

      <div className="space-y-3">
        {interventions.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              item.is_ordered
                ? 'bg-neon-500/10 border-neon-500/30'
                : 'bg-black/40 border-white/5 hover:border-white/20'
            }`}
          >
            {/* Left: Info */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-white/5">
                  {getCategoryIcon(item.category)}
                </div>
                <h4 className="text-xs font-bold text-white">
                  {item.title}
                </h4>
                <span className="text-[10px] font-mono font-bold text-neon-400 bg-neon-500/10 px-2 py-0.5 rounded">
                  -{item.projected_risk_reduction_percent}% Risk
                </span>
              </div>

              <p className="text-[11px] text-zinc-300 leading-relaxed font-normal">
                {item.description}
              </p>

              <p className="text-[10px] font-mono text-zinc-500 pt-0.5">
                Evidence: <span className="text-zinc-400">{item.evidence_base}</span>
              </p>
            </div>

            {/* Right: Order Toggle Button */}
            <button
              onClick={() => onToggleOrder(item.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                item.is_ordered
                  ? 'bg-neon-500 text-black shadow-[0_0_10px_rgba(163,230,53,0.3)]'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
              }`}
            >
              {item.is_ordered ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
              <span>{item.is_ordered ? 'Ordered In Care Plan' : '1-Click Add Order'}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
