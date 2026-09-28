import logging
from typing import List, Dict, Any

class VCFStateMachine:
    """
    Implements a strict finite state machine for parsing Variant Call Format (VCF) files.
    Avoids loading entire files into memory by processing streams state-by-state.
    """
    
    STATE_META = 0
    STATE_HEADER = 1
    STATE_DATA = 2
    STATE_ERROR = -1

    def __init__(self):
        logging.info("Initializing VCF State Machine Parser...")
        self.state = self.STATE_META
        self.metadata: Dict[str, List[str]] = {}
        self.header: List[str] = []
        self.variants: List[Dict[str, Any]] = []

    def parse_line(self, line: str) -> bool:
        """
        Processes a single line of VCF and transitions the internal state.
        Returns True if processing should continue, False on EOF/Error.
        """
        line = line.strip()
        if not line:
            return True

        if self.state == self.STATE_META:
            if line.startswith("##"):
                key, val = self._parse_meta(line)
                if key not in self.metadata:
                    self.metadata[key] = []
                self.metadata[key].append(val)
            elif line.startswith("#CHROM"):
                self.state = self.STATE_HEADER
                self._parse_header(line)
                self.state = self.STATE_DATA
            else:
                logging.error(f"Invalid VCF transition. Expected ## or #CHROM, got: {line[:10]}")
                self.state = self.STATE_ERROR
                
        elif self.state == self.STATE_HEADER:
            # Technically we transition out immediately, but keeping state for completeness
            pass
            
        elif self.state == self.STATE_DATA:
            if line.startswith("#"):
                logging.error("VCF format violation: Header line found in DATA region.")
                self.state = self.STATE_ERROR
            else:
                self._parse_variant(line)
                
        return self.state != self.STATE_ERROR

    def _parse_meta(self, line: str) -> tuple:
        clean = line[2:]
        if "=" in clean:
            k, v = clean.split("=", 1)
            return k, v
        return "UNKNOWN", clean

    def _parse_header(self, line: str):
        self.header = line[1:].split("\t")

    def _parse_variant(self, line: str):
        cols = line.split("\t")
        if len(cols) < 8:
            return
            
        variant = {
            "CHROM": cols[0],
            "POS": int(cols[1]),
            "ID": cols[2],
            "REF": cols[3],
            "ALT": cols[4].split(","),
            "QUAL": float(cols[5]) if cols[5] != "." else None,
            "FILTER": cols[6],
            "INFO": self._parse_info(cols[7])
        }
        self.variants.append(variant)

    def _parse_info(self, info_str: str) -> Dict[str, str]:
        info = {}
        if info_str == ".": return info
        
        parts = info_str.split(";")
        for p in parts:
            if "=" in p:
                k, v = p.split("=", 1)
                info[k] = v
            else:
                info[p] = "True"
        return info

vcf_parser = VCFStateMachine()
