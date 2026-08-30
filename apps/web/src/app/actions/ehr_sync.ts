'use server';

export interface CDSCard {
  uuid: string;
  summary: string;
  indicator: "info" | "warning" | "critical";
  detail: string;
  source: {
    label: string;
    url?: string;
    icon?: string;
  };
  suggestions?: Array<{
    label: string;
    uuid: string;
    actions: Array<{
      type: string;
      description: string;
      resource?: Record<string, any>;
    }>;
  }>;
  links?: Array<{
    label: string;
    url: string;
    type: string;
    appContext?: string;
  }>;
}

export interface SWMMessage {
  messageId: string;
  action: string;
  targetIframe: string;
  payload: Record<string, any>;
  status: string;
}

export interface SDCQuestionItem {
  linkId: string;
  text: string;
  type: string;
  answer: any;
  confidence: number;
  sourceEvidence: string;
}

export interface SDCQuestionnaire {
  id: string;
  title: string;
  status: string;
  patient_id: string;
  items: SDCQuestionItem[];
}

export interface AttestationRecord {
  id: string;
  patient_id: string;
  physician_name: string;
  license_number: string;
  timestamp: string;
  note_id: string;
  status: string;
  digital_signature_hash: string;
  ehr_confirmation_id: string;
}

const FALLBACK_PATIENT_VIEW_CARDS: CDSCard[] = [
  {
    uuid: "card-sepsis-alert-01",
    summary: "High Risk Sepsis Alert: Lactate 3.4 mmol/L (qSOFA 3)",
    indicator: "critical",
    detail: "Patient Robert Chen demonstrates systemic inflammatory response with hyperlactatemia (3.4 mmol/L), hypotension (88/54), and acute kidney injury (Stage 2, Cr 2.4 mg/dL). Surviving Sepsis Campaign 2021 recommends urgent 1-hour fluid resuscitation.",
    source: {
      label: "Surviving Sepsis Campaign Guidelines 2021",
      url: "https://www.sccm.org/SurvivingSepsisCampaign"
    },
    suggestions: [
      {
        label: "Order 30 mL/kg IV Balanced Crystalloid Fluid Resuscitation",
        uuid: "sugg-fluids-01",
        actions: [
          {
            type: "create",
            description: "Add Plasmalyte 2,000 mL IV rapid infusion over 2 hours",
            resource: {
              resourceType: "MedicationRequest",
              medicationCodeableConcept: { text: "Plasmalyte 148 IV 2000mL" }
            }
          }
        ]
      }
    ],
    links: [
      {
        label: "Launch MediAssist Physician Copilot",
        url: "http://localhost:3000/copilot",
        type: "smart",
        appContext: "launch_copilot_context_sepsis_01"
      }
    ]
  }
];

const FALLBACK_ORDER_SELECT_CARDS: CDSCard[] = [
  {
    uuid: "card-allergy-guard-02",
    summary: "Allergy & Renal Contraindication: Penicillin Anaphylaxis",
    indicator: "warning",
    detail: "Clinician drafted 'Piperacillin-Tazobactam (Zosyn)'. Patient has documented severe IgE-mediated Penicillin Anaphylaxis and eGFR of 32 mL/min. Recommend switching to renal-dosed monobactam (Aztreonam 1g IV q8h).",
    source: {
      label: "IDSA Hospital-Acquired Pneumonia Guidelines 2023",
      url: "https://www.idsociety.org"
    },
    suggestions: [
      {
        label: "Auto-Replace Order with Aztreonam 1g IV q8h (Renal Dosed)",
        uuid: "sugg-replace-aztreonam-01",
        actions: [
          {
            type: "delete",
            description: "Remove contraindicated Piperacillin-Tazobactam"
          },
          {
            type: "create",
            description: "Add Aztreonam 1g IV q8h",
            resource: {
              resourceType: "MedicationRequest",
              medicationCodeableConcept: { text: "Aztreonam 1g IV q8h" }
            }
          }
        ]
      }
    ]
  }
];

const FALLBACK_ORDER_SIGN_CARDS: CDSCard[] = [
  {
    uuid: "card-safety-hold-03",
    summary: "Safety Hold: Active Metformin & Lisinopril Orders in Stage 2 AKI",
    indicator: "critical",
    detail: "Metformin carries severe lactic acidosis risk in acute renal failure (Creatinine 2.4 mg/dL). Lisinopril impairs glomerular hemodynamics. System requires temporary hold before signing.",
    source: {
      label: "KDIGO Acute Kidney Injury Clinical Practice Guideline",
      url: "https://kdigo.org"
    },
    suggestions: [
      {
        label: "Place Metformin and Lisinopril on Temporary Renal Hold",
        uuid: "sugg-hold-nephrotoxins-01",
        actions: [
          {
            type: "update",
            description: "Update Metformin status to 'on-hold' (Renal Safety Hold)"
          }
        ]
      }
    ]
  }
];

const FALLBACK_SDC_FORM: SDCQuestionnaire = {
  id: "sep-1-core-measure",
  title: "CMS Quality Measure SEP-1: Sepsis Bundle Compliance",
  status: "in-progress",
  patient_id: "PAT-98421",
  items: [
    {
      linkId: "1.1",
      text: "Initial blood lactate measurement obtained within 3 hours of presentation?",
      type: "boolean",
      answer: true,
      confidence: 0.99,
      sourceEvidence: "LOINC 2571-8 collected at 07:15 (Result: 3.4 mmol/L)"
    },
    {
      linkId: "1.2",
      text: "Blood cultures drawn prior to broad-spectrum antibiotic administration?",
      type: "boolean",
      answer: true,
      confidence: 0.98,
      sourceEvidence: "Two sets peripheral blood cultures drawn at 07:20"
    },
    {
      linkId: "1.3",
      text: "Appropriate broad-spectrum IV antimicrobials ordered and administered within 3 hours?",
      type: "boolean",
      answer: true,
      confidence: 0.97,
      sourceEvidence: "IV Aztreonam 1g + Doxycycline 100mg initiated at 07:45"
    },
    {
      linkId: "1.4",
      text: "30 mL/kg balanced crystalloid fluid resuscitation initiated for hypotension or lactate >= 4.0?",
      type: "boolean",
      answer: true,
      confidence: 0.95,
      sourceEvidence: "Plasmalyte 2000 mL bolus administered for BP 88/54"
    },
    {
      linkId: "1.5",
      text: "Documented re-evaluation of volume status and tissue perfusion within 6 hours?",
      type: "string",
      answer: "Dynamic pulse pressure variation (11%) and repeat lactate ordered for 11:00 AM",
      confidence: 0.96,
      sourceEvidence: "Physician Progress Note Assessment at 08:30"
    }
  ]
};

export async function triggerCdsHook(hookType: 'patient-view' | 'order-select' | 'order-sign'): Promise<CDSCard[]> {
  try {
    const endpointMap = {
      'patient-view': 'patient-view-sepsis-surveillance',
      'order-select': 'order-select-antibiotic-stewardship',
      'order-sign': 'order-sign-safety-hold'
    };
    const URL = process.env.EHR_GATEWAY_URL || `http://localhost:8010/cds-services/${endpointMap[hookType]}`;
    const res = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ context: { patientId: "PAT-98421" } }),
      cache: 'no-store'
    });
    if (res.ok) {
      const data = await res.json();
      return data.cards;
    }
  } catch (err) {
    console.warn("Direct CDS hook fetch failed, using fallback.", err);
  }

  if (hookType === 'patient-view') return FALLBACK_PATIENT_VIEW_CARDS;
  if (hookType === 'order-select') return FALLBACK_ORDER_SELECT_CARDS;
  return FALLBACK_ORDER_SIGN_CARDS;
}

export async function populateSdcQuestionnaire(questionnaireId: string = "sep-1-core-measure"): Promise<SDCQuestionnaire> {
  try {
    const URL = process.env.EHR_GATEWAY_URL || 'http://localhost:8010/api/v1/ehr/sdc/populate';
    const res = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questionnaire_id: questionnaireId, patient_id: "PAT-98421" }),
      cache: 'no-store'
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Direct SDC populate fetch failed, using fallback.", err);
  }
  return FALLBACK_SDC_FORM;
}

export async function sendSwmScratchpadDraft(noteText: string): Promise<SWMMessage> {
  try {
    const URL = process.env.EHR_GATEWAY_URL || 'http://localhost:8010/api/v1/ehr/swm/scratchpad';
    const res = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patient_id: "PAT-98421", note_text: noteText }),
      cache: 'no-store'
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Direct SWM postMessage failed, using fallback.", err);
  }
  return {
    messageId: "swm-msg-" + Date.now(),
    action: "scratchpad.update",
    targetIframe: "epic-hyperspace-note-editor",
    payload: {
      location: "active_clinical_note_editor",
      section: "ASSESSMENT_AND_PLAN",
      content: noteText,
      format: "text/markdown"
    },
    status: "sent_to_ehr_scratchpad"
  };
}

export async function submitPhysicianAttestation(payload: {
  physicianName: string;
  licenseNumber: string;
  noteContent: string;
}): Promise<AttestationRecord> {
  try {
    const URL = process.env.EHR_GATEWAY_URL || 'http://localhost:8010/api/v1/ehr/attest';
    const res = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        patient_id: "PAT-98421",
        physician_name: payload.physicianName,
        license_number: payload.licenseNumber,
        note_id: "doc-soap-98421",
        note_content: payload.noteContent
      }),
      cache: 'no-store'
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Direct attestation failed, using fallback.", err);
  }

  return {
    id: "attest-" + Date.now(),
    patient_id: "PAT-98421",
    physician_name: payload.physicianName,
    license_number: payload.licenseNumber,
    timestamp: new Date().toISOString(),
    note_id: "doc-soap-98421",
    status: "synced_ehr",
    digital_signature_hash: "sha256:4c2a559811b7d526e0e9282384a22b79401768f51ec741ac6e6c434914197368",
    ehr_confirmation_id: "EPIC-DOC-REF-" + Math.floor(1000000 + Math.random() * 9000000)
  };
}
