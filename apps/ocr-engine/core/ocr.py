import pytesseract
from PIL import Image
import io

def perform_ocr(image_bytes: bytes) -> str:
    """Extracts raw text from an image using Tesseract."""
    image = Image.open(io.BytesIO(image_bytes))
    # In production, image pre-processing (deskew, binarize) would happen here
    text = pytesseract.image_to_string(image)
    return text
