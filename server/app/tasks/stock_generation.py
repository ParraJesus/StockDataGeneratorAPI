import asyncio
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.data.data_factory import get_generator
from app.models.stock import Stock, StockValue
from datetime import datetime
from app.websocket.manager import manager

"""
async def generate_stock_values_forever(stock_id: int, generator_type: str, interval: float = 1.0):
    generator = get_generator(generator_type)
    db: Session = SessionLocal()

    try:
        while True:
            value = generator.generate()
            db.add(StockValue(stock_id=stock_id, value=value, timestamp=datetime.utcnow()))
            db.commit()
            await asyncio.sleep(interval)
    finally:
        db.close()
"""
async def generate_stock_values_forever(stock_id: int, generator_type: str, interval: float = 5.0):
    generator = get_generator(generator_type)
    db_gen = SessionLocal()

    try:
        while True:
            value = generator.generate()
            stock_value = StockValue(stock_id=stock_id, value=value)
            db_gen.add(stock_value)
            db_gen.commit()
            db_gen.refresh(stock_value)

            await manager.broadcast(stock_id, {
                "stock_id": stock_id,
                "value": stock_value.value,
                "timestamp": stock_value.timestamp.isoformat()
            })
            
            await asyncio.sleep(interval)
    finally:
        db_gen.close()
