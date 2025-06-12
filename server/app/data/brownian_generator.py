import random
from math import exp, sqrt
from app.data.base import StockValueGenerator

class BrownianStockValueGenerator(StockValueGenerator):
    def __init__(self, initial_value: float = 10.0, mu: float = 0.01,
                sigma: float = 0.2, dt: float = 1.0, min_value: float = -100.0,
                max_value: float = 200.0):
        self.current_value = initial_value
        self.mu = mu        # tasa de crecimiento esperada
        self.sigma = sigma  # volatilidad
        self.dt = dt        # tamaño del paso temporal
        self.min_value = min_value
        self.max_value = max_value

    def generate(self) -> float:
        """
        if self.current_value > 0.9 * self.max_value:
            adjusted_mu = 0.0  # detener crecimiento
        elif self.current_value < 1.1 * self.min_value:
            adjusted_mu = 0.1  # acelerar recuperación
        else:
            adjusted_mu = self.mu
        """

        z = random.gauss(0, 1)  # variable aleatoria normal estándar
        #drift = (adjusted_mu - 0.5 * self.sigma ** 2) * self.dt
        drift = (self.mu - 0.5 * self.sigma ** 2) * self.dt
        diffusion = self.sigma * sqrt(self.dt) * z
        self.current_value *= exp(drift + diffusion)
        return round(self.current_value, 2)
