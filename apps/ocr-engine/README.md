# Document Extraction & OCR Engine (Phase 6)
This microservice is responsible for unstructured data ingestion.
- **Tesseract OCR:** Extracts raw text from scanned PDFs and images.
- **Semantic Table Parsing:** Identifies and structures tabular lab data.
- **ICD-10 Tagging:** NLP pipeline using spaCy to extract clinical entities and map them to standard ICD-10 ontology codes.
