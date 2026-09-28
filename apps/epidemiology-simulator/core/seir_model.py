import logging
from typing import List, Tuple
from core.rk4_integrator import RungeKuttaIntegrator

class SEIRModel:
    """
    Susceptible-Exposed-Infectious-Recovered (SEIR) Epidemic Model.
    """
    
    def __init__(self, beta: float, sigma: float, gamma: float, N: float):
        self.beta = beta
        self.sigma = sigma
        self.gamma = gamma
        self.N = N
        self.integrator = RungeKuttaIntegrator()
        logging.info(f"Initialized SEIR ODEs (beta={beta}, sigma={sigma}, gamma={gamma}, N={N})")

    def _odes(self, y: List[float], t: float) -> List[float]:
        """
        Returns [dS/dt, dE/dt, dI/dt, dR/dt]
        """
        S, E, I, R = y
        
        dSdt = -self.beta * S * I / self.N
        dEdt = (self.beta * S * I / self.N) - (self.sigma * E)
        dIdt = (self.sigma * E) - (self.gamma * I)
        dRdt = self.gamma * I
        
        return [dSdt, dEdt, dIdt, dRdt]

    def simulate(self, days: int, dt: float, S0: float, E0: float, I0: float, R0: float) -> List[List[float]]:
        """
        Simulates the outbreak over a given number of days.
        """
        steps = int(days / dt)
        y = [S0, E0, I0, R0]
        t = 0.0
        
        results = [y]
        
        for _ in range(steps):
            y = self.integrator.step(self._odes, y, t, dt, ())
            t += dt
            # Only save once per day for output
            if abs(t - round(t)) < 1e-5:
                results.append(y)
                
        return results
