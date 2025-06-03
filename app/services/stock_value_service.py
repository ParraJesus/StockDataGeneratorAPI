from sqlalchemy.orm import Session
from app.models.stock import StockValue
from app.schemas.stock_value import StockValueCreate

def create_stock_value(db: Session, stock_id: int, stock_value_data: StockValueCreate) -> StockValue:
    stock_value = StockValue(
        stock_id=stock_id,
        value=stock_value_data.value
    )
    db.add(stock_value)
    db.commit()
    db.refresh(stock_value)
    return stock_value
