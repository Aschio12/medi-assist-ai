import React from 'react';
import { Sparkles } from 'lucide-react';
export function CopilotLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-96 lg:w-[450px] border-l border-slate-200 bg-white flex flex-col shadow-[0_0_40px_-15px_rgba(0,0,0,0.1)] z-20">
      <div className="h-16 border-b border-slate-100 flex items-center px-5 bg-gradient-to-r from-medical-50 to-white">
        <Sparkles className="h-5 w-5 text-medical-600 mr-2" />
        <h2 className="font-bold text-slate-800">Clinical Copilot AI</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50/50">
        {children}
      </div>
    </div>
  );
}
