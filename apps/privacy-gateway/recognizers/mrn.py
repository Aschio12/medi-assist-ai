from presidio_analyzer import PatternRecognizer, Pattern

# Custom recognizer for Medical Record Numbers (MRN)
mrn_pattern = Pattern(
    name="mrn_pattern",
    regex=r"\b(?:MRN|mrn)[\s#:-]*[A-Z0-9]{3,10}\b",
    score=0.85
)
mrn_recognizer = PatternRecognizer(
    supported_entity="MEDICAL_RECORD_NUMBER",
    patterns=[mrn_pattern]
)

def register_custom_recognizers(analyzer_engine):
    analyzer_engine.registry.add_recognizer(mrn_recognizer)
