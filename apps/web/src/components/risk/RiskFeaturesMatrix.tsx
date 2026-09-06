'use client';
import { Activity, Heart, Thermometer, Droplet, FileCheck, Layers } from 'lucide-react';

export function RiskFeaturesMatrix() {
  const vitals = [
    { label: "Heart Rate", value: "104 bpm", status: "abnormal", note: "Tachycardic" },
    { label: "Blood Pressure", value: "94/58 mmHg", status: "abnormal", note: "Hypotensive" },
    { label: "Respiratory Rate", value: "24 bpm", status: "abnormal", note: "Tachypnea" },
    { label: "Oxygen Saturation", value: "92% (Room Air)", status: "abnormal", note: "Desaturating" },
    { label: "Core Temp", value: "38.8 °C", status: "abnormal", note: "Pyrexia" }
  ];

  const labs = [
    { label: "Serum Lactate", value: "3.4 mmol/L", status: "critical", note: "Ref: 0.5-2.0" },
    { label: "Creatinine", value: "2.4 mg/dL", status: "critical", note: "Baseline: 1.1" },
    { label: "Hemoglobin", value: "10.8 g/dL", status: "warning", note: "Mild Anemia" },
    { label: "Serum Sodium", value: "136 mEq/L", status: "normal", note: "Euvolemic" },
    { label: "Blood Urea Nitrogen", value: "38 mg/dL", status: "warning", note: "Elevated" },
    { label: "White Blood Cells", value: "14.6 k/uL", status: "warning", note: "Leukocytosis" }
  ];

  const history = [
    { label: "Prior Inpatient Stays (12M)", value: "2 Admissions", status: "warning" },
    { label: "Prior ED Visits (6M)", value: "3 Visits", status: "critical" },
    { label: "Charlson Index (CCI)", value: "Score 4 (CKD + T2D)", status: "warning" },
    { label: "Active Polypharmacy", value: "9 Home Prescriptions", status: "warning" },
    { label: "Length of Stay (LOS)", value: "4.5 Days Inpatient", status: "normal" }
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-neon-400" />
          <h3 className="font-bold text-white text-sm">24-Dimensional Clinical Feature Input Matrix</h3>
        </div>
        <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold">MIMIC-IV Feature Set</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Vitals Column */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">1. Telemetry Vitals</span>
          <div className="space-y-1.5">
            {vitals.map((v, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-xs">
                <div>
                  <span className="text-zinc-300 block font-medium">{v.label}</span>
                  <span className="text-[10px] text-zinc-500 font-mono">{v.note}</span>
                </div>
                <span className="font-mono font-bold text-amber-400">{v.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Labs Column */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">2. Acute Chemistry & Labs</span>
          <div className="space-y-1.5">
            {labs.map((l, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-xs">
                <div>
                  <span className="text-zinc-300 block font-medium">{l.label}</span>
                  <span className="text-[10px] text-zinc-500 font-mono">{l.note}</span>
                </div>
                <span className={`font-mono font-bold ${
                  l.status === 'critical' ? 'text-red-400' : l.status === 'warning' ? 'text-amber-400' : 'text-neon-400'
                }`}>
                  {l.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* History Column */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">3. Historical Utilization</span>
          <div className="space-y-1.5">
            {history.map((h, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-xs">
                <span className="text-zinc-300 font-medium">{h.label}</span>
                <span className={`font-mono font-bold text-[11px] ${
                  h.status === 'critical' ? 'text-red-400' : 'text-amber-400'
                }`}>
                  {h.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
