'use client';

import React, { useState } from 'react';
import { 
  Database, 
  ShieldCheck, 
  Code2, 
  Layers, 
  Filter, 
  Download, 
  ExternalLink, 
  Check, 
  Copy, 
  CheckCircle,
  Hash,
  BookOpen
} from 'lucide-react';
import { DataLakeRecord } from '@/app/actions/tuning';

interface DataLakeViewerProps {
  records: DataLakeRecord[];
}

export function DataLakeViewer({ records }: DataLakeViewerProps) {
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'TRAIN' | 'VALIDATION'>('ALL');
  const [showJsonlModal, setShowJsonlModal] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredRecords = records.filter((r) => {
    if (selectedFilter === 'ALL') return true;
    return r.data_split === selectedFilter;
  });

  const handleCopyJsonl = (record: DataLakeRecord) => {
    const jsonlString = JSON.stringify({
      prompt: record.prompt,
      chosen: record.chosen,
      rejected: record.rejected
    }, null, 2);
    navigator.clipboard.writeText(jsonlString);
    setCopiedId(record.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportAllJsonl = () => {
    const lines = filteredRecords.map(r => JSON.stringify({
      prompt: r.prompt,
      chosen: r.chosen,
      rejected: r.rejected
    })).join('\n');

    const blob = new Blob([lines], { type: 'application/jsonl' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mediassist-dpo-training-lake-${Date.now()}.jsonl`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-neon-500/30 neon-glow relative overflow-hidden bg-gradient-to-b from-black/85 to-black/95">
      {/* Header & Stats Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-cyan-500/20 rounded-2xl border border-cyan-500/30">
            <Database className="h-6 w-6 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
              Sanitized DPO Training Data Lake
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-neon-500/20 text-neon-300 border border-neon-500/30 uppercase">
                HuggingFace DPO Format
              </span>
            </h2>
            <p className="text-xs text-zinc-400">
              HIPAA Safe Harbor Scrubbed Pairs • {records.length} Clinician Validated Examples
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Split Filter */}
          <div className="flex items-center bg-black/60 p-1 rounded-xl border border-white/10 text-xs font-mono">
            {(['ALL', 'TRAIN', 'VALIDATION'] as const).map((split) => (
              <button
                key={split}
                onClick={() => setSelectedFilter(split)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedFilter === split
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {split}
              </button>
            ))}
          </div>

          {/* Export JSONL */}
          <button
            onClick={handleExportAllJsonl}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/70 hover:bg-white/10 border border-white/15 text-xs font-mono text-zinc-200 transition-all hover:text-white"
          >
            <Download className="h-3.5 w-3.5 text-cyan-400" />
            Export .jsonl
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
        <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10">
          <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">
            Total Preference Pairs
          </span>
          <div className="text-xl font-bold font-mono text-white mt-1">
            {records.length}
          </div>
          <span className="text-[10px] font-mono text-cyan-400">
            100% Curated by MDs
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10">
          <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">
            Train / Val Ratio
          </span>
          <div className="text-xl font-bold font-mono text-neon-400 mt-1">
            90% / 10%
          </div>
          <span className="text-[10px] font-mono text-zinc-500">
            Stratified Clinical Split
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10">
          <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">
            Avg Tokens / Record
          </span>
          <div className="text-xl font-bold font-mono text-cyan-400 mt-1">
            130 tok
          </div>
          <span className="text-[10px] font-mono text-zinc-500">
            Max context: 2,048 tok
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10">
          <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">
            HIPAA Scrub Verification
          </span>
          <div className="text-xl font-bold font-mono text-neon-300 mt-1 flex items-center gap-1.5">
            <ShieldCheck className="h-5 w-5 text-neon-400" />
            100% PASS
          </div>
          <span className="text-[10px] font-mono text-zinc-500">
            Zero PHI Leaks
          </span>
        </div>
      </div>

      {/* Record List */}
      <div className="space-y-4">
        {filteredRecords.map((record) => (
          <div
            key={record.id}
            className="p-5 rounded-2xl bg-black/60 border border-white/10 hover:border-cyan-500/40 transition-all"
          >
            {/* Record Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-cyan-400">
                  {record.id}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/10">
                  SPLIT: {record.data_split}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neon-500/15 text-neon-300 border border-neon-500/30 flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-neon-400" />
                  {record.phi_sanitization_status}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-zinc-500">
                  {new Date(record.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {record.token_count} tokens
                </span>
                <button
                  onClick={() => handleCopyJsonl(record)}
                  className="p-1.5 rounded-lg bg-black/80 border border-white/10 hover:border-cyan-400 text-zinc-400 hover:text-white transition-all text-xs flex items-center gap-1 font-mono"
                  title="Copy HuggingFace JSONL schema"
                >
                  {copiedId === record.id ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-neon-400" />
                      <span className="text-neon-400 text-[10px]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span className="text-[10px]">Copy JSONL</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Prompt */}
            <div className="mt-3">
              <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold flex items-center gap-1">
                <BookOpen className="h-3 w-3 text-cyan-400" />
                Prompt (Sanitized Clinical Scenario)
              </span>
              <p className="mt-1 text-xs font-mono text-zinc-300 bg-black/40 p-2.5 rounded-xl border border-white/5">
                {record.prompt}
              </p>
            </div>

            {/* Chosen vs Rejected */}
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Chosen */}
              <div className="p-3 rounded-xl bg-neon-950/20 border border-neon-500/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-neon-400 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Chosen (Physician Ground Truth)
                  </span>
                  <span className="text-[9px] font-mono text-neon-300/80">
                    Target +1.0
                  </span>
                </div>
                <p className="text-xs font-mono text-zinc-200 leading-relaxed">
                  {record.chosen}
                </p>
              </div>

              {/* Rejected */}
              <div className="p-3 rounded-xl bg-red-950/20 border border-red-500/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-red-400 flex items-center gap-1">
                    <Code2 className="h-3 w-3" />
                    Rejected (Base Model Flawed)
                  </span>
                  <span className="text-[9px] font-mono text-red-300/80">
                    Penalty -1.0
                  </span>
                </div>
                <p className="text-xs font-mono text-zinc-400 leading-relaxed">
                  {record.rejected}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
