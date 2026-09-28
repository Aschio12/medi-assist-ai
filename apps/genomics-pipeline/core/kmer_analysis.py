import logging
from typing import Dict, List, Set, Tuple
from collections import defaultdict

class DeBruijnGraph:
    """
    Constructs a De Bruijn graph for genome assembly from short DNA sequencing reads.
    Uses K-mer analysis to reconstruct overlapping contigs.
    """
    
    def __init__(self, k: int = 31):
        self.k = k
        self.nodes = set()
        self.edges = defaultdict(list)
        self.in_degree = defaultdict(int)
        self.out_degree = defaultdict(int)
        logging.info(f"Initialized De Bruijn Graph assembler (k={self.k})")

    def build_from_reads(self, reads: List[str]):
        """
        Parses fragments into overlapping k-mers to construct the DAG.
        """
        logging.info(f"Building De Bruijn Graph from {len(reads)} reads...")
        for read in reads:
            for i in range(len(read) - self.k):
                kmer1 = read[i:i + self.k]
                kmer2 = read[i + 1:i + self.k + 1]
                
                self.nodes.add(kmer1)
                self.nodes.add(kmer2)
                
                self.edges[kmer1].append(kmer2)
                self.out_degree[kmer1] += 1
                self.in_degree[kmer2] += 1

    def find_eulerian_path(self) -> List[str]:
        """
        Hierholzer's algorithm to find the Eulerian path in the graph,
        which corresponds to the assembled genome contig.
        """
        # Find start node (out - in == 1)
        start_node = next(iter(self.nodes))
        for node in self.nodes:
            if self.out_degree[node] - self.in_degree[node] == 1:
                start_node = node
                break
                
        stack = [start_node]
        path = []
        
        # We need a copy of edges since we will consume them
        temp_edges = {k: list(v) for k, v in self.edges.items()}
        
        while stack:
            u = stack[-1]
            if temp_edges.get(u, []):
                v = temp_edges[u].pop()
                stack.append(v)
            else:
                path.append(stack.pop())
                
        return path[::-1]
        
    def assemble_contig(self, eulerian_path: List[str]) -> str:
        """
        Reconstructs the continuous DNA string from the Eulerian path.
        """
        if not eulerian_path:
            return ""
        contig = eulerian_path[0]
        for node in eulerian_path[1:]:
            contig += node[-1]
        return contig
