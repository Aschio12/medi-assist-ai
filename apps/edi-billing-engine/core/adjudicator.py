import logging
import random
from typing import Dict, Any, List

class ClaimsAdjudicator:
    """
    Simulates a Payer's Adjudication Rules Engine.
    Receives an 837 Claim, applies mock medical policies,
    and generates an 835 Remittance Advice response.
    """
    
    def __init__(self):
        logging.info("Initialized AI Claims Adjudicator Engine")

    def adjudicate_claim(self, parsed_837: Dict[str, Any]) -> Dict[str, Any]:
        """
        Takes the output of Parser837 and builds an 835 Remittance JSON.
        """
        remittance = {
            "transactions": []
        }
        
        for txn in parsed_837.get("transactions", []):
            remittance_txn = {"claim_payments": [], "total_paid": 0.0}
            
            for provider in txn.get("providers", []):
                for subscriber in provider.get("subscribers", []):
                    for claim in subscriber.get("claims", []):
                        
                        claim_total_charge = claim.get("total_charge", 0.0)
                        claim_total_paid = 0.0
                        service_payments = []
                        claim_adjustments = []
                        
                        for line in claim.get("service_lines", []):
                            charge = line.get("line_charge", 0.0)
                            
                            # Adjudication Logic (Mocked AI policies)
                            # E.g., 20% coinsurance, some completely denied
                            rand = random.random()
                            
                            if rand > 0.8: # Denial
                                line_paid = 0.0
                                adj = {"group": "PR", "reason_code": "96", "amount": charge, "desc": "Non-covered charge"}
                                service_payments.append({
                                    "procedure_code": line.get("procedure_code", ""),
                                    "line_charge": charge,
                                    "line_paid": 0.0,
                                    "adjustments": [adj]
                                })
                            else: # Allowed with Coinsurance
                                allowed = charge * 0.8 # Payer pays 80%
                                coins = charge * 0.2  # Patient pays 20%
                                adj = {"group": "PR", "reason_code": "2", "amount": coins, "desc": "Coinsurance"}
                                service_payments.append({
                                    "procedure_code": line.get("procedure_code", ""),
                                    "line_charge": charge,
                                    "line_paid": allowed,
                                    "adjustments": [adj]
                                })
                                claim_total_paid += allowed
                                
                        remittance_txn["claim_payments"].append({
                            "patient_control_number": claim.get("claim_id", "UNK"),
                            "claim_status_code": "1" if claim_total_paid > 0 else "4", # 1: Processed as Primary, 4: Denied
                            "total_charge": claim_total_charge,
                            "total_paid": claim_total_paid,
                            "adjustments": claim_adjustments,
                            "service_payments": service_payments
                        })
                        remittance_txn["total_paid"] += claim_total_paid
                        
            remittance_txn["payment_method"] = "ACH"
            remittance["transactions"].append(remittance_txn)
            
        return remittance
