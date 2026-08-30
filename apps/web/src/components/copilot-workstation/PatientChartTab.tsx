'use client';
import { PatientChartSummary } from '@/app/actions/physician_copilot';
import { User, Heart, Activity, AlertTriangle, Pill, ShieldAlert, FileText } from 'lucide-react';

interface PatientChartTabProps {
  chart: PatientChartSummary;
}

export function PatientChartTab({ chart }: PatientChartTabProps) {
  return (
    <div className="space-y-4 text-xs overflow-y-auto pr-1">
      {/* Patient Header Card */}
      <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-neon-500/20 rounded-xl border border-neon-500/30 text-neon-400">
            <User className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">{chart.name}</h4>
            <p className="text-[10px] font-mono text-zinc-400">{chart.patient_id} • {chart.age} y/o {chart.gender} • Inpatient Ward 3B</p>
          </div>
        </div>

        <span className="text-[10px] font-mono font-bold bg-red-500/20 text-red-400 border border-red-500/30 px-2.5 py-1 rounded-full uppercase">
          CODE STATUS: FULL CODE
        </span>
      </div>

      {/* Real-time Vitals Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="p-3 bg-black/60 rounded-xl border border-white/5">
          <span className="text-[10px] font-mono text-zinc-500 block uppercase">Blood Pressure</span>
          <span className="text-sm font-mono font-bold text-red-400">{chart.vitals.blood_pressure}</span>
        </div>
        <div className="p-3 bg-black/60 rounded-xl border border-white/5">
          <span className="text-[10px] font-mono text-zinc-500 block uppercase">Heart Rate</span>
          <span className="text-sm font-mono font-bold text-amber-400">{chart.vitals.heart_rate} bpm</span>
        </div>
        <div className="p-3 bg-black/60 rounded-xl border border-white/5">
          <span className="text-[10px] font-mono text-zinc-500 block uppercase">Serum Lactate</span>
          <span className="text-sm font-mono font-bold text-neon-400">{chart.vitals.lactate} mmol/L</span>
        </div>
        <div className="p-3 bg-black/60 rounded-xl border border-white/5">
          <span className="text-[10px] font-mono text-zinc-500 block uppercase">Creatinine / eGFR</span>
          <span className="text-sm font-mono font-bold text-purple-400">{chart.vitals.creatinine} / {chart.vitals.egfr}</span>
        </div>
      </div>

      {/* Allergies & Safety Warnings */}
      <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-2xl space-y-1.5">
        <div className="flex items-center gap-2 text-red-400 font-mono font-bold text-[11px] uppercase">
          <ShieldAlert className="h-4 w-4" />
          <span>Documented Severe Allergies</span>
        </div>
        {chart.allergies.map((all, idx) => (
          <div key={idx} className="text-xs text-red-200 flex items-start gap-1.5">
            <span className="text-red-400 font-bold">•</span>
            <span>{all}</span>
          </div>
        ))}
      </div>

      {/* Active Problem List */}
      <div className="p-4 bg-black/40 border border-white/5 rounded-2xl space-y-2">
        <span className="text-[10px] font-mono uppercase font-bold text-zinc-400 block">Active Problem List</span>
        <div className="space-y-1.5">
          {chart.active_diagnoses.map((diag, idx) => (
            <div key={idx} className="p-2 bg-white/5 rounded-xl text-zinc-200 flex items-center justify-between">
              <span>{diag}</span>
              <span className="text-[9px] font-mono text-neon-400 uppercase font-bold">Active</span>
            </div>
          ))}
        </div>
      </div>

      {/* Current Medications & Holds */}
      <div className="p-4 bg-black/40 border border-white/5 rounded-2xl space-y-2">
        <span className="text-[10px] font-mono uppercase font-bold text-zinc-400 block">Current Inpatient Medications</span>
        <div className="space-y-1.5">
          {chart.current_medications.map((med, idx) => (
            <div key={idx} className="p-2 bg-white/5 rounded-xl text-zinc-300 flex items-center justify-between">
              <span>{med}</span>
              <Pill className="h-3.5 w-3.5 text-zinc-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
