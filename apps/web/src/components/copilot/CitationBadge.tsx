import { FileText } from 'lucide-react';
export function CitationBadge({ title, confidence }: { title: string, confidence: number }) {
  return (
    <button className="flex items-center gap-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-2.5 py-1.5 rounded-md border border-slate-200 transition-colors text-left w-full">
      <FileText className="h-3.5 w-3.5 text-medical-600" />
      <span className="flex-1 truncate font-medium">{title}</span>
      <span className="text-[10px] bg-white px-1.5 py-0.5 rounded text-slate-500 border border-slate-200">{confidence}% Match</span>
    </button>
  );
}
