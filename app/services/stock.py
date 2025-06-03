from sqlalchemy.orm import Session
from app.schemas.stock import StockCreate
from app.crud import stock as crud_stock
from app.models.stock import Stock, StockValue

def create_new_stock(db: Session, stock: StockCreate):
    return crud_stock.create_stock(db, stock)

def get_all_stocks(db: Session):
    return db.query(Stock).all()

def get_stock_values(db: Session, stock_id: int):
    return db.query(StockValue).filter(StockValue.stock_id == stock_id).order_by(StockValue.timestamp.asc()).all()