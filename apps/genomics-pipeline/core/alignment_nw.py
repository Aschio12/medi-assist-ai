import logging
from typing import Tuple, List

class NeedlemanWunsch:
    """
    Implements the Needleman-Wunsch algorithm for global sequence alignment using Dynamic Programming.
    Used for aligning massive entire genomic or proteomic sequences end-to-end.
    """
    
    def __init__(self, match_score: int = 1, mismatch_penalty: int = -1, gap_penalty: int = -2):
        self.match = match_score
        self.mismatch = mismatch_penalty
        self.gap = gap_penalty
        logging.info(f"Initialized Needleman-Wunsch DP Engine. Match:{self.match}, Mismatch:{self.mismatch}, Gap:{self.gap}")

    def align(self, seq1: str, seq2: str) -> Tuple[str, str, int]:
        n = len(seq1)
        m = len(seq2)
        
        # Initialize DP matrix
        dp = [[0 for _ in range(m + 1)] for _ in range(n + 1)]
        
        # Initialize gap penalties for first row and column
        for i in range(1, n + 1):
            dp[i][0] = self.gap * i
        for j in range(1, m + 1):
            dp[0][j] = self.gap * j
            
        # Fill DP matrix
        for i in range(1, n + 1):
            for j in range(1, m + 1):
                if seq1[i-1] == seq2[j-1]:
                    score_diag = dp[i-1][j-1] + self.match
                else:
                    score_diag = dp[i-1][j-1] + self.mismatch
                    
                score_up = dp[i-1][j] + self.gap
                score_left = dp[i][j-1] + self.gap
                
                dp[i][j] = max(score_diag, score_up, score_left)
                
        final_score = dp[n][m]
        
        # Traceback to reconstruct the optimal alignment
        align1 = ""
        align2 = ""
        i, j = n, m
        
        while i > 0 or j > 0:
            if i > 0 and j > 0:
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
            elif i > 0:
                align1 += seq1[i-1]
                align2 += "-"
                i -= 1
            else:
                align1 += "-"
                align2 += seq2[j-1]
                j -= 1
                
        return align1[::-1], align2[::-1], final_score

nw_engine = NeedlemanWunsch()
