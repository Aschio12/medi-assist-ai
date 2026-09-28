'use client';

import React from 'react';
import { Database, User, Activity } from 'lucide-react';

export function FhirPatientViewer({ bundle }: { bundle: any }) {
  if (!bundle) {
    return (
      <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col items-center justify-center text-zinc-500">
        <Database className="h-10 w-10 mb-3 opacity-50" />
        <p className="text-sm font-mono uppercase">Awaiting FHIR Patient Record</p>
      </div>
    );
  }

  const patient = bundle.entry?.find((e: any) => e.resource.resourceType === 'Patient')?.resource;
  const observations = bundle.entry?.filter((e: any) => e.resource.resourceType === 'Observation') || [];

  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <Database className="h-5 w-5 text-blue-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">HL7 FHIR Bundle Viewer</h2>
          <p className="text-xs text-zinc-400">Standardized Electronic Health Record</p>
        </div>
      </div>

      <div className="flex-1 overflow-auto space-y-6 pr-2">
        {patient && (
          <div className="bg-black/40 border border-white/5 rounded-xl p-4">
             <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
                <User className="h-4 w-4 text-blue-400" />
                <h3 className="font-mono text-sm text-white font-bold">Patient Resource</h3>
             </div>
             <pre className="text-[10px] text-zinc-400 font-mono overflow-x-auto whitespace-pre-wrap">
               {JSON.stringify(patient, null, 2)}
             </pre>
          </div>
        )}

        {observations.length > 0 && (
          <div className="bg-black/40 border border-white/5 rounded-xl p-4">
             <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
                <Activity className="h-4 w-4 text-blue-400" />
                <h3 className="font-mono text-sm text-white font-bold">Observation Resources ({observations.length})</h3>
             </div>
             <div className="space-y-4">
               {observations.map((obs: any, i: number) => (
                 <pre key={i} className="text-[10px] text-zinc-400 font-mono overflow-x-auto whitespace-pre-wrap bg-black/50 p-3 rounded-lg border border-white/5">
                   {JSON.stringify(obs.resource, null, 2)}
                 </pre>
               ))}
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
