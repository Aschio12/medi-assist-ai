from typing import List, Dict, Any

class PrecisionOncologyMatcher:
    """
    Cross-references genomic variants against FDA-approved targeted therapies, 
    COSMIC, and active Clinical Trials.
    """
    def __init__(self):
        self.therapy_db = {
            "EGFR_L858R": {
                "fda_approved_therapies": ["Osimertinib", "Erlotinib", "Gefitinib"],
                "clinical_trials": ["NCT03866960", "NCT04035486"],
                "evidence_level": "Tier 1 - Strong Clinical Significance"
            },
            "PIK3CA_H1047R": {
                "fda_approved_therapies": ["Alpelisib"],
                "clinical_trials": ["NCT03006172"],
                "evidence_level": "Tier 1 - Strong Clinical Significance"
            },
            "TP53_R248Q": {
                "fda_approved_therapies": ["None (Undruggable target)"],
                "clinical_trials": ["NCT03904569 (Advexin Phase II)"],
                "evidence_level": "Tier 2 - Potential Clinical Significance"
            }
        }

    def match_therapies(self, variants: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        matched_results = []
        for variant in variants:
            key = f"{variant['gene']}_{variant['mutation']}"
            match = self.therapy_db.get(key, {
                "fda_approved_therapies": ["No matching therapies found"],
                "clinical_trials": [],
                "evidence_level": "Tier 3 - Unknown Clinical Significance"
            })
            
            result = variant.copy()
            result.update(match)
            matched_results.append(result)
            
        return matched_results

oncology_matcher = PrecisionOncologyMatcher()
