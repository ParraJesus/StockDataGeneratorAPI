import React from "react";
import ArimaStockChart from "./ArimaStockChart";
import styles from "../style/StockDashboard.module.css";

const ArimaStockCard = ({ predictionEntry, fullRealData }) => {
  const { inputData, predictionData, timestamp } = predictionEntry;

  const lastInputTimestamp = inputData[inputData.length - 1]?.timestamp;
  const n = predictionData.predictions.length;

  // Combinar datos reales nuevos
  const combinedRealData = [
    ...inputData,
    ...fullRealData.filter(
      (d) => new Date(d.timestamp) > new Date(lastInputTimestamp)
    ),
  ];

  // Cortar la lista después de n + 5 puntos adicionales
  const maxRealDataLength = inputData.length + n + 5;
  const trimmedRealData = combinedRealData.slice(0, maxRealDataLength);

  return (
    <div className={styles.card}>
      <h3>Predicción generada: {new Date(timestamp).toLocaleString()}</h3>
      <ArimaStockChart
        realData={trimmedRealData}
        predictionData={predictionData}
      />
      <div className={styles.metrics}>
        <p>
          <strong>MAE:</strong> {predictionData.metrics.mae.toFixed(2)}
        </p>
        <p>
          <strong>RMSE:</strong> {predictionData.metrics.rmse.toFixed(2)}
        </p>
        <p>
          <strong>MAPE:</strong> {predictionData.metrics.mape.toFixed(2)}%
        </p>
        <p>
          <strong>Orden ARIMA:</strong> (
          {predictionData.metrics.order.join(", ")})
        </p>
      </div>
    </div>
  );
};

export default ArimaStockCard;
