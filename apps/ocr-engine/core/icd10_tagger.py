import re

# Mock NLP ontology mapper
ICD10_MAP = {
    "hypertension": "I10",
    "type 2 diabetes": "E11.9",
    "tachycardia": "R00.0",
    "pneumonia": "J18.9"
}

def tag_clinical_entities(text: str) -> list:
    """Scans OCR text for clinical conditions and maps to ICD-10 codes."""
    tags = []
    text_lower = text.lower()
    for condition, code in ICD10_MAP.items():
        if condition in text_lower:
            tags.append({"condition": condition.title(), "icd10_code": code})
    return tags
