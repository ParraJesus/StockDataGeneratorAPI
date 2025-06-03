from pydantic import BaseModel

class StockCreate(BaseModel):
    name: str

class StockOut(StockCreate):
    id: int
    class Config:
        orm_mode = True
