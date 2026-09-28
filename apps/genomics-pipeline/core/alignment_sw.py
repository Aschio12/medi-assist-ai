import logging
from typing import Tuple, List

class SmithWaterman:
    """
    Implements the Smith-Waterman algorithm for local sequence alignment.
    Used for finding highly conserved motifs or gene domains within a larger unaligned sequence.
    """
    
    def __init__(self, match_score: int = 2, mismatch_penalty: int = -1, gap_penalty: int = -1):
        self.match = match_score
        self.mismatch = mismatch_penalty
        self.gap = gap_penalty
        logging.info("Initialized Smith-Waterman Local Alignment Engine.")

    def align(self, seq1: str, seq2: str) -> Tuple[str, str, int, int, int]:
        n = len(seq1)
        m = len(seq2)
        
        # DP matrix
        dp = [[0 for _ in range(m + 1)] for _ in range(n + 1)]
        
        max_score = 0
        max_pos = (0, 0)
        
        # Fill DP matrix
        for i in range(1, n + 1):
            for j in range(1, m + 1):
                if seq1[i-1] == seq2[j-1]:
                    score_diag = dp[i-1][j-1] + self.match
                else:
                    score_diag = dp[i-1][j-1] + self.mismatch
                    
                score_up = dp[i-1][j] + self.gap
                score_left = dp[i][j-1] + self.gap
                
                # Smith-Waterman difference: minimum score is 0
                dp[i][j] = max(0, score_diag, score_up, score_left)
                
                if dp[i][j] > max_score:
                    max_score = dp[i][j]
                    max_pos = (i, j)
                    
        # Traceback from maximum score position
        align1 = ""
        align2 = ""
        i, j = max_pos
        
        while i > 0 and j > 0 and dp[i][j] > 0:
            current_score = dp[i][j]
            diag_score = dp[i-1][j-1]
            up_score = dp[i-1][j]
            left_score = dp[i][j-1]
            
            is_match = (seq1[i-1] == seq2[j-1])
            match_val = self.match if is_match else self.mismatch
            
            if current_score == diag_score + match_val:
                align1 += seq1[i-1]
                align2 += seq2[j-1]
                i -= 1
                j -= 1
            elif current_score == left_score + self.gap:
                align1 += "-"
                align2 += seq2[j-1]
                j -= 1
            elif current_score == up_score + self.gap:
                align1 += seq1[i-1]
                align2 += "-"
                i -= 1
                
        return align1[::-1], align2[::-1], max_score, i, j

sw_engine = SmithWaterman()
