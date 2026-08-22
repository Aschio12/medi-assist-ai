# Mock FHIR v4 Client simulating EHR integration (Epic / Cerner)
def fetch_patient_fhir_bundle(patient_id: str) -> dict:
    """Simulates fetching a FHIR Bundle containing Patient and Observation resources."""
    return {
        "resourceType": "Bundle",
        "type": "searchset",
        "entry": [
            {
                "resource": {
                    "resourceType": "Patient",
                    "id": patient_id,
                    "name": [{"family": "Chen", "given": ["Robert"]}],
                    "gender": "male",
                    "birthDate": "1965-04-12"
                }
            },
            {
                "resource": {
                    "resourceType": "Observation",
                    "status": "final",
                    "code": {"text": "Blood Pressure"},
                    "valueQuantity": {"value": 118, "unit": "mmHg"}
                }
            }
        ]
    }

def extract_clinical_context(bundle: dict) -> str:
    """Parses raw FHIR JSON into plain text for the LLM context window."""
    context = []
    for entry in bundle.get("entry", []):
        res = entry.get("resource", {})
        if res.get("resourceType") == "Patient":
            name = res.get("name", [{}])[0]
            full_name = f"{name.get('given', [''])[0]} {name.get('family', '')}"
            context.append(f"Patient Name: {full_name}, DOB: {res.get('birthDate')}")
        elif res.get("resourceType") == "Observation":
            context.append(f"Observation: {res.get('code', {}).get('text')} = {res.get('valueQuantity', {}).get('value')} {res.get('valueQuantity', {}).get('unit')}")
    return "\n".join(context)
