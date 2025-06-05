import axios from "axios";

export const fetchStocks = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/v1/stocks");
    return response.data;
  } catch (error) {
    console.warn("Stocks request failed:", error.message);
  }
};
