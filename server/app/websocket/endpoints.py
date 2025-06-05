from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.websocket.manager import manager

router = APIRouter()

@router.websocket("/ws/stocks/{stock_id}")
async def websocket_endpoint(websocket: WebSocket, stock_id: int):
    stock_id = int(stock_id)
    await manager.connect(stock_id, websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(stock_id, websocket)
