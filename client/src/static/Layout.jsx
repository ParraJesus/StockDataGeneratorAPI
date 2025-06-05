import React from "react";
import { Outlet } from "react-router-dom";
import styles from "../style/Layout.module.css";

import Footer from "../components/Footer";
import SideMenu from "../components/SideMenu";

const Layout = () => {
  return (
    <div className={styles.page}>
      {/*<SideMenu />*/}
      <div className={styles.right_column}>
        <main className={styles.main}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
