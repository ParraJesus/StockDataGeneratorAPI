import { Navigate } from "react-router-dom";

import Layout from "../static/Layout";

import StocksPage from "../pages/Stocks.jsx";
import StockDashboard from "../pages/StockDashboard.jsx";

const routes = [
  {
    path: "/*",
    element: <Navigate to="/" replace />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        path: "",
        element: <StocksPage />,
        title: "Statistics Stock Pretictor",
      },
    ],
  },
  {
    path: "/stock/:id",
    element: <Layout />,
    children: [
      {
        index: true,
        path: "",
        element: <StockDashboard />,
        title: "Stock Dashboard",
      },
    ],
  },
];

export default routes;
