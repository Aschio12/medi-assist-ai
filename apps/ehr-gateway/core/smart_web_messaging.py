import time
import uuid
from typing import Dict, Any
from models.schemas import SWMMessage

def generate_swm_scratchpad_payload(patient_id: str, note_text: str) -> SWMMessage:
    msg_id = f"swm-msg-{uuid.uuid4().hex[:8]}"
    return SWMMessage(
        messageId=msg_id,
        action="scratchpad.update",
        targetIframe="epic-hyperspace-note-editor",
        payload={
            "location": "active_clinical_note_editor",
            "section": "ASSESSMENT_AND_PLAN",
            "content": note_text,
            "format": "text/markdown",
            "metadata": {
                "author": "MediAssist AI Ambient Copilot",
                "attestationStatus": "preliminary",
                "targetEHR": "Epic Hyperspace 2024",
                "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
            }
        },
        status="sent_to_ehr_scratchpad"
    )
