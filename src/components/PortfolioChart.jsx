import React, { useContext } from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { CryptoContext } from "../context/CryptoContextProvider";
import { Flex, Empty, Button } from "antd";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PortfolioChart() {
  const { assets } = useContext(CryptoContext);
  const data = {
    labels: assets.map((asset) => asset.name),
    datasets: [
      {
        label: "# of Votes",
        data: assets.map((asset) => asset.totalAmount),
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <Flex justify="center" style={{ marginBottom: 20 }}>
      <Flex align="center" justify="center" style={{ width: 400, height: 400 }}>
        {assets.length !== 0 ? (
          <Pie options={{ devicePixelRatio: 4 }} data={data} />
        ) : (
          <Empty description="No assets..." />
        )}
      </Flex>
    </Flex>
  );
}
