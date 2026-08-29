# MediAssist Autonomous Medical Billing & Coding Engine

The **Billing Engine** microservice automates ICD-10-CM diagnostic extraction, CPT procedural coding, AMA 2024 Medical Decision Making (MDM) E/M leveling, and clearinghouse claim scrubbing.

---

## ⚖️ AMA 2024 Medical Decision Making (MDM) Scoring Matrix

To qualify for a given E/M level (e.g. 99215 / 99223), **2 out of the 3 elements** must be met or exceeded:

1. **Number and Complexity of Problems Addressed**: Minimal, Low, Moderate, or High (e.g. Severe Sepsis with organ dysfunction = HIGH).
2. **Amount and/or Complexity of Data to be Reviewed**: Category 1 (external tests ordered/reviewed), Category 2 (independent radiograph interpretation), Category 3 (discussion with external physician).
3. **Risk of Complications and Morbidity/Mortality**: Decision regarding hospitalization, parenteral controlled substance administration, or emergency escalation = HIGH.

---

## 🛡️ Clearinghouse & NCCI Scrubbing Rules

- **NCCI Procedure-to-Procedure (PTP) Edits**: Identifies code pairs that cannot be billed together without an unbundling modifier (e.g. CVC line insertion 36556 + E/M 99223 requires **Modifier -25**).
- **Medically Unlikely Edits (MUE)**: Limits units of service per line item per day.
- **Local Coverage Determinations (LCD)**: Verifies medical necessity matching diagnosis to procedure.
- **ANSI X12 EDI 837P**: Generates compliant 5010 electronic health claim transaction files.

---

## 🚀 API Endpoints

- `GET /api/v1/billing/claims`: List all active encounter claim packages.
- `GET /api/v1/billing/claims/{claim_id}`: Retrieve detailed claim line items and MDM leveling.
- `POST /api/v1/billing/claims/{claim_id}/scrub`: Run full NCCI audit and denial risk prediction.
- `GET /api/v1/health`: Health status probe.
