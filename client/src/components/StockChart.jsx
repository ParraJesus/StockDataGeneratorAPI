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

const StockChart = ({ stockValues }) => {
  if (!stockValues.length) return <p>No hay datos para mostrar</p>;

  const scale = determineTimeScale(stockValues);

  const formattedData = stockValues.map((d) => ({
    value: d.value,
    timestamp: d.timestamp,
    display: formatTimestamp(d.timestamp, scale),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={formattedData}>
        <CartesianGrid stroke="#ccc" />
        <XAxis
          dataKey="display"
          tickFormatter={(value) => formatTimestamp(value, scale)}
        />
        <YAxis />
        <Tooltip
          labelFormatter={(label, payload) => {
            const timestamp = payload?.[0]?.payload?.timestamp;
            if (!timestamp) return "";
            return format(new Date(timestamp), "PPpp");
          }}
          formatter={(value) => [`$${value.toFixed(2)}`, "Valor"]}
        />

        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          strokeWidth={2}
          dot={false}
          animationDuration={300}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StockChart;
