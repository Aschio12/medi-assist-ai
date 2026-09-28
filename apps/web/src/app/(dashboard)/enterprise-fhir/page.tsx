'use client';

import React, { useState } from 'react';
import { createFhirPatient, getFhirEverything, matchClinicalTrials, scanPharmacovigilance } from '@/app/actions/fhir';
import { FhirPatientViewer } from '@/components/fhir/FhirPatientViewer';
import { ClinicalTrialMatcher } from '@/components/fhir/ClinicalTrialMatcher';
import { AdverseEventMonitor } from '@/components/fhir/AdverseEventMonitor';
import { Database, Play, Stethoscope } from 'lucide-react';

export default function EnterpriseFhirDashboard() {
  const [patientId, setPatientId] = useState<string | null>(null);
  const [bundle, setBundle] = useState<any>(null);
  const [trialMatches, setTrialMatches] = useState<any[] | null>(null);
  const [pvSignals, setPvSignals] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const simulateIngestion = async () => {
    setIsLoading(true);
    // 1. Create a mock patient
    const mockPayload = {
      resourceType: "Patient",
      name: [{ family: "Reynolds", given: ["Malcolm"] }],
      gender: "male",
      birthDate: "1975-09-20"
    };
    
    const pRes = await createFhirPatient(mockPayload);
    if (pRes?.id) {
      setPatientId(pRes.id);
      // 2. Fetch full bundle
      const bRes = await getFhirEverything(pRes.id);
      setBundle(bRes);
    }
    setIsLoading(false);
  };

  const runAnalysis = async () => {
    if (!patientId) return;
    setIsLoading(true);
    const mRes = await matchClinicalTrials(patientId);
    if (mRes?.matches) setTrialMatches(mRes.matches);
    
    const pvRes = await scanPharmacovigilance(patientId);
    if (pvRes?.signals) setPvSignals(pvRes.signals);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-10">
      
      <div className="glass-panel p-6 rounded-3xl border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.15)] relative overflow-hidden bg-gradient-to-br from-black to-[#001133]">
        <div className="relative z-10 flex justify-between items-end">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center w-max gap-1">
              <Database className="h-3 w-3" /> Enterprise AI
            </span>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mt-2">
              HL7 FHIR Interoperability & GenAI
            </h1>
            <p className="text-xs lg:text-sm text-blue-200/60 mt-2 max-w-3xl">
              Enterprise data layer parsing HL7 FHIR R4 standard payloads. Uses LLMs to parse inclusion/exclusion criteria for Clinical Trial matching, and predictive AI pipelines for proactive Pharmacovigilance (ADR detection).
            </p>
          </div>
          <div className="flex gap-3">
             <button onClick={simulateIngestion} disabled={isLoading} className="flex items-center gap-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 border border-blue-500/50 text-sm font-bold px-4 py-2 rounded-xl transition-all">
                <Database className="h-4 w-4" /> Ingest FHIR Data
             </button>
             <button onClick={runAnalysis} disabled={isLoading || !patientId} className="flex items-center gap-2 bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 border border-purple-500/50 text-sm font-bold px-4 py-2 rounded-xl transition-all disabled:opacity-50">
                <Play className="h-4 w-4" /> Run GenAI Analysis
             </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
        {/* Left Column - FHIR Bundle */}
        <div className="h-full">
           <FhirPatientViewer bundle={bundle} />
        </div>

        {/* Right Column - AI Workloads */}
        <div className="flex flex-col gap-6 h-full">
           <div className="flex-1">
             <ClinicalTrialMatcher matches={trialMatches} />
           </div>
           <div className="flex-1">
             <AdverseEventMonitor signals={pvSignals} />
           </div>
        </div>
      </div>

    </div>
  );
}
