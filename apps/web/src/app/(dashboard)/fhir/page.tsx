'use client';
import { useState, useEffect } from 'react';
import { Network, Server, ShieldCheck, RefreshCw, CheckCircle2, Sparkles } from 'lucide-react';
import { 
  fetchSmartConfiguration, 
  fetchPatientFhirBundle, 
  fetchSyncAuditLogs,
  SmartConfiguration,
  FhirBundle,
  SyncAuditLog
} from '@/app/actions/fhir';
import { SmartLaunchSelector } from '@/components/fhir/SmartLaunchSelector';
import { ResourceExplorer } from '@/components/fhir/ResourceExplorer';
import { FhirJsonViewer } from '@/components/fhir/FhirJsonViewer';
import { WriteBackConsole } from '@/components/fhir/WriteBackConsole';
import { SyncAuditLedger } from '@/components/fhir/SyncAuditLedger';

export default function FhirPage() {
  const [currentSandbox, setCurrentSandbox] = useState<string>("epic-sandbox");
  const [launchMode, setLaunchMode] = useState<'ehr' | 'standalone'>('ehr');
  const [smartConfig, setSmartConfig] = useState<SmartConfiguration | null>(null);
  const [bundle, setBundle] = useState<FhirBundle | null>(null);
  const [auditLogs, setAuditLogs] = useState<SyncAuditLog[]>([]);
  const [selectedResource, setSelectedResource] = useState<Record<string, any> | null>(null);
  const [isLaunching, setIsLaunching] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  const initData = async () => {
    try {
      const [configData, bundleData, logsData] = await Promise.all([
        fetchSmartConfiguration(),
        fetchPatientFhirBundle("PAT-98421"),
        fetchSyncAuditLogs()
      ]);
      setSmartConfig(configData);
      setBundle(bundleData);
      setAuditLogs(logsData);
      if (bundleData.entry.length > 0) {
        setSelectedResource(bundleData.entry[0].resource);
      }
    } catch (err) {
      console.error("Failed to load FHIR data:", err);
    }
  };

  useEffect(() => {
    initData();
  }, []);

  const handleSimulateLaunch = () => {
    setIsLaunching(true);
    setTimeout(() => {
      setIsLaunching(false);
      setNotification(`SMART OAuth2 Handshake completed with ${currentSandbox}! Access Token issued with scopes: launch/patient patient/*.read patient/*.write`);
      setTimeout(() => setNotification(null), 5000);
    }, 1200);
  };

  const handleSyncComplete = (msg: string) => {
    setNotification(msg);
    initData();
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <div className="h-full w-full p-8 flex flex-col relative z-10 overflow-y-auto scrollbar-hide">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-neon-500/20 rounded-xl border border-neon-500/30">
              <Network className="h-6 w-6 text-neon-400" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-wide">
              SMART on FHIR v2 & EHR Bidirectional Gateway
            </h1>
          </div>
          <p className="text-zinc-400 text-sm mt-1">
            Interoperable HL7 FHIR R4 resource synchronization with Epic Hyperspace and Oracle Cerner Millennium.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-neon-500/10 border border-neon-500/30 px-3 py-2 rounded-xl">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-500"></span>
            </span>
            <span className="text-neon-400 font-mono text-xs font-bold uppercase tracking-wider">
              FHIR R4 Gateway Active
            </span>
          </div>
        </div>
      </div>

      {/* Notification Banner */}
      {notification && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300 animate-fadeIn">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-zinc-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Top SMART App Launch Selector */}
      {smartConfig && (
        <div className="mb-6">
          <SmartLaunchSelector
            currentSandbox={currentSandbox}
            onSelectSandbox={setCurrentSandbox}
            launchMode={launchMode}
            onSelectLaunchMode={setLaunchMode}
            smartConfig={smartConfig}
            onSimulateLaunch={handleSimulateLaunch}
            isLaunching={isLaunching}
          />
        </div>
      )}

      {/* Main Grid: Left 7 Cols Resource Explorer & Write-Back, Right 5 Cols JSON Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* Left Column: Explorer + Write-Back Controls */}
        <div className="lg:col-span-7 space-y-6">
          {bundle && (
            <ResourceExplorer
              bundle={bundle}
              onSelectResource={setSelectedResource}
              selectedResourceId={selectedResource?.id}
            />
          )}

          <WriteBackConsole onSyncCompleted={handleSyncComplete} />
        </div>

        {/* Right Column: Raw JSON Viewer */}
        <div className="lg:col-span-5">
          <FhirJsonViewer resource={selectedResource} />
        </div>
      </div>

      {/* Bottom Sync Audit Ledger */}
      <div>
        <SyncAuditLedger logs={auditLogs} />
      </div>
    </div>
  );
}
