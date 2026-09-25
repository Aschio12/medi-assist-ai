import uuid
import datetime

class MedWatchGenerator:
    """
    Automates the generation of FDA Form 3500 (MedWatch) XML/JSON payloads 
    based on high-confidence NLP ADE extractions.
    """
    
    def generate_form_3500(self, patient_id: str, drug_name: str, event_description: str, nlp_confidence: float):
        """
        In a production environment, this payload is sent to the FDA's ESG 
        (Electronic Submissions Gateway) in E2B(R3) XML format.
        For dashboard purposes, we return a JSON representation.
        """
        report_id = f"MW-{uuid.uuid4().hex[:8].upper()}"
        
        form_payload = {
            "report_identification": {
                "safetyreportid": report_id,
                "transmitdateformat": "204",
                "transmitdate": datetime.datetime.now().strftime("%Y%m%d%H%M%S"),
                "primarysource": {
                    "reporterqualification": "1" # 1 = Physician
                }
            },
            "patient": {
                "patientinitial": f"PID-{patient_id[:4]}", # De-identified
                "reaction": [
                    {
                        "primarysourcereaction": event_description
                    }
                ],
                "drug": [
                    {
                        "medicinalproduct": drug_name,
                        "drugcharacterization": "1" # 1 = Suspect
                    }
                ]
            },
            "metadata": {
                "ai_generated": True,
                "nlp_confidence": nlp_confidence,
                "status": "DRAFT_READY_FOR_REVIEW"
            }
        }
        
        return form_payload

medwatch_pipeline = MedWatchGenerator()
