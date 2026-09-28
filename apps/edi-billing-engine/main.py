from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, List

from core.lexer import EDILexer
from core.parser_837 import Parser837
from core.parser_835 import Parser835
from core.adjudicator import ClaimsAdjudicator

app = FastAPI(title="MediAssist EDI Billing Engine", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

lexer = EDILexer()
parser_837 = Parser837()
parser_835 = Parser835()
adjudicator = ClaimsAdjudicator()

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "edi-billing-engine"}

class ParseRequest(BaseModel):
    edi_text: str
    transaction_type: str # '837' or '835'

@app.post("/api/edi/parse")
def parse_edi_transaction(req: ParseRequest):
    try:
        segments = lexer.tokenize(req.edi_text)
        
        if req.transaction_type == "837":
            result = parser_837.parse(segments)
        elif req.transaction_type == "835":
            result = parser_835.parse(segments)
        else:
            raise ValueError("Unsupported transaction type")
            
        return {"status": "success", "data": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/edi/adjudicate")
def adjudicate_claim(req: ParseRequest):
    try:
        segments = lexer.tokenize(req.edi_text)
        if req.transaction_type != "837":
            raise ValueError("Only 837 claims can be adjudicated")
            
        parsed_837 = parser_837.parse(segments)
        remittance = adjudicator.adjudicate_claim(parsed_837)
        
        return {"status": "success", "remittance": remittance}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
