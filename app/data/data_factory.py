from app.data.random_generator import RandomStockValueGenerator
from app.data.brownian_generator import BrownianStockValueGenerator
# agregar el import para el resto de estrategias de generación

def get_generator(name: str):
    generators = {
        "random": RandomStockValueGenerator,
        "brownian": BrownianStockValueGenerator,
        # "xx": ,
    }
    
    generator_class = generators.get(name)
    if generator_class is None:
        raise ValueError(f"Unknown generator: {name}")
    return generator_class()
