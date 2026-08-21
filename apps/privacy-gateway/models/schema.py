from pydantic import BaseModel
from typing import List, Optional

class RedactRequest(BaseModel):
    text: str
    language: str = "en"
    entities_to_keep: Optional[List[str]] = None

class RedactResponse(BaseModel):
    original_text: str
    redacted_text: str
    items_redacted: int
