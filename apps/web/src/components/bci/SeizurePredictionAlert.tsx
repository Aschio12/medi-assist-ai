'use client';

import React from 'react';
import { BrainCircuit, AlertTriangle, CheckCircle2 } from 'lucide-react';

export function SeizurePredictionAlert({ predictionData }: { predictionData: any }) {
  const status = predictionData?.clinical_status || "AWAITING_EPOCH";
  
  let bgColor = "bg-white/5 border-white/10";
  let textColor = "text-zinc-500";
  let icon = <BrainCircuit className="h-6 w-6 text-zinc-500" />;
  
  if (status === "NORMAL") {
    bgColor = "bg-teal-500/10 border-teal-500/30 shadow-[0_0_15px_rgba(45,212,191,0.1)]";
    textColor = "text-teal-400";
    icon = <CheckCircle2 className="h-6 w-6 text-teal-400" />;
  } else if (status === "ELEVATED_RISK") {
    bgColor = "bg-orange-500/10 border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.1)]";
    textColor = "text-orange-400";
    icon = <AlertTriangle className="h-6 w-6 text-orange-400" />;
  } else if (status === "PRE_ICTAL_WARNING") {
    bgColor = "bg-red-500/20 border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.3)] animate-pulse";
    textColor = "text-red-400 font-bold";
    icon = <AlertTriangle className="h-6 w-6 text-red-500" />;
  }

  return (
    <div className={`p-5 rounded-2xl border transition-all duration-300 h-full flex flex-col justify-center ${bgColor}`}>
      <div className="flex items-start justify-between">
         <div className="flex items-center gap-3">
           {icon}
           <div>
             <div className="text-[10px] font-mono text-zinc-400 tracking-wider">NEURAL DECODER STATUS</div>
             <div className={`text-lg ${textColor}`}>
               {status.replace(/_/g, ' ')}
             </div>
           </div>
         </div>
         
         {predictionData?.seizure_risk_probability !== undefined && (
            <div className="text-right">
              <div className="text-[10px] font-mono text-zinc-400 tracking-wider">SEIZURE PROBABILITY</div>
              <div className={`text-2xl font-mono ${textColor}`}>
                {predictionData.seizure_risk_probability}%
              </div>
            </div>
         )}
      </div>

      {predictionData?.estimated_time_to_onset_sec && (
         <div className="mt-4 pt-4 border-t border-red-500/20 flex justify-between items-center text-sm">
           <span className="text-red-400/80 font-mono">ESTIMATED ONSET:</span>
           <span className="text-red-400 font-bold font-mono">
             {Math.floor(predictionData.estimated_time_to_onset_sec / 60)}m {predictionData.estimated_time_to_onset_sec % 60}s
           </span>
         </div>
      )}
      
      {predictionData?.decoder_attention_head && (
         <div className="mt-2 text-xs text-zinc-500 font-mono">
           Attention Focus: {predictionData.decoder_attention_head}
         </div>
      )}
    </div>
  );
}
