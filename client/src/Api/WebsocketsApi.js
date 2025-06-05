const seenTimestamps = new Set();

export async function fetchStockData(stockId) {
  const response = await fetch(
    `http://localhost:8000/api/v1/stocks/${stockId}`
  );
  const stockArray = await response.json();
  if (!Array.isArray(stockArray) || stockArray.length === 0) {
    throw new Error("No se encontró el stock");
  }
  return stockArray[0];
}

export async function fetchStockHistory(stockId) {
  const response = await fetch(
    `http://localhost:8000/api/v1/stocks/${stockId}/values`
  );
  const data = await response.json();

  const filtered = data.filter((entry) => {
    if (!seenTimestamps.has(entry.timestamp)) {
      seenTimestamps.add(entry.timestamp);
      return true;
    }
    return false;
  });

  return filtered;
}

export function setupWebSocket(stockId, onNewValue) {
  const socket = new WebSocket(`ws://localhost:8000/ws/stocks/${stockId}`);

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (!seenTimestamps.has(data.timestamp)) {
      seenTimestamps.add(data.timestamp);
      onNewValue(data);
    }
  };

  socket.onopen = () => console.log("WebSocket conectado");
  socket.onclose = () => console.log("WebSocket desconectado");
  socket.onerror = (err) => console.error("WebSocket error:", err);
}
