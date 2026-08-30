from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any

class SmartConfiguration(BaseModel):
    issuer: str
    authorization_endpoint: str
    token_endpoint: str
    token_endpoint_auth_methods_supported: List[str]
    grant_types_supported: List[str]
    registration_endpoint: Optional[str] = None
    scopes_supported: List[str]
    response_types_supported: List[str]
    management_endpoint: Optional[str] = None
    introspection_endpoint: Optional[str] = None
    revocation_endpoint: Optional[str] = None
    capabilities: List[str]
    code_challenge_methods_supported: List[str]

class FhirCoding(BaseModel):
    system: str
    code: str
    display: str

class FhirCodeableConcept(BaseModel):
    coding: List[FhirCoding]
    text: Optional[str] = None

class FhirReference(BaseModel):
    reference: str
    display: Optional[str] = None

class FhirObservation(BaseModel):
    resourceType: str = "Observation"
    id: str
    status: str # "final" | "preliminary"
    category: List[FhirCodeableConcept]
    code: FhirCodeableConcept
    subject: FhirReference
    effectiveDateTime: str
    valueQuantity: Optional[Dict[str, Any]] = None
    valueString: Optional[str] = None
    interpretation: Optional[List[FhirCodeableConcept]] = None

class FhirCondition(BaseModel):
    resourceType: str = "Condition"
    id: str
    clinicalStatus: FhirCodeableConcept
    verificationStatus: FhirCodeableConcept
    category: List[FhirCodeableConcept]
    code: FhirCodeableConcept
    subject: FhirReference
    onsetDateTime: Optional[str] = None

class FhirMedicationRequest(BaseModel):
    resourceType: str = "MedicationRequest"
    id: str
    status: str # "active" | "stopped" | "draft"
    intent: str # "order" | "plan"
    medicationCodeableConcept: FhirCodeableConcept
    subject: FhirReference
    authoredOn: str
    requester: FhirReference
    dosageInstruction: Optional[List[Dict[str, Any]]] = None

class FhirDocumentReference(BaseModel):
    resourceType: str = "DocumentReference"
    id: str
    status: str = "current"
    docStatus: str = "final"
    type: FhirCodeableConcept
    subject: FhirReference
    date: str
    author: List[FhirReference]
    description: str
    content: List[Dict[str, Any]]

class FhirBundleEntry(BaseModel):
    fullUrl: str
    resource: Dict[str, Any]

class FhirBundle(BaseModel):
    resourceType: str = "Bundle"
    id: str
    type: str = "collection" # "collection" | "transaction" | "batch"
    total: int
    entry: List[FhirBundleEntry]

class SyncAuditLog(BaseModel):
    id: str
    timestamp: str
    action: str # "PULL_EHR" | "PUSH_DOCUMENT" | "PUSH_MEDICATION" | "TRANSACTION_BUNDLE"
    source: str # "Epic Sandbox" | "Cerner Sandbox" | "MediAssist AI"
    target: str
    resource_type: str
    resource_id: str
    http_status: int
    latency_ms: int
    hash: str
