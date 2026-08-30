from typing import Dict, Any, List
from models.schemas import FhirBundle, FhirBundleEntry

def get_patient_fhir_bundle(patient_id: str = "PAT-98421") -> Dict[str, Any]:
    return {
        "resourceType": "Bundle",
        "id": "bundle-patient-full-record",
        "type": "collection",
        "total": 6,
        "entry": [
            {
                "fullUrl": f"http://localhost:8008/api/v1/fhir/Patient/{patient_id}",
                "resource": {
                    "resourceType": "Patient",
                    "id": patient_id,
                    "active": True,
                    "name": [{"use": "official", "family": "Chen", "given": ["Robert"]}],
                    "gender": "male",
                    "birthDate": "1958-04-12",
                    "identifier": [{"system": "urn:oid:1.2.840.114350.1.13.0.1.7.1.1", "value": patient_id}],
                    "telecom": [{"system": "phone", "value": "555-019-2834", "use": "home"}]
                }
            },
            {
                "fullUrl": "http://localhost:8008/api/v1/fhir/Observation/obs-lactate-01",
                "resource": {
                    "resourceType": "Observation",
                    "id": "obs-lactate-01",
                    "status": "final",
                    "category": [{"coding": [{"system": "http://terminology.hl7.org/CodeSystem/observation-category", "code": "laboratory", "display": "Laboratory"}]}],
                    "code": {"coding": [{"system": "http://loinc.org", "code": "2571-8", "display": "Lactate [Moles/volume] in Blood"}]},
                    "subject": {"reference": f"Patient/{patient_id}", "display": "Robert Chen"},
                    "effectiveDateTime": "2026-08-30T07:15:00Z",
                    "valueQuantity": {"value": 3.4, "unit": "mmol/L", "system": "http://unitsofmeasure.org", "code": "mmol/L"},
                    "interpretation": [{"coding": [{"system": "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation", "code": "H", "display": "Critical High"}]}]
                }
            },
            {
                "fullUrl": "http://localhost:8008/api/v1/fhir/Observation/obs-creat-01",
                "resource": {
                    "resourceType": "Observation",
                    "id": "obs-creat-01",
                    "status": "final",
                    "category": [{"coding": [{"system": "http://terminology.hl7.org/CodeSystem/observation-category", "code": "laboratory", "display": "Laboratory"}]}],
                    "code": {"coding": [{"system": "http://loinc.org", "code": "2160-0", "display": "Creatinine [Mass/volume] in Serum or Plasma"}]},
                    "subject": {"reference": f"Patient/{patient_id}", "display": "Robert Chen"},
                    "effectiveDateTime": "2026-08-30T07:15:00Z",
                    "valueQuantity": {"value": 2.4, "unit": "mg/dL", "system": "http://unitsofmeasure.org", "code": "mg/dL"},
                    "interpretation": [{"coding": [{"system": "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation", "code": "H", "display": "High (Stage 2 AKI)"}]}]
                }
            },
            {
                "fullUrl": "http://localhost:8008/api/v1/fhir/Condition/cond-sepsis-01",
                "resource": {
                    "resourceType": "Condition",
                    "id": "cond-sepsis-01",
                    "clinicalStatus": {"coding": [{"system": "http://terminology.hl7.org/CodeSystem/condition-clinical", "code": "active", "display": "Active"}]},
                    "verificationStatus": {"coding": [{"system": "http://terminology.hl7.org/CodeSystem/condition-ver-status", "code": "confirmed", "display": "Confirmed"}]},
                    "category": [{"coding": [{"system": "http://terminology.hl7.org/CodeSystem/condition-category", "code": "encounter-diagnosis", "display": "Encounter Diagnosis"}]}],
                    "code": {"coding": [{"system": "http://hl7.org/fhir/sid/icd-10-cm", "code": "R65.20", "display": "Severe Sepsis without Septic Shock"}]},
                    "subject": {"reference": f"Patient/{patient_id}", "display": "Robert Chen"},
                    "onsetDateTime": "2026-08-30T06:30:00Z"
                }
            },
            {
                "fullUrl": "http://localhost:8008/api/v1/fhir/Condition/cond-aki-01",
                "resource": {
                    "resourceType": "Condition",
                    "id": "cond-aki-01",
                    "clinicalStatus": {"coding": [{"system": "http://terminology.hl7.org/CodeSystem/condition-clinical", "code": "active", "display": "Active"}]},
                    "verificationStatus": {"coding": [{"system": "http://terminology.hl7.org/CodeSystem/condition-ver-status", "code": "confirmed", "display": "Confirmed"}]},
                    "category": [{"coding": [{"system": "http://terminology.hl7.org/CodeSystem/condition-category", "code": "problem-list-item", "display": "Problem List Item"}]}],
                    "code": {"coding": [{"system": "http://hl7.org/fhir/sid/icd-10-cm", "code": "N17.9", "display": "Acute Kidney Injury, Unspecified (Stage 2)"}]},
                    "subject": {"reference": f"Patient/{patient_id}", "display": "Robert Chen"},
                    "onsetDateTime": "2026-08-30T06:30:00Z"
                }
            },
            {
                "fullUrl": "http://localhost:8008/api/v1/fhir/AllergyIntolerance/alg-pcn-01",
                "resource": {
                    "resourceType": "AllergyIntolerance",
                    "id": "alg-pcn-01",
                    "clinicalStatus": {"coding": [{"system": "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical", "code": "active", "display": "Active"}]},
                    "verificationStatus": {"coding": [{"system": "http://terminology.hl7.org/CodeSystem/allergyintolerance-verification", "code": "confirmed", "display": "Confirmed"}]},
                    "type": "allergy",
                    "criticality": "high",
                    "code": {"coding": [{"system": "http://snomed.info/sct", "code": "373270004", "display": "Penicillin - substance (substance)"}]},
                    "patient": {"reference": f"Patient/{patient_id}", "display": "Robert Chen"},
                    "reaction": [{"manifestation": [{"coding": [{"system": "http://snomed.info/sct", "code": "39579001", "display": "Anaphylaxis"}]}], "severity": "severe"}]
                }
            }
        ]
    }
