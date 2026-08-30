'use client';
import { SmartConfiguration } from '@/app/actions/fhir';
import { Server, ShieldCheck, Play, Key, RefreshCw } from 'lucide-react';

interface SmartLaunchSelectorProps {
  currentSandbox: string;
  onSelectSandbox: (id: string) => void;
  launchMode: 'ehr' | 'standalone';
  onSelectLaunchMode: (mode: 'ehr' | 'standalone') => void;
  smartConfig: SmartConfiguration;
  onSimulateLaunch: () => void;
  isLaunching: boolean;
}

const EHR_SANDBOXES = [
  {
    id: "epic-sandbox",
    name: "Epic Hyperspace Sandbox (R4)",
    issuerUrl: "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4",
    badge: "EPIC ON FHIR v2",
    badgeColor: "bg-red-500/20 text-red-300 border-red-500/30"
  },
  {
    id: "cerner-sandbox",
    name: "Oracle Health Cerner Millennium (R4)",
    issuerUrl: "https://fhir-myrecord.cerner.com/r4/ec2458f2-1e24-41c8-b71b-0e701af7583d",
    badge: "ORACLE CODE R4",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30"
  },
  {
    id: "hapi-sandbox",
    name: "MediAssist Local FHIR Gateway (R4)",
    issuerUrl: "http://localhost:8008",
    badge: "LOCAL GATEWAY",
    badgeColor: "bg-neon-500/20 text-neon-300 border-neon-500/30"
  }
];

export function SmartLaunchSelector({
  currentSandbox,
  onSelectSandbox,
  launchMode,
  onSelectLaunchMode,
  smartConfig,
  onSimulateLaunch,
  isLaunching
}: SmartLaunchSelectorProps) {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-5 bg-gradient-to-b from-black/80 to-black/95">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-neon-500/20 rounded-2xl border border-neon-500/30 text-neon-400">
            <Server className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">SMART on FHIR v2 App Launch Sandbox</h3>
            <p className="text-zinc-400 text-xs mt-0.5">OAuth 2.0 PKCE Handshake with Epic & Cerner R4 Gateways</p>
          </div>
        </div>

        {/* Launch Mode Switcher */}
        <div className="flex items-center p-1 bg-black/60 border border-white/10 rounded-2xl">
          <button
            onClick={() => onSelectLaunchMode('ehr')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              launchMode === 'ehr'
                ? 'bg-neon-500 text-black shadow-[0_0_10px_rgba(163,230,53,0.3)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            EHR Embedded Launch
          </button>
          <button
            onClick={() => onSelectLaunchMode('standalone')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              launchMode === 'standalone'
                ? 'bg-neon-500 text-black shadow-[0_0_10px_rgba(163,230,53,0.3)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Standalone Launch
          </button>
        </div>
      </div>

      {/* Sandboxes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {EHR_SANDBOXES.map((sb) => {
          const isSelected = currentSandbox === sb.id;

          return (
            <div
              key={sb.id}
              onClick={() => onSelectSandbox(sb.id)}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-neon-500/10 border-neon-500/50 shadow-[0_0_15px_rgba(163,230,53,0.15)] scale-[1.01]'
                  : 'bg-black/40 border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="text-xs font-bold text-white">{sb.name}</h4>
                <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${sb.badgeColor}`}>
                  {sb.badge}
                </span>
              </div>
              <p className="text-[10px] font-mono text-zinc-500 truncate">{sb.issuerUrl}</p>
            </div>
          );
        })}
      </div>

      {/* Discovery Metadata & Trigger */}
      <div className="p-3 bg-black/60 border border-white/5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400">
          <Key className="h-4 w-4 text-neon-400" />
          <span>OAuth Endpoints: <span className="text-zinc-200">/authorize</span> & <span className="text-zinc-200">/token</span> (PKCE S256 Active)</span>
        </div>

        <button
          onClick={onSimulateLaunch}
          disabled={isLaunching}
          className="flex items-center justify-center gap-2 px-5 py-2 bg-neon-500 text-black font-bold text-xs rounded-xl hover:bg-neon-400 transition-all shadow-[0_0_15px_rgba(163,230,53,0.3)] disabled:opacity-50"
        >
          {isLaunching ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5 fill-black" />}
          <span>{isLaunching ? 'Exchanging OAuth Token...' : 'Test SMART OAuth Launch'}</span>
        </button>
      </div>
    </div>
  );
}
