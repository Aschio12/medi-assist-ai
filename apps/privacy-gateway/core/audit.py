import json
import datetime
import os

AUDIT_LOG_PATH = "audit.log"

def log_redaction_event(original_text: str, redacted_text: str, items_count: int, ip_address: str = "internal"):
    # In production, this would write to an immutable WORM database or SIEM.
    event = {
        "timestamp": datetime.datetime.utcnow().isoformat() + "Z",
        "event_type": "PHI_REDACTION",
        "items_redacted": items_count,
        "source_ip": ip_address,
        "hash": hash(original_text) # Log a hash, never the actual PHI
    }
    with open(AUDIT_LOG_PATH, "a") as f:
        f.write(json.dumps(event) + "\n")
