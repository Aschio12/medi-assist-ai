# MediAssist Patient Empowerment Gateway & Health Literacy Engine

The **Patient Gateway** microservice bridges the health literacy gap by translating complex clinical notes into **5th-grade plain English**, orchestrating **smart medication schedules**, and running **safe 24/7 symptom triage**.

---

## 📖 Flesch-Kincaid Readability Translation

The engine quantitatively evaluates clinical text before and after translation using the **Flesch-Kincaid Grade Level (FKGL)**:

$$\text{FKGL} = 0.39 \left(\frac{\text{total words}}{\text{total sentences}}\right) + 11.8 \left(\frac{\text{total syllables}}{\text{total words}}\right) - 15.59$$

- **Original Doctor Note:** Grade 14.8 (College Level / High Complexity)
- **Translated Patient Note:** Grade 4.8 (5th Grade Plain English)

---

## 💊 Smart Pill Box & Medication Adherence

- **Time-Slotted Schedules**: Morning, Afternoon, Evening, Bedtime with actionable meal cues.
- **Safety Hold Alarms**: Highlights medications that are temporarily stopped (e.g. Metformin paused in AKI).
- **Push Notification Alarms**: Web push alerts to mobile devices.

---

## 🚨 ESI 5-Tier Emergency Symptom Triage

1. **Level 1 / 2 (Emergent / Resuscitation)**: Chest pain radiating to left arm, severe dyspnea, sudden weakness -> Triggers immediate **911 Call Banner** & nearest ER routing.
2. **Level 3 (Urgent)**: High fever (>102°F), persistent vomiting -> Routes to **Urgent Care Center**.
3. **Level 4 / 5 (Non-urgent)**: Mild stable symptoms -> Routes to **Routine Clinic Appointment**.

---

## 🚀 API Endpoints

- `POST /api/v1/patient/simplify-note`: Translate doctor note into 5th-grade plain English with glossary.
- `GET /api/v1/patient/medications`: Retrieve active daily dosing schedule and safety holds.
- `POST /api/v1/patient/medications/{id}/reminder`: Generate simulated mobile push notification.
- `POST /api/v1/patient/triage`: Evaluate symptom urgency under ESI criteria.
- `GET /api/v1/health`: Health status probe.
