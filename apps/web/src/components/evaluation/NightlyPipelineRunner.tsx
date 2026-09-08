'use client';

import React, { useState } from 'react';
import { triggerNightlyPipeline, NightlyPipelineReport } from '@/app/actions/evaluation';
import { Play, Loader2, Database, ShieldCheck } from 'lucide-react';

interface NightlyPipelineRunnerProps {
  onPipelineComplete: (report: NightlyPipelineReport) => void;
}

export function NightlyPipelineRunner({ onPipelineComplete }: NightlyPipelineRunnerProps) {
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async () => {
    setIsRunning(true);
    try {
      const report = await triggerNightlyPipeline();
      onPipelineComplete(report);
    } catch (err) {
      console.error(err);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-950/30 to-black/80 relative overflow-hidden group">
      <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
            <Database className="h-6 w-6 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Trigger CI/CD Evaluation Pipeline</h3>
            <p className="text-xs text-zinc-400 mt-1 max-w-xl">
              Force an immediate run of the automated benchmark suite against the 1,000-question medical golden dataset. This will evaluate all RAGAS and TruLens metrics.
            </p>
          </div>
        </div>

        <button 
          onClick={handleRun}
          disabled={isRunning}
          className="flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
        >
          {isRunning ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Running Eval...
            </>
          ) : (
            <>
              <Play className="h-5 w-5" fill="currentColor" />
              Run Pipeline Now
            </>
          )}
        </button>
      </div>

      {isRunning && (
        <div className="mt-6 pt-6 border-t border-cyan-500/20">
          <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-2">
            <span className="flex items-center gap-2"><Loader2 className="h-3.5 w-3.5 animate-spin" /> Batch inferencing LLM on golden dataset...</span>
            <span>Est. ~45s</span>
          </div>
          <div className="h-1.5 w-full bg-black rounded-full overflow-hidden border border-cyan-500/20">
            <div className="h-full bg-cyan-500 w-1/3 animate-pulse rounded-full" style={{ animationDuration: '2s' }} />
          </div>
        </div>
      )}
    </div>
  );
}
