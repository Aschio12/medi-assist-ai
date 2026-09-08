'use client';

import React, { useState, useEffect } from 'react';
import { 
  fetchRagasMetrics, 
  fetchRecentHallucinationChecks, 
  fetchRecentToxicityChecks, 
  triggerNightlyPipeline,
  RagasScores,
  HallucinationCheck,
  ToxicityCheck,
  NightlyPipelineReport
} from '@/app/actions/evaluation';

import { EvaluationHeaderHUD } from '@/components/evaluation/EvaluationHeaderHUD';
import { RagasMetricsDashboard } from '@/components/evaluation/RagasMetricsDashboard';
import { TruLensHallucinationMatrix } from '@/components/evaluation/TruLensHallucinationMatrix';
import { ToxicityBiasRadar } from '@/components/evaluation/ToxicityBiasRadar';
import { NightlyPipelineRunner } from '@/components/evaluation/NightlyPipelineRunner';
import { Loader2 } from 'lucide-react';

export default function EvaluationDashboard() {
  const [report, setReport] = useState<NightlyPipelineReport | null>(null);
  const [ragasScores, setRagasScores] = useState<RagasScores | null>(null);
  const [hallucinations, setHallucinations] = useState<HallucinationCheck[]>([]);
  const [toxicityChecks, setToxicityChecks] = useState<ToxicityCheck[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [ragas, hallucs, toxicity] = await Promise.all([
        fetchRagasMetrics(),
        fetchRecentHallucinationChecks(),
        fetchRecentToxicityChecks()
      ]);
      setRagasScores(ragas);
      setHallucinations(hallucs);
      setToxicityChecks(toxicity);
      
      // Simulate an initial pipeline report based on fetched data
      setReport({
        timestamp: new Date().toISOString(),
        total_samples_evaluated: 1000,
        ragas_aggregated_scores: ragas,
        hallucination_rate_percent: 0.2, // mock metric
        bias_toxicity_rate_percent: 0.1, // mock metric
        pipeline_status: "FAILED"
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handlePipelineComplete = (newReport: NightlyPipelineReport) => {
    setReport(newReport);
    setRagasScores(newReport.ragas_aggregated_scores);
    // In a real app, we might also re-fetch the itemized hallucination/toxicity logs
  };

  if (isLoading || !report || !ragasScores) {
    return (
      <div className="flex h-[calc(100vh-2rem)] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 text-cyan-500 animate-spin" />
          <p className="text-zinc-400 font-mono text-sm animate-pulse">Initializing Evaluation Engine...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-10">
      <EvaluationHeaderHUD report={report} />
      
      <RagasMetricsDashboard scores={ragasScores} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[400px]">
        <TruLensHallucinationMatrix checks={hallucinations} />
        <ToxicityBiasRadar checks={toxicityChecks} />
      </div>

      <NightlyPipelineRunner onPipelineComplete={handlePipelineComplete} />
    </div>
  );
}
