from typing import List, Dict, Any
from models.schemas import (
    CDSServiceDefinition, 
    CDSServicesDiscoveryResponse, 
    CDSCard, 
    CDSHookResponse,
    CDSSource, 
    CDSSuggestion, 
    CDSSuggestionAction, 
    CDSLink
)

SERVICES_DISCOVERY: List[CDSServiceDefinition] = [
    CDSServiceDefinition(
        hook="patient-view",
        title="MediAssist Sepsis & AKI Surveillance Service",
        description="Fires automatically when clinician opens patient chart to detect early organ dysfunction.",
        id="patient-view-sepsis-surveillance",
        prefetch={
            "patient": "Patient/{{context.patientId}}",
            "vitals": "Observation?patient={{context.patientId}}&category=vital-signs&_sort=-date&_count=5",
            "labs": "Observation?patient={{context.patientId}}&code=2571-8,2160-0&_sort=-date&_count=5"
        }
    ),
    CDSServiceDefinition(
        hook="order-select",
        title="MediAssist Antibiotic Stewardship & Allergy Cross-Check",
        description="Evaluates drafted CPOE medication orders against patient penicillin anaphylaxis and renal clearance.",
        id="order-select-antibiotic-stewardship",
        prefetch={
            "allergies": "AllergyIntolerance?patient={{context.patientId}}",
            "renalFunction": "Observation?patient={{context.patientId}}&code=2160-0"
        }
    ),
    CDSServiceDefinition(
        hook="order-sign",
        title="MediAssist Critical Safety Hold & Nephrotoxin Blocker",
        description="Intercepts order signatures to prevent severe adverse events during acute kidney injury.",
        id="order-sign-safety-hold",
        prefetch={
            "conditions": "Condition?patient={{context.patientId}}&clinical-status=active"
        }
    )
]

def get_cds_services_discovery() -> CDSServicesDiscoveryResponse:
    return CDSServicesDiscoveryResponse(services=SERVICES_DISCOVERY)

def handle_patient_view_hook(patient_id: str = "PAT-98421") -> CDSHookResponse:
    cards = [
        CDSCard(
            uuid="card-sepsis-alert-01",
            summary="High Risk Sepsis Alert: Lactate 3.4 mmol/L (qSOFA 3)",
            indicator="critical",
            detail="Patient Robert Chen demonstrates systemic inflammatory response with hyperlactatemia (3.4 mmol/L), hypotension (88/54), and acute kidney injury (Stage 2, Cr 2.4 mg/dL). Surviving Sepsis Campaign 2021 recommends urgent 1-hour fluid resuscitation.",
            source=CDSSource(
                label="Surviving Sepsis Campaign Guidelines 2021",
                url="https://www.sccm.org/SurvivingSepsisCampaign",
                icon="https://cdn-icons-png.flaticon.com/512/822/822143.png"
            ),
            suggestions=[
                CDSSuggestion(
                    label="Order 30 mL/kg IV Balanced Crystalloid Fluid Resuscitation",
                    uuid="sugg-fluids-01",
                    actions=[
                        CDSSuggestionAction(
                            type="create",
                            description="Add Plasmalyte 2,000 mL IV rapid infusion over 2 hours",
                            resource={
                                "resourceType": "MedicationRequest",
                                "medicationCodeableConcept": {"text": "Plasmalyte 148 IV 2000mL"}
                            }
                        )
                    ]
                )
            ],
            links=[
                CDSLink(
                    label="Launch MediAssist Physician Copilot",
                    url="http://localhost:3000/copilot",
                    type="smart",
                    appContext="launch_copilot_context_sepsis_01"
                )
            ]
        )
    ]
    return CDSHookResponse(cards=cards)

def handle_order_select_hook(patient_id: str = "PAT-98421", drafted_order: str = "Piperacillin-Tazobactam (Zosyn)") -> CDSHookResponse:
    cards = [
        CDSCard(
            uuid="card-allergy-guard-02",
            summary="Allergy & Renal Contraindication: Penicillin Anaphylaxis",
            indicator="warning",
            detail=f"Clinician drafted '{drafted_order}'. Patient has documented severe IgE-mediated Penicillin Anaphylaxis and eGFR of 32 mL/min. Recommend switching to renal-dosed monobactam (Aztreonam 1g IV q8h).",
            source=CDSSource(
                label="IDSA Hospital-Acquired Pneumonia Guidelines 2023",
                url="https://www.idsociety.org"
            ),
            suggestions=[
                CDSSuggestion(
                    label="Auto-Replace Order with Aztreonam 1g IV q8h (Renal Dosed)",
                    uuid="sugg-replace-aztreonam-01",
                    actions=[
                        CDSSuggestionAction(
                            type="delete",
                            description="Remove contraindicated Piperacillin-Tazobactam"
                        ),
                        CDSSuggestionAction(
                            type="create",
                            description="Add Aztreonam 1g IV q8h",
                            resource={
                                "resourceType": "MedicationRequest",
                                "medicationCodeableConcept": {"text": "Aztreonam 1g IV q8h"}
                            }
                        )
                    ]
                )
            ]
        )
    ]
    return CDSHookResponse(cards=cards)

def handle_order_sign_hook(patient_id: str = "PAT-98421") -> CDSHookResponse:
    cards = [
        CDSCard(
            uuid="card-safety-hold-03",
            summary="Safety Hold: Active Metformin & Lisinopril Orders in Stage 2 AKI",
            indicator="critical",
            detail="Metformin carries severe lactic acidosis risk in acute renal failure (Creatinine 2.4 mg/dL). Lisinopril impairs glomerular hemodynamics. System requires temporary hold before signing.",
            source=CDSSource(
                label="KDIGO Acute Kidney Injury Clinical Practice Guideline",
                url="https://kdigo.org"
            ),
            suggestions=[
                CDSSuggestion(
                    label="Place Metformin and Lisinopril on Temporary Renal Hold",
                    uuid="sugg-hold-nephrotoxins-01",
                    actions=[
                        CDSSuggestionAction(
                            type="update",
                            description="Update Metformin status to 'on-hold' (Renal Safety Hold)"
                        )
                    ]
                )
            ]
        )
    ]
    return CDSHookResponse(cards=cards)
