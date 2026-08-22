def extract_tables(raw_text: str) -> list:
    """
    Semantic table extraction logic.
    In a real implementation, this would use AWS Textract AnalyzeDocument or a layout-aware model
    like LayoutLM to parse blood work tables (CBC, CMP) into structured JSON.
    """
    # Mocking standard blood panel extraction
    if "Hemoglobin" in raw_text or "HGB" in raw_text:
        return [
            {"test": "Hemoglobin A1c", "value": "5.4", "unit": "%", "flag": "Normal"},
            {"test": "LDL Cholesterol", "value": "92", "unit": "mg/dL", "flag": "Normal"}
        ]
    return []
