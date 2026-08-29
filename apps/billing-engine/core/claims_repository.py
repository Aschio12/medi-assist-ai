from typing import List
from models.schemas import InsuranceClaimPackage
from core.coding_pipeline import extract_diagnoses_for_case, extract_procedures_for_case
from core.mdm_engine import evaluate_medical_decision_making
from core.claim_scrubber import scrub_claim_ncci_edits

def generate_sample_claims() -> List[InsuranceClaimPackage]:
    # Claim 1: Robert Chen (Inpatient Sepsis)
    diag1 = extract_diagnoses_for_case("case-sepsis-aki-01")
    proc1 = extract_procedures_for_case("case-sepsis-aki-01")
    mdm1 = evaluate_medical_decision_making("inpatient", {
        "acute_illness_threat_to_life": True,
        "acute_illness_systemic_symptoms": True
    })
    ncci1, denial1 = scrub_claim_ncci_edits(proc1, diag1)
    
    tot_rvu1 = sum(p.total_rvu for p in proc1)
    est_pay1 = sum(p.standard_fee for p in proc1)

    edi1 = """ISA*00*          *00*          *ZZ*SUBMITTER123   *ZZ*PAYER001       *260829*1420*^*00501*000000001*0*P*:~
GS*HC*SUBMITTER123*PAYER001*20260829*1420*1*X*005010X222A1~
ST*837*0001*005010X222A1~
BHT*0019*00*CLM-SEP-98421*20260829*1420*CH~
NM1*41*2*METROHEALTH ACADEMIC MEDICAL CENTER*****XX*1982736450~
PER*IC*BILLING DEPT*TE*5550192834~
NM1*40*2*BLUE CROSS BLUE SHIELD*****46*BCBS01~
HL*1**20*1~
NM1*85*2*METROHEALTH PHYSICIAN GROUP*****XX*1093847562~
HL*2*1*22*0~
NM1*IL*1*CHEN*ROBERT****MI*BCBS-84920194~
DMG*D8*19580412*M~
CLM*CLM-SEP-98421*606.05***21:B:1*Y*A*Y*Y*P~
HI*BK:R6520*BF:J189*BF:N179*BF:Z880~
LX*1~
SV1*HC:99223:25*228.45*UN*1***1:2:3~
DTP*472*D8*20260828~
LX*2~
SV1*HC:36556*312.80*UN*1***1~
DTP*472*D8*20260828~
LX*3~
SV1*HC:71045:26*35.20*UN*1***2~
DTP*472*D8*20260828~
LX*4~
SV1*HC:87040*29.60*UN*2***1~
DTP*472*D8*20260828~
SE*28*0001~
GE*1*1~
IEA*1*000000001~"""

    claim1 = InsuranceClaimPackage(
        claim_id="CLM-SEP-98421",
        encounter_id="ENC-INPATIENT-8812",
        patient_id="PAT-98421",
        patient_name="Robert Chen",
        date_of_service="2026-08-28",
        payer_name="Blue Cross Blue Shield (Medicare Advantage PPO)",
        payer_id="BCBS-MA-001",
        place_of_service="21 - Inpatient Hospital",
        provider_name="Dr. Alex Rivera, MD",
        provider_npi="1093847562",
        icd10_diagnoses=diag1,
        cpt_procedures=proc1,
        mdm_evaluation=mdm1,
        ncci_scrub=ncci1,
        denial_prediction=denial1,
        total_rvu=round(tot_rvu1, 2),
        estimated_reimbursement=round(est_pay1, 2),
        claim_status="SCRUBBED_READY",
        edi_837_raw=edi1
    )

    # Claim 2: James Wilson (Outpatient Chronic)
    diag2 = extract_diagnoses_for_case("case-diabetes-02")
    proc2 = extract_procedures_for_case("case-diabetes-02")
    mdm2 = evaluate_medical_decision_making("outpatient", {
        "acute_illness_threat_to_life": False,
        "acute_illness_systemic_symptoms": True
    })
    ncci2, denial2 = scrub_claim_ncci_edits(proc2, diag2)
    tot_rvu2 = sum(p.total_rvu for p in proc2)
    est_pay2 = sum(p.standard_fee for p in proc2)

    claim2 = InsuranceClaimPackage(
        claim_id="CLM-OUT-10294",
        encounter_id="ENC-CLINIC-4410",
        patient_id="PAT-10294",
        patient_name="James Wilson",
        date_of_service="2026-08-27",
        payer_name="Aetna Commercial Choice POS",
        payer_id="AETNA-60054",
        place_of_service="11 - Office",
        provider_name="Dr. Sarah Jenkins, MD",
        provider_npi="1882736451",
        icd10_diagnoses=diag2,
        cpt_procedures=proc2,
        mdm_evaluation=mdm2,
        ncci_scrub=ncci2,
        denial_prediction=denial2,
        total_rvu=round(tot_rvu2, 2),
        estimated_reimbursement=round(est_pay2, 2),
        claim_status="SCRUBBED_READY",
        edi_837_raw="ISA*00*...~GS*HC*...~ST*837*0002~CLM*CLM-OUT-10294*194.00~SV1*HC:99215*194.00~SE*15*0002~"
    )

    return [claim1, claim2]

def get_claim_by_id(claim_id: str) -> InsuranceClaimPackage:
    claims = generate_sample_claims()
    for c in claims:
        if c.claim_id == claim_id:
            return c
    return claims[0]
