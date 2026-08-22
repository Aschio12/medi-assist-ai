import { TrendingUp, AlertTriangle } from 'lucide-react';
import { RiskTrajectoryChart } from '@/components/analytics/RiskTrajectoryChart';
import { PatientRiskTable } from '@/components/analytics/PatientRiskTable';
import { AlertFeed } from '@/components/analytics/AlertFeed';

export default function AnalyticsPage() {
  return (
    <div className="h-full w-full p-8 flex flex-col relative z-10 overflow-y-auto scrollbar-hide">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-neon-400" />
            Predictive AI & Sepsis Engine
          </h1>
          <p className="text-zinc-400 text-sm mt-2">Real-time machine learning inference for early clinical deterioration.</p>
        </div>
        <div className="flex gap-3 items-center">
          <span className="relative flex h-3 w-3 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-500"></span>
          </span>
          <span className="text-neon-400 font-mono text-sm">ML Engine Online</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 glass-panel rounded-3xl p-6 h-[400px] border border-neon-500/30 neon-glow bg-gradient-to-br from-neon-500/5 to-transparent">
          <h3 className="font-semibold text-white mb-4">Ward 3: Aggregate Sepsis Risk Trajectory (24h)</h3>
          <RiskTrajectoryChart />
        </div>
        <div className="lg:col-span-1 glass-panel rounded-3xl p-6 h-[400px] flex flex-col">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-400" /> Critical ML Alerts
          </h3>
          <AlertFeed />
        </div>
      </div>
      
      <div className="glass-panel rounded-3xl p-6 border-t border-neon-500/20">
        <h3 className="font-semibold text-white mb-4">Patient Stratification (Top Risk)</h3>
        <PatientRiskTable />
      </div>
    </div>
  );
}
