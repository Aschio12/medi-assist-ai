import React from 'react';

export function TelehealthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full p-6 flex flex-col overflow-hidden relative z-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">Live Telehealth Session</h1>
          <p className="text-zinc-400 text-sm mt-1 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            Recording & Ambient Scribe Active
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2 bg-red-500/10 text-red-500 border border-red-500/30 rounded-xl hover:bg-red-500/20 font-semibold transition-colors">End Call</button>
        </div>
      </div>
      
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
