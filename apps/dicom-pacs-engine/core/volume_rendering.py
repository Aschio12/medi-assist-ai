import logging
from typing import List, Tuple
from core.math_utils import Vector3, Matrix4x4

class RayCaster:
    """
    Implements a 3D Raycasting algorithm to render 2D projections from 3D DICOM voxel fields.
    Uses Maximum Intensity Projection (MIP) and Direct Volume Rendering (DVR).
    """
    def __init__(self, volume_data: List[List[List[float]]], dims: Tuple[int, int, int]):
        self.volume = volume_data
        self.dx, self.dy, self.dz = dims
        logging.info(f"Initialized Volume RayCaster with grid {self.dx}x{self.dy}x{self.dz}")

    def get_voxel(self, x: int, y: int, z: int) -> float:
        if 0 <= x < self.dx and 0 <= y < self.dy and 0 <= z < self.dz:
            return self.volume[z][y][x]
        return 0.0

    def trilinear_interpolate(self, pos: Vector3) -> float:
        """
        Trilinear interpolation of 3D scalar field at continuous coordinate.
        """
        x0 = int(pos.x)
        y0 = int(pos.y)
        z0 = int(pos.z)
        
        x1 = x0 + 1
        y1 = y0 + 1
        z1 = z0 + 1
        
        xd = pos.x - x0
        yd = pos.y - y0
        zd = pos.z - z0
        
        c000 = self.get_voxel(x0, y0, z0)
        c100 = self.get_voxel(x1, y0, z0)
        c010 = self.get_voxel(x0, y1, z0)
        c110 = self.get_voxel(x1, y1, z0)
        c001 = self.get_voxel(x0, y0, z1)
        c101 = self.get_voxel(x1, y0, z1)
        c011 = self.get_voxel(x0, y1, z1)
        c111 = self.get_voxel(x1, y1, z1)
        
        c00 = c000 * (1 - xd) + c100 * xd
        c01 = c001 * (1 - xd) + c101 * xd
        c10 = c010 * (1 - xd) + c110 * xd
        c11 = c011 * (1 - xd) + c111 * xd
        
        c0 = c00 * (1 - yd) + c10 * yd
        c1 = c01 * (1 - yd) + c11 * yd
        
        c = c0 * (1 - zd) + c1 * zd
        return c

    def cast_ray_mip(self, origin: Vector3, direction: Vector3, steps: int, step_size: float) -> float:
        """
        Maximum Intensity Projection.
        Advances a ray through the volume and keeps the highest scalar value encountered.
        """
        max_intensity = 0.0
        current_pos = Vector3(origin.x, origin.y, origin.z)
        dir_step = direction.normalize().mult(step_size)
        
        for _ in range(steps):
            if not (0 <= current_pos.x < self.dx and 0 <= current_pos.y < self.dy and 0 <= current_pos.z < self.dz):
                current_pos = current_pos.add(dir_step)
                continue
                
            val = self.trilinear_interpolate(current_pos)
            if val > max_intensity:
                max_intensity = val
                
            current_pos = current_pos.add(dir_step)
            
        return max_intensity

    def render_mip_image(self, width: int, height: int) -> List[List[float]]:
        """
        Simulates rendering an entire 2D image plane using MIP.
        """
        logging.info(f"Rendering MIP {width}x{height}...")
        image = [[0.0 for _ in range(width)] for _ in range(height)]
        
        camera_origin = Vector3(self.dx / 2, self.dy / 2, -100)
        
        for y in range(height):
            for x in range(width):
                # Orthographic projection approximation
                ray_origin = Vector3(
                    (x / width) * self.dx,
                    (y / height) * self.dy,
                    0
                )
                ray_dir = Vector3(0, 0, 1)
                
                intensity = self.cast_ray_mip(ray_origin, ray_dir, self.dz, 1.0)
                image[y][x] = intensity
                
        return image
