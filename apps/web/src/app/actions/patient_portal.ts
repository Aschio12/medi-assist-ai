'use server';

export interface GlossaryTerm {
  medical_term: string;
  plain_english: string;
  analogy: string;
}

export interface SimplifiedNoteSection {
  title: string;
  doctor_text: string;
  patient_text: string;
  key_takeaway: string;
}

export interface SimplifiedNote {
  patient_id: string;
  original_doctor_note: string;
  original_reading_grade: number;
  simplified_reading_grade: number;
  summary_paragraph: string;
  action_items_for_patient: string[];
  sections: SimplifiedNoteSection[];
  glossary: GlossaryTerm[];
}

export interface MedicationScheduleItem {
  id: string;
  drug_name: string;
  dosage: string;
  timing_slot: "MORNING" | "AFTERNOON" | "EVENING" | "BEDTIME";
  meal_cue: string;
  purpose: string;
  pill_appearance: string;
  is_taken: boolean;
  refill_remaining: number;
  critical_warning?: string;
}

export interface TriageAssessment {
  urgency_level: "EMERGENCY_911" | "URGENT_CARE" | "ROUTINE_APPOINTMENT" | "SELF_CARE";
  esi_score: number;
  recommendation_title: string;
  action_steps: string[];
  warning_signs: string[];
  dispatch_911_alert: boolean;
  nearest_care_facility: string;
}

const FALLBACK_NOTE: SimplifiedNote = {
  patient_id: "PAT-98421",
  original_doctor_note: "68 y/o male presents with acute rigors, pyrexia (38.9C), and diaphoresis. Auscultation reveals coarse bronchial breath sounds in RLL with dullness to percussion. CXR confirms dense alveolar consolidation compatible with acute bacterial pneumonia. qSOFA score 3 with arterial hypotension (88/54) and hyperlactatemia (3.4 mmol/L) meeting criteria for Severe Sepsis. Creatinine elevated to 2.4 mg/dL representing acute kidney injury Stage 2. History of severe IgE-mediated beta-lactam anaphylaxis. Initiate IV Aztreonam plus Doxycycline; administer 2000mL balanced crystalloids. Immediately suspend Metformin and Lisinopril.",
  original_reading_grade: 14.8,
  simplified_reading_grade: 4.8,
  summary_paragraph: "You are being treated in the hospital for a lung infection (pneumonia) and temporary kidney strain. Our care team is giving you safe IV antibiotics that avoid your penicillin allergy, along with fluids to restore your strength.",
  action_items_for_patient: [
    "Rest in bed and drink fluids as guided by your care nurse.",
    "Take all scheduled doses of your new IV antibiotics.",
    "Remember: Your home pills (Metformin and Lisinopril) are on pause for now.",
    "Press your call button right away if you feel dizzy or have trouble breathing."
  ],
  sections: [
    {
      title: "1. What Is Happening (Your Diagnosis)",
      doctor_text: "CXR confirms dense alveolar consolidation compatible with acute bacterial pneumonia with Severe Sepsis.",
      patient_text: "You have a lung infection (pneumonia) in the lower part of your right lung. Because of the infection, your body has a high fever and your blood pressure dropped, which doctors call sepsis.",
      key_takeaway: "Your body is fighting a serious lung infection and needs hospital IV medicine to get better."
    },
    {
      title: "2. Your Kidneys & Blood Pressure",
      doctor_text: "Creatinine elevated to 2.4 mg/dL representing acute kidney injury Stage 2 secondary to hypotension.",
      patient_text: "Because your blood pressure was low, your kidneys are temporarily strained and running slow. We are giving you gentle IV fluids to help your kidneys rest and recover.",
      key_takeaway: "Your kidney numbers will improve as your blood pressure returns to normal with IV fluids."
    },
    {
      title: "3. Safe Antibiotic Medicine Plan",
      doctor_text: "History of severe IgE-mediated beta-lactam anaphylaxis. Initiate IV Aztreonam plus Doxycycline.",
      patient_text: "Because you are allergic to penicillin, our doctors picked special antibiotic medicines (called Aztreonam and Doxycycline) that are completely safe for your allergy.",
      key_takeaway: "You are receiving antibiotics that protect you from any allergic reaction."
    },
    {
      title: "4. Medicine Changes for Your Safety",
      doctor_text: "Immediately suspend Metformin and Lisinopril.",
      patient_text: "We have temporarily stopped your Metformin and Lisinopril pills. While your kidneys are resting, these pills can cause unwanted side effects. We will restart them once you are home and recovered.",
      key_takeaway: "DO NOT take Metformin or Lisinopril until your doctor tells you it is safe."
    }
  ],
  glossary: [
    {
      medical_term: "Severe Sepsis",
      plain_english: "A severe, whole-body reaction to an infection where organs need urgent help.",
      analogy: "Like a kitchen fire that has triggered alarms all over the entire house."
    },
    {
      medical_term: "Consolidation",
      plain_english: "Fluid and swelling filling the tiny air pockets in your lung.",
      analogy: "Like a wet sponge that has soaked up water instead of air."
    },
    {
      medical_term: "Acute Kidney Injury (Stage 2)",
      plain_english: "A sudden, temporary drop in how well your kidneys filter waste from your blood.",
      analogy: "Like a clogged water filter that is running slow and needs a rest to recover."
    },
    {
      medical_term: "Hypotension",
      plain_english: "Low blood pressure (blood is moving with less force through your vessels).",
      analogy: "Like low water pressure in a garden hose."
    },
    {
      medical_term: "Parenteral Antimicrobial",
      plain_english: "Antibiotics given directly into your vein through an IV tube for fast action.",
      analogy: "Express delivery directly to where the medicine is needed most."
    }
  ]
};

const FALLBACK_MEDS: MedicationScheduleItem[] = [
  {
    id: "med-aztreonam-01",
    drug_name: "Aztreonam IV (Antibiotic)",
    dosage: "1,000 mg IV infusion",
    timing_slot: "MORNING",
    meal_cue: "Infused by nurse at 08:00 AM",
    purpose: "Fights right lower lung infection without penicillin allergy risk",
    pill_appearance: "Clear IV drip bag with purple label",
    is_taken: true,
    refill_remaining: 14
  },
  {
    id: "med-doxycycline-02",
    drug_name: "Doxycycline (Antibiotic)",
    dosage: "100 mg Tablet",
    timing_slot: "MORNING",
    meal_cue: "Take with breakfast and a full glass of water",
    purpose: "Second antibiotic for complete pneumonia treatment",
    pill_appearance: "Small light-blue oval tablet marked D-100",
    is_taken: true,
    refill_remaining: 10,
    critical_warning: "Do not lie down for 30 minutes after taking."
  },
  {
    id: "med-atorvastatin-03",
    drug_name: "Atorvastatin (Cholesterol)",
    dosage: "40 mg Tablet",
    timing_slot: "BEDTIME",
    meal_cue: "Take at bedtime with or without water",
    purpose: "Protects heart and blood vessels",
    pill_appearance: "White elliptical tablet marked A-40",
    is_taken: false,
    refill_remaining: 28
  },
  {
    id: "med-metformin-hold",
    drug_name: "Metformin (Diabetes) — ON PAUSE",
    dosage: "1,000 mg PO — TEMPORARILY STOPPED",
    timing_slot: "MORNING",
    meal_cue: "HOLD — DO NOT TAKE",
    purpose: "Paused to protect kidneys during sepsis recovery",
    pill_appearance: "White capsule-shaped tablet (PAUSED)",
    is_taken: false,
    refill_remaining: 30,
    critical_warning: "CRITICAL SAFETY HOLD: Do NOT take while kidneys are recovering."
  }
];

export async function fetchSimplifiedNote(): Promise<SimplifiedNote> {
  try {
    const URL = process.env.PATIENT_GATEWAY_URL || 'http://localhost:8009/api/v1/patient/simplify-note';
    const res = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patient_id: "PAT-98421" }),
      cache: 'no-store'
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Direct patient gateway fetch failed, using fallback.", err);
  }
  return FALLBACK_NOTE;
}

export async function fetchMedicationSchedule(): Promise<MedicationScheduleItem[]> {
  try {
    const URL = process.env.PATIENT_GATEWAY_URL || 'http://localhost:8009/api/v1/patient/medications';
    const res = await fetch(URL, { method: 'GET', cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Direct medication schedule fetch failed, using fallback.", err);
  }
  return FALLBACK_MEDS;
}

export async function evaluateSymptomTriage(symptoms: string): Promise<TriageAssessment> {
  try {
    const URL = process.env.PATIENT_GATEWAY_URL || 'http://localhost:8009/api/v1/patient/triage';
    const res = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symptoms }),
      cache: 'no-store'
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Direct triage fetch failed, using fallback.", err);
  }

  const s = symptoms.toLowerCase();
  if (s.includes("chest") || s.includes("breathe") || s.includes("faint") || s.includes("slur")) {
    return {
      urgency_level: "EMERGENCY_911",
      esi_score: 2,
      recommendation_title: "🚨 CALL 911 OR GO TO NEAREST EMERGENCY ROOM IMMEDIATELY",
      action_steps: [
        "Call 911 immediately or have someone drive you to the nearest ER.",
        "Do NOT drive yourself to the hospital.",
        "Sit or lie down in a comfortable position and loosen tight clothing."
      ],
      warning_signs: [
        "Chest tightness radiating to jaw or left arm",
        "Severe shortness of breath at rest"
      ],
      dispatch_911_alert: true,
      nearest_care_facility: "MetroHealth Emergency Department (0.8 miles away • Open 24/7)"
    };
  }

  return {
    urgency_level: "URGENT_CARE",
    esi_score: 3,
    recommendation_title: "⚠️ VISIT URGENT CARE OR CONTACT DOCTOR TODAY",
    action_steps: [
      "Go to an Urgent Care center or call Dr. Rivera's on-call triage line today.",
      "Drink water or electrolyte fluids in small sips.",
      "Monitor your temperature every 2 hours."
    ],
    warning_signs: [
      "Fever over 102°F (38.9°C)",
      "Inability to keep fluids down"
    ],
    dispatch_911_alert: false,
    nearest_care_facility: "MetroHealth Urgent Care Center (1.4 miles away • Open until 10:00 PM)"
  };
}
