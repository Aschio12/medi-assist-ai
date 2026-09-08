# AI Evaluation Engine (`eval-engine`)

The `eval-engine` is a dedicated Python microservice within the MediAssist AI ecosystem responsible for the continuous observability, benchmarking, and safety evaluation of our clinical LLMs. 

Because medical AI operates in a high-stakes, life-critical domain, traditional accuracy metrics are insufficient. This engine leverages **RAGAS** (Retrieval-Augmented Generation Assessment) and **TruLens** to provide granular, clinically-weighted telemetry on our models.

## Core Capabilities

1. **RAGAS Benchmarking (`/core/ragas_evaluator.py`)**
   Evaluates the end-to-end RAG pipeline using four critical metrics:
   - **Faithfulness:** Ensures the LLM's answer is exclusively derived from the retrieved clinical context (zero hallucinations).
   - **Answer Relevancy:** Ensures the model directly addresses the clinician's prompt.
   - **Context Precision:** Ensures the semantic search algorithm successfully ranked the most critical medical guidelines at the top.
   - **Context Recall:** Ensures the retrieved context contains *all* the facts necessary to safely answer the prompt.

2. **TruLens Observability & The RAG Triad (`/core/trulens_monitor.py`)**
   Implements the "RAG Triad" for hallucination detection, utilizing LLM-as-a-judge feedback functions to rigorously score Context Relevance, Groundedness, and Answer Relevance. Groundedness carries a strict clinical threshold (e.g., >0.85) before an answer is marked "SAFE".

3. **Toxicity & Bias Guardrails (`/core/toxicity_bias.py`)**
   Medical AI must be strictly neutral and harmless. We utilize TruLens feedback functions to scan every generated response for:
   - **Toxicity:** Malicious or harmful medical advice.
   - **Bias / Stereotyping:** Catching dangerous demographic assumptions (e.g., race-based pain tolerance myths) that could lead to disparate medical care.

4. **Automated CI/CD Nightly Pipeline (`/pipelines/nightly_eval.py`)**
   Runs a simulated batch job against a "Golden Dataset" of 1,000 highly curated medical question-answer pairs. If the hallucination rate or bias rate is >0%, the pipeline fails, preventing the deployment of unsafe model checkpoints.

## Architecture

* **Framework:** FastAPI
* **Evaluation Libraries:** `ragas`, `trulens-eval`
* **Internal LLM Judge:** Configured via `OPENAI_API_KEY` in the environment.

## Running Locally

```bash
cd apps/eval-engine
pip install -r requirements.txt
uvicorn main:app --port 8013 --reload
```
