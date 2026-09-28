'use client';

import React, { useState } from 'react';
import { decodeEegEpoch } from '@/app/actions/bci';
import { EegStreamVisualizer } from '@/components/bci/EegStreamVisualizer';
import { BrainTopologyMap } from '@/components/bci/BrainTopologyMap';
import { SeizurePredictionAlert } from '@/components/bci/SeizurePredictionAlert';
import { BrainCircuit } from 'lucide-react';

export default function BciDashboard() {
  const [featuresData, setFeaturesData] = useState<any>(null);
  const [predictionData, setPredictionData] = useState<any>(null);

  const handleEpochBuffered = async (epochBuffer: any[]) => {
    // Send 5-second epoch buffer to BCI Engine for MNE artifact rejection + Transformer decoding
    const res = await decodeEegEpoch("PATIENT-77812", epochBuffer);
    if (res?.status === "success") {
      setFeaturesData(res.features);
      setPredictionData(res.prediction);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-10">
      
      <div className="glass-panel p-6 rounded-3xl border border-teal-500/30 shadow-[0_0_30px_rgba(45,212,191,0.15)] relative overflow-hidden bg-gradient-to-br from-black to-[#062123]">
        <div className="relative z-10">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center w-max gap-1">
            <BrainCircuit className="h-3 w-3" /> Frontier Tech
          </span>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-teal-200 bg-clip-text text-transparent mt-2">
            Brain-Computer Interface (BCI) Telemetry
          </h1>
          <p className="text-xs lg:text-sm text-teal-200/60 mt-2 max-w-3xl">
            Live neural decoding and seizure prediction. Streams continuous 10-20 EEG data, filters artifacts using MNE-Python ICA, and runs PyTorch Vision-Transformer inference for pre-ictal warnings.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
        {/* Left/Center Column - Live Stream */}
        <div className="lg:col-span-2 h-full">
           <EegStreamVisualizer onEpochBuffered={handleEpochBuffered} />
        </div>

        {/* Right Column - Topology & Alerts */}
        <div className="flex flex-col gap-6 h-full">
           <div className="flex-none h-[180px]">
             <SeizurePredictionAlert predictionData={predictionData} />
           </div>
           <div className="flex-1">
             <BrainTopologyMap features={featuresData} />
           </div>
        </div>
      </div>

    </div>
  );
}
