from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any

class CDSSource(BaseModel):
    label: str
    url: Optional[str] = None
    icon: Optional[str] = None

class CDSSuggestionAction(BaseModel):
    type: str # "create" | "update" | "delete"
    description: str
    resource: Optional[Dict[str, Any]] = None

class CDSSuggestion(BaseModel):
    label: str
    uuid: str
    actions: List[CDSSuggestionAction]

class CDSLink(BaseModel):
    label: str
    url: str
    type: str # "smart" | "absolute"
    appContext: Optional[str] = None

class CDSCard(BaseModel):
    uuid: str
    summary: str
    indicator: str # "info" | "warning" | "critical"
    detail: str
    source: CDSSource
    suggestions: Optional[List[CDSSuggestion]] = None
    selectionBehavior: Optional[str] = None
    links: Optional[List[CDSLink]] = None

class CDSHookResponse(BaseModel):
    cards: List[CDSCard]

class CDSServiceDefinition(BaseModel):
    hook: str
    title: str
    description: str
    id: str
    prefetch: Dict[str, str]

class CDSServicesDiscoveryResponse(BaseModel):
    services: List[CDSServiceDefinition]

class SWMMessage(BaseModel):
    messageId: str
    action: str # "scratchpad.create" | "scratchpad.update" | "ui.launchActivity"
    targetIframe: str
    payload: Dict[str, Any]
    status: str

class SDCQuestionItem(BaseModel):
    linkId: str
    text: str
    type: str # "string" | "choice" | "boolean" | "decimal"
    answer: Any
    confidence: float
    sourceEvidence: str

class SDCQuestionnaire(BaseModel):
    id: str
    title: str
    status: str # "in-progress" | "completed"
    patient_id: str
    items: List[SDCQuestionItem]

class AttestationRecord(BaseModel):
    id: str
    patient_id: str
    physician_name: str
    license_number: str
    timestamp: str
    note_id: str
    status: str # "draft" | "attested" | "synced_ehr"
    digital_signature_hash: str
    ehr_confirmation_id: str
