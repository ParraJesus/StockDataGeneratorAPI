import React, { useState, useEffect } from "react";
import { fetchStocks } from "../Api/StocksApi.js";

import styles from "../style/Stocks.module.css";

import StockCard from "../components/StockCard";

const Page = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchStocks();
        setStocks(data);
      } catch (error) {
        console.error("Error at obtaining games:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Stocks Existentes</h1>
      <div className={`${styles.stocks_grid}`}>
        {stocks.map((stock) => (
          <StockCard key={stock.id} title={stock.name} id={stock.id} />
        ))}
      </div>
    </>
  );
};

export default Page;
