import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchStockData,
  fetchStockHistory,
  setupWebSocket,
} from "../Api/WebsocketsApi";
import { fetchArimaPrediction } from "../Api/StocksApi";
import StockChart from "../components/StockChart";
import ArimaStockCard from "../components/ArimaStockCard";

import styles from "../style/StockDashboard.module.css";

const Page = () => {
  const { id } = useParams();
  const [stock, setStock] = useState("");
  const [stockValues, setStockValues] = useState([]);
  const [arimaRequestData, setArimaRequestData] = useState({
    arima_n: 10,
  });
  const [arimaDataList, setArimaDataList] = useState([]);

  useEffect(() => {
    const stockId = id;

    const fetchData = async () => {
      try {
        const stock = await fetchStockData(stockId);
        setStock(stock);
        const history = await fetchStockHistory(stockId);
        setStockValues((prev) => [...prev, ...history]);
      } catch (err) {
        console.error("Could not load data:", err);
      }
    };

    fetchData();

    setupWebSocket(stockId, (nuevoValor) => {
      setStockValues((prev) => [...prev, nuevoValor]);
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArimaRequestData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stockId = id;

    try {
      const predictionData = await fetchArimaPrediction(
        stockId,
        arimaRequestData.arima_n
      );

      const sliceStart = Math.max(
        stockValues.length - arimaRequestData.arima_n,
        0
      );
      const inputData = stockValues.slice(sliceStart); // último segmento usado como entrada

      setArimaDataList((prev) => [
        ...prev,
        {
          inputData,
          predictionData,
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch (err) {
      console.error("Could not load data:", err);
    }
  };

  return (
    <>
      <h1>{stock.name}</h1>
      <StockChart stockValues={stockValues} />
      <form action="predictionData" onSubmit={handleSubmit} className={styles.formContainer} >
        <input
          type="number"
          name="arima_n"
          id="arima_n"
          value={arimaRequestData.n}
          onChange={handleChange}
          className={styles.inputArima}
        />
        <button type="submit" className={styles.buttonArima}>Generar predicción</button>
      </form>
      <hr />
      <h2>Lista de predicciones</h2>
      {arimaDataList
        .slice()
        .reverse()
        .map((entry, idx) => (
          <ArimaStockCard
            key={idx}
            predictionEntry={entry}
            fullRealData={stockValues}
          />
        ))}
    </>
  );
};

export default Page;
