from typing import List, Optional, Any, Dict
from pydantic import BaseModel, Field
from datetime import date, datetime

class Extension(BaseModel):
    url: str
    valueString: Optional[str] = None
    valueInteger: Optional[int] = None
    valueDecimal: Optional[float] = None
    valueBoolean: Optional[bool] = None

class Coding(BaseModel):
    system: Optional[str] = None
    version: Optional[str] = None
    code: Optional[str] = None
    display: Optional[str] = None
    userSelected: Optional[bool] = None

class CodeableConcept(BaseModel):
    coding: Optional[List[Coding]] = None
    text: Optional[str] = None

class Identifier(BaseModel):
    use: Optional[str] = None
    type: Optional[CodeableConcept] = None
    system: Optional[str] = None
    value: Optional[str] = None

class HumanName(BaseModel):
    use: Optional[str] = None
    text: Optional[str] = None
    family: Optional[str] = None
    given: Optional[List[str]] = None
    prefix: Optional[List[str]] = None
    suffix: Optional[List[str]] = None

class ContactPoint(BaseModel):
    system: Optional[str] = None # phone, fax, email
    value: Optional[str] = None
    use: Optional[str] = None # home, work, temp, old, mobile
    rank: Optional[int] = None

class Address(BaseModel):
    use: Optional[str] = None
    type: Optional[str] = None
    text: Optional[str] = None
    line: Optional[List[str]] = None
    city: Optional[str] = None
    district: Optional[str] = None
    state: Optional[str] = None
    postalCode: Optional[str] = None
    country: Optional[str] = None

class Patient(BaseModel):
    resourceType: str = Field(default="Patient")
    id: Optional[str] = None
    identifier: Optional[List[Identifier]] = None
    active: Optional[bool] = None
    name: Optional[List[HumanName]] = None
    telecom: Optional[List[ContactPoint]] = None
    gender: Optional[str] = None
    birthDate: Optional[str] = None
    address: Optional[List[Address]] = None
    maritalStatus: Optional[CodeableConcept] = None
    multipleBirthBoolean: Optional[bool] = None
    multipleBirthInteger: Optional[int] = None
    extension: Optional[List[Extension]] = None

class ObservationComponent(BaseModel):
    code: CodeableConcept
    valueQuantity: Optional[Dict[str, Any]] = None
    valueCodeableConcept: Optional[CodeableConcept] = None
    valueString: Optional[str] = None
    valueBoolean: Optional[bool] = None

class Observation(BaseModel):
    resourceType: str = Field(default="Observation")
    id: Optional[str] = None
    identifier: Optional[List[Identifier]] = None
    status: str
    category: Optional[List[CodeableConcept]] = None
    code: CodeableConcept
    subject: Optional[Dict[str, str]] = None # Reference to Patient
    encounter: Optional[Dict[str, str]] = None
    effectiveDateTime: Optional[str] = None
    issued: Optional[str] = None
    valueQuantity: Optional[Dict[str, Any]] = None
    valueCodeableConcept: Optional[CodeableConcept] = None
    valueString: Optional[str] = None
    valueBoolean: Optional[bool] = None
    component: Optional[List[ObservationComponent]] = None

class Condition(BaseModel):
    resourceType: str = Field(default="Condition")
    id: Optional[str] = None
    clinicalStatus: Optional[CodeableConcept] = None
    verificationStatus: Optional[CodeableConcept] = None
    category: Optional[List[CodeableConcept]] = None
    severity: Optional[CodeableConcept] = None
    code: Optional[CodeableConcept] = None
    subject: Dict[str, str]
    onsetDateTime: Optional[str] = None
    abatementDateTime: Optional[str] = None
    recordedDate: Optional[str] = None

class MedicationRequest(BaseModel):
    resourceType: str = Field(default="MedicationRequest")
    id: Optional[str] = None
    status: str
    intent: str
    medicationCodeableConcept: CodeableConcept
    subject: Dict[str, str]
    authoredOn: Optional[str] = None
    dosageInstruction: Optional[List[Dict[str, Any]]] = None

class BundleEntry(BaseModel):
    fullUrl: Optional[str] = None
    resource: Any # Could be Patient, Observation, etc.

class Bundle(BaseModel):
    resourceType: str = Field(default="Bundle")
    type: str # document, message, transaction, transaction-response, batch, batch-response, history, searchset, collection
    total: Optional[int] = None
    entry: Optional[List[BundleEntry]] = None
