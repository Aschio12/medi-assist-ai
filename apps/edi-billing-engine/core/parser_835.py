import logging
from typing import List, Dict, Any

class Parser835:
    """
    Parses HIPAA 835 Healthcare Claim Payment / Advice (Remittance).
    Reconstructs the hierarchy:
    Header -> Payee (1000B) -> Claim Payment (2100) -> Service Payment (2110)
    """
    
    def __init__(self):
        logging.info("Initialized 835 Remittance Advice Parser")

    def parse(self, segments: List[List[str]]) -> Dict[str, Any]:
        result = {
            "transactions": []
        }
        
        current_transaction = None
        current_claim_payment = None
        current_service = None
        
        for elements in segments:
            seg_id = elements[0]
            
            if seg_id == "ST":
                current_transaction = {"claim_payments": [], "total_paid": 0.0}
                result["transactions"].append(current_transaction)
            elif seg_id == "BPR":
                # Financial Information
                if current_transaction:
                    current_transaction["total_paid"] = float(elements[2])
                    current_transaction["payment_method"] = elements[4]
            elif seg_id == "CLP":
                # Claim Level Data
                current_claim_payment = {
                    "patient_control_number": elements[1],
                    "claim_status_code": elements[2],
                    "total_charge": float(elements[3]),
                    "total_paid": float(elements[4]),
                    "adjustments": [],
                    "service_payments": []
                }
                if current_transaction:
                    current_transaction["claim_payments"].append(current_claim_payment)
            elif seg_id == "CAS":
                # Claim Level Adjustments
                adj_group_code = elements[1]
                # CAS segments can have multiple reason code / amount pairs
                i = 2
                while i < len(elements) and elements[i]:
                    reason_code = elements[i]
                    amount = float(elements[i+1])
                    adj = {"group": adj_group_code, "reason_code": reason_code, "amount": amount}
                    
                    if current_service:
                        current_service["adjustments"].append(adj)
                    elif current_claim_payment:
                        current_claim_payment["adjustments"].append(adj)
                        
                    i += 2
            elif seg_id == "SVC":
                # Service Line Payment
                proc_code = elements[1].split(":")[1] if ":" in elements[1] else elements[1]
                current_service = {
                    "procedure_code": proc_code,
                    "line_charge": float(elements[2]),
                    "line_paid": float(elements[3]),
                    "adjustments": []
                }
                if current_claim_payment:
                    current_claim_payment["service_payments"].append(current_service)
                    
        return result
