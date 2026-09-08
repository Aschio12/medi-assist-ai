import os
from typing import List, Dict, Any
import pandas as pd
from ragas import evaluate
from ragas.metrics import (
    faithfulness,
    answer_relevancy,
    context_precision,
    context_recall
)
from datasets import Dataset
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class RagasEvaluator:
    def __init__(self):
        """
        Initializes the RAGAS evaluator.
        Relies on OPENAI_API_KEY being set in the environment for the LLM judge.
        """
        self.metrics = [
            faithfulness,
            answer_relevancy,
            context_precision,
            context_recall
        ]
    
    def evaluate_clinical_batch(
        self, 
        questions: List[str], 
        answers: List[str], 
        contexts: List[List[str]], 
        ground_truths: List[List[str]]
    ) -> Dict[str, Any]:
        """
        Evaluates a batch of RAG inference results against medical ground truths.
        
        Args:
            questions: The original clinical prompts.
            answers: The LLM generated responses.
            contexts: The retrieved clinical guidelines or EHR context chunks.
            ground_truths: The expert validated ground truth answers.
            
        Returns:
            A dictionary containing aggregated RAGAS metric scores and itemized results.
        """
        logger.info(f"Starting RAGAS evaluation on {len(questions)} clinical samples.")
        
        data = {
            "question": questions,
            "answer": answers,
            "contexts": contexts,
            "ground_truth": ground_truths
        }
        
        # RAGAS requires a HuggingFace Dataset object
        dataset = Dataset.from_dict(data)
        
        try:
            # Run the evaluation pipeline
            # Note: evaluate() uses LLMs to score the metrics, ensuring deep semantic evaluation
            result = evaluate(
                dataset=dataset,
                metrics=self.metrics,
                raise_exceptions=False
            )
            
            # Convert results to standard dict format
            df = result.to_pandas()
            
            # Extract aggregated scores
            aggregated_scores = {
                "faithfulness": float(result.get("faithfulness", 0.0)),
                "answer_relevancy": float(result.get("answer_relevancy", 0.0)),
                "context_precision": float(result.get("context_precision", 0.0)),
                "context_recall": float(result.get("context_recall", 0.0)),
                "overall_health_score": float(
                    (result.get("faithfulness", 0.0) + result.get("context_precision", 0.0)) / 2
                )
            }
            
            # Format itemized results for granular debugging
            itemized = []
            for _, row in df.iterrows():
                itemized.append({
                    "question": row["question"],
                    "faithfulness": float(row.get("faithfulness", 0.0)),
                    "answer_relevancy": float(row.get("answer_relevancy", 0.0)),
                    "context_precision": float(row.get("context_precision", 0.0)),
                    "context_recall": float(row.get("context_recall", 0.0))
                })
                
            return {
                "status": "success",
                "aggregated_scores": aggregated_scores,
                "itemized_results": itemized
            }
            
        except Exception as e:
            logger.error(f"RAGAS Evaluation failed: {str(e)}")
            return {
                "status": "error",
                "error": str(e),
                "aggregated_scores": {
                    "faithfulness": 0.0,
                    "answer_relevancy": 0.0,
                    "context_precision": 0.0,
                    "context_recall": 0.0,
                    "overall_health_score": 0.0
                },
                "itemized_results": []
            }

# Singleton instance
ragas_evaluator = RagasEvaluator()
