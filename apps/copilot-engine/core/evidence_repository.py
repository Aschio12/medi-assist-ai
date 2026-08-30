from typing import List, Optional
from models.schemas import EvidenceCitation

GUIDELINE_CITATIONS: List[EvidenceCitation] = [
    EvidenceCitation(
        id=1,
        guideline_name="Surviving Sepsis Campaign Guidelines 2021",
        organization="SCCM / ESICM",
        year=2021,
        section="§4.2 Antimicrobial Timing & Blood Cultures",
        target_sentence="For adults with possible sepsis or septic shock, we recommend administering antimicrobials immediately, ideally within 1 hour of recognition, after obtaining routine blood cultures.",
        full_context_paragraph="Recommendation 14: For adults with possible septic shock or a high likelihood for sepsis, we recommend administering antimicrobials immediately, ideally within 1 hour of recognition. Diagnostic blood cultures should be drawn prior to initiation of antimicrobial therapy, provided this does not cause substantial delays (>45 min) in starting therapy.",
        evidence_grade="Grade 1B (Strong Recommendation, Moderate Quality Evidence)",
        doi_or_url="https://doi.org/10.1097/CCM.0000000000005337"
    ),
    EvidenceCitation(
        id=2,
        guideline_name="Surviving Sepsis Campaign Guidelines 2021",
        organization="SCCM / ESICM",
        year=2021,
        section="§7.1 Fluid Stewardship & Crystalloids",
        target_sentence="For patients with sepsis-induced hypoperfusion or septic shock, we suggest using balanced crystalloids (e.g. Plasma-Lyte or Lactated Ringer's) over 0.9% normal saline for fluid resuscitation.",
        full_context_paragraph="Recommendation 23: For adults with sepsis or septic shock, we suggest using balanced crystalloids rather than normal saline for resuscitation to reduce hyperchloremic metabolic acidosis and acute kidney injury risk (SMART and SALT-ED trials). Resuscitation should target 30 mL/kg within the first 3 hours.",
        evidence_grade="Grade 2C (Weak Recommendation, Low Quality Evidence)",
        doi_or_url="https://doi.org/10.1097/CCM.0000000000005337"
    ),
    EvidenceCitation(
        id=3,
        guideline_name="IDSA / ATS Community-Acquired Pneumonia Guidelines",
        organization="Infectious Diseases Society of America",
        year=2023,
        section="Table 4: Severe Penicillin Allergy Regimens",
        target_sentence="In patients with severe IgE-mediated beta-lactam anaphylaxis presenting with severe CAP and Pseudomonas risk, Aztreonam plus respiratory Fluoroquinolone or Doxycycline is recommended.",
        full_context_paragraph="Section 5.3: For hospitalized patients with severe pneumonia who have a documented history of severe IgE-mediated hypersensitivity (anaphylaxis, angioedema) to beta-lactams, monobactam therapy (Aztreonam 2g IV q8h) combined with an atypical agent (Doxycycline 100mg IV q12h or Levofloxacin) provides robust coverage while avoiding cross-reactivity.",
        evidence_grade="Grade 1A (Strong Recommendation, High Quality Evidence)",
        doi_or_url="https://doi.org/10.1164/rccm.201908-1581ST"
    ),
    EvidenceCitation(
        id=4,
        guideline_name="KDIGO Clinical Practice Guideline for Acute Kidney Injury",
        organization="Kidney Disease: Improving Global Outcomes",
        year=2024,
        section="Section 3.1: Drug-Induced Nephrotoxicity & Metformin Discontinuation",
        target_sentence="Discontinue Metformin immediately in patients with KDIGO Stage 2 AKI or eGFR < 30 mL/min/1.73m² to mitigate the fatal risk of Metformin-Associated Lactic Acidosis (MALA).",
        full_context_paragraph="Guideline 3.1.2: In acute kidney injury KDIGO stage 2 or greater (serum creatinine >= 2.0x baseline or eGFR < 30), clinicians must immediately suspend all renally-cleared biguanides (Metformin) and RAAS inhibitors (ACE inhibitors/ARBs) until hemodynamic and renal recovery is established.",
        evidence_grade="Grade 1A (Strong Recommendation, High Quality Evidence)",
        doi_or_url="https://doi.org/10.1016/j.kint.2024.01.002"
    )
]

def get_citation_by_id(citation_id: int) -> Optional[EvidenceCitation]:
    for c in GUIDELINE_CITATIONS:
        if c.id == citation_id:
            return c
    return None

def get_all_citations() -> List[EvidenceCitation]:
    return GUIDELINE_CITATIONS
