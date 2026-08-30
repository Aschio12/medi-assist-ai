import re
from typing import List, Dict, Tuple
from models.schemas import SimplifiedNote, SimplifiedNoteSection, GlossaryTerm

PLAIN_LANGUAGE_GLOSSARY: List[GlossaryTerm] = [
    GlossaryTerm(
        medical_term="Severe Sepsis",
        plain_english="A severe, whole-body reaction to an infection where organs need urgent help.",
        analogy="Like a kitchen fire that has triggered alarms all over the entire house."
    ),
    GlossaryTerm(
        medical_term="Consolidation",
        plain_english="Fluid and swelling filling the tiny air pockets in your lung.",
        analogy="Like a wet sponge that has soaked up water instead of air."
    ),
    GlossaryTerm(
        medical_term="Acute Kidney Injury (Stage 2)",
        plain_english="A sudden, temporary drop in how well your kidneys filter waste from your blood.",
        analogy="Like a clogged water filter that is running slow and needs a rest to recover."
    ),
    GlossaryTerm(
        medical_term="Hypotension",
        plain_english="Low blood pressure (blood is moving with less force through your vessels).",
        analogy="Like low water pressure in a garden hose."
    ),
    GlossaryTerm(
        medical_term="Parenteral Antimicrobial",
        plain_english="Antibiotics given directly into your vein through an IV tube for fast action.",
        analogy="Express delivery directly to where the medicine is needed most."
    )
]

def count_syllables(word: str) -> int:
    word = word.lower()
    if len(word) <= 3:
        return 1
    word = re.sub(r'(?:[^laeiouy]|ed|es|e)$', '', word)
    word = re.sub(r'^y', '', word)
    matches = re.findall(r'[aeiouy]{1,2}', word)
    return max(1, len(matches))

def calculate_flesch_kincaid_grade(text: str) -> float:
    sentences = [s for s in re.split(r'[\.\?!]\s+', text) if len(s.strip()) > 0]
    words = [w for w in re.findall(r'\b[a-zA-Z]+\b', text) if len(w) > 0]
    
    if len(sentences) == 0 or len(words) == 0:
        return 5.0

    num_sentences = len(sentences)
    num_words = len(words)
    num_syllables = sum(count_syllables(w) for w in words)

    # Standard Flesch-Kincaid Grade Level Formula
    grade = 0.39 * (num_words / num_sentences) + 11.8 * (num_syllables / num_words) - 15.59
    return round(max(1.0, min(18.0, grade)), 1)

def simplify_clinical_note(patient_id: str = "PAT-98421", doctor_note: str = "") -> SimplifiedNote:
    default_doc_note = (
        "68 y/o male presents with acute rigors, pyrexia (38.9C), and diaphoresis. "
        "Auscultation reveals coarse bronchial breath sounds in RLL with dullness to percussion. "
        "CXR confirms dense alveolar consolidation compatible with acute bacterial pneumonia. "
        "qSOFA score 3 with arterial hypotension (88/54) and hyperlactatemia (3.4 mmol/L) meeting criteria for Severe Sepsis. "
        "Creatinine elevated to 2.4 mg/dL representing acute kidney injury Stage 2. "
        "History of severe IgE-mediated beta-lactam anaphylaxis. "
        "Initiate IV Aztreonam plus Doxycycline; administer 2000mL balanced crystalloids. Immediately suspend Metformin and Lisinopril."
    )
    
    note_to_process = doctor_note if doctor_note.strip() else default_doc_note
    orig_grade = calculate_flesch_kincaid_grade(note_to_process)

    sections = [
        SimplifiedNoteSection(
            title="1. What Is Happening (Your Diagnosis)",
            doctor_text="CXR confirms dense alveolar consolidation compatible with acute bacterial pneumonia with Severe Sepsis.",
            patient_text="You have a lung infection (pneumonia) in the lower part of your right lung. Because of the infection, your body has a high fever and your blood pressure dropped, which doctors call sepsis.",
            key_takeaway="Your body is fighting a serious lung infection and needs hospital IV medicine to get better."
        ),
        SimplifiedNoteSection(
            title="2. Your Kidneys & Blood Pressure",
            doctor_text="Creatinine elevated to 2.4 mg/dL representing acute kidney injury Stage 2 secondary to hypotension.",
            patient_text="Because your blood pressure was low, your kidneys are temporarily strained and running slow. We are giving you gentle IV fluids to help your kidneys rest and recover.",
            key_takeaway="Your kidney numbers will improve as your blood pressure returns to normal with IV fluids."
        ),
        SimplifiedNoteSection(
            title="3. Safe Antibiotic Medicine Plan",
            doctor_text="History of severe IgE-mediated beta-lactam anaphylaxis. Initiate IV Aztreonam plus Doxycycline.",
            patient_text="Because you are allergic to penicillin, our doctors picked special antibiotic medicines (called Aztreonam and Doxycycline) that are completely safe for your allergy.",
            key_takeaway="You are receiving antibiotics that protect you from any allergic reaction."
        ),
        SimplifiedNoteSection(
            title="4. Medicine Changes for Your Safety",
            doctor_text="Immediately suspend Metformin and Lisinopril.",
            patient_text="We have temporarily stopped your Metformin and Lisinopril pills. While your kidneys are resting, these pills can cause unwanted side effects. We will restart them once you are home and recovered.",
            key_takeaway="DO NOT take Metformin or Lisinopril until your doctor tells you it is safe."
        )
    ]

    action_items = [
        "Rest in bed and drink fluids as guided by your care nurse.",
        "Take all scheduled doses of your new IV antibiotics.",
        "Remember: Your home pills (Metformin and Lisinopril) are on pause for now.",
        "Press your call button right away if you feel dizzy or have trouble breathing."
    ]

    simplified_text = " ".join([s.patient_text for s in sections])
    simp_grade = calculate_flesch_kincaid_grade(simplified_text)

    return SimplifiedNote(
        patient_id=patient_id,
        original_doctor_note=note_to_process,
        original_reading_grade=orig_grade,
        simplified_reading_grade=simp_grade,
        summary_paragraph="You are being treated in the hospital for a lung infection (pneumonia) and temporary kidney strain. Our care team is giving you safe IV antibiotics that avoid your penicillin allergy, along with fluids to restore your strength.",
        action_items_for_patient=action_items,
        sections=sections,
        glossary=PLAIN_LANGUAGE_GLOSSARY
    )
