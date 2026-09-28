'use client';

import React, { useState } from 'react';
import { synthesizeMedicalImage, superResolveImage } from '@/app/actions/imaging_gen';
import { SyntheticDataGenerator } from '@/components/imaging-gen/SyntheticDataGenerator';
import { SuperResolutionEnhancer } from '@/components/imaging-gen/SuperResolutionEnhancer';
import { ImageComparisonViewer } from '@/components/imaging-gen/ImageComparisonViewer';
import { ImageIcon } from 'lucide-react';

export default function ImagingGenDashboard() {
  const [resultData, setResultData] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mode, setMode] = useState<'synthesize' | 'super-resolve'>('synthesize');

  const handleSynthesize = async (modality: string, anatomy: string, pathology: string) => {
    setIsProcessing(true);
    setMode('synthesize');
    setResultData(null);
    
    const res = await synthesizeMedicalImage(modality, anatomy, pathology);
    if (res?.status === "success") {
      setResultData(res.data);
    }
    setIsProcessing(false);
  };

  const handleSuperResolve = async (imageId: string) => {
    setIsProcessing(true);
    setMode('super-resolve');
    setResultData(null);
    
    const res = await superResolveImage(imageId);
    if (res?.status === "success") {
      setResultData(res.data);
    }
    setIsProcessing(false);
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-10">
      
      <div className="glass-panel p-6 rounded-3xl border border-fuchsia-500/30 shadow-[0_0_30px_rgba(217,70,239,0.15)] relative overflow-hidden bg-gradient-to-br from-black to-[#2d0932]">
        <div className="relative z-10">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30 flex items-center w-max gap-1">
            <ImageIcon className="h-3 w-3" /> Frontier Tech
          </span>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-fuchsia-200 bg-clip-text text-transparent mt-2">
            Generative AI for Medical Imaging
          </h1>
          <p className="text-xs lg:text-sm text-fuchsia-200/60 mt-2 max-w-3xl">
            Simulates Latent Diffusion Models (LDMs) and Denoising Diffusion Probabilistic Models (DDPMs) like MONAI Generative. Synthesizes 100% artificial datasets for rare pathologies and performs noise conditioning for CT/MRI super-resolution enhancement.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[450px]">
        {/* Left Column - Input Forms */}
        <div className="flex flex-col gap-6 h-full">
           <div className="flex-1">
             <SyntheticDataGenerator onGenerate={handleSynthesize} />
           </div>
           <div className="flex-none h-[220px]">
             <SuperResolutionEnhancer onEnhance={handleSuperResolve} />
           </div>
        </div>

        {/* Center/Right Column - Viewer */}
        <div className="lg:col-span-2 h-full">
           <ImageComparisonViewer 
             resultData={resultData} 
             isProcessing={isProcessing} 
             mode={mode} 
           />
        </div>
      </div>

    </div>
  );
}
