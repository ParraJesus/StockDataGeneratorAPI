from fastapi import FastAPI
from app.api.v1 import stock
from app.db.session import engine
from app.db.base import Base
from app.tasks.stock_generation import generate_stock_values_forever
from app.websocket import endpoints as ws_endpoints
import asyncio

from fastapi.middleware.cors import CORSMiddleware


Base.metadata.create_all(bind=engine)

app = FastAPI(title="Statistics Stock API")
app.include_router(stock.router, prefix="/api/v1", tags=["Stocks"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    #asyncio.create_task(generate_stock_values_forever(stock_id=1, generator_type="random", interval=20.0))
    asyncio.create_task(generate_stock_values_forever(stock_id=2, generator_type="brownian", interval=1.0))

app.include_router(ws_endpoints.router)