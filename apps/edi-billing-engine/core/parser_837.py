import logging
from typing import List, Dict, Any

class Parser837:
    """
    Parses HIPAA 837 Professional/Institutional Health Care Claims.
    Reconstructs the flat token list into the X12 837 Loop Hierarchy:
    Billing Provider (2000A) -> Subscriber (2000B) -> Patient (2000C) -> Claim (2300) -> Service Line (2400)
    """
    
    def __init__(self):
        logging.info("Initialized 837 Claims Parser")

    def parse(self, segments: List[List[str]]) -> Dict[str, Any]:
        result = {
            "interchange": {},
            "functional_group": {},
            "transactions": []
        }
        
        current_transaction = None
        current_provider = None
        current_subscriber = None
        current_claim = None
        current_service_line = None
        
        for elements in segments:
            seg_id = elements[0]
            
            if seg_id == "ISA":
                result["interchange"]["sender"] = elements[6].strip()
                result["interchange"]["receiver"] = elements[8].strip()
            elif seg_id == "GS":
                result["functional_group"]["sender"] = elements[2].strip()
                result["functional_group"]["receiver"] = elements[3].strip()
            elif seg_id == "ST":
                # Start of transaction
                current_transaction = {"providers": []}
                result["transactions"].append(current_transaction)
            elif seg_id == "HL":
                # Hierarchical Level
                hl_level_code = elements[3]
                if hl_level_code == "20": # Provider
                    current_provider = {"subscribers": [], "npi": None}
                    current_transaction["providers"].append(current_provider)
                elif hl_level_code == "22": # Subscriber
                    current_subscriber = {"claims": []}
                    if current_provider:
                        current_provider["subscribers"].append(current_subscriber)
            elif seg_id == "NM1":
                entity_id = elements[1]
                if entity_id == "85" and current_provider:
                    current_provider["npi"] = elements[9]
                elif entity_id == "IL" and current_subscriber:
                    current_subscriber["name"] = elements[3] + " " + elements[4]
                    current_subscriber["member_id"] = elements[9]
            elif seg_id == "CLM":
                # Claim info
                current_claim = {
                    "claim_id": elements[1],
                    "total_charge": float(elements[2]),
                    "service_lines": []
                }
                if current_subscriber:
                    current_subscriber["claims"].append(current_claim)
            elif seg_id == "SV1" or seg_id == "SV2":
                # Service line
                current_service_line = {
                    "procedure_code": elements[1].split(":")[1] if ":" in elements[1] else elements[1],
                    "line_charge": float(elements[2])
                }
                if current_claim:
                    current_claim["service_lines"].append(current_service_line)
                    
        return result
