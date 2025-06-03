import random
from math import exp, sqrt
from app.data.base import StockValueGenerator

class BrownianStockValueGenerator(StockValueGenerator):
    def __init__(self, initial_value: float = 100.0, mu: float = 0.05, sigma: float = 0.2, dt: float = 1.0):
        self.current_value = initial_value
        self.mu = mu        # tasa de crecimiento esperada
        self.sigma = sigma  # volatilidad
        self.dt = dt        # tamaño del paso temporal

    def generate(self) -> float:
        z = random.gauss(0, 1)  # variable aleatoria normal estándar
        drift = (self.mu - 0.5 * self.sigma ** 2) * self.dt
        diffusion = self.sigma * sqrt(self.dt) * z
        self.current_value *= exp(drift + diffusion)
        return round(self.current_value, 2)