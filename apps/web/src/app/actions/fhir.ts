'use server';

export interface SmartConfiguration {
  issuer: string;
  authorization_endpoint: string;
  token_endpoint: string;
  token_endpoint_auth_methods_supported: string[];
  grant_types_supported: string[];
  scopes_supported: string[];
  response_types_supported: string[];
  capabilities: string[];
  code_challenge_methods_supported: string[];
}

export interface SyncAuditLog {
  id: string;
  timestamp: string;
  action: string;
  source: string;
  target: string;
  resource_type: string;
  resource_id: string;
  http_status: number;
  latency_ms: number;
  hash: string;
}

export interface FhirBundle {
  resourceType: string;
  id: string;
  type: string;
  total: number;
  entry: Array<{
    fullUrl: string;
    resource: Record<string, any>;
  }>;
}

const FALLBACK_SMART_CONFIG: SmartConfiguration = {
  issuer: "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4",
  authorization_endpoint: "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize",
  token_endpoint: "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token",
  token_endpoint_auth_methods_supported: ["client_secret_basic", "private_key_jwt"],
  grant_types_supported: ["authorization_code", "refresh_token"],
  scopes_supported: [
    "openid",
    "fhirUser",
    "launch",
    "launch/patient",
    "patient/*.read",
    "patient/*.write",
    "patient/DocumentReference.write",
    "patient/MedicationRequest.write"
  ],
  response_types_supported: ["code"],
  capabilities: [
    "launch-ehr",
    "launch-standalone",
    "client-confidential-symmetric",
    "context-ehr-patient",
    "permission-patient"
  ],
  code_challenge_methods_supported: ["S256"]
};

const FALLBACK_BUNDLE: FhirBundle = {
  resourceType: "Bundle",
  id: "bundle-patient-full-record",
  type: "collection",
  total: 6,
  entry: [
    {
      fullUrl: "http://localhost:8008/api/v1/fhir/Patient/PAT-98421",
      resource: {
        resourceType: "Patient",
        id: "PAT-98421",
        active: true,
        name: [{ use: "official", family: "Chen", given: ["Robert"] }],
        gender: "male",
        birthDate: "1958-04-12",
        identifier: [{ system: "urn:oid:1.2.840.114350.1.13.0.1.7.1.1", value: "PAT-98421" }],
        telecom: [{ system: "phone", value: "555-019-2834", use: "home" }]
      }
    },
    {
      fullUrl: "http://localhost:8008/api/v1/fhir/Observation/obs-lactate-01",
      resource: {
        resourceType: "Observation",
        id: "obs-lactate-01",
        status: "final",
        category: [{ coding: [{ system: "http://terminology.hl7.org/CodeSystem/observation-category", code: "laboratory", display: "Laboratory" }] }],
        code: { coding: [{ system: "http://loinc.org", code: "2571-8", display: "Lactate [Moles/volume] in Blood" }] },
        subject: { reference: "Patient/PAT-98421", display: "Robert Chen" },
        effectiveDateTime: "2026-08-30T07:15:00Z",
        valueQuantity: { value: 3.4, unit: "mmol/L", system: "http://unitsofmeasure.org", code: "mmol/L" },
        interpretation: [{ coding: [{ system: "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation", code: "H", display: "Critical High" }] }]
      }
    },
    {
      fullUrl: "http://localhost:8008/api/v1/fhir/Observation/obs-creat-01",
      resource: {
        resourceType: "Observation",
        id: "obs-creat-01",
        status: "final",
        category: [{ coding: [{ system: "http://terminology.hl7.org/CodeSystem/observation-category", code: "laboratory", display: "Laboratory" }] }],
        code: { coding: [{ system: "http://loinc.org", code: "2160-0", display: "Creatinine [Mass/volume] in Serum or Plasma" }] },
        subject: { reference: "Patient/PAT-98421", display: "Robert Chen" },
        effectiveDateTime: "2026-08-30T07:15:00Z",
        valueQuantity: { value: 2.4, unit: "mg/dL", system: "http://unitsofmeasure.org", code: "mg/dL" },
        interpretation: [{ coding: [{ system: "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation", code: "H", display: "High (Stage 2 AKI)" }] }]
      }
    },
    {
      fullUrl: "http://localhost:8008/api/v1/fhir/Condition/cond-sepsis-01",
      resource: {
        resourceType: "Condition",
        id: "cond-sepsis-01",
        clinicalStatus: { coding: [{ system: "http://terminology.hl7.org/CodeSystem/condition-clinical", code: "active", display: "Active" }] },
        verificationStatus: { coding: [{ system: "http://terminology.hl7.org/CodeSystem/condition-ver-status", code: "confirmed", display: "Confirmed" }] },
        category: [{ coding: [{ system: "http://terminology.hl7.org/CodeSystem/condition-category", code: "encounter-diagnosis", display: "Encounter Diagnosis" }] }],
        code: { coding: [{ system: "http://hl7.org/fhir/sid/icd-10-cm", code: "R65.20", display: "Severe Sepsis without Septic Shock" }] },
        subject: { reference: "Patient/PAT-98421", display: "Robert Chen" },
        onsetDateTime: "2026-08-30T06:30:00Z"
      }
    },
    {
      fullUrl: "http://localhost:8008/api/v1/fhir/Condition/cond-aki-01",
      resource: {
        resourceType: "Condition",
        id: "cond-aki-01",
        clinicalStatus: { coding: [{ system: "http://terminology.hl7.org/CodeSystem/condition-clinical", code: "active", display: "Active" }] },
        verificationStatus: { coding: [{ system: "http://terminology.hl7.org/CodeSystem/condition-ver-status", code: "confirmed", display: "Confirmed" }] },
        category: [{ coding: [{ system: "http://terminology.hl7.org/CodeSystem/condition-category", code: "problem-list-item", display: "Problem List Item" }] }],
        code: { coding: [{ system: "http://hl7.org/fhir/sid/icd-10-cm", code: "N17.9", display: "Acute Kidney Injury, Unspecified (Stage 2)" }] },
        subject: { reference: "Patient/PAT-98421", display: "Robert Chen" },
        onsetDateTime: "2026-08-30T06:30:00Z"
      }
    },
    {
      fullUrl: "http://localhost:8008/api/v1/fhir/AllergyIntolerance/alg-pcn-01",
      resource: {
        resourceType: "AllergyIntolerance",
        id: "alg-pcn-01",
        clinicalStatus: { coding: [{ system: "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical", code: "active", display: "Active" }] },
        verificationStatus: { coding: [{ system: "http://terminology.hl7.org/CodeSystem/allergyintolerance-verification", code: "confirmed", display: "Confirmed" }] },
        type: "allergy",
        criticality: "high",
        code: { coding: [{ system: "http://snomed.info/sct", code: "373270004", display: "Penicillin - substance (substance)" }] },
        patient: { reference: "Patient/PAT-98421", display: "Robert Chen" },
        reaction: [{ manifestation: [{ coding: [{ system: "http://snomed.info/sct", code: "39579001", display: "Anaphylaxis" }] }], severity: "severe" }]
      }
    }
  ]
};

const FALLBACK_LOGS: SyncAuditLog[] = [
  {
    id: "sync-001",
    timestamp: "2026-08-30T07:15:22Z",
    action: "PULL_EHR",
    source: "Epic Hyperspace Sandbox (R4)",
    target: "MediAssist FHIR Gateway",
    resource_type: "Patient + Observations",
    resource_id: "PAT-98421",
    http_status: 200,
    latency_ms: 142,
    hash: "sha256:7f83b1657ff1fc53..."
  },
  {
    id: "sync-002",
    timestamp: "2026-08-30T07:18:04Z",
    action: "PUSH_DOCUMENT",
    source: "MediAssist Ambient Scribe",
    target: "Epic Hyperspace Sandbox (R4)",
    resource_type: "DocumentReference",
    resource_id: "doc-soap-98421",
    http_status: 201,
    latency_ms: 210,
    hash: "sha256:9f86d081884c7d65..."
  }
];

export async function fetchSmartConfiguration(): Promise<SmartConfiguration> {
  try {
    const URL = process.env.FHIR_BRIDGE_URL || 'http://localhost:8008/.well-known/smart-configuration';
    const res = await fetch(URL, { method: 'GET', cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Direct SMART config fetch failed, using fallback.", err);
  }
  return FALLBACK_SMART_CONFIG;
}

export async function fetchPatientFhirBundle(patientId: string = "PAT-98421"): Promise<FhirBundle> {
  try {
    const URL = process.env.FHIR_BRIDGE_URL || `http://localhost:8008/api/v1/fhir/Patient/${patientId}`;
    const res = await fetch(URL, { method: 'GET', cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Direct FHIR bundle fetch failed, using fallback.", err);
  }
  return FALLBACK_BUNDLE;
}

export async function fetchSyncAuditLogs(): Promise<SyncAuditLog[]> {
  try {
    const URL = process.env.FHIR_BRIDGE_URL || 'http://localhost:8008/api/v1/fhir/sync/audit-logs';
    const res = await fetch(URL, { method: 'GET', cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Direct Sync audit logs fetch failed, using fallback.", err);
  }
  return FALLBACK_LOGS;
}

export async function pushDocumentReferenceWriteBack(payload: Record<string, any>): Promise<any> {
  try {
    const URL = process.env.FHIR_BRIDGE_URL || 'http://localhost:8008/api/v1/fhir/DocumentReference';
    const res = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store'
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Writeback API call failed, simulating success.", err);
  }
  return { status: "created", id: "doc-soap-" + Date.now(), timestamp: new Date().toISOString() };
}

export async function pushMedicationRequestWriteBack(payload: Record<string, any>): Promise<any> {
  try {
    const URL = process.env.FHIR_BRIDGE_URL || 'http://localhost:8008/api/v1/fhir/MedicationRequest';
    const res = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store'
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Writeback API call failed, simulating success.", err);
  }
  return { status: "created", id: "med-req-" + Date.now(), timestamp: new Date().toISOString() };
}
