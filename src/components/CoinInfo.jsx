import React from "react";
import { Flex, Typography } from "antd";

const iconStyle = {
  width: "40px",
  height: "40px",
  objectFit: "cover",
};

export default function CoinInfo({coin, hasSymbol}) {
  return (
    <Flex align="center">
      <img style={iconStyle} src={coin.icon} alt={coin.id} />
      <Typography.Title level={2} style={{ margin: "0 0 0 10px" }}>
        {hasSymbol && `(${coin.symbol})`} {coin.name}
      </Typography.Title>
    </Flex>
  );
}
