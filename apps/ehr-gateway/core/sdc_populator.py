from typing import List, Dict, Any
from models.schemas import SDCQuestionnaire, SDCQuestionItem

SAMPLE_QUESTIONNAIRE_TEMPLATES: Dict[str, SDCQuestionnaire] = {
    "sep-1-core-measure": SDCQuestionnaire(
        id="sep-1-core-measure",
        title="CMS Quality Measure SEP-1: Sepsis Bundle Compliance",
        status="in-progress",
        patient_id="PAT-98421",
        items=[
            SDCQuestionItem(
                linkId="1.1",
                text="Initial blood lactate measurement obtained within 3 hours of presentation?",
                type="boolean",
                answer=True,
                confidence=0.99,
                sourceEvidence="LOINC 2571-8 collected at 07:15 (Result: 3.4 mmol/L)"
            ),
            SDCQuestionItem(
                linkId="1.2",
                text="Blood cultures drawn prior to broad-spectrum antibiotic administration?",
                type="boolean",
                answer=True,
                confidence=0.98,
                sourceEvidence="Two sets peripheral blood cultures drawn at 07:20"
            ),
            SDCQuestionItem(
                linkId="1.3",
                text="Appropriate broad-spectrum IV antimicrobials ordered and administered within 3 hours?",
                type="boolean",
                answer=True,
                confidence=0.97,
                sourceEvidence="IV Aztreonam 1g + Doxycycline 100mg initiated at 07:45"
            ),
            SDCQuestionItem(
                linkId="1.4",
                text="30 mL/kg balanced crystalloid fluid resuscitation initiated for hypotension or lactate >= 4.0?",
                type="boolean",
                answer=True,
                confidence=0.95,
                sourceEvidence="Plasmalyte 2000 mL bolus administered for BP 88/54"
            ),
            SDCQuestionItem(
                linkId="1.5",
                text="Documented re-evaluation of volume status and tissue perfusion within 6 hours?",
                type="string",
                answer="Dynamic pulse pressure variation (11%) and repeat lactate ordered for 11:00 AM",
                confidence=0.96,
                sourceEvidence="Physician Progress Note Assessment at 08:30"
            )
        ]
    ),
    "inpatient-intake-form": SDCQuestionnaire(
        id="inpatient-intake-form",
        title="Inpatient Clinical Admission & Risk Stratification Assessment",
        status="in-progress",
        patient_id="PAT-98421",
        items=[
            SDCQuestionItem(
                linkId="2.1",
                text="Primary Admitting Diagnosis (ICD-10-CM)",
                type="string",
                answer="R65.20 Severe Sepsis without septic shock secondary to Right Lower Lobe Pneumonia",
                confidence=0.99,
                sourceEvidence="Radiology CXR + EHR Clinical Impression"
            ),
            SDCQuestionItem(
                linkId="2.2",
                text="Secondary Organ Complications Identified",
                type="string",
                answer="N17.9 Acute Kidney Injury Stage 2 (Baseline Cr 1.1 -> 2.4 mg/dL)",
                confidence=0.98,
                sourceEvidence="Chemistry panel LOINC 2160-0"
            ),
            SDCQuestionItem(
                linkId="2.3",
                text="Documented Medication Allergies & Reactions",
                type="string",
                answer="Penicillin / Beta-lactams (Reaction: Anaphylaxis, bronchospasm, urticaria)",
                confidence=1.0,
                sourceEvidence="EHR Allergy Intolerance SNOMED 373270004"
            ),
            SDCQuestionItem(
                linkId="2.4",
                text="Home Medications Placed on Temporary Safety Hold",
                type="string",
                answer="Metformin 1000mg BID and Lisinopril 20mg daily suspended for nephroprotection",
                confidence=0.99,
                sourceEvidence="EHR CPOE Order Ledger"
            )
        ]
    )
}

def execute_sdc_populate_operation(questionnaire_id: str, patient_id: str = "PAT-98421") -> SDCQuestionnaire:
    template = SAMPLE_QUESTIONNAIRE_TEMPLATES.get(questionnaire_id, SAMPLE_QUESTIONNAIRE_TEMPLATES["sep-1-core-measure"])
    return template
