from typing import List, Dict, Any
from models.schemas import ActionChip

DEFAULT_ACTION_CHIPS: List[ActionChip] = [
    ActionChip(
        id="act-blood-cultures",
        label="Order Blood Cultures x2 & Stat Lactate",
        category="ORDER",
        icon="FlaskConical",
        description="STAT peripheral blood cultures (2 sets, aerobic/anaerobic) + serial lactate every 2h.",
        payload={"order_type": "LAB", "tests": ["Blood Cultures x2", "Lactate Stat", "CMP", "CBC with Diff"]},
        status="AVAILABLE"
    ),
    ActionChip(
        id="act-fluid-bolus",
        label="Start IV Plasma-Lyte Resuscitation (30 mL/kg)",
        category="ORDER",
        icon="Droplet",
        description="Administer 2,000 mL Plasma-Lyte A IV over 2 hours for sepsis hypoperfusion (MAP < 65).",
        payload={"order_type": "IV_FLUID", "fluid": "Plasma-Lyte A", "volume_ml": 2000, "rate": "1000 mL/hr"},
        status="AVAILABLE"
    ),
    ActionChip(
        id="act-penicillin-guardrail",
        label="Hold Metformin & Lisinopril (AKI Guardrail)",
        category="SAFETY_HOLD",
        icon="ShieldAlert",
        description="Immediate suspension of Metformin (eGFR 28 mL/min) and Lisinopril to prevent MALA and worsening AKI.",
        payload={"action": "DISCONTINUE", "medications": ["Metformin 1000mg BID", "Lisinopril 20mg Daily"]},
        status="AVAILABLE"
    ),
    ActionChip(
        id="act-prescribe-aztreonam",
        label="Queue Aztreonam 1g IV q8h (Renal Dosed)",
        category="MEDICATION",
        icon="Pill",
        description="Gram-negative coverage safe in severe penicillin anaphylaxis, renally adjusted for CrCl 28 mL/min.",
        payload={"drug": "Aztreonam", "dose": "1g IV q8h", "indication": "Severe Pneumonia in PCN Anaphylaxis"},
        status="AVAILABLE"
    ),
    ActionChip(
        id="act-ehr-note",
        label="Commit Assessment & Plan into Epic EHR",
        category="NOTE",
        icon="FileText",
        description="Directly sync structured multi-problem SOAP note to Epic Hyperspace / Cerner Millennium.",
        payload={"destination": "EPIC_HYPERSPACE_EHR", "note_title": "Inpatient Progress Note - Sepsis Protocol"},
        status="AVAILABLE"
    )
]

def get_action_chips_for_case(case_type: str = "sepsis") -> List[ActionChip]:
    return DEFAULT_ACTION_CHIPS
