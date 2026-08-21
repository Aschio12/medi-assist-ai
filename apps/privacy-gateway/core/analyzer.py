from presidio_analyzer import AnalyzerEngine

# Initialize once to prevent loading models on every request
_analyzer = None

def get_analyzer() -> AnalyzerEngine:
    global _analyzer
    if _analyzer is None:
        _analyzer = AnalyzerEngine()
    return _analyzer
