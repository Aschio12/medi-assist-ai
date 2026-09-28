'use client';

import React, { useState } from 'react';
import { deployNanobotSwarm } from '@/app/actions/nanobot';
import { MissionControl } from '@/components/nanobot/MissionControl';
import { VascularMap } from '@/components/nanobot/VascularMap';
import { SwarmTelemetry } from '@/components/nanobot/SwarmTelemetry';
import { Rocket } from 'lucide-react';

export default function NanobotDashboard() {
  const [missionData, setMissionData] = useState<any>(null);
  const [isDeployed, setIsDeployed] = useState(false);

  const handleDeploy = async (targetSite: string, swarmSize: number) => {
    setIsDeployed(false);
    setMissionData(null);
    
    const res = await deployNanobotSwarm(targetSite, swarmSize);
    if (res?.status === "success") {
      setMissionData(res.data);
      setIsDeployed(true);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-10">
      
      <div className="glass-panel p-6 rounded-3xl border border-orange-500/30 shadow-[0_0_30px_rgba(249,115,22,0.15)] relative overflow-hidden bg-gradient-to-br from-black to-[#331100]">
        <div className="relative z-10">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30 flex items-center w-max gap-1">
            <Rocket className="h-3 w-3" /> Frontier Tech
          </span>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent mt-2">
            Nanobot Swarm Control & Micro-Surgery
          </h1>
          <p className="text-xs lg:text-sm text-orange-200/60 mt-2 max-w-3xl">
            Magnetic navigation of nanobots in the bloodstream. Uses Reinforcement Learning (Soft Actor-Critic) and Swarm Intelligence to calculate fluid-dynamic vascular paths and execute cellular-level micro-surgery and payload delivery.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
        {/* Left Column - Control */}
        <div className="flex flex-col gap-6 h-full">
           <div className="flex-1">
             <MissionControl onDeploy={handleDeploy} />
           </div>
           <div className="flex-none h-[220px]">
             <SwarmTelemetry isActive={isDeployed} data={missionData} />
           </div>
        </div>

        {/* Center/Right Column - Navigation Path */}
        <div className="lg:col-span-2 h-full">
           <VascularMap data={missionData} />
        </div>
      </div>

    </div>
  );
}
