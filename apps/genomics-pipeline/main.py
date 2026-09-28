from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

from core.alignment_nw import nw_engine
from core.alignment_sw import sw_engine
from core.vcf_parser import vcf_parser
from core.kmer_analysis import DeBruijnGraph

app = FastAPI(title="MediAssist Genomic Pipeline", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "genomics-pipeline"}

class AlignRequest(BaseModel):
    seq1: str
    seq2: str
    type: str = "global" # or 'local'

@app.post("/api/genomics/align")
def align_sequences(req: AlignRequest):
    if req.type == "global":
        a1, a2, score = nw_engine.align(req.seq1, req.seq2)
        return {"type": "Needleman-Wunsch", "score": score, "alignment_1": a1, "alignment_2": a2}
    else:
        a1, a2, score, i, j = sw_engine.align(req.seq1, req.seq2)
        return {"type": "Smith-Waterman", "score": score, "alignment_1": a1, "alignment_2": a2, "pos": [i, j]}

class AssemblyRequest(BaseModel):
    reads: List[str]
    k: int = 3

@app.post("/api/genomics/assemble")
def assemble_genome(req: AssemblyRequest):
    graph = DeBruijnGraph(k=req.k)
    graph.build_from_reads(req.reads)
    path = graph.find_eulerian_path()
    contig = graph.assemble_contig(path)
    return {"nodes": len(graph.nodes), "contig_length": len(contig), "contig": contig}
