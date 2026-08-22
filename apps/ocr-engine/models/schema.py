from pydantic import BaseModel
from typing import List, Dict, Any

class ExtractionResponse(BaseModel):
    filename: str
    raw_text: str
    structured_tables: List[Dict[str, Any]]
    icd10_tags: List[Dict[str, str]]
