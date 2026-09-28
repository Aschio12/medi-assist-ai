import logging
import random
import math
from typing import List, Dict, Any

class SpatialOutbreakEngine:
    """
    Agent-Based Model (ABM) for cellular automata spatial diffusion of pathogens.
    Simulates individual human nodes transitioning between SEIR states.
    """
    
    def __init__(self, grid_size: int = 100):
        self.grid_size = grid_size
        # State: 0=S, 1=E, 2=I, 3=R, 4=Dead
        self.grid = [[0 for _ in range(grid_size)] for _ in range(grid_size)]
        logging.info(f"Initialized Spatial Outbreak Engine on {grid_size}x{grid_size} grid")

    def seed_infection(self, x: int, y: int, radius: int = 3):
        for i in range(max(0, x - radius), min(self.grid_size, x + radius)):
            for j in range(max(0, y - radius), min(self.grid_size, y + radius)):
                if (i-x)**2 + (j-y)**2 <= radius**2:
                    self.grid[i][j] = 2 # Infectious

    def step_cellular_automata(self, beta: float, sigma: float, gamma: float, mortality: float) -> Dict[str, int]:
        """
        Advances the spatial simulation by one stochastic step.
        """
        new_grid = [[self.grid[i][j] for j in range(self.grid_size)] for i in range(self.grid_size)]
        stats = {"S": 0, "E": 0, "I": 0, "R": 0, "D": 0}
        
        for i in range(self.grid_size):
            for j in range(self.grid_size):
                state = self.grid[i][j]
                
                if state == 0: # Susceptible
                    # Check neighbors (Moore neighborhood)
                    infected_neighbors = 0
                    for ni in [-1, 0, 1]:
                        for nj in [-1, 0, 1]:
                            if ni == 0 and nj == 0: continue
                            if 0 <= i + ni < self.grid_size and 0 <= j + nj < self.grid_size:
                                if self.grid[i+ni][j+nj] == 2:
                                    infected_neighbors += 1
                                    
                    # Probability of getting exposed based on infected neighbors
                    prob_infect = 1.0 - math.exp(-beta * infected_neighbors * 0.1)
                    if random.random() < prob_infect:
                        new_grid[i][j] = 1
                
                elif state == 1: # Exposed
                    if random.random() < sigma:
                        new_grid[i][j] = 2
                        
                elif state == 2: # Infectious
                    if random.random() < gamma:
                        # Recover or Die
                        if random.random() < mortality:
                            new_grid[i][j] = 4
                        else:
                            new_grid[i][j] = 3
                            
                # Count stats
                s = new_grid[i][j]
                if s == 0: stats["S"] += 1
                elif s == 1: stats["E"] += 1
                elif s == 2: stats["I"] += 1
                elif s == 3: stats["R"] += 1
                elif s == 4: stats["D"] += 1
                
        self.grid = new_grid
        return stats
