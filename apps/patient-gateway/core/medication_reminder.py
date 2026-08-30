from typing import List
from models.schemas import MedicationScheduleItem, PushNotificationPayload

MEDICATION_SCHEDULE: List[MedicationScheduleItem] = [
    MedicationScheduleItem(
        id="med-aztreonam-01",
        drug_name="Aztreonam IV (Antibiotic)",
        dosage="1,000 mg IV infusion",
        timing_slot="MORNING",
        meal_cue="Infused by nurse at 08:00 AM",
        purpose="Fights right lower lung infection without penicillin allergy risk",
        pill_appearance="Clear IV drip bag with purple label",
        is_taken=True,
        refill_remaining=14,
        critical_warning=None
    ),
    MedicationScheduleItem(
        id="med-doxycycline-02",
        drug_name="Doxycycline (Antibiotic)",
        dosage="100 mg Tablet",
        timing_slot="MORNING",
        meal_cue="Take with breakfast and a full glass of water",
        purpose="Second antibiotic for complete pneumonia treatment",
        pill_appearance="Small light-blue oval tablet marked D-100",
        is_taken=True,
        refill_remaining=10,
        critical_warning="Do not lie down for 30 minutes after taking."
    ),
    MedicationScheduleItem(
        id="med-atorvastatin-03",
        drug_name="Atorvastatin (Cholesterol)",
        dosage="40 mg Tablet",
        timing_slot="BEDTIME",
        meal_cue="Take at bedtime with or without water",
        purpose="Protects heart and blood vessels",
        pill_appearance="White elliptical tablet marked A-40",
        is_taken=False,
        refill_remaining=28,
        critical_warning=None
    ),
    MedicationScheduleItem(
        id="med-metformin-hold",
        drug_name="Metformin (Diabetes) — ON PAUSE",
        dosage="1,000 mg PO — TEMPORARILY STOPPED",
        timing_slot="MORNING",
        meal_cue="HOLD — DO NOT TAKE",
        purpose="Paused to protect kidneys during sepsis recovery",
        pill_appearance="White capsule-shaped tablet (PAUSED)",
        is_taken=False,
        refill_remaining=30,
        critical_warning="CRITICAL SAFETY HOLD: Do NOT take while kidneys are recovering."
    )
]

def get_medication_schedule(patient_id: str = "PAT-98421") -> List[MedicationScheduleItem]:
    return MEDICATION_SCHEDULE

def generate_push_reminder(med_id: str) -> PushNotificationPayload:
    item = next((m for m in MEDICATION_SCHEDULE if m.id == med_id), MEDICATION_SCHEDULE[1])
    return PushNotificationPayload(
        title=f"💊 Time for your {item.drug_name}",
        body=f"Dose: {item.dosage} • {item.meal_cue}. Tap to mark as taken.",
        tag=f"pill-reminder-{med_id}",
        scheduled_time="Now",
        action_url="/patient"
    )
