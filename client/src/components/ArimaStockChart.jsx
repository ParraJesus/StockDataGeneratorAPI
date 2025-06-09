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
import {
  format,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  differenceInYears,
} from "date-fns";

const formatTimestamp = (timestamp, scale) => {
  const date = new Date(timestamp);
  switch (scale) {
    case "hours":
      return format(date, "HH:mm dd MMM");
    case "days":
      return format(date, "dd MMM");
    case "weeks":
      return format(date, "wo MMM");
    case "months":
      return format(date, "MMM yyyy");
    case "years":
      return format(date, "yyyy");
    default:
      return format(date, "dd MMM");
  }
};

const determineTimeScale = (values) => {
  if (!values.length) return "days";

  const first = new Date(values[0].timestamp);
  const last = new Date(values[values.length - 1].timestamp);
  const diffHours = differenceInHours(last, first);
  const diffDays = differenceInDays(last, first);

  if (diffDays > 730) return "years";
  if (diffDays > 180) return "months";
  if (diffDays > 30) return "weeks";
  if (diffHours > 24) return "days";
  return "hours";
};

const ArimaStockChart = ({ inputData, predictionData }) => {
  if (!inputData.length || !predictionData.length) return <p>Sin datos</p>;

  const lastTimestamp = new Date(inputData[inputData.length - 1].timestamp);

  // Calcular el intervalo promedio entre puntos reales
  const first = new Date(inputData[0].timestamp).getTime();
  const second = new Date(inputData[1].timestamp).getTime();
  const intervalMs = second - first;

  const predictedPoints = predictionData.map((value, idx) => {
    const futureTimestamp = new Date(
      lastTimestamp.getTime() + intervalMs * (idx + 1)
    );
    return {
      value,
      timestamp: futureTimestamp.toISOString(),
      display: formatTimestamp(futureTimestamp.toISOString(), "hours"),
      type: "prediction",
    };
  });

  const formattedInput = inputData.map((d) => ({
    value: d.value,
    timestamp: d.timestamp,
    display: formatTimestamp(d.timestamp, "hours"),
    type: "real",
  }));

  const allData = [...formattedInput, ...predictedPoints];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={allData}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="display" />
        <YAxis />
        <Tooltip
          labelFormatter={(label, payload) => {
            const timestamp = payload?.[0]?.payload?.timestamp;
            if (!timestamp) return "";
            return format(new Date(timestamp), "PPpp");
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          dot={false}
          name="Valor real"
          isAnimationActive={false}
          strokeWidth={2}
          data={formattedInput}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#82ca9d"
          dot={{ r: 3 }}
          name="Predicción"
          strokeDasharray="5 5"
          isAnimationActive={false}
          data={predictedPoints}
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
