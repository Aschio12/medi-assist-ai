import time
import hashlib
import uuid
from typing import List, Dict, Any
from models.schemas import AttestationRecord

ATTESTATION_LEDGER: List[AttestationRecord] = [
    AttestationRecord(
        id="attest-001",
        patient_id="PAT-98421",
        physician_name="Dr. Alex Rivera, MD",
        license_number="CA-MED-892147",
        timestamp="2026-08-30T08:35:12Z",
        note_id="doc-soap-98421",
        status="synced_ehr",
        digital_signature_hash="sha256:4c2a559811b7d526e0e9282384a22b79401768f51ec741ac6e6c434914197368",
        ehr_confirmation_id="EPIC-DOC-REF-7729103"
    )
]

def execute_physician_attestation(
    patient_id: str,
    physician_name: str,
    license_number: str,
    note_id: str,
    note_content: str
) -> AttestationRecord:
    sig_raw = f"{physician_name}:{license_number}:{note_id}:{time.time()}:{note_content}"
    sig_hash = hashlib.sha256(sig_raw.encode()).hexdigest()
    
    record = AttestationRecord(
        id=f"attest-{len(ATTESTATION_LEDGER) + 1:03d}",
        patient_id=patient_id,
        physician_name=physician_name,
        license_number=license_number,
        timestamp=time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        note_id=note_id,
        status="synced_ehr",
        digital_signature_hash=f"sha256:{sig_hash}",
        ehr_confirmation_id=f"EPIC-DOC-REF-{uuid.uuid4().hex[:7].upper()}"
    )
    ATTESTATION_LEDGER.insert(0, record)
    return record

def list_attestations() -> List[AttestationRecord]:
    return ATTESTATION_LEDGER
