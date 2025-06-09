import axios from "axios";

export const fetchStocks = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/v1/stocks");
    return response.data;
  } catch (error) {
    console.warn("Stocks request failed:", error.message);
  }
};

export const fetchArimaPrediction = async (stock_id, n_arima) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/v1/stocks/${stock_id}/predict?n=${n_arima}`
    );
    return response.data;
  } catch (error) {
    console.warn("Arima prediction request failed:", error.message);
  }
};
