from fastapi import APIRouter, Depends, Body
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.schemas.stock import StockCreate, StockOut
from app.schemas.stock_value import StockValueOut, StockValueCreate
from app.services import stock as stock_service
from app.services import stock_value_service

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/stocks", response_model=StockOut)
def create_stock(stock: StockCreate , db: Session = Depends(get_db)):
    return stock_service.create_new_stock(db, stock)

@router.post("/stocks/{stock_id}/stock_values", response_model=StockValueOut)
def create_stock_value(stock_id: int, stock_value: StockValueCreate, db: Session = Depends(get_db)):
    return stock_value_service.create_stock_value(db, stock_id, stock_value)

@router.get("/stocks", response_model=list[StockOut])
def read_stocks(db: Session = Depends(get_db)):
    return stock_service.get_all_stocks(db)

@router.get("/stocks/{stock_id}/values", response_model=list[StockValueOut])
def read_stock_values(stock_id: int, db: Session = Depends(get_db)):
    return stock_service.get_stock_values(db, stock_id)
