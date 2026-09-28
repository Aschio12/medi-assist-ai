import logging
from typing import List, Dict, Any

class EDILexer:
    """
    Performs Lexical Analysis on raw ASC X12 EDI streams.
    Dynamically infers delimiters from the ISA segment.
    """
    
    def __init__(self):
        self.segment_terminator = '~'
        self.element_separator = '*'
        self.subelement_separator = ':'
        logging.info("Initialized ASC X12 Lexer")

    def tokenize(self, raw_edi: str) -> List[List[str]]:
        raw_edi = raw_edi.replace("\n", "").replace("\r", "")
        
        if len(raw_edi) < 106 or not raw_edi.startswith("ISA"):
            raise ValueError("Invalid EDI format. Must start with ISA segment of 106 characters.")
            
        # The ISA segment defines delimiters for the entire interchange
        self.element_separator = raw_edi[3]
        self.subelement_separator = raw_edi[104]
        self.segment_terminator = raw_edi[105]
        
        segments = raw_edi.split(self.segment_terminator)
        
        tokenized = []
        for segment in segments:
            segment = segment.strip()
            if not segment: continue
            
            elements = segment.split(self.element_separator)
            tokenized.append(elements)
            
        return tokenized
