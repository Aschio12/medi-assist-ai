from typing import Dict, Any
from models.schemas import SmartConfiguration

def get_smart_configuration(issuer_url: str = "http://localhost:8008") -> SmartConfiguration:
    return SmartConfiguration(
        issuer=issuer_url,
        authorization_endpoint=f"{issuer_url}/oauth2/authorize",
        token_endpoint=f"{issuer_url}/oauth2/token",
        token_endpoint_auth_methods_supported=["client_secret_basic", "client_secret_post", "private_key_jwt"],
        grant_types_supported=["authorization_code", "client_credentials", "refresh_token"],
        registration_endpoint=f"{issuer_url}/oauth2/register",
        scopes_supported=[
            "openid",
            "profile",
            "fhirUser",
            "launch",
            "launch/patient",
            "patient/*.read",
            "patient/*.write",
            "patient/Patient.read",
            "patient/Observation.read",
            "patient/Observation.write",
            "patient/Condition.read",
            "patient/MedicationRequest.read",
            "patient/MedicationRequest.write",
            "patient/DocumentReference.write",
            "user/*.read",
            "user/*.write",
            "offline_access"
        ],
        response_types_supported=["code"],
        management_endpoint=f"{issuer_url}/oauth2/manage",
        introspection_endpoint=f"{issuer_url}/oauth2/introspect",
        revocation_endpoint=f"{issuer_url}/oauth2/revoke",
        capabilities=[
            "launch-ehr",
            "launch-standalone",
            "client-public",
            "client-confidential-symmetric",
            "context-ehr-patient",
            "context-ehr-encounter",
            "context-standalone-patient",
            "permission-patient",
            "permission-user"
        ],
        code_challenge_methods_supported=["S256"]
    )

def simulate_token_exchange(code: str, client_id: str) -> Dict[str, Any]:
    return {
        "access_token": f"smart_tok_{code[:8]}_eyJhGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
        "token_type": "Bearer",
        "expires_in": 3600,
        "scope": "launch/patient patient/*.read patient/*.write openid fhirUser",
        "patient": "PAT-98421",
        "encounter": "ENC-INPATIENT-8812",
        "id_token": "eyJhGciOiJSUzI1NiJ9.eyJzdWIiOiIxMDkzODQ3NTYyIiwibmFtZSI6IkRyLiBBbGV4IFJpdmVyYSJ9",
        "need_patient_banner": False,
        "smart_style_url": "http://localhost:8008/smart-style.json"
    }
