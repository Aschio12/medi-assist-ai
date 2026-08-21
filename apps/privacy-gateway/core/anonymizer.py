from presidio_anonymizer import AnonymizerEngine

_anonymizer = None

def get_anonymizer() -> AnonymizerEngine:
    global _anonymizer
    if _anonymizer is None:
        _anonymizer = AnonymizerEngine()
    return _anonymizer
