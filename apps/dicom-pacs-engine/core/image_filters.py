import logging
import math
from typing import List

class ConvolutionEngine:
    """
    Advanced Medical Image Convolution Filters implemented from scratch.
    Useful for highlighting specific tissues (e.g., bone edges, lung nodules) in DICOM frames.
    """
    
    def __init__(self):
        logging.info("Initializing DICOM Convolution Engine...")

    def create_gaussian_kernel(self, size: int, sigma: float) -> List[List[float]]:
        """
        Dynamically generates a Gaussian Blur kernel of given size and variance.
        """
        kernel = [[0.0 for _ in range(size)] for _ in range(size)]
        center = size // 2
        sum_val = 0.0
        
        for i in range(size):
            for j in range(size):
                x = i - center
                y = j - center
                # Gaussian 2D function
                val = (1.0 / (2.0 * math.pi * sigma**2)) * math.exp(-(x**2 + y**2) / (2 * sigma**2))
                kernel[i][j] = val
                sum_val += val
                
        # Normalize
        for i in range(size):
            for j in range(size):
                kernel[i][j] /= sum_val
                
        return kernel

    def sobel_edge_detection(self, image: List[List[float]]) -> List[List[float]]:
        """
        Applies Sobel X and Sobel Y operators and combines their magnitudes
        to detect hard edges (e.g., bones or implants in X-Rays).
        """
        rows = len(image)
        cols = len(image[0])
        
        sobel_x = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]]
        sobel_y = [[-1, -2, -1], [0, 0, 0], [1, 2, 1]]
        
        output = [[0.0 for _ in range(cols)] for _ in range(rows)]
        
        for i in range(1, rows - 1):
            for j in range(1, cols - 1):
                pixel_x = 0.0
                pixel_y = 0.0
                
                # Apply 3x3 kernels
                for ki in range(3):
                    for kj in range(3):
                        val = image[i + ki - 1][j + kj - 1]
                        pixel_x += val * sobel_x[ki][kj]
                        pixel_y += val * sobel_y[ki][kj]
                        
                # Gradient magnitude
                output[i][j] = math.sqrt(pixel_x**2 + pixel_y**2)
                
        return output

    def apply_window_level(self, image: List[List[float]], window_center: float, window_width: float) -> List[List[float]]:
        """
        Maps raw Hounsfield Units (HU) to 8-bit grayscale using DICOM standard VOI LUT algorithms.
        """
        rows = len(image)
        cols = len(image[0])
        output = [[0.0 for _ in range(cols)] for _ in range(rows)]
        
        min_val = window_center - 0.5 - (window_width - 1) / 2
        max_val = window_center - 0.5 + (window_width - 1) / 2
        
        for i in range(rows):
            for j in range(cols):
                hu = image[i][j]
                if hu <= min_val:
                    output[i][j] = 0.0
                elif hu > max_val:
                    output[i][j] = 255.0
                else:
                    output[i][j] = ((hu - window_center - 0.5) / (window_width - 1) + 0.5) * 255.0
                    
        return output
