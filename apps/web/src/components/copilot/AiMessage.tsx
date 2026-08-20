import { Sparkles } from 'lucide-react';
export function AiMessage({ text, children }: { text: string, children?: React.ReactNode }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="h-8 w-8 rounded-full bg-neon-500/10 flex items-center justify-center flex-shrink-0 border border-neon-500/20 mt-1">
        <Sparkles className="h-4 w-4 text-neon-400" />
      </div>
      <div className="flex-1 space-y-4">
        <div className="text-zinc-300 text-sm leading-relaxed font-light">
          {text}
        </div>
        {children}
      </div>
    </div>
  );
}
