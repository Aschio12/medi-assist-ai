import logging
from typing import Callable, List, Tuple

class RungeKuttaIntegrator:
    """
    Implements 4th-Order Runge-Kutta (RK4) numerical integration for solving
    systems of ordinary differential equations (ODEs).
    """
    
    def __init__(self):
        logging.info("Initialized RK4 Numerical Integrator.")

    def step(self, f: Callable, y: List[float], t: float, h: float, args: Tuple) -> List[float]:
        """
        Advances the system by one time step 'h'.
        """
        k1 = self._multiply(h, f(y, t, *args))
        
        y_k1 = self._add(y, self._multiply(0.5, k1))
        k2 = self._multiply(h, f(y_k1, t + 0.5 * h, *args))
        
        y_k2 = self._add(y, self._multiply(0.5, k2))
        k3 = self._multiply(h, f(y_k2, t + 0.5 * h, *args))
        
        y_k3 = self._add(y, k3)
        k4 = self._multiply(h, f(y_k3, t + h, *args))
        
        # y_next = y + (k1 + 2*k2 + 2*k3 + k4) / 6
        k_sum = self._add(k1, self._add(self._multiply(2, k2), self._add(self._multiply(2, k3), k4)))
        return self._add(y, self._multiply(1.0 / 6.0, k_sum))

    def _add(self, v1: List[float], v2: List[float]) -> List[float]:
        return [a + b for a, b in zip(v1, v2)]
        
    def _multiply(self, scalar: float, v: List[float]) -> List[float]:
        return [scalar * a for a in v]
