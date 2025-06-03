from abc import ABC, abstractmethod

class StockValueGenerator(ABC):
    @abstractmethod
    def generate(self) -> float:
        pass
