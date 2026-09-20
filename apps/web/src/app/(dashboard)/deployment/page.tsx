'use client';

import React from 'react';
import { ClusterHealthHUD } from '@/components/deployment/ClusterHealthHUD';
import { EdgeLatencyMonitor } from '@/components/deployment/EdgeLatencyMonitor';
import { DisasterRecoveryPanel } from '@/components/deployment/DisasterRecoveryPanel';

export default function DeploymentDashboard() {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-10">
      
      <div className="glass-panel p-6 rounded-3xl border border-neon-500/30 neon-glow relative overflow-hidden bg-gradient-to-b from-black/80 to-black/95">
        <div className="relative z-10">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-neon-500/20 text-neon-300 border border-neon-500/30">
            Global Infrastructure
          </span>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent mt-2">
            Edge Deployment & High Availability
          </h1>
          <p className="text-xs lg:text-sm text-zinc-400 mt-2 max-w-3xl">
            Live telemetry of Vercel Edge compute routing, Kubernetes (EKS) microservice autoscaling, and Supabase active-passive multi-region disaster recovery configurations.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          <ClusterHealthHUD />
        </div>
        <div className="flex flex-col gap-6">
          <EdgeLatencyMonitor />
          <DisasterRecoveryPanel />
        </div>
      </div>

    </div>
  );
}
