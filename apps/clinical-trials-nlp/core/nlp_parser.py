import logging
from typing import Dict, List, Any
import re

class TrialNlpParser:
    """
    Simulates a transformer-based (BERT/ClinicalBERT) NLP pipeline for parsing
    complex unstructured clinical trial inclusion and exclusion criteria.
    Extracts Medical Named Entities (NER) like Age, Condition, Biomarker, Medication.
    """
    def __init__(self):
        logging.info("Initializing ClinicalBERT NLP Parser weights...")

    def parse_criteria(self, text: str) -> Dict[str, Any]:
        logging.info(f"Extracting clinical entities from: {text[:50]}...")
        
        entities = []
        
        # Simulated Regex/NER heuristics for demonstration
        if re.search(r'\b(age|>|<|years old)\b', text, re.IGNORECASE):
            entities.append({"entity_group": "DEMOGRAPHICS", "word": "Age requirement", "score": 0.99})
            
        if re.search(r'\b(mutation|positive|negative|expressed)\b', text, re.IGNORECASE):
            entities.append({"entity_group": "BIOMARKER", "word": "Genetic Mutation", "score": 0.95})
            
        if re.search(r'\b(cancer|tumor|diabetes|syndrome|disease)\b', text, re.IGNORECASE):
            entities.append({"entity_group": "CONDITION", "word": "Primary Disease", "score": 0.98})

        return {
            "status": "success",
            "original_text": text,
            "extracted_entities": entities,
            "inclusion_clauses": len(re.split(r'inclusion:|exclusion:', text.lower())) - 1
        }

nlp_parser = TrialNlpParser()
