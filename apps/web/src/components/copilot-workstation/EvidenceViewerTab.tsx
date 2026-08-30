'use client';
import { useRef, useEffect } from 'react';
import { EvidenceCitation } from '@/app/actions/physician_copilot';
import { BookOpen, ExternalLink, ShieldCheck, CheckCircle2, Bookmark } from 'lucide-react';

interface EvidenceViewerTabProps {
  citations: EvidenceCitation[];
  activeCitationId: number | null;
  onSelectCitation: (id: number) => void;
}

export function EvidenceViewerTab({ citations, activeCitationId, onSelectCitation }: EvidenceViewerTabProps) {
  const citationRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    if (activeCitationId && citationRefs.current[activeCitationId]) {
      citationRefs.current[activeCitationId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [activeCitationId]);

  return (
    <div className="space-y-4 text-xs overflow-y-auto pr-1">
      {/* Evidence Banner */}
      <div className="p-3 bg-neon-500/10 border border-neon-500/30 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-2 text-neon-400">
          <BookOpen className="h-4 w-4" />
          <span className="font-mono font-bold uppercase text-[10px]">Verified Peer-Reviewed Guidelines</span>
        </div>
        <span className="text-[10px] font-mono text-zinc-400">{citations.length} Guidelines Indexed</span>
      </div>

      {/* Citations List */}
      <div className="space-y-4">
        {citations.map((cit) => {
          const isSelected = activeCitationId === cit.id;

          return (
            <div
              key={cit.id}
              ref={(el) => { citationRefs.current[cit.id] = el; }}
              onClick={() => onSelectCitation(cit.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5 ${
                isSelected
                  ? 'bg-neon-500/10 border-neon-500/60 shadow-[0_0_20px_rgba(163,230,53,0.2)] scale-[1.01]'
                  : 'bg-black/40 border-white/10 hover:border-white/20'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`h-6 w-6 rounded-lg font-mono font-bold text-xs flex items-center justify-center ${
                    isSelected ? 'bg-neon-500 text-black' : 'bg-white/10 text-neon-300'
                  }`}>
                    {cit.id}
                  </span>
                  <div>
                    <h4 className="font-bold text-white text-xs">{cit.guideline_name}</h4>
                    <p className="text-[10px] font-mono text-zinc-400">{cit.organization} ({cit.year}) • {cit.section}</p>
                  </div>
                </div>

                <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {cit.evidence_grade}
                </span>
              </div>

              {/* Exact Target Sentence Highlight Box */}
              <div className={`p-3 rounded-xl border font-medium leading-relaxed ${
                isSelected
                  ? 'bg-neon-500/20 border-neon-500 text-white shadow-[0_0_10px_rgba(163,230,53,0.3)]'
                  : 'bg-black/60 border-white/5 text-zinc-200'
              }`}>
                <span className="text-neon-400 font-mono font-bold mr-1.5">“</span>
                <span>{cit.target_sentence}</span>
                <span className="text-neon-400 font-mono font-bold ml-1.5">”</span>
              </div>

              {/* Full Context Paragraph */}
              <p className="text-[11px] text-zinc-400 leading-relaxed pl-2 border-l-2 border-white/10">
                {cit.full_context_paragraph}
              </p>

              {/* DOI / External Link */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
                <span className="text-zinc-500">Source Verification</span>
                <a
                  href={cit.doi_or_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>Inspect Source DOI</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
