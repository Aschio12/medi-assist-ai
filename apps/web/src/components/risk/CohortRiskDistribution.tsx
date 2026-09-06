'use client';
import { CohortRiskSummary } from '@/app/actions/risk_stratification';
import { Users, AlertTriangle, ShieldCheck, DollarSign } from 'lucide-react';

interface CohortRiskDistributionProps {
  cohort: CohortRiskSummary;
}

export function CohortRiskDistribution({ cohort }: CohortRiskDistributionProps) {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-neon-400" />
          <h3 className="font-bold text-white text-sm">
            Inpatient Unit Population Risk Stratification ({cohort.total_inpatient_census} Patients)
          </h3>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px]">
          <span className="text-zinc-500">Projected Unit Annual HRRP Penalty:</span>
          <span className="text-red-400 font-bold font-mono">
            ${cohort.projected_annual_hrrp_penalty.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Cohort Stats Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-2xl">
          <span className="text-[10px] font-mono uppercase text-red-400 font-bold block">Critical Risk</span>
          <span className="text-xl font-bold font-mono text-white mt-0.5 block">{cohort.high_risk_count}</span>
          <span className="text-[10px] text-zinc-500 font-mono">30D Readmission &gt; 70%</span>
        </div>

        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl">
          <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">Elevated Risk</span>
          <span className="text-xl font-bold font-mono text-white mt-0.5 block">{cohort.moderate_risk_count}</span>
          <span className="text-[10px] text-zinc-500 font-mono">30D Readmission 25-69%</span>
        </div>

        <div className="p-3 bg-neon-500/10 border border-neon-500/30 rounded-2xl">
          <span className="text-[10px] font-mono uppercase text-neon-400 font-bold block">Low Risk</span>
          <span className="text-xl font-bold font-mono text-white mt-0.5 block">{cohort.low_risk_count}</span>
          <span className="text-[10px] text-zinc-500 font-mono">Routine Discharge Protocol</span>
        </div>

        <div className="p-3 bg-white/5 border border-white/10 rounded-2xl">
          <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">Mean Unit Probability</span>
          <span className="text-xl font-bold font-mono text-cyan-400 mt-0.5 block">{cohort.average_readmission_probability}%</span>
          <span className="text-[10px] text-zinc-500 font-mono">Hospital Target &lt; 22%</span>
        </div>
      </div>

      {/* Patients Table */}
      <div className="overflow-x-auto pt-2">
        <table className="w-full text-left text-xs border border-white/5 rounded-2xl overflow-hidden">
          <thead className="bg-white/5 text-neon-400 font-mono uppercase font-bold text-[11px]">
            <tr>
              <th className="p-3">Patient</th>
              <th className="p-3">Room</th>
              <th className="p-3">Primary Diagnosis</th>
              <th className="p-3">Risk %</th>
              <th className="p-3">Tier</th>
              <th className="p-3">Primary SHAP Driver</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-black/40 text-zinc-300 font-medium">
            {cohort.patients.map((p) => {
              const isCrit = p.risk_tier === 'CRITICAL_HIGH';
              const isElev = p.risk_tier === 'ELEVATED';

              return (
                <tr key={p.patient_id} className="hover:bg-white/5 transition-colors">
                  <td className="p-3 font-bold text-white">
                    {p.patient_name} <span className="text-[10px] font-mono text-zinc-500 font-normal">({p.patient_id})</span>
                  </td>
                  <td className="p-3 font-mono text-zinc-400">
                    {p.room_number}
                  </td>
                  <td className="p-3 text-zinc-300">
                    {p.primary_condition}
                  </td>
                  <td className="p-3 font-mono font-bold">
                    <span className={isCrit ? "text-red-400" : isElev ? "text-amber-400" : "text-neon-400"}>
                      {p.readmission_risk_percent}%
                    </span>
                  </td>
                  <td className="p-3 font-mono">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${
                      isCrit
                        ? 'bg-red-500/20 text-red-300 border-red-500/40'
                        : isElev
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-neon-500/20 text-neon-300 border-neon-500/40'
                    }`}>
                      {p.risk_tier.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-[11px] text-zinc-400">
                    {p.top_driver}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
