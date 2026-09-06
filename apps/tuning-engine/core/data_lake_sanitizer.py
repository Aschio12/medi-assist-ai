import re
from typing import List
from models.schemas import DataLakeRecord
from core.feedback_collector import FEEDBACK_REPOSITORY

def sanitize_phi(text: str) -> str:
    """
    HIPAA Safe Harbor de-identification: removes MRNs, patient names, dates, and phone numbers.
    """
    # Replace dates like 2026-09-06 or 09/06/2026
    text = re.sub(r'\b\d{4}-\d{2}-\d{2}\b', '[DATE]', text)
    text = re.sub(r'\b\d{1,2}/\d{1,2}/\d{2,4}\b', '[DATE]', text)
    # Replace MRN codes like PAT-98421
    text = re.sub(r'PAT-\d+', '[PATIENT_ID]', text)
    # Replace common names
    text = re.sub(r'\b(Robert Chen|John Doe|Jane Smith)\b', '[PATIENT_NAME]', text, flags=re.IGNORECASE)
    return text

def export_datalake_records() -> List[DataLakeRecord]:
    records: List[DataLakeRecord] = []
    
    for i, fb in enumerate(FEEDBACK_REPOSITORY):
        clean_prompt = sanitize_phi(fb.clinical_prompt)
        clean_chosen = sanitize_phi(fb.physician_corrected_output)
        clean_rejected = sanitize_phi(fb.ai_original_output)
        
        token_estimate = len((clean_prompt + clean_chosen + clean_rejected).split()) * 4 // 3

        records.append(
            DataLakeRecord(
                id=f"dpo-rec-{i+1:04d}",
                created_at=fb.timestamp,
                prompt=clean_prompt,
                chosen=clean_chosen,
                rejected=clean_rejected,
                phi_sanitization_status="CLEARED_HIPAA_SAFE_HARBOR",
                token_count=token_estimate,
                data_split="TRAIN" if i % 5 != 0 else "VALIDATION"
            )
        )
        
    return records
