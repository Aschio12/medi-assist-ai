import { Link2 } from 'lucide-react';
export function CitationBadge({ title, confidence }: { title: string, confidence: number }) {
  return (
    <button className="flex items-center gap-2 text-xs bg-white/5 hover:bg-white/10 text-zinc-300 px-3 py-2 rounded-xl border border-white/10 transition-all text-left w-full group">
      <Link2 className="h-3.5 w-3.5 text-zinc-500 group-hover:text-neon-400 transition-colors" />
      <span className="flex-1 truncate font-light">{title}</span>
      <span className="text-[10px] text-neon-400 font-medium bg-neon-500/10 px-2 py-0.5 rounded-full border border-neon-500/20">{confidence}% Match</span>
    </button>
  );
}
