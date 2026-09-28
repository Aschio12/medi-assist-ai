'use client';

import React, { useState } from 'react';
import { searchClinicalTrials, parseTrialCriteria } from '@/app/actions/trials';
import { VectorSearch } from '@/components/trials/VectorSearch';
import { NlpCriteriaParser } from '@/components/trials/NlpCriteriaParser';
import { GlobalTrialsMap } from '@/components/trials/GlobalTrialsMap';
import { Globe, Microscope } from 'lucide-react';

export default function ClinicalTrialsDashboard() {
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [parseResult, setParseResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    
    // 1. Semantic Search
    const searchRes = await searchClinicalTrials(query, 6);
    if (searchRes?.results) setSearchResults(searchRes.results);
    
    // 2. Parse Query (Simulating inclusion text parse)
    const parseRes = await parseTrialCriteria(query);
    if (parseRes) setParseResult(parseRes);
    
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-10">
      
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.15)] relative overflow-hidden bg-gradient-to-br from-black to-[#220033]">
        <div className="relative z-10">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center w-max gap-1">
            <Microscope className="h-3 w-3" /> Enterprise AI
          </span>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mt-2">
            GenAI Clinical Trials NLP Pipeline
          </h1>
          <p className="text-xs lg:text-sm text-purple-200/60 mt-2 max-w-3xl">
            Processes unstructured clinical trial inclusion/exclusion criteria using simulated ClinicalBERT Named Entity Recognition (NER). Leverages FAISS for high-dimensional cosine similarity semantic searching across global registries.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[550px]">
        {/* Left Column - Search & NER */}
        <div className="flex flex-col gap-6 h-full">
           <div className="flex-none h-[220px]">
             <VectorSearch onSearch={handleSearch} />
           </div>
           <div className="flex-1">
             <NlpCriteriaParser parseResult={parseResult} />
           </div>
        </div>

        {/* Center/Right Column - Global Trials */}
        <div className="lg:col-span-2 h-full">
           <GlobalTrialsMap results={searchResults} />
        </div>
      </div>

    </div>
  );
}
