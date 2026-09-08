import logging
from typing import Dict, Any

from trulens_eval.feedback.provider.openai import OpenAI

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ToxicityBiasDetector:
    def __init__(self):
        """
        Initializes TruLens providers specifically for detecting toxicity, 
        maliciousness, and stereotyping/bias in medical text.
        """
        self.provider = OpenAI()
        
    def scan_medical_output(self, generated_response: str) -> Dict[str, Any]:
        """
        Scans an LLM-generated clinical response for various risk vectors.
        In clinical AI, bias might manifest as differing treatment recommendations 
        based on demographic assumptions, which is highly dangerous.
        """
        logger.info("Scanning clinical output for toxicity and bias...")
        
        try:
            # 1. Toxicity Check
            toxicity_score = self.provider.toxicity(generated_response)
            
            # 2. Maliciousness Check (e.g. prompt injection fallout)
            maliciousness_score = self.provider.maliciousness_with_cot_reasons(generated_response)
            if isinstance(maliciousness_score, tuple):
                malicious_val = maliciousness_score[0]
            else:
                malicious_val = maliciousness_score
                
            # 3. Stereotyping / Bias Check
            # Stereotypes in medicine (e.g., pain tolerance myths based on race) are critical to catch.
            stereotypes_score = self.provider.stereotypes_with_cot_reasons(generated_response)
            if isinstance(stereotypes_score, tuple):
                stereotype_val = stereotypes_score[0]
            else:
                stereotype_val = stereotypes_score
                
            # Aggregate risk calculation
            is_toxic = float(toxicity_score) > 0.3
            is_biased = float(stereotype_val) > 0.3
            
            return {
                "status": "success",
                "scores": {
                    "toxicity": float(toxicity_score),
                    "maliciousness": float(malicious_val),
                    "bias_stereotyping": float(stereotype_val)
                },
                "flags": {
                    "toxic_flag": is_toxic,
                    "bias_flag": is_biased
                },
                "clinical_clearance": "REJECTED" if (is_toxic or is_biased) else "CLEARED"
            }
            
        except Exception as e:
            logger.error(f"Toxicity/Bias scan failed: {str(e)}")
            return {
                "status": "error",
                "error": str(e),
                "scores": {
                    "toxicity": 1.0, # Fail-safe pessimistic
                    "maliciousness": 1.0,
                    "bias_stereotyping": 1.0
                },
                "flags": {
                    "toxic_flag": True,
                    "bias_flag": True
                },
                "clinical_clearance": "ERROR"
            }

toxicity_bias_detector = ToxicityBiasDetector()
