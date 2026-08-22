from core.fhir_client import fetch_patient_fhir_bundle, extract_clinical_context
import time

def generate_medical_response(query: str, patient_id: str) -> dict:
    """
    RAG Pipeline:
    1. Retrieve FHIR data for patient.
    2. Format into context.
    3. Generate LLM response (Mocked for safety/cost without an actual API key).
    """
    # 1. Retrieval
    bundle = fetch_patient_fhir_bundle(patient_id)
    context = extract_clinical_context(bundle)
    
    # 2. Mock LLM Generation (using standard medical logic)
    time.sleep(1.5) # Simulate API latency
    
    response = ""
    query_lower = query.lower()
    if "blood pressure" in query_lower or "bp" in query_lower:
        response = f"Based on the latest FHIR Observation, Robert's blood pressure is 118 mmHg. This is well-controlled and stable given his history."
    elif "medication" in query_lower:
        response = "The patient is currently prescribed a Beta-blocker (Metoprolol 50mg daily). He reported feeling 'much better' with no recent nocturnal tachycardia."
    else:
        response = f"I have reviewed the FHIR records for {context}. How specifically can I assist you with this patient's care plan?"
        
    return {
        "text": response,
        "sources": ["FHIR.Observation.BP", "Telehealth.Transcript.Aug21"]
    }
