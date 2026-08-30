from typing import Dict, Any, List
from models.schemas import TriageAssessment

def evaluate_symptom_triage(user_query: str) -> TriageAssessment:
    query_lower = user_query.lower()
    
    # Red Flag Symptoms (ESI Level 1 / 2 - Resuscitation / Emergent)
    if any(k in query_lower for k in ["chest pain", "pressure in chest", "short of breath", "can't breathe", "pass out", "fainted", "face droop", "slurred speech", "stroke"]):
        return TriageAssessment(
            urgency_level="EMERGENCY_911",
            esi_score=2,
            recommendation_title="🚨 CALL 911 OR GO TO NEAREST EMERGENCY ROOM IMMEDIATELY",
            action_steps=[
                "Call 911 immediately or have someone drive you to the nearest ER.",
                "Do NOT drive yourself to the hospital.",
                "Sit or lie down in a comfortable position and loosen tight clothing.",
                "Chew an aspirin 325mg if advised by emergency dispatchers (and not allergic)."
            ],
            warning_signs=[
                "Chest tightness radiating to jaw or left arm",
                "Severe shortness of breath at rest",
                "Sudden weakness or numbness on one side of body"
            ],
            dispatch_911_alert=True,
            nearest_care_facility="MetroHealth Emergency Department (0.8 miles away • Open 24/7)"
        )
    
    # Urgent Symptoms (ESI Level 3 - Urgent Care within hours)
    elif any(k in query_lower for k in ["fever", "cough", "vomiting", "throwing up", "dizzy", "pain", "shivering", "chills"]):
        return TriageAssessment(
            urgency_level="URGENT_CARE",
            esi_score=3,
            recommendation_title="⚠️ VISIT URGENT CARE OR CONTACT DOCTOR TODAY",
            action_steps=[
                "Go to an Urgent Care center or call Dr. Rivera's on-call triage line today.",
                "Drink water or electrolyte fluids in small sips.",
                "Monitor your temperature and blood pressure every 2 hours.",
                "If you develop chest pain or severe breathlessness, call 911 immediately."
            ],
            warning_signs=[
                "Fever over 102°F (38.9°C) that does not come down",
                "Inability to keep fluids down for more than 12 hours",
                "New confusion or worsening weakness"
            ],
            dispatch_911_alert=False,
            nearest_care_facility="MetroHealth Urgent Care Center (1.4 miles away • Open until 10:00 PM)"
        )
    
    # Routine Symptoms (ESI Level 4/5 - Primary Care Clinic Appointment)
    else:
        return TriageAssessment(
            urgency_level="ROUTINE_APPOINTMENT",
            esi_score=4,
            recommendation_title="🩺 SCHEDULE ROUTINE CLINIC FOLLOW-UP",
            action_steps=[
                "Your symptoms appear stable. Schedule a routine follow-up with your doctor.",
                "Continue taking your prescribed home medications as directed.",
                "Track your symptoms in a daily log until your appointment."
            ],
            warning_signs=[
                "Sudden worsening of symptoms",
                "Development of high fever or acute pain"
            ],
            dispatch_911_alert=False,
            nearest_care_facility="MetroHealth Primary Care Clinic (Dr. Alex Rivera • Next Slot Tomorrow 10:00 AM)"
        )
