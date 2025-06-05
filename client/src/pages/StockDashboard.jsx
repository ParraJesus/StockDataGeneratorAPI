import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchStockData,
  fetchStockHistory,
  setupWebSocket,
} from "../Api/WebsocketsApi";
import StockChart from "../components/StockChart";

import styles from "../style/StockDashboard.module.css";

const Page = () => {
  const { id } = useParams();
  const [stock, setStock] = useState("");
  const [stockValues, setStockValues] = useState([]);

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
      console.log("nuevo valor");
    });
  }, [id]);

  return (
    <>
      <h1>{stock.name}</h1>
      <StockChart stockValues={stockValues} />
    </>
  );
};

export default Page;
