'use client';
import { useState } from 'react';
import { FhirBundle } from '@/app/actions/fhir';
import { Layers, Activity, User, AlertTriangle, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

interface ResourceExplorerProps {
  bundle: FhirBundle;
  onSelectResource: (resource: Record<string, any>) => void;
  selectedResourceId?: string;
}

export function ResourceExplorer({ bundle, onSelectResource, selectedResourceId }: ResourceExplorerProps) {
  const [filterType, setFilterType] = useState<string>('ALL');

  const resources = bundle.entry.map(e => e.resource);
  const resourceTypes = Array.from(new Set(resources.map(r => r.resourceType)));

  const filteredResources = filterType === 'ALL'
    ? resources
    : resources.filter(r => r.resourceType === filterType);

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-neon-400" />
          <h3 className="font-bold text-white text-sm">FHIR R4 Resources ({bundle.total})</h3>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setFilterType('ALL')}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase transition-all ${
              filterType === 'ALL'
                ? 'bg-neon-500 text-black shadow-[0_0_10px_rgba(163,230,53,0.3)]'
                : 'bg-white/5 text-zinc-400 hover:text-white'
            }`}
          >
            All ({resources.length})
          </button>
          {resourceTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase transition-all ${
                filterType === type
                  ? 'bg-neon-500 text-black shadow-[0_0_10px_rgba(163,230,53,0.3)]'
                  : 'bg-white/5 text-zinc-400 hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Resources Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1 scrollbar-hide">
        {filteredResources.map((res) => {
          const isSelected = selectedResourceId === res.id;
          let summary = "";
          if (res.resourceType === "Patient") {
            summary = `${res.name?.[0]?.family}, ${res.name?.[0]?.given?.join(' ')} (${res.gender}, DOB: ${res.birthDate})`;
          } else if (res.resourceType === "Observation") {
            summary = `${res.code?.coding?.[0]?.display}: ${res.valueQuantity?.value} ${res.valueQuantity?.unit || ''}`;
          } else if (res.resourceType === "Condition") {
            summary = `${res.code?.coding?.[0]?.display} (${res.code?.coding?.[0]?.code})`;
          } else if (res.resourceType === "AllergyIntolerance") {
            summary = `${res.code?.coding?.[0]?.display} [Criticality: ${res.criticality}]`;
          } else {
            summary = res.description || res.id;
          }

          return (
            <div
              key={res.id}
              onClick={() => onSelectResource(res)}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-neon-500/15 border-neon-500/60 shadow-[0_0_15px_rgba(163,230,53,0.2)] scale-[1.01]'
                  : 'bg-black/40 border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono font-bold bg-white/10 text-cyan-300 px-2 py-0.5 rounded uppercase">
                  {res.resourceType}
                </span>
                <span className="text-[10px] font-mono text-zinc-500">{res.id}</span>
              </div>
              <p className="text-xs text-zinc-200 font-medium line-clamp-2 leading-relaxed">
                {summary}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
