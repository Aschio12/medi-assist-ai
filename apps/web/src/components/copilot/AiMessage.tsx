import { Sparkles } from 'lucide-react';
export function AiMessage({ text, children }: { text: string, children?: React.ReactNode }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="h-8 w-8 rounded-full bg-medical-600 flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
        <Sparkles className="h-4 w-4 text-white" />
      </div>
      <div className="flex-1 space-y-3">
        <div className="bg-white border border-slate-200 text-slate-700 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm text-sm leading-relaxed">
          {text}
        </div>
        {children}
      </div>
    </div>
  );
}
