/*
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { format } from "date-fns";

const formatTimestamp = (timestamp) => {
  return format(new Date(timestamp), "HH:mm:ss");
};

const ArimaStockChart = ({ realData, predictionData }) => {
  if (!realData?.length || !predictionData?.predictions?.length) {
    return <p>No hay datos disponibles.</p>;
  }

  // Formatear los datos reales
  const formattedReal = realData.map((point) => ({
    timestamp: point.timestamp,
    value: point.value,
    display: formatTimestamp(point.timestamp),
    type: "real",
  }));

  // Formatear los datos predichos
  const formattedPredictions = predictionData.predictions.map((point) => ({
    timestamp: point.timestamp,
    value: point.value,
    display: formatTimestamp(point.timestamp),
    type: "predicted",
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="display"
          type="category"
          allowDuplicatedCategory={false}
          tick={{ fontSize: 12 }}
        />
        <YAxis />
        <Tooltip />
        <Line
          data={formattedReal}
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          name="Real"
          dot={false}
          strokeWidth={2}
          isAnimationActive={false}
        />
        <Line
          data={formattedPredictions}
          type="monotone"
          dataKey="value"
          stroke="#82ca9d"
          name="Predicción"
          strokeDasharray="5 5"
          dot={{ r: 3 }}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ArimaStockChart;
*/

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { format } from "date-fns";

const formatTimestamp = (timestamp) => {
  return format(new Date(timestamp), "HH:mm:ss");
};

const ArimaStockChart = ({ realData, predictionData }) => {
  if (!realData?.length || !predictionData?.predictions?.length) {
    return <p>No hay datos disponibles.</p>;
  }

  // Crear mapa para unir valores por timestamp
  const dataMap = new Map();

  realData.forEach((point) => {
    const key = formatTimestamp(point.timestamp);
    dataMap.set(key, {
      timestamp: point.timestamp,
      display: key,
      real: point.value,
      predicted: null,
    });
  });

  predictionData.predictions.forEach((point) => {
    const key = formatTimestamp(point.timestamp);
    if (dataMap.has(key)) {
      dataMap.get(key).predicted = point.value;
    } else {
      dataMap.set(key, {
        timestamp: point.timestamp,
        display: key,
        real: null,
        predicted: point.value,
      });
    }
  });

  const combinedData = Array.from(dataMap.values()).sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={combinedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="display"
          type="category"
          allowDuplicatedCategory={false}
          tick={{ fontSize: 12 }}
        />
        <YAxis />
        <Tooltip />
        <Line
          dataKey="real"
          type="monotone"
          stroke="#8884d8"
          name="Real"
          dot={false}
          strokeWidth={2}
          isAnimationActive={false}
          connectNulls={true}
        />
        <Line
          dataKey="predicted"
          stroke="#000000"
          name="Predicción"
          strokeDasharray="5 5"
          dot={{ r: 3 }}
          isAnimationActive={false}
          connectNulls={true}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ArimaStockChart;