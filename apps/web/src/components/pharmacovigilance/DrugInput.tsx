'use client';

import React, { useState } from 'react';
import { Pill, Plus, Activity } from 'lucide-react';

export function DrugInput({ onAnalyze }: { onAnalyze: (drugs: string[], conditions: string[]) => void }) {
  const [drugs, setDrugs] = useState<string[]>(["Lisinopril", "Ibuprofen", "Aspirin"]);
  const [conditions, setConditions] = useState<string[]>(["Hypertension"]);
  
  const [newDrug, setNewDrug] = useState("");
  const [newCondition, setNewCondition] = useState("");

  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <Pill className="h-5 w-5 text-blue-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Patient Profile</h2>
          <p className="text-xs text-zinc-400">Medications & Comorbidities</p>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col gap-6">
         {/* Drugs */}
         <div>
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase mb-2">Active Medications</h3>
            <div className="flex flex-wrap gap-2 mb-2">
               {drugs.map(d => (
                 <span key={d} className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-bold">
                   {d}
                 </span>
               ))}
            </div>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={newDrug} 
                onChange={(e) => setNewDrug(e.target.value)}
                placeholder="Add drug..." 
                className="flex-1 bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-blue-500/50"
              />
              <button 
                onClick={() => { if(newDrug) { setDrugs([...drugs, newDrug]); setNewDrug(""); } }}
                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-2 transition-colors"
              ><Plus className="h-4 w-4 text-zinc-300" /></button>
            </div>
         </div>

         {/* Conditions */}
         <div>
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase mb-2">Pre-existing Conditions</h3>
            <div className="flex flex-wrap gap-2 mb-2">
               {conditions.map(c => (
                 <span key={c} className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full text-xs font-bold">
                   {c}
                 </span>
               ))}
            </div>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={newCondition} 
                onChange={(e) => setNewCondition(e.target.value)}
                placeholder="Add condition..." 
                className="flex-1 bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-purple-500/50"
              />
              <button 
                onClick={() => { if(newCondition) { setConditions([...conditions, newCondition]); setNewCondition(""); } }}
                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-2 transition-colors"
              ><Plus className="h-4 w-4 text-zinc-300" /></button>
            </div>
         </div>

         <div className="mt-auto pt-4">
           <button 
             onClick={() => onAnalyze(drugs, conditions)}
             className="w-full flex items-center justify-center gap-2 bg-red-600/20 hover:bg-red-600/40 text-red-300 border border-red-500/50 text-sm font-bold px-4 py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(239,68,68,0.2)]"
           >
             <Activity className="h-4 w-4" /> Run PV Risk Assessment
           </button>
         </div>
      </div>
    </div>
  );
}
