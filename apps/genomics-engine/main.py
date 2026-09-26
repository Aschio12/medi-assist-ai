from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI(title="MediAssist Genomics Engine", version="1.0.0")

class VcfUploadRequest(BaseModel):
    patient_id: str
    vcf_data_url: str
    tumor_type: str

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "genomics-engine"}

from core.vcf_parser import vcf_parser
from core.oncology_matcher import oncology_matcher
from core.fhir_genomics import fhir_exporter

@app.post("/api/genomics/analyze")
def analyze_genomic_variants(req: VcfUploadRequest):
    # 1. Parse VCF for critical mutations
    variants = vcf_parser.parse_somatic_mutations(req.vcf_data_url)
    
    # 2. Match with Targeted Therapies
    matched_variants = oncology_matcher.match_therapies(variants)
    
    # 3. Export to HL7 FHIR
    fhir_bundle = fhir_exporter.export_to_fhir(req.patient_id, matched_variants)
    
    return {
        "status": "success",
        "patient_id": req.patient_id,
        "tumor_type": req.tumor_type,
        "variants": matched_variants,
        "fhir_export": fhir_bundle
    }
