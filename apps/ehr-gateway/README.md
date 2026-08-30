# MediAssist Deep EHR Gateway & CDS Hooks 2.0 Engine

The **EHR Gateway** microservice provides seamless integration with **Epic Hyperspace** and **Oracle Cerner Millennium** through **CDS Hooks v2.0**, **SMART Web Messaging (SWM)**, **FHIR Structured Data Capture (SDC)**, and **Physician Attestation Workflows**.

---

## ⚡ Supported CDS Hooks (v2.0)

1. **`patient-view`**: Fires upon opening a patient chart in Epic Hyperspace. Evaluates vitals and lab prefetch data to trigger Sepsis and Acute Kidney Injury alerts.
2. **`order-select`**: Intercepts CPOE medication selection to prevent allergic contraindications (Penicillin Anaphylaxis) and adjust for renal clearance.
3. **`order-sign`**: Enforces critical safety holds on nephrotoxic drugs (Metformin, Lisinopril) during active renal impairment.

---

## 📨 SMART Web Messaging (SWM)

Enables real-time bidirectional communication between the embedded AI Copilot iframe and Epic Hyperspace via HTML5 `postMessage` envelopes:
- `scratchpad.create`: Injects initial clinical SOAP draft.
- `scratchpad.update`: Streams real-time updates directly into Epic's active note editor.
- `ui.launchActivity`: Launches deep-linked clinical actions.

---

## 📋 FHIR SDC Form $populate & $extract

- **`$populate`**: Automatically fills complex quality measures (e.g. CMS SEP-1 Sepsis Bundle) from real-time EHR observations and ambient clinical dialogue.
- **`$extract`**: Extracts validated questionnaire responses into standard FHIR R4 resources (`Observation`, `Condition`, `DocumentReference`).

---

## ✍️ Physician Digital Attestation

- Cryptographic SHA-256 digital signature signing.
- Synchronizes status transitions from `in-progress` to `signed` (`DocumentReference.status = 'current'`).
