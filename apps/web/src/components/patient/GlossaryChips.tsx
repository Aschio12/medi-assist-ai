'use client';
import { GlossaryTerm } from '@/app/actions/patient_portal';
import { BookOpen, Lightbulb, HelpCircle } from 'lucide-react';

interface GlossaryChipsProps {
  glossary: GlossaryTerm[];
}

export function GlossaryChips({ glossary }: GlossaryChipsProps) {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-cyan-400" />
          <h4 className="font-bold text-white text-sm">Plain-Language Medical Dictionary</h4>
        </div>
        <span className="text-[10px] font-mono text-zinc-500 uppercase">{glossary.length} Words Translated</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {glossary.map((term, idx) => (
          <div key={idx} className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-cyan-300 font-mono">{term.medical_term}</span>
              <span className="text-[9px] font-mono text-zinc-500 uppercase">Meaning</span>
            </div>
            <p className="text-zinc-200 leading-relaxed font-normal">{term.plain_english}</p>
            <div className="flex items-start gap-1.5 text-[11px] text-neon-400 font-normal bg-neon-500/5 p-2 rounded-xl border border-neon-500/20">
              <Lightbulb className="h-3.5 w-3.5 shrink-0 mt-0.5" />
              <span><strong>Everyday Analogy:</strong> {term.analogy}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
