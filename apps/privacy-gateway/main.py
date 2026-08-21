from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="MediAssist Privacy Gateway", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "Privacy Gateway Online"}

from models.schema import RedactRequest, RedactResponse
from core.analyzer import get_analyzer
from core.anonymizer import get_anonymizer
from core.audit import log_redaction_event
from recognizers.mrn import register_custom_recognizers

# Register custom MRN recognizer on startup
register_custom_recognizers(get_analyzer())

@app.post("/api/v1/redact", response_model=RedactResponse)
async def redact_text(request: RedactRequest):
    analyzer = get_analyzer()
    anonymizer = get_anonymizer()
    
    # Analyze text for PII/PHI
    results = analyzer.analyze(text=request.text, language=request.language)
    
    # Anonymize findings
    anonymized_result = anonymizer.anonymize(text=request.text, analyzer_results=results)
    
    # Log securely
    log_redaction_event(
        original_text=request.text,
        redacted_text=anonymized_result.text,
        items_count=len(results)
    )
    
    return RedactResponse(
        original_text=request.text,
        redacted_text=anonymized_result.text,
        items_redacted=len(results)
    )

@app.get("/api/v1/health")
def health_check():
    return {"status": "ok", "service": "privacy-gateway", "presidio_models_loaded": True}
