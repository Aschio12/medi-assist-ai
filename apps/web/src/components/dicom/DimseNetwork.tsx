'use client';

import React, { useState } from 'react';
import { Server, Zap, Search } from 'lucide-react';
import { pingPacsNode, queryPacs } from '@/app/actions/dicom';

export function DimseNetwork() {
  const [log, setLog] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const addLog = (msg: string) => setLog(prev => [`[${new Date().toISOString().split('T')[1].slice(0,8)}] ${msg}`, ...prev].slice(0, 10));

  const handleCEcho = async () => {
    setLoading(true);
    addLog("Sending C-ECHO-RQ to SCP...");
    const res = await pingPacsNode("CLOUD_PACS");
    if (res?.status === 'success') {
      addLog("Received C-ECHO-RSP (Success). Connection active.");
    } else {
      addLog("C-ECHO Failed. Timeout.");
    }
    setLoading(false);
  };

  const handleCFind = async () => {
    setLoading(true);
    addLog("Sending C-FIND-RQ (Query Level: STUDY)...");
    const res = await queryPacs("STUDY", { "PatientID": "*" });
    if (res?.status === 'success') {
      addLog(`Received ${res.matches} C-FIND-RSP pending responses.`);
      addLog("C-FIND-RSP (Success).");
    } else {
      addLog("C-FIND Failed.");
    }
    setLoading(false);
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
          <Server className="h-5 w-5 text-purple-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">DIMSE Network Protocol</h2>
          <p className="text-xs text-zinc-400">DICOM Message Service Element</p>
        </div>
      </div>
      
      <div className="flex gap-2 mb-4">
        <button 
          onClick={handleCEcho}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 bg-purple-500/20 hover:bg-purple-500/40 text-purple-300 py-2 rounded-lg text-sm font-bold border border-purple-500/50 transition-colors"
        >
          <Zap className="h-4 w-4" /> C-ECHO
        </button>
        <button 
          onClick={handleCFind}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 bg-indigo-500/20 hover:bg-indigo-500/40 text-indigo-300 py-2 rounded-lg text-sm font-bold border border-indigo-500/50 transition-colors"
        >
          <Search className="h-4 w-4" /> C-FIND
        </button>
      </div>

      <div className="flex-1 bg-black/80 rounded-xl p-4 font-mono text-[10px] text-green-400 overflow-hidden flex flex-col-reverse border border-white/5">
        {log.map((l, i) => (
          <div key={i} className="mb-1 opacity-80">{l}</div>
        ))}
        {log.length === 0 && <div className="text-zinc-600 italic">Waiting for DIMSE commands...</div>}
      </div>
    </div>
  );
}
