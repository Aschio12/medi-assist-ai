'use client';

import React, { useState } from 'react';
import { Search, Database, Loader2 } from 'lucide-react';
import { lookupOpenFda } from '@/app/actions/pharmacovigilance';

export function OpenFdaLookup() {
  const [drug, setDrug] = useState('Lisinopril');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await lookupOpenFda(drug);
      setResults(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
          <Database className="h-5 w-5 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">openFDA FAERS Lookup</h2>
          <p className="text-xs text-zinc-400">Query real-world FDA Adverse Event Reporting System</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <input 
          type="text" 
          value={drug}
          onChange={(e) => setDrug(e.target.value)}
          className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-cyan-500/50"
          placeholder="Enter drug name (e.g. Lisinopril)"
        />
        <button 
          onClick={handleSearch}
          disabled={loading}
          className="bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-2 rounded-xl font-bold transition-colors flex items-center justify-center min-w-[48px]"
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
        </button>
      </div>

      {results && (
        <div className="space-y-3">
          <div className="text-xs font-mono text-zinc-500 mb-2">TOP REPORTED EVENTS FOR: {results.drug.toUpperCase()}</div>
          {results.top_adverse_events.map((event: any, i: number) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
              <span className="text-sm font-medium text-white capitalize">{event.event_term.toLowerCase()}</span>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded-lg border border-cyan-500/20">
                {event.report_count.toLocaleString()} reports
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
