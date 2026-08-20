# Enterprise Medical AI - 20-Phase Implementation Plan

This document outlines the granular, 20-phase roadmap for building the Enterprise Medical AI Assistant. Each phase is designed to be modular, ensuring that the system scales securely from a basic prototype to a HIPAA-compliant, GraphRAG-powered clinical tool.

---

## Part 1: Foundation & Infrastructure

### Phase 1: Core Architecture & Repository Setup
*   Initialize Next.js 15 (App Router) with TypeScript.
*   Configure absolute imports, ESLint, Prettier, and Husky pre-commit hooks.
*   Set up a basic CI/CD pipeline via GitHub Actions (linting, type checking).
*   Establish folder architecture (e.g., `/app`, `/components`, `/lib`, `/server`, `/scripts`).

### Phase 2: Design System & UI Foundation
*   Install and configure Tailwind CSS and `shadcn/ui`.
*   Establish a healthcare-appropriate design theme (accessible color palettes, high contrast).
*   Build foundational UI components (Buttons, Inputs, Modals, Toasts, Skeletons).
*   Implement Dark/Light mode toggling and Responsive layouts.

### Phase 3: Authentication & Database Provisioning
*   Initialize Supabase project (PostgreSQL).
*   Implement Supabase Auth (Email/Password, Magic Links).
*   Create SQL schemas for `users`, `profiles`, and `roles`.
*   Establish strict Row Level Security (RLS) policies ensuring users can only access their own data.

### Phase 4: The "Redact-First" Privacy Gateway (HIPAA)
*   Set up a local Python microservice using Microsoft Presidio.
*   Create the API gateway to intercept all user queries.
*   Implement NLP rules to detect and redact 18 types of PHI (Names, SSNs, DOBs).
*   Create an immutable audit logging table in Supabase for redaction events.

---

## Part 2: Data Ingestion & Hybrid Retrieval

### Phase 5: Document Parsing & OCR Pipeline
*   Build a Node.js/Python ingestion script to handle clinical PDFs and DOCX files.
*   Integrate OCR (Optical Character Recognition) to extract text from scanned medical records.
*   Implement metadata extraction (Author, Date, Document Type, Department).

### Phase 6: Semantic Vectorization & Storage
*   Enable the `pgvector` extension in Supabase.
*   Implement "Metadata-Aware Semantic Chunking" (splitting text by clinical headings, not just character count).
*   Generate vector embeddings using OpenAI (`text-embedding-3-small`) or local HuggingFace models.
*   Store chunks, embeddings, and metadata in Supabase.

### Phase 7: Knowledge Graph Construction
*   Provision a Neo4j Graph Database instance.
*   Implement an Entity Extraction pipeline (using UMLS standards) to identify Drugs, Diseases, and Symptoms from the parsed text.
*   Map relationships (e.g., `[Aspirin] -TREATS-> [Headache]`) and ingest them into Neo4j using Cypher queries.

### Phase 8: Hybrid Search Engine Architecture
*   Build the semantic search function (Cosine Similarity on `pgvector`).
*   Build the keyword search function (BM25 for exact medical abbreviations).
*   Build the graph traversal function (Neo4j Cypher).
*   Create the merging algorithm that combines and ranks results from all three sources.

---

## Part 3: Agentic Orchestration & AI Interaction

### Phase 9: Vercel AI SDK & Chat UI
*   Implement the core chat interface (Messages array, typing indicators, auto-scroll).
*   Integrate `useChat` from the Vercel AI SDK.
*   Build API route handlers to stream LLM responses back to the client.
*   Persist chat sessions and message history in Supabase.

### Phase 10: Agentic Routing (LangGraph)
*   Integrate LangGraph to act as the "Brain" of the application.
*   Define specific agent tools (Vector Search Tool, Graph Tool, Calculator Tool).
*   Build the Intent Classifier to route user queries to the correct tool automatically.
*   Implement multi-step reasoning (e.g., retrieving context, then reflecting on it before answering).

### Phase 11: Reranking & Context Injection
*   Integrate a Cross-Encoder Reranker (e.g., Cohere Rerank) to resort retrieved documents for maximum relevance.
*   Engineer the ultimate System Prompt for the LLM (enforcing medical tone, citation requirements, and formatting).
*   Inject the reranked context and user query into the final LLM call.

### Phase 12: Multimodal Input (Vision)
*   Update the Chat UI to support drag-and-drop image uploads (X-rays, charts).
*   Store images securely in Supabase Storage.
*   Integrate a Multimodal LLM (e.g., GPT-4o Vision or LLaVA-Med) to process and analyze the clinical images alongside text.

---

## Part 4: Clinical Features & Interoperability

### Phase 13: EHR Integration (FHIR Standard)
*   Build a mock Electronic Health Record (EHR) REST API.
*   Implement FHIR (Fast Healthcare Interoperability Resources) JSON parsing.
*   Create a LangGraph tool that allows the AI to fetch a patient's live lab results securely.

### Phase 14: Role-Based Workspaces & UI
*   Build the "Doctor Dashboard" (Access to complex guidelines, patient EHR querying).
*   Build the "Patient Dashboard" (Access to general FAQs, appointment scheduling, simplified UI).
*   Implement middleware to protect routes based on the Supabase `role` claim.

### Phase 15: Clinical Fallbacks & Emergency Protocols
*   Implement hardcoded keyword detection (e.g., "suicide", "heart attack", "overdose").
*   Build the "Emergency Intercept" UI modal that bypasses the AI and provides hotlines.
*   Implement Confidence Thresholds: If vector search score is < 0.80, force the LLM to output a standard "Information not found" fallback.

### Phase 16: Citation & Verification UI
*   Parse the LLM's Markdown output to detect citation tags (e.g., `[Source 1]`).
*   Build an interactive Side-Panel Viewer.
*   When a user clicks a citation, open the Side-Panel, load the original PDF/text, and highlight the exact sentence the AI used.

---

## Part 5: Quality Assurance, Security & Scaling

### Phase 17: AI Evaluation Pipeline (CI/CD for AI)
*   Integrate the RAGAS evaluation framework.
*   Create a golden dataset of 100 medical Q&A pairs.
*   Build automated scripts to test the AI's *Faithfulness* and *Answer Relevance* against the dataset.

### Phase 18: Advanced Security & Penetration Testing
*   Implement strict API Rate Limiting (Upstash Redis) to prevent DDoS and abuse.
*   Run automated dependency vulnerability scans.
*   Conduct prompt-injection testing (ensuring users cannot trick the AI into revealing system prompts or other patients' data).

### Phase 19: Performance & Caching Optimization
*   Implement Edge computing for lightweight API routes.
*   Integrate Redis caching for frequently asked medical questions to save LLM API costs.
*   Optimize Supabase database queries with custom indexes on heavily queried columns.

### Phase 20: Production Deployment & Monitoring
*   Finalize environment variables for Staging vs. Production.
*   Deploy the Next.js frontend and API to Vercel.
*   Deploy Python microservices (Presidio, Neo4j) to Dockerized environments (AWS/GCP).
*   Integrate Datadog or Sentry for real-time error tracking and LLM latency monitoring.
