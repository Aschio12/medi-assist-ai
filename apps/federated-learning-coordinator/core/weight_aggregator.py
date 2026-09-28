import logging
from typing import Dict, List, Any

class FederatedAggregator:
    """
    Implements Federated Averaging (FedAvg) to combine decentralized model updates.
    """
    def __init__(self):
        logging.info("Initializing Federated Aggregator...")
        self.node_registry = {}

    def register_weights(self, node_id: str, weights: List[float], sample_size: int) -> bool:
        logging.info(f"Received updated weights from Node {node_id} (n={sample_size})")
        self.node_registry[node_id] = {
            "weights": weights,
            "sample_size": sample_size
        }
        return True

    def perform_fedavg(self) -> Dict[str, Any]:
        if not self.node_registry:
            return {"status": "error", "message": "No nodes registered."}
            
        logging.info("Executing FedAvg across all registered edge nodes...")
        total_samples = sum(node["sample_size"] for node in self.node_registry.values())
        
        # Simulate aggregation (just taking the first node's weight length for shape)
        num_weights = len(list(self.node_registry.values())[0]["weights"])
        global_weights = [0.0] * num_weights
        
        for node in self.node_registry.values():
            weight_fraction = node["sample_size"] / total_samples
            for i in range(num_weights):
                global_weights[i] += node["weights"][i] * weight_fraction
                
        # Clear registry for next round
        aggregated_nodes = len(self.node_registry)
        self.node_registry.clear()
        
        return {
            "status": "success",
            "aggregated_nodes": aggregated_nodes,
            "total_training_samples": total_samples,
            "new_global_weights": [round(w, 6) for w in global_weights]
        }

fed_aggregator = FederatedAggregator()
