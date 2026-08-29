'use client';
import { ShieldCheck, Stethoscope, Pill, Scan, Award } from 'lucide-react';

interface AgentRosterProps {
  activeAgentId?: string;
  isDebating?: boolean;
}

const AGENTS = [
  {
    id: "diagnostician",
    name: "Dr. Alex Rivera, MD (AI)",
    role: "Lead Diagnostician",
    specialty: "Internal Medicine & Critical Care",
    color: "#a3e635",
    border: "border-neon-500/30",
    bg: "bg-neon-500/5",
    glow: "shadow-[0_0_15px_rgba(163,230,53,0.15)]",
    icon: Stethoscope,
    badge: "DIAGNOSTICS"
  },
  {
    id: "pharmacist",
    name: "Dr. Priya Patel, PharmD (AI)",
    role: "Pharmacotherapy Specialist",
    specialty: "Clinical Pharmacology & Toxicology",
    color: "#22d3ee",
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/5",
    glow: "shadow-[0_0_15px_rgba(34,211,238,0.15)]",
    icon: Pill,
    badge: "PHARMACOLOGY"
  },
  {
    id: "radiologist",
    name: "Dr. Marcus Vance, MD (AI)",
    role: "Diagnostic Radiologist",
    specialty: "Pulmonary & Body Imaging",
    color: "#c084fc",
    border: "border-purple-500/30",
    bg: "bg-purple-500/5",
    glow: "shadow-[0_0_15px_rgba(192,132,252,0.15)]",
    icon: Scan,
    badge: "IMAGING"
  },
  {
    id: "stewardship",
    name: "Dr. Elena Rostova, MD (AI)",
    role: "Infectious Disease Lead",
    specialty: "Antibiotic Stewardship & Protocols",
    color: "#f59e0b",
    border: "border-amber-500/30",
    bg: "bg-amber-500/5",
    glow: "shadow-[0_0_15px_rgba(245,158,11,0.15)]",
    icon: ShieldCheck,
    badge: "STEWARDSHIP"
  },
  {
    id: "cmo",
    name: "Chief Medical Officer (AI)",
    role: "Executive Adjudicator",
    specialty: "Clinical Governance & Synthesis",
    color: "#10b981",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/5",
    glow: "shadow-[0_0_15px_rgba(16,185,129,0.15)]",
    icon: Award,
    badge: "ADJUDICATOR"
  }
];

export function AgentRoster({ activeAgentId, isDebating }: AgentRosterProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
      {AGENTS.map((agent) => {
        const Icon = agent.icon;
        const isActive = activeAgentId === agent.id;
        
        return (
          <div 
            key={agent.id}
            className={`glass-panel p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
              isActive ? `${agent.border} ${agent.bg} ${agent.glow} scale-[1.02]` : 'border-white/10 hover:border-white/20'
            }`}
          >
            {/* Pulsing indicator if active or debating */}
            <div className="flex items-center justify-between mb-2">
              <div 
                className="p-2 rounded-xl border flex items-center justify-center"
                style={{ backgroundColor: `${agent.color}15`, borderColor: `${agent.color}40`, color: agent.color }}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`inline-block w-2 h-2 rounded-full ${isDebating ? 'animate-ping' : ''}`} style={{ backgroundColor: agent.color }}></span>
                <span className="text-[10px] font-mono uppercase tracking-wider font-semibold" style={{ color: agent.color }}>
                  {agent.badge}
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white text-xs truncate">{agent.name}</h4>
              <p className="text-[11px] text-zinc-400 mt-0.5 truncate">{agent.role}</p>
              <p className="text-[10px] text-zinc-500 mt-1 font-mono truncate">{agent.specialty}</p>
            </div>

            {/* Bottom status bar */}
            <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px]">
              <span className="text-zinc-500">Status</span>
              <span className="text-zinc-300 font-mono font-medium">
                {isDebating ? 'Deliberating...' : 'Ready'}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
