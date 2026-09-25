'use client';

import React from 'react';
import { EcgWaveformCanvas } from '@/components/telemetry/EcgWaveformCanvas';
import { IcuVitalMonitor } from '@/components/telemetry/IcuVitalMonitor';
import { AfibSepsisAlerts } from '@/components/telemetry/AfibSepsisAlerts';

export default function TelemetryDashboard() {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-10">
      
      <div className="glass-panel p-6 rounded-3xl border border-neon-500/30 neon-glow relative overflow-hidden bg-gradient-to-b from-black/80 to-black/95">
        <div className="relative z-10">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            IoMT & Edge Telemetry
          </span>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent mt-2">
            ICU Telemetry Command Center
          </h1>
          <p className="text-xs lg:text-sm text-zinc-400 mt-2 max-w-3xl">
            Live WebSockets ingest high-frequency MQTT vital signs from ICU medical devices. Time-series ML (LSTM) actively monitors for Sepsis and Atrial Fibrillation anomalies in real-time.
          </p>
        </div>
      </div>
      
      {/* Top Row: Full width ECG Canvas */}
      <div className="w-full h-80">
        <EcgWaveformCanvas />
      </div>

      {/* Bottom Row: Vitals and ML Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <IcuVitalMonitor />
        <AfibSepsisAlerts />
      </div>

    </div>
  );
}
