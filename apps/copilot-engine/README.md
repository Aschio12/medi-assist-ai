# MediAssist Physician Copilot Engine & Grounded Evidence Viewer

The **Copilot Engine** powers the split-screen clinical workstation, grounding conversational LLM reasoning in verified peer-reviewed medical literature and generating 1-click clinical order action chips.

---

## ⚡ Key Features

1. **Split-Screen Dual Workstation**:
   - **Left Pane**: Interactive conversational AI assistant generating clinical differentials and management plans with superscript citation anchors `[1]`, `[2]`, `[3]`.
   - **Right Pane**: Real-time patient chart telemetry, vital sign alarms, and an interactive **Grounded Evidence Viewer** that automatically jumps and highlights the exact cited guideline paragraph when clicked.

2. **Verified Clinical Guidelines Indexed**:
   - *Surviving Sepsis Campaign Guidelines (2021)* (§4.2 Antimicrobial Timing & §7.1 Crystalloids).
   - *IDSA/ATS Community-Acquired Pneumonia Guidelines (2023)* (Table 4: Penicillin Allergy Regimens).
   - *KDIGO Acute Kidney Injury Clinical Practice Guideline (2024)* (Section 3.1: Metformin Discontinuation).

3. **1-Click Action Chips**:
   - `⚡ Order Blood Cultures x2 & Stat Lactate`
   - `⚡ Start IV Plasma-Lyte Resuscitation (30 mL/kg)`
   - `⚡ Hold Metformin & Lisinopril (AKI Guardrail)`
   - `⚡ Queue Aztreonam 1g IV q8h (Renal Dosed)`
   - `⚡ Commit Assessment & Plan into Epic EHR`

---

## 🚀 API Endpoints

- `GET /api/v1/copilot/citations`: List all indexed guideline citations.
- `GET /api/v1/copilot/citations/{citation_id}`: Retrieve detailed text passage and DOI metadata.
- `POST /api/v1/copilot/query`: Generate clinical reasoning with citations and action chips.
- `GET /api/v1/health`: Health status check.
