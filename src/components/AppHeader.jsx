import React, { useContext } from "react";
import { Layout, Modal, Select, Space, Button, Drawer } from "antd";
import { CryptoContext } from "../context/CryptoContextProvider";
import { useState } from "react";
import CoinInfoModal from "./CoinInfoModal";
import AddAssetForm from "./AddAssetForm";

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "60px",
  padding: "1rem",
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  zIndex: 10
};

const iconStyle = {
  width: "15px",
  height: "15px",
  objectFit: "cover",
};

export default function AppHeader() {
  const [coinData, setCoinData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { data } = useContext(CryptoContext);

  const handleSelect = (id) => {
    setCoinData(data.find((item) => item.id === id));
    setIsModalOpen(true);
  };

  // useEffect(() => {
  //     const keypress = (event) => {
  //         console.log(event.key);
  //     }
  //     document.addEventListener("keypress", keypress)
  //     return () => document.removeEventListener("keyup", keypress)
  // }, [])

  return (
    <Layout.Header style={headerStyle}>
      <Select
        // mode="multiple"
        style={{ width: "200px" }}
        placeholder="Select a coin"
        value={null}
        onSelect={handleSelect}
        optionLabelProp="label"
        // open={select}
        options={data.map((coin) => ({
          value: coin.id,
          label: coin.name,
          desc: coin.name,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img
              style={iconStyle}
              src={option.data.icon}
              alt={option.data.label}
            />
            {option.data.desc}
          </span>
        )}
      />
      <Button onClick={() => setIsDrawerOpen(true)} type="primary">
        Add asset
      </Button>
      <Drawer
        destroyOnClose
        width={"600px"}
        title="Add Asset"
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
      >
        <AddAssetForm setIsDrawerOpen={setIsDrawerOpen} />
      </Drawer>

      <Modal
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        open={isModalOpen}
        centered
      >
        <CoinInfoModal coin={coinData} />
      </Modal>
    </Layout.Header>
  );
}
