import os
import json
import logging
from typing import Dict, Any, List

from trulens_eval import Tru, Feedback
from trulens_eval.feedback.provider.openai import OpenAI
from trulens_eval.app import App

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class TruLensHallucinationMonitor:
    def __init__(self):
        """
        Initializes TruLens tracking and the "RAG Triad" feedback functions.
        The RAG Triad assesses:
        1. Context Relevance
        2. Groundedness
        3. Answer Relevance
        """
        self.tru = Tru()
        
        # We use an LLM provider to score the feedback functions
        self.provider = OpenAI()
        
        # Define the RAG Triad Feedback Functions
        
        # 1. Context Relevance: Is the retrieved context actually useful for the question?
        self.f_context_relevance = (
            Feedback(self.provider.context_relevance, name="Context Relevance")
            .on_input()
            .on(App.select_context)
        )
        
        # 2. Groundedness: Is the answer fully supported by the retrieved context? (No hallucinations)
        from trulens_eval.feedback import Groundedness
        grounded = Groundedness(groundedness_provider=self.provider)
        self.f_groundedness = (
            Feedback(grounded.groundedness_measure, name="Groundedness")
            .on(App.select_context)
            .on_output()
        )
        
        # 3. Answer Relevance: Does the final answer address the user's prompt?
        self.f_answer_relevance = (
            Feedback(self.provider.relevance, name="Answer Relevance")
            .on_input()
            .on_output()
        )
        
        self.feedbacks = [
            self.f_context_relevance,
            self.f_groundedness,
            self.f_answer_relevance
        ]
        
    def evaluate_clinical_response(self, query: str, context: str, response: str) -> Dict[str, Any]:
        """
        Since we might not be wrapping a live LangChain/LlamaIndex app directly in this service,
        we can use TruLens VirtualApp or programmatic evaluation to score a discrete interaction.
        """
        logger.info(f"Running TruLens RAG Triad evaluation for query: {query[:50]}...")
        
        try:
            # For demonstration in the microservice architecture, we evaluate programmatically
            # using the provider directly for discrete scoring.
            context_rel_score = self.provider.context_relevance(query, context)
            
            # Groundedness takes context as string and answer as string
            from trulens_eval.feedback import Groundedness
            grounded = Groundedness(groundedness_provider=self.provider)
            groundedness_score, _ = grounded.groundedness_measure(context, response)
            
            answer_rel_score = self.provider.relevance(query, response)
            
            # Clinical threshold logic: Groundedness must be highly strict
            hallucination_detected = groundedness_score < 0.85
            
            return {
                "status": "success",
                "metrics": {
                    "context_relevance": float(context_rel_score),
                    "groundedness": float(groundedness_score),
                    "answer_relevance": float(answer_rel_score)
                },
                "hallucination_detected": hallucination_detected,
                "clinical_safety_status": "FLAGGED_FOR_REVIEW" if hallucination_detected else "SAFE"
            }
        except Exception as e:
            logger.error(f"TruLens evaluation failed: {str(e)}")
            return {
                "status": "error",
                "error": str(e),
                "metrics": {
                    "context_relevance": 0.0,
                    "groundedness": 0.0,
                    "answer_relevance": 0.0
                },
                "hallucination_detected": True,
                "clinical_safety_status": "ERROR"
            }

trulens_monitor = TruLensHallucinationMonitor()
