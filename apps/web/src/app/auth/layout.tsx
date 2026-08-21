import React from 'react';
import { Activity } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-neon-500/10 blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[150px] pointer-events-none"></div>
      
      <div className="w-full max-w-md z-10 relative">
        <div className="flex justify-center mb-8">
          <div className="p-3 bg-neon-500/20 rounded-2xl border border-neon-500/30 neon-glow">
            <Activity className="h-10 w-10 text-neon-400" />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
