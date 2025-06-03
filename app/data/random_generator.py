import random
from app.data.base import StockValueGenerator

class RandomStockValueGenerator(StockValueGenerator):
    def generate(self) -> float:
        return round(random.uniform(-100.0, 100.0), 2)
