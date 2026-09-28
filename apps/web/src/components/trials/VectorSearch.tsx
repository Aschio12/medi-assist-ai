'use client';

import React, { useState } from 'react';
import { Search, MapPin, Database } from 'lucide-react';

export function VectorSearch({ onSearch }: { onSearch: (q: string) => void }) {
  const [query, setQuery] = useState("EGFR+ NSCLC Phase III");

  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
          <Database className="h-5 w-5 text-purple-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Semantic Trial Search</h2>
          <p className="text-xs text-zinc-400">FAISS Vector Embeddings DB</p>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center">
         <div className="relative mb-4">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
           <input 
             type="text"
             className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-3 text-sm text-zinc-300 focus:outline-none focus:border-purple-500/50"
             value={query}
             onChange={(e) => setQuery(e.target.value)}
           />
         </div>
         
         <button 
           onClick={() => onSearch(query)}
           className="w-full flex items-center justify-center gap-2 bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 border border-purple-500/50 text-sm font-bold px-4 py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.2)]"
         >
           <Search className="h-4 w-4" /> Execute Vector Search
         </button>
      </div>
    </div>
  );
}
