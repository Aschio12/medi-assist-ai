# Medical RAG Architecture & Implementation Research

This document synthesizes research on building a production-grade Healthcare Retrieval-Augmented Generation (RAG) system using modern open-source technologies.

## 1. Core Tech Stack
Based on current best practices for robust, scalable AI applications:
*   **Frontend & API:** [Next.js (App Router)](https://nextjs.org/) for a unified full-stack architecture.
*   **UI Framework:** [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) for clean, accessible, and highly customizable medical interfaces.
*   **AI Orchestration:** [Vercel AI SDK](https://sdk.vercel.ai/docs). It natively supports streaming responses, managing chat state, and tool calling within Next.js.
*   **Database & Vector Store:** [Supabase](https://supabase.com/) (PostgreSQL with `pgvector`). Supabase allows us to store user profiles, chat history, and document embeddings in the same database, with Row Level Security (RLS) for data privacy.
*   **LLM Provider:** OpenAI (GPT-4o) for high reasoning capabilities, or local models via [Ollama](https://ollama.com/) if strict data sovereignty (HIPAA) is required.

## 2. Healthcare-Specific RAG Considerations
Building RAG for healthcare is fundamentally different from building a general chatbot. The cost of hallucination is critical.

### A. Retrieval Strategy
*   **Hybrid Search:** Do not rely solely on dense vector embeddings. Medical queries often contain specific abbreviations (e.g., "COPD") or drug names ("Acetaminophen") that require exact keyword matching. Combine **BM25 (Keyword)** with **Dense Vector Search**.
*   **Cross-Encoder Reranking:** After retrieving the top 10 chunks from Supabase, use a reranker model to re-score them based on their exact relevance to the query before sending them to the LLM.

### B. Safety & Reliability
*   **Mandatory Citations:** The LLM prompt must strictly instruct the model to cite the exact source document for every medical claim it makes. The UI should display these citations as clickable links.
*   **Confidence Thresholds:** If the vector database returns results with low similarity scores, the system must trigger a fallback response (e.g., *"I do not have enough verified information to answer this. Please consult a human doctor."*).
*   **Query Rewriting:** Medical queries from users are often vague (e.g., "My chest hurts"). A pre-processing LLM step can expand this to improve retrieval.

### C. Data Ingestion & Chunking
*   **Metadata-Aware Chunking:** When parsing medical PDFs (like clinical guidelines), do not use naive fixed-size chunking. Chunking should respect document structure (headings, tables, patient vs. generic data) and attach heavy metadata (Source, Date, Document Type) to each chunk.

## 3. UI / UX Design for Healthcare
*   **Role-Based Access Control (RBAC):** The UI should adapt based on the user. A "Doctor" view might retrieve complex clinical guidelines, while a "Patient" view retrieves simplified FAQs and avoids making diagnostic claims.
*   **Clear Disclaimers:** A persistent, non-dismissible banner stating that the AI is for informational purposes and not a substitute for professional medical advice.
*   **Emergency Triggers:** Hardcoded keyword detection (e.g., "suicide", "heart attack") that bypasses the AI entirely and immediately displays emergency contact numbers on the screen.

## 4. Proposed Implementation Plan

**Phase 1: Foundation (Next.js & UI)**
*   Initialize Next.js project inside this repo.
*   Setup Tailwind CSS and shadcn/ui.
*   Build the core Chat UI layout (Sidebar, Chat window, Settings).

**Phase 2: Database & Auth (Supabase)**
*   Setup Supabase project.
*   Configure `pgvector` extension.
*   Create tables for `documents`, `document_chunks` (with embedding column), and `chat_history`.

**Phase 3: Data Ingestion Pipeline**
*   Create a Node.js script in a `/scripts` folder using LangChain.js.
*   Parse sample medical PDFs (e.g., CDC guidelines).
*   Generate embeddings (using OpenAI `text-embedding-3-small`) and upload to Supabase.

**Phase 4: RAG Integration (Vercel AI SDK)**
*   Create the Next.js API Route for the chat.
*   Implement the retrieval logic: query Supabase `pgvector` for context.
*   Inject context into the system prompt and stream the LLM response back to the UI.

**Phase 5: Safety & Polish**
*   Implement citation parsing in the UI.
*   Add emergency keyword detection.
*   Finalize styling and deploy to Vercel.
