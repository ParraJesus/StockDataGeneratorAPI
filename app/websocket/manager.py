from typing import Dict, List
from fastapi import WebSocket

class WebSocketManager:
    def __init__(self):
        self.active_connections: Dict[int, List[WebSocket]] = {}

    async def connect(self, stock_id: int, websocket: WebSocket):
        await websocket.accept()
        if stock_id not in self.active_connections:
            self.active_connections[stock_id] = []
        self.active_connections[stock_id].append(websocket)

    def disconnect(self, stock_id: int, websocket: WebSocket):
        self.active_connections[stock_id].remove(websocket)
        if not self.active_connections[stock_id]:
            del self.active_connections[stock_id]

    async def broadcast(self, stock_id: int, message: dict):
        connections = self.active_connections.get(stock_id, [])
        for connection in connections:
            await connection.send_json(message)

manager = WebSocketManager()
