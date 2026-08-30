from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any

from models.schemas import (
    CDSServicesDiscoveryResponse,
    CDSHookResponse,
    SWMMessage,
    SDCQuestionnaire,
    AttestationRecord
)
from core.cds_hooks_service import (
    get_cds_services_discovery,
    handle_patient_view_hook,
    handle_order_select_hook,
    handle_order_sign_hook
)
from core.smart_web_messaging import generate_swm_scratchpad_payload
from core.sdc_populator import execute_sdc_populate_operation
from core.attestation_engine import execute_physician_attestation, list_attestations

app = FastAPI(
    title="MediAssist Deep EHR Gateway & CDS Hooks 2.0 Engine",
    description="Full CDS Hooks v2.0 service registry, SMART Web Messaging postMessage bridge, FHIR SDC Form $populate, and Physician Attestation Ledger.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "service": "ehr-gateway",
        "status": "online",
        "cds_hooks_version": "2.0",
        "swm_version": "1.0.0",
        "sdc_version": "R4",
        "endpoints": [
            "/cds-services",
            "/cds-services/patient-view-sepsis-surveillance",
            "/cds-services/order-select-antibiotic-stewardship",
            "/cds-services/order-sign-safety-hold",
            "/api/v1/ehr/swm/scratchpad",
            "/api/v1/ehr/sdc/populate",
            "/api/v1/ehr/attest"
        ]
    }

@app.get("/api/v1/health")
def health_check():
    return {
        "status": "healthy",
        "service": "ehr-gateway",
        "port": 8010,
        "active_ehr_connection": "Epic Hyperspace CDS Bus & Cerner Millennium Smart Hub"
    }

@app.get("/cds-services", response_model=CDSServicesDiscoveryResponse)
def cds_services():
    return get_cds_services_discovery()

@app.post("/cds-services/patient-view-sepsis-surveillance", response_model=CDSHookResponse)
def patient_view_hook(payload: Dict[str, Any] = Body(default={})):
    patient_id = payload.get("context", {}).get("patientId", "PAT-98421")
    return handle_patient_view_hook(patient_id)

@app.post("/cds-services/order-select-antibiotic-stewardship", response_model=CDSHookResponse)
def order_select_hook(payload: Dict[str, Any] = Body(default={})):
    patient_id = payload.get("context", {}).get("patientId", "PAT-98421")
    drafted_order = payload.get("context", {}).get("draftOrders", {}).get("text", "Piperacillin-Tazobactam (Zosyn)")
    return handle_order_select_hook(patient_id, drafted_order)

@app.post("/cds-services/order-sign-safety-hold", response_model=CDSHookResponse)
def order_sign_hook(payload: Dict[str, Any] = Body(default={})):
    patient_id = payload.get("context", {}).get("patientId", "PAT-98421")
    return handle_order_sign_hook(patient_id)

@app.post("/api/v1/ehr/swm/scratchpad", response_model=SWMMessage)
def inject_swm_draft(payload: Dict[str, str] = Body(...)):
    patient_id = payload.get("patient_id", "PAT-98421")
    note_text = payload.get("note_text", "Default SOAP Note Draft")
    return generate_swm_scratchpad_payload(patient_id, note_text)

@app.post("/api/v1/ehr/sdc/populate", response_model=SDCQuestionnaire)
def populate_sdc_form(payload: Dict[str, str] = Body(...)):
    questionnaire_id = payload.get("questionnaire_id", "sep-1-core-measure")
    patient_id = payload.get("patient_id", "PAT-98421")
    return execute_sdc_populate_operation(questionnaire_id, patient_id)

@app.post("/api/v1/ehr/attest", response_model=AttestationRecord)
def attest_draft_note(payload: Dict[str, str] = Body(...)):
    patient_id = payload.get("patient_id", "PAT-98421")
    physician_name = payload.get("physician_name", "Dr. Alex Rivera, MD")
    license_number = payload.get("license_number", "CA-MED-892147")
    note_id = payload.get("note_id", "doc-soap-98421")
    note_content = payload.get("note_content", "SOAP Note Content")
    return execute_physician_attestation(patient_id, physician_name, license_number, note_id, note_content)

@app.get("/api/v1/ehr/attestations", response_model=List[AttestationRecord])
def get_all_attestations():
    return list_attestations()
