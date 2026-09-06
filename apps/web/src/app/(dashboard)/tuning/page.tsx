'use client';

import React, { useState, useEffect } from 'react';
import { 
  Stethoscope, 
  Sliders, 
  Database, 
  Layers, 
  Sparkles, 
  RefreshCw,
  CheckCircle2
} from 'lucide-react';
import { 
  fetchClinicianFeedback, 
  fetchDataLakeRecords, 
  fetchTrainingStatus, 
  fetchModelCheckpoints,
  ClinicianFeedback,
  DataLakeRecord,
  TrainingJobStatus,
  LoRAModelCheckpoint
} from '@/app/actions/tuning';
import { TuningHeaderHUD } from '@/components/tuning/TuningHeaderHUD';
import { FeedbackDiffEditor } from '@/components/tuning/FeedbackDiffEditor';
import { LoraTrainingConsole } from '@/components/tuning/LoraTrainingConsole';
import { DataLakeViewer } from '@/components/tuning/DataLakeViewer';
import { ModelCheckpointRegistry } from '@/components/tuning/ModelCheckpointRegistry';

export default function TuningDashboardPage() {
  const [activeTab, setActiveTab] = useState<'REVIEW' | 'TRAINING' | 'DATALAKE' | 'MODELS'>('REVIEW');
  const [feedbacks, setFeedbacks] = useState<ClinicianFeedback[]>([]);
  const [dataLake, setDataLake] = useState<DataLakeRecord[]>([]);
  const [trainingJob, setTrainingJob] = useState<TrainingJobStatus | null>(null);
  const [models, setModels] = useState<LoRAModelCheckpoint[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [fbData, dlData, trData, mdData] = await Promise.all([
        fetchClinicianFeedback(),
        fetchDataLakeRecords(),
        fetchTrainingStatus(),
        fetchModelCheckpoints()
      ]);
      setFeedbacks(fbData);
      setDataLake(dlData);
      setTrainingJob(trData);
      setModels(mdData);
    } catch (err) {
      console.error('Failed to load tuning dashboard data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleFeedbackSubmitted = (newFb: ClinicianFeedback) => {
    setFeedbacks((prev) => [newFb, ...prev]);

    // Also simulate adding a new cleared DPO record to the Data Lake
    const newRecord: DataLakeRecord = {
      id: `dpo-rec-${Date.now().toString().slice(-4)}`,
      created_at: new Date().toISOString(),
      prompt: newFb.clinical_prompt,
      chosen: newFb.physician_corrected_output,
      rejected: newFb.ai_original_output,
      phi_sanitization_status: 'CLEARED_HIPAA_SAFE_HARBOR',
      token_count: Math.round((newFb.clinical_prompt.length + newFb.physician_corrected_output.length) / 4),
      data_split: 'TRAIN'
    };
    setDataLake((prev) => [newRecord, ...prev]);

    setToastMessage(`✓ Feedback #${newFb.id} cleared Safe Harbor and ingested into training data lake!`);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const activeModel = models.find((m) => m.is_active_in_production) || models[0];

  return (
    <div className="h-full w-full p-6 lg:p-8 flex flex-col relative z-10 overflow-y-auto scrollbar-hide space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-2xl bg-cyan-950/90 border border-cyan-400/50 shadow-[0_0_25px_rgba(34,211,238,0.4)] text-cyan-200 text-xs font-mono flex items-center gap-3">
          <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Telemetry Banner */}
      <TuningHeaderHUD
        activeModel={activeModel}
        totalFeedbackCount={feedbacks.length}
      />

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-black/60 border border-white/10 w-fit">
        <button
          onClick={() => setActiveTab('REVIEW')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
            activeTab === 'REVIEW'
              ? 'bg-neon-500/20 text-neon-300 border border-neon-500/40 shadow-[0_0_15px_rgba(163,230,53,0.3)]'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Stethoscope className="h-4 w-4 text-neon-400" />
          Clinician HITL Review
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/40 text-neon-400">
            Live Gate
          </span>
        </button>

        <button
          onClick={() => setActiveTab('TRAINING')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
            activeTab === 'TRAINING'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(34,211,238,0.3)]'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Sliders className="h-4 w-4 text-cyan-400" />
          LoRA Training Console
          {trainingJob?.status === 'TRAINING' && (
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('DATALAKE')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
            activeTab === 'DATALAKE'
              ? 'bg-neon-500/20 text-neon-300 border border-neon-500/40 shadow-[0_0_15px_rgba(163,230,53,0.3)]'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Database className="h-4 w-4 text-neon-400" />
          Sanitized Data Lake
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/40 text-cyan-400">
            {dataLake.length} pairs
          </span>
        </button>

        <button
          onClick={() => setActiveTab('MODELS')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
            activeTab === 'MODELS'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(34,211,238,0.3)]'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Layers className="h-4 w-4 text-cyan-400" />
          LoRA Checkpoints
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/40 text-neon-300">
            {models.length}
          </span>
        </button>
      </div>

      {/* Tab Content Display */}
      {isLoading ? (
        <div className="glass-panel p-12 rounded-3xl border border-white/10 flex flex-col items-center justify-center gap-3">
          <RefreshCw className="h-8 w-8 text-neon-400 animate-spin" />
          <span className="text-xs font-mono text-zinc-400">
            Connecting to Tuning Engine on port 8012...
          </span>
        </div>
      ) : (
        <div className="space-y-6">
          {activeTab === 'REVIEW' && (
            <FeedbackDiffEditor onFeedbackSubmitted={handleFeedbackSubmitted} />
          )}

          {activeTab === 'TRAINING' && trainingJob && (
            <LoraTrainingConsole initialJob={trainingJob} />
          )}

          {activeTab === 'DATALAKE' && (
            <DataLakeViewer records={dataLake} />
          )}

          {activeTab === 'MODELS' && (
            <ModelCheckpointRegistry initialModels={models} />
          )}
        </div>
      )}
    </div>
  );
}
