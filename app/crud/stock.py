from sqlalchemy.orm import Session
from app.models.stock import Stock
from app.schemas.stock import StockCreate

def create_stock(db: Session, stock: StockCreate):
    db_stock = Stock(**stock.dict())
    db.add(db_stock)
    db.commit()
    db.refresh(db_stock)
    return db_stock

def get_stocks(db: Session):
    return db.query(Stock).all()
