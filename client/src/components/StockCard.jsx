import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../style/StockCard.module.css";

import { ReactComponent as StockIcon } from "../assets/stock.svg";

const StockCard = ({ title, id }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/stock/${id}`);
  };

  return (
    <div className={`${styles.card}`} onClick={handleNavigate}>
      <StockIcon className={`${styles.icon}`}></StockIcon>
      <div className={`${styles.title_container}`}>
        <h2 className={`${styles.title}`}>{title}</h2>
        <h2 className={`${styles.title}`}>Stock</h2>
      </div>
    </div>
  );
};

export default StockCard;
