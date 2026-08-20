import React from 'react';
export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#050505] overflow-hidden relative selection:bg-neon-500/30">
      {/* Background ambient glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-neon-500/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[20%] w-[30%] h-[30%] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none"></div>
      
      {children}
    </div>
  );
}
