import React, { useContext } from "react";
import { Layout, Typography } from "antd";
import { fetchAssets, fetchData } from "../api";
import { CryptoContext } from "../context/CryptoContextProvider";
import PortfolioChart from "./PortfolioChart";
import AssetsTable from "./AssetsTable";

const contentStyle = {
  minHeight: "calc(100vh - 60px)",
  padding: "1rem",
};

export default function AppContent() {
  const { assets, data } = useContext(CryptoContext);

  fetchData().then((data) => console.log(data));

  fetchAssets().then((data) => console.log(data));

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3}>
        Portfolio:{" "}
        {assets
          .map((asset) => {
            const coin = data.find((v) => v.id === asset.id);
            return asset.amount * coin.price;
          })
          .reduce((a, v) => (a += v), 0)
          .toFixed(2)}$
      </Typography.Title>
      <PortfolioChart/>
      <AssetsTable/>
    </Layout.Content>
  );
}
