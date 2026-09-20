# Multi-Region Disaster Recovery (DR) Runbook

## Overview
This runbook details the procedures for maintaining high availability and disaster recovery for the Supabase PostgreSQL database underlying the MediAssist AI ecosystem.

## Primary Architecture
* **Primary Region:** AWS `us-east-1` (N. Virginia)
* **Read Replica Region:** AWS `us-west-2` (Oregon)
* **RPO (Recovery Point Objective):** < 1 minute (asynchronous replication lag)
* **RTO (Recovery Time Objective):** < 15 minutes (manual promotion via API)

## Disaster Recovery Procedures

### 1. Active-Passive Replication
Supabase is configured with a Primary instance in `us-east-1`. A Read Replica is provisioned in `us-west-2`. The Next.js Edge middleware routes read-heavy traffic (e.g., patient lookup) to the replica to reduce latency, while writes always go to the Primary.

### 2. Detecting a Primary Outage
If `us-east-1` experiences a catastrophic failure:
1. PagerDuty will alert the on-call engineer via Datadog latency spikes.
2. The `ClusterHealthHUD` will show the Primary Database as `OFFLINE`.

### 3. Manual Failover Execution
Supabase does not automatically promote read replicas to avoid split-brain scenarios. The on-call engineer must execute the failover script:

```bash
./scripts/dr-failover.sh --target-region us-west-2
```

This script will:
1. Isolate the failed primary (DNS disconnect).
2. Use the Supabase Management API to detach the read replica and promote it to Primary.
3. Update Vercel environment variables (`NEXT_PUBLIC_SUPABASE_URL`) via the Vercel API to point to the new Primary.
4. Trigger a new Vercel deployment.

### 4. Point-in-Time Recovery (PITR)
If the database suffers logical corruption (e.g., accidental mass deletion), use PITR to restore the database to a specific second prior to the incident using the Supabase Dashboard > Database > Backups > PITR.
