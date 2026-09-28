import logging
from typing import List, Tuple

class ImageFilterEngine:
    """
    Implements 2D spatial convolution filters for Medical Image enhancement
    (e.g., bone edge detection in X-Rays, noise smoothing in MRIs).
    """
    
    # 3x3 Gaussian Blur (approximation)
    GAUSSIAN_KERNEL = [
        [1/16, 2/16, 1/16],
        [2/16, 4/16, 2/16],
        [1/16, 2/16, 1/16]
    ]
    
    # Sobel Operator (X-direction) for edge detection
    SOBEL_X = [
        [-1, 0, 1],
        [-2, 0, 2],
        [-1, 0, 1]
    ]
    
    # Sobel Operator (Y-direction) for edge detection
    SOBEL_Y = [
        [-1, -2, -1],
        [ 0,  0,  0],
        [ 1,  2,  1]
    ]
    
    # Laplacian kernel for high-pass edge enhancement
    LAPLACIAN = [
        [ 0,  1,  0],
        [ 1, -4,  1],
        [ 0,  1,  0]
    ]

    def __init__(self):
        logging.info("Initializing Medical Image Convolution Engine...")

    def convolve2d(self, image_matrix: List[List[float]], kernel: List[List[float]]) -> List[List[float]]:
        """
        Applies a 2D spatial convolution kernel over an image matrix.
        """
        rows = len(image_matrix)
        cols = len(image_matrix[0])
        k_size = len(kernel)
        k_half = k_size // 2
        
        # Initialize output matrix with zeros
        output = [[0.0 for _ in range(cols)] for _ in range(rows)]
        
        for i in range(k_half, rows - k_half):
            for j in range(k_half, cols - k_half):
                accumulator = 0.0
                for ki in range(k_size):
                    for kj in range(k_size):
                        # Map kernel coordinates back to image coordinates
                        img_val = image_matrix[i + ki - k_half][j + kj - k_half]
                        k_val = kernel[ki][kj]
                        accumulator += img_val * k_val
                output[i][j] = accumulator
                
        return output
        
    def apply_windowing(self, pixel_val: float, window_center: float, window_width: float) -> float:
        """
        Applies DICOM Window/Level transformation to map raw Hounsfield Units to 8-bit display values.
        """
        min_visible = window_center - 0.5 - (window_width - 1) / 2
        max_visible = window_center - 0.5 + (window_width - 1) / 2
        
        if pixel_val <= min_visible:
            return 0.0
        elif pixel_val > max_visible:
            return 255.0
        else:
            return ((pixel_val - window_center - 0.5) / (window_width - 1) + 0.5) * 255.0

filter_engine = ImageFilterEngine()
