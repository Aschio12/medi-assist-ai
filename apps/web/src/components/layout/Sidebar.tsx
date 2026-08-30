import { Activity, Users, Settings, Cpu, Grid, Shield, Video, FileText, TrendingUp, Scan, Bot, Network, Eye, ReceiptText, Split, HeartHandshake, Workflow } from 'lucide-react';
export function Sidebar() {
  return (
    <aside className="w-20 lg:w-64 glass-panel border-r-white/10 flex flex-col items-center lg:items-start py-8 z-10 rounded-r-3xl my-4 ml-4">
      <div className="px-4 lg:px-6 mb-12 flex items-center gap-3">
        <div className="p-2 bg-neon-500/20 rounded-xl border border-neon-500/30">
          <Activity className="h-6 w-6 text-neon-400" />
        </div>
        <span className="hidden lg:block font-bold text-xl tracking-wide text-white">MediAssist</span>
      </div>
      <nav className="flex-1 w-full space-y-3 px-4">
        <a href="#" className="flex items-center gap-3 px-4 py-3 bg-neon-500/10 text-neon-300 rounded-xl border border-neon-500/20 transition-all neon-glow group">
          <Grid className="h-5 w-5 text-neon-400" />
          <span className="hidden lg:block font-medium">Overview</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
          <Users className="h-5 w-5" />
          <span className="hidden lg:block font-medium">Portfolio</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
          <Cpu className="h-5 w-5" />
          <span className="hidden lg:block font-medium">AI Insights</span>
        </a>
      </nav>
      <div className="mt-auto px-4 w-full">
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
          <Video className="h-5 w-5" />
          <span className="hidden lg:block font-medium">Telehealth</span>
        </a>
        <a href="/telehealth" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all group">
          <Video className="h-5 w-5 group-hover:text-neon-400 transition-colors" />
          <span className="hidden lg:block font-medium">Telehealth</span>
        </a>
        <a href="/documents" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all group">
          <FileText className="h-5 w-5 group-hover:text-neon-400 transition-colors" />
          <span className="hidden lg:block font-medium">Documents</span>
        </a>
        <a href="/copilot" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all group">
          <Split className="h-5 w-5 group-hover:text-neon-400 transition-colors" />
          <span className="hidden lg:block font-medium">Physician Copilot</span>
        </a>
        <a href="/patient" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all group">
          <HeartHandshake className="h-5 w-5 group-hover:text-neon-400 transition-colors" />
          <span className="hidden lg:block font-medium">Patient Portal</span>
        </a>
        <a href="/analytics" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all group">
          <TrendingUp className="h-5 w-5 group-hover:text-neon-400 transition-colors" />
          <span className="hidden lg:block font-medium">Predictive ML</span>
        </a>
        <a href="/council" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all group">
          <Bot className="h-5 w-5 group-hover:text-neon-400 transition-colors" />
          <span className="hidden lg:block font-medium">AI Council</span>
        </a>
        <a href="/radiology" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all group">
          <Eye className="h-5 w-5 group-hover:text-neon-400 transition-colors" />
          <span className="hidden lg:block font-medium">Radiology AI</span>
        </a>
        <a href="/billing" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all group">
          <ReceiptText className="h-5 w-5 group-hover:text-neon-400 transition-colors" />
          <span className="hidden lg:block font-medium">Medical Billing</span>
        </a>
        <a href="/fhir" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all group">
          <Network className="h-5 w-5 group-hover:text-neon-400 transition-colors" />
          <span className="hidden lg:block font-medium">EHR FHIR Bridge</span>
        </a>
        <a href="/ehr-sync" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all group">
          <Workflow className="h-5 w-5 group-hover:text-neon-400 transition-colors" />
          <span className="hidden lg:block font-medium">Deep EHR Sync</span>
        </a>
        <a href="/twin" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all group">
          <Scan className="h-5 w-5 group-hover:text-neon-400 transition-colors" />
          <span className="hidden lg:block font-medium">Digital Twin</span>
        </a>
        <a href="/audit" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
          <Shield className="h-5 w-5" />
          <span className="hidden lg:block font-medium">Audit Logs</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
          <Settings className="h-5 w-5" />
          <span className="hidden lg:block font-medium">Settings</span>
        </a>
      </div>
    </aside>
  );
}
