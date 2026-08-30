import time
import hashlib
from typing import List, Dict, Any
from models.schemas import SyncAuditLog

AUDIT_HISTORY: List[SyncAuditLog] = [
    SyncAuditLog(
        id="sync-001",
        timestamp="2026-08-30T07:15:22Z",
        action="PULL_EHR",
        source="Epic Hyperspace Sandbox (R4)",
        target="MediAssist FHIR Gateway",
        resource_type="Patient + Observations",
        resource_id="PAT-98421",
        http_status=200,
        latency_ms=142,
        hash="sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069"
    ),
    SyncAuditLog(
        id="sync-002",
        timestamp="2026-08-30T07:18:04Z",
        action="PUSH_DOCUMENT",
        source="MediAssist Ambient Scribe",
        target="Epic Hyperspace Sandbox (R4)",
        resource_type="DocumentReference",
        resource_id="doc-soap-98421",
        http_status=201,
        latency_ms=210,
        hash="sha256:9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"
    )
]

def record_sync_event(action: str, target: str, resource_type: str, resource_id: str, http_status: int = 201) -> SyncAuditLog:
    payload_hash = hashlib.sha256(f"{action}:{resource_id}:{time.time()}".encode()).hexdigest()
    event = SyncAuditLog(
        id=f"sync-{len(AUDIT_HISTORY) + 1:03d}",
        timestamp=time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        action=action,
        source="MediAssist AI Clinical Workstation",
        target=target,
        resource_type=resource_type,
        resource_id=resource_id,
        http_status=http_status,
        latency_ms=int(time.time() % 100 + 120),
        hash=f"sha256:{payload_hash[:16]}..."
    )
    AUDIT_HISTORY.insert(0, event)
    return event

def get_sync_audit_logs() -> List[SyncAuditLog]:
    return AUDIT_HISTORY
