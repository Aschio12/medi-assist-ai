# Privacy Gateway (HIPAA / GDPR Compliance)
This Python microservice acts as a reverse proxy/gateway between the main Next.js application and the LLM. 
It uses **Microsoft Presidio** to detect and redact Personal Health Information (PHI) such as names, phone numbers, and SSNs before they leave the hospital's secure network.
