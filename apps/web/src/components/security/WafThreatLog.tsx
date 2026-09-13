'use client';

import React from 'react';
import { ShieldAlert, Crosshair, MapPin } from 'lucide-react';

export function WafThreatLog() {
  const threats = [
    { id: "EVT-8921", type: "SQL Injection", ip: "192.168.1.45", location: "RU", action: "BLOCKED", time: "2m ago" },
    { id: "EVT-8922", type: "Rate Limit Exceeded", ip: "10.0.0.8", location: "US", action: "CHALLENGED", time: "15m ago" },
    { id: "EVT-8923", type: "Bot Traffic", ip: "172.16.0.9", location: "CN", action: "BLOCKED", time: "1h ago" }
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/20">
          <ShieldAlert className="h-5 w-5 text-red-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Cloudflare WAF Threat Log</h2>
          <p className="text-xs text-zinc-400">Recent blocked malicious payloads.</p>
        </div>
      </div>

      <div className="space-y-3">
        {threats.map(t => (
          <div key={t.id} className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
            <div className="flex items-center gap-3">
              <Crosshair className="h-4 w-4 text-zinc-500" />
              <div>
                <p className="text-sm font-mono text-white">{t.type}</p>
                <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono mt-0.5">
                  <span>{t.ip}</span>
                  <span className="flex items-center gap-0.5"><MapPin className="h-3 w-3" /> {t.location}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                t.action === 'BLOCKED' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
              }`}>
                {t.action}
              </span>
              <span className="text-[10px] text-zinc-500">{t.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
