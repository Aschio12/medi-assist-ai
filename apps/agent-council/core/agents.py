from typing import List, Dict, Any
from models.schemas import AgentProfile

COUNCIL_AGENTS: List[AgentProfile] = [
    AgentProfile(
        id="diagnostician",
        name="Dr. Alex Rivera, MD (AI)",
        role="Lead Diagnostician & Internist",
        specialty="Internal Medicine & Critical Care",
        avatar_color="#a3e635", # Neon Lime
        badge_text="DIAGNOSTICS",
        system_objective="Synthesize multi-modal clinical history, lab biomarkers, and vital trajectories into prioritized differential diagnoses with ICD-10 codification."
    ),
    AgentProfile(
        id="pharmacist",
        name="Dr. Priya Patel, PharmD (AI)",
        role="Clinical Pharmacotherapy Specialist",
        specialty="Pharmacology & Toxicology",
        avatar_color="#22d3ee", # Cyber Cyan
        badge_text="PHARMACOTHERAPY",
        system_objective="Audit proposed pharmacologic regimens for drug-drug interactions, renal dosing adjustments (eGFR), QT prolongation risks, and toxicities."
    ),
    AgentProfile(
        id="radiologist",
        name="Dr. Marcus Vance, MD (AI)",
        role="Diagnostic Radiologist & Imaging Specialist",
        specialty="Chest & Body Imaging",
        avatar_color="#c084fc", # Neon Purple / Violet
        badge_text="RADIOLOGY",
        system_objective="Correlate anatomical imaging modalities (CXR, CT, MRI) with clinical presentation and laboratory inflammatory markers."
    ),
    AgentProfile(
        id="stewardship",
        name="Dr. Elena Rostova, MD (AI)",
        role="Infectious Disease & Protocol Lead",
        specialty="Infectious Disease & Stewardship",
        avatar_color="#f59e0b", # Amber Gold
        badge_text="STEWARDSHIP",
        system_objective="Enforce Sepsis 1-Hour Bundle protocols, antibiotic stewardship guidelines, and hospital safety standards."
    ),
    AgentProfile(
        id="cmo",
        name="Chief Medical Officer Council (AI)",
        role="Executive Adjudicator & Synthesizer",
        specialty="Clinical Governance & Decision Theory",
        avatar_color="#10b981", # Emerald Green
        badge_text="CMO ADJUDICATOR",
        system_objective="Synthesize conflicting agent opinions, mediate pharmacotherapy disagreements, establish treatment confidence ratings, and generate finalized clinical directive."
    )
]

def get_agent_by_id(agent_id: str) -> AgentProfile:
    for agent in COUNCIL_AGENTS:
        if agent.id == agent_id:
            return agent
    raise ValueError(f"Agent {agent_id} not found in council roster.")
