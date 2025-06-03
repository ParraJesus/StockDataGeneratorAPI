from pydantic import BaseModel
from datetime import datetime

class StockValueOut(BaseModel):
    id: int
    value: float
    timestamp: datetime

    class Config:
        orm_mode = True

class StockValueCreate(BaseModel):
    value: float