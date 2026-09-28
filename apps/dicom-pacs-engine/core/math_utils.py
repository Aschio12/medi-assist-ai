import math
from typing import List, Tuple

class Vector3:
    def __init__(self, x: float, y: float, z: float):
        self.x = x
        self.y = y
        self.z = z

    def add(self, other: 'Vector3') -> 'Vector3':
        return Vector3(self.x + other.x, self.y + other.y, self.z + other.z)

    def sub(self, other: 'Vector3') -> 'Vector3':
        return Vector3(self.x - other.x, self.y - other.y, self.z - other.z)

    def mult(self, scalar: float) -> 'Vector3':
        return Vector3(self.x * scalar, self.y * scalar, self.z * scalar)

    def dot(self, other: 'Vector3') -> float:
        return self.x * other.x + self.y * other.y + self.z * other.z

    def cross(self, other: 'Vector3') -> 'Vector3':
        return Vector3(
            self.y * other.z - self.z * other.y,
            self.z * other.x - self.x * other.z,
            self.x * other.y - self.y * other.x
        )

    def magnitude(self) -> float:
        return math.sqrt(self.x**2 + self.y**2 + self.z**2)

    def normalize(self) -> 'Vector3':
        mag = self.magnitude()
        if mag == 0:
            return Vector3(0, 0, 0)
        return Vector3(self.x / mag, self.y / mag, self.z / mag)

class Matrix4x4:
    def __init__(self):
        # Identity matrix
        self.m = [
            [1.0, 0.0, 0.0, 0.0],
            [0.0, 1.0, 0.0, 0.0],
            [0.0, 0.0, 1.0, 0.0],
            [0.0, 0.0, 0.0, 1.0]
        ]

    @staticmethod
    def perspective(fov_deg: float, aspect: float, near: float, far: float) -> 'Matrix4x4':
        f = 1.0 / math.tan(math.radians(fov_deg) / 2.0)
        mat = Matrix4x4()
        mat.m[0][0] = f / aspect
        mat.m[1][1] = f
        mat.m[2][2] = (far + near) / (near - far)
        mat.m[2][3] = (2 * far * near) / (near - far)
        mat.m[3][2] = -1.0
        mat.m[3][3] = 0.0
        return mat

    def multiply(self, other: 'Matrix4x4') -> 'Matrix4x4':
        res = Matrix4x4()
        for r in range(4):
            for c in range(4):
                val = 0.0
                for k in range(4):
                    val += self.m[r][k] * other.m[k][c]
                res.m[r][c] = val
        return res

    def transform_vector(self, v: Vector3) -> Vector3:
        x = v.x * self.m[0][0] + v.y * self.m[0][1] + v.z * self.m[0][2] + self.m[0][3]
        y = v.x * self.m[1][0] + v.y * self.m[1][1] + v.z * self.m[1][2] + self.m[1][3]
        z = v.x * self.m[2][0] + v.y * self.m[2][1] + v.z * self.m[2][2] + self.m[2][3]
        w = v.x * self.m[3][0] + v.y * self.m[3][1] + v.z * self.m[3][2] + self.m[3][3]
        if w != 1.0 and w != 0.0:
            x /= w
            y /= w
            z /= w
        return Vector3(x, y, z)
