from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="MediAssist OCR & Extraction Engine", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "OCR Engine Online"}

from models.schema import ExtractionResponse
from core.ocr import perform_ocr
from core.table_parser import extract_tables
from core.icd10_tagger import tag_clinical_entities

@app.post("/api/v1/process-document", response_model=ExtractionResponse)
async def process_document(file: UploadFile = File(...)):
    contents = await file.read()
    
    # 1. OCR Extraction
    raw_text = perform_ocr(contents)
    
    # 2. Semantic Table Parsing
    tables = extract_tables(raw_text)
    
    # 3. ICD-10 Tagging
    tags = tag_clinical_entities(raw_text)
    
    return ExtractionResponse(
        filename=file.filename,
        raw_text=raw_text,
        structured_tables=tables,
        icd10_tags=tags
    )

@app.get("/api/v1/health")
def health_check():
    return {"status": "ok", "service": "ocr-engine", "tesseract_available": True}
