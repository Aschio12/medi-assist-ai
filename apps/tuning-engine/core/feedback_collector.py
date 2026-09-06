import time
import uuid
from typing import List
from models.schemas import ClinicianFeedback

FEEDBACK_REPOSITORY: List[ClinicianFeedback] = [
    ClinicianFeedback(
        id="fb-001",
        timestamp="2026-09-06T09:15:00Z",
        physician_name="Dr. Alex Rivera, MD",
        specialty="Critical Care & Pulmonology",
        clinical_prompt="Recommend empirical antibiotic regimen for 68yo male with severe sepsis and right lower lobe pneumonia.",
        ai_original_output="Administer IV Piperacillin-Tazobactam (Zosyn) 3.375g q6h combined with Vancomycin 15mg/kg.",
        rating="THUMBS_DOWN",
        correction_category="MEDICATION_ALLERGY",
        physician_corrected_output="Patient has documented severe IgE-mediated beta-lactam anaphylaxis and acute renal impairment (Cr 2.4). Immediately avoid Piperacillin-Tazobactam. Administer IV Aztreonam 1g q8h (renal-dosed monobactam) plus Doxycycline 100mg PO.",
        rationale="AI failed to cross-reference documented penicillin anaphylaxis and acute kidney injury Stage 2, which would have triggered fatal anaphylactic shock.",
        status="SANITIZED_INGESTED"
    ),
    ClinicianFeedback(
        id="fb-002",
        timestamp="2026-09-06T09:45:00Z",
        physician_name="Dr. Sarah Jenkins, MD",
        specialty="Nephrology",
        clinical_prompt="Review home medication list for inpatient with acute kidney injury (creatinine 2.4 mg/dL).",
        ai_original_output="Continue home medications including Metformin 1000mg BID and Lisinopril 20mg daily with regular monitoring.",
        rating="THUMBS_DOWN",
        correction_category="DOSAGE_SAFETY",
        physician_corrected_output="CRITICAL SAFETY HOLD: Immediately suspend Metformin due to lactic acidosis risk in acute kidney injury. Discontinue Lisinopril (ACE-inhibitor) to prevent efferent arteriolar vasodilation and worsening renal hypoperfusion. Recheck BMP in 24 hours.",
        rationale="Metformin and ACE-inhibitors are strictly contraindicated in acute doubling of serum creatinine.",
        status="SANITIZED_INGESTED"
    ),
    ClinicianFeedback(
        id="fb-003",
        timestamp="2026-09-06T10:10:00Z",
        physician_name="Dr. Marcus Brody, MD",
        specialty="Infectious Disease",
        clinical_prompt="Evaluate fluid resuscitation plan for severe sepsis with MAP 62 mmHg and lactate 3.4 mmol/L.",
        ai_original_output="Administer 30 mL/kg IV balanced crystalloids (Plasmalyte 2000 mL) within the first 3 hours. Reassess dynamic perfusion indicators.",
        rating="THUMBS_UP",
        correction_category="ACCURATE",
        physician_corrected_output="Administer 30 mL/kg IV balanced crystalloids (Plasmalyte 2000 mL) within the first 3 hours. Reassess dynamic perfusion indicators.",
        rationale="Complies 100% with Surviving Sepsis Campaign 2021 guidelines.",
        status="SANITIZED_INGESTED"
    )
]

def submit_feedback(
    physician_name: str,
    specialty: str,
    clinical_prompt: str,
    ai_original_output: str,
    rating: str,
    correction_category: str,
    physician_corrected_output: str,
    rationale: str
) -> ClinicianFeedback:
    fb = ClinicianFeedback(
        id=f"fb-{uuid.uuid4().hex[:6]}",
        timestamp=time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        physician_name=physician_name,
        specialty=specialty,
        clinical_prompt=clinical_prompt,
        ai_original_output=ai_original_output,
        rating=rating,
        correction_category=correction_category,
        physician_corrected_output=physician_corrected_output,
        rationale=rationale,
        status="SANITIZED_INGESTED"
    )
    FEEDBACK_REPOSITORY.insert(0, fb)
    return fb

def list_feedback() -> List[ClinicianFeedback]:
    return FEEDBACK_REPOSITORY
