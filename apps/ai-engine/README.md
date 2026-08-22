# Generative AI & RAG Engine (Phase 8)
This microservice acts as the brain behind the Clinical Copilot.
- **SMART on FHIR Adapter:** Automatically fetches and parses HL7 FHIR JSON bundles from EHR systems (Epic/Cerner) so the LLM understands patient data.
- **RAG Pipeline:** Contextualizes the LLM prompt with specific, grounded medical history to prevent hallucinations.
