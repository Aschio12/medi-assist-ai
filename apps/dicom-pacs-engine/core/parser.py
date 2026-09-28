import struct
from typing import Dict, Any, Tuple
from core.dicom_tags import DICOM_DICTIONARY

class DICOMStreamParser:
    """
    Parses a raw DICOM Part 10 byte stream according to NEMA standard rules.
    Handles Implicit VR Little Endian (IVRLE) and Explicit VR Little Endian (EVRLE).
    """
    def __init__(self, debug: bool = False):
        self.debug = debug
        
    def parse_header(self, byte_stream: bytes) -> Dict[str, Any]:
        """
        Extracts metadata out of a raw binary DICOM stream.
        """
        metadata = {}
        
        # 1. Validate DICOM Prefix (Bytes 128-131 must be 'DICM')
        if len(byte_stream) < 132:
            raise ValueError("Stream too short to be a valid DICOM file.")
            
        prefix = byte_stream[128:132]
        if prefix != b"DICM":
            raise ValueError(f"Invalid DICOM signature: {prefix}")
            
        cursor = 132
        length = len(byte_stream)
        
        # 2. Iterate through Data Elements
        while cursor < length:
            # Check if we have enough bytes for Group/Element (4 bytes)
            if cursor + 4 > length:
                break
                
            group, element = struct.unpack("<HH", byte_stream[cursor:cursor+4])
            cursor += 4
            
            tag = (group, element)
            tag_def = DICOM_DICTIONARY.get(tag, ("UN", "Unknown"))
            expected_vr, name = tag_def
            
            # Explicit vs Implicit detection (heuristic on Meta Info header)
            # Group 2 is always Explicit VR Little Endian.
            is_explicit = (group == 0x0002)
            
            if is_explicit:
                if cursor + 2 > length: break
                vr_bytes = byte_stream[cursor:cursor+2]
                vr = vr_bytes.decode('ascii', errors='ignore')
                cursor += 2
                
                # OB, OW, OF, SQ, UT, UN require a 2-byte reserved padding, then 4-byte length
                if vr in ['OB', 'OW', 'OF', 'SQ', 'UT', 'UN']:
                    cursor += 2 # reserved
                    if cursor + 4 > length: break
                    vl = struct.unpack("<I", byte_stream[cursor:cursor+4])[0]
                    cursor += 4
                else:
                    if cursor + 2 > length: break
                    vl = struct.unpack("<H", byte_stream[cursor:cursor+2])[0]
                    cursor += 2
            else:
                vr = expected_vr
                if cursor + 4 > length: break
                vl = struct.unpack("<I", byte_stream[cursor:cursor+4])[0]
                cursor += 4
                
            # Read Value Field
            if cursor + vl > length:
                break
                
            value_bytes = byte_stream[cursor:cursor+vl]
            cursor += vl
            
            # Parse based on VR
            parsed_value = self._decode_value(vr, value_bytes)
            metadata[name] = parsed_value
            
            # Stop if we hit pixel data (7FE0, 0010) to avoid RAM explosion
            if tag == (0x7FE0, 0x0010):
                break
                
        return metadata
        
    def _decode_value(self, vr: str, value_bytes: bytes) -> Any:
        if vr in ['LO', 'SH', 'PN', 'CS', 'DA', 'TM', 'UI']:
            return value_bytes.decode('ascii', errors='ignore').strip('\0')
        elif vr == 'US':
            if len(value_bytes) >= 2:
                return struct.unpack("<H", value_bytes[:2])[0]
        elif vr == 'DS':
            s = value_bytes.decode('ascii', errors='ignore').strip('\0')
            try:
                return float(s)
            except ValueError:
                return 0.0
        return f"<Binary Data: {len(value_bytes)} bytes>"
