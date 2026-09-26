from typing import List, Dict, Any
import datetime

class FhirGenomicsExporter:
    """
    Converts genomic findings into HL7 FHIR Genomics Reporting IG format.
    Maps variants to FHIR Observations and groups them in a DiagnosticReport.
    """
    
    def export_to_fhir(self, patient_id: str, matched_variants: List[Dict[str, Any]]) -> Dict[str, Any]:
        
        observations = []
        for idx, variant in enumerate(matched_variants):
            obs = {
                "resourceType": "Observation",
                "id": f"variant-{idx}",
                "status": "final",
                "category": [
                    {
                        "coding": [
                            {
                                "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                                "code": "laboratory"
                            }
                        ]
                    }
                ],
                "code": {
                    "coding": [
                        {
                            "system": "http://loinc.org",
                            "code": "69548-6",
                            "display": "Genetic variant assessment"
                        }
                    ]
                },
                "valueCodeableConcept": {
                    "text": f"{variant['gene']} {variant['mutation']}"
                },
                "component": [
                    {
                        "code": {
                            "coding": [{"system": "http://loinc.org", "code": "48002-0", "display": "Genomic source class"}]
                        },
                        "valueCodeableConcept": {
                            "coding": [{"system": "http://loinc.org", "code": "LA6684-0", "display": "Somatic"}]
                        }
                    },
                    {
                         "code": {
                            "coding": [{"system": "http://loinc.org", "code": "81258-6", "display": "Sample allele frequency"}]
                        },
                        "valueQuantity": {
                            "value": variant["allele_frequency"],
                            "unit": "%"
                        }
                    }
                ]
            }
            observations.append(obs)

        report = {
            "resourceType": "DiagnosticReport",
            "id": f"genomics-report-{patient_id}",
            "status": "final",
            "code": {
                "coding": [
                    {
                        "system": "http://loinc.org",
                        "code": "81247-9",
                        "display": "Master HL7 genetic variant reporting panel"
                    }
                ]
            },
            "subject": {
                "reference": f"Patient/{patient_id}"
            },
            "effectiveDateTime": datetime.datetime.utcnow().isoformat() + "Z",
            "result": [{"reference": f"Observation/{obs['id']}"} for obs in observations]
        }
        
        return {
            "DiagnosticReport": report,
            "Observations": observations
        }

fhir_exporter = FhirGenomicsExporter()
