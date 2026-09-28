import logging
import random
from typing import Dict, List, Any

class MockVectorDatabase:
    """
    Simulates a FAISS or Pinecone vector database holding high-dimensional embeddings
    of global clinical trials for semantic similarity search.
    """
    def __init__(self):
        logging.info("Connecting to Distributed Vector Database (FAISS)...")

    def semantic_search(self, query: str, top_k: int = 5) -> List[Dict[str, Any]]:
        logging.info(f"Executing Cosine Similarity search for embedding of: {query}")
        
        # Simulate retrieval of top_k clinical trials
        results = []
        for i in range(top_k):
            results.append({
                "trial_id": f"NCT0{random.randint(1000000, 9999999)}",
                "title": f"Phase {random.choice(['I', 'II', 'III'])} Study of Novel Therapeutics",
                "status": random.choice(["Recruiting", "Not yet recruiting", "Active, not recruiting"]),
                "similarity_score": round(random.uniform(0.75, 0.99), 4),
                "locations": random.randint(1, 45)
            })
            
        # Sort by similarity score descending
        results.sort(key=lambda x: x["similarity_score"], reverse=True)
        return results

vector_db = MockVectorDatabase()
