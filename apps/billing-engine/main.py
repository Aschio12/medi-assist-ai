from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List

from models.schemas import InsuranceClaimPackage, ClaimDenialRisk
from core.claims_repository import generate_sample_claims, get_claim_by_id

app = FastAPI(
    title="MediAssist Autonomous Medical Coding & Billing Engine",
    description="Autonomous ICD-10-CM / CPT Coding, AMA MDM Leveling, NCCI Edits, and EDI 837P Clearinghouse scrubbing.",
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
        "service": "billing-engine",
        "status": "online",
        "supported_code_sets": ["ICD-10-CM 2024", "CPT 2024", "HCPCS Level II"],
        "scrubbing_rules": ["CMS NCCI PTP", "MUE Edits", "LCD Medical Necessity", "AMA MDM 2024"]
    }

@app.get("/api/v1/health")
def health_check():
    return {
        "status": "healthy",
        "service": "billing-engine",
        "port": 8006,
        "ncci_version": "v30.2 R1",
        "claims_in_queue": len(generate_sample_claims())
    }

@app.get("/api/v1/billing/claims", response_model=List[InsuranceClaimPackage])
def list_claims():
    return generate_sample_claims()

@app.get("/api/v1/billing/claims/{claim_id}", response_model=InsuranceClaimPackage)
def get_claim(claim_id: str):
    return get_claim_by_id(claim_id)

@app.post("/api/v1/billing/claims/{claim_id}/scrub", response_model=InsuranceClaimPackage)
def scrub_claim(claim_id: str):
    return get_claim_by_id(claim_id)
