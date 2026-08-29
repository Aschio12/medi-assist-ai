'use client';
import { useState } from 'react';
import { UserCog, Send, X, ShieldAlert, Sparkles } from 'lucide-react';

interface HumanInterventionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitIntervention: (directive: string) => void;
}

export function HumanInterventionModal({
  isOpen,
  onClose,
  onSubmitIntervention
}: HumanInterventionModalProps) {
  const [directive, setDirective] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!directive.trim()) return;
    onSubmitIntervention(directive);
    setDirective('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full max-w-lg p-6 rounded-3xl border border-neon-500/40 neon-glow relative bg-zinc-950">
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-neon-500/20 rounded-2xl border border-neon-500/40 text-neon-400">
            <UserCog className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Physician Intervention Portal</h3>
            <p className="text-xs text-zinc-400">Inject clinical guidance or override council deliberation trajectory</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-start gap-2.5 text-xs text-amber-300">
            <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
            <span>Directives entered here will be immediately propagated to all 5 specialist agents for real-time re-deliberation.</span>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-2 font-semibold">
              Clinical Directive / Parameter Adjustment
            </label>
            <textarea
              value={directive}
              onChange={(e) => setDirective(e.target.value)}
              rows={4}
              placeholder="e.g. 'Patient has an undocumented mild allergy to Macrolides. Also re-evaluate Sepsis fluid bolus assuming baseline ejection fraction is 35%.'"
              className="w-full bg-black/60 border border-white/15 rounded-2xl p-4 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-neon-500/50 transition-colors resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!directive.trim()}
              className="flex items-center gap-2 px-5 py-2.5 bg-neon-500 text-black rounded-xl text-xs font-bold hover:bg-neon-400 transition-all shadow-[0_0_15px_rgba(163,230,53,0.3)] disabled:opacity-50"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Broadcast Directive</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
