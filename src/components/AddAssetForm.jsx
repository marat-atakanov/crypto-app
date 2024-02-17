import {
  Divider,
  Form,
  Select,
  InputNumber,
  Button,
  Flex,
  DatePicker,
  Result,
} from "antd";
import React, { useState, useContext, useEffect, useRef } from "react";
import { CryptoContext } from "../context/CryptoContextProvider";
import CoinInfo from "./CoinInfo";

const iconStyle = {
  width: "15px",
  height: "15px",
  objectFit: "cover",
};

const validateMessage = {
  required: "${label} is required",
  types: {
    number: "${label} is not a valid number",
  },
  number: {
    min: "${label} must be more than ${min}",
  },
};

export default function AddAssetForm({ setIsDrawerOpen }) {
  const { data, addAsset } = useContext(CryptoContext);
  const [coin, setCoin] = useState(null);
  const [form] = Form.useForm();
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef();

  const handleSelect = (value) => {
    setCoin(data.find((item) => item.id === value));
  };

  const handleAmountChange = (value) => {
    const { price } = form.getFieldsValue();
    form.setFieldsValue({
      total: +(value * price).toFixed(3) || 0,
    });
  };

  const handlePriceChange = (value) => {
    const { amount } = form.getFieldsValue();
    form.setFieldsValue({
      total: +(value * amount).toFixed(3) || 0,
    });
  };

  const handleFormFinish = (value) => {
    console.log(value);
    ref.current = { amount: value.amount, total: value.total };
    const newAsset = {
      amount: value.amount,
      price: value.price,
      id: coin.id,
      date: value.date.$d ?? new Date(),
    };
    addAsset(newAsset);
    setSubmitted(true);
  };

  if (submitted)
    return (
      <Result
        status="success"
        title="New asset is added!"
        subTitle={`Added ${ref.current.amount} of ${coin.name} by price ${ref.current.total}`}
        extra={[
          <Button
            onClick={() => {
              setIsDrawerOpen(false);
            }}
            type="primary"
          >
            Close
          </Button>,
        ]}
      />
    );

  if (!coin) {
    return (
      <Select
        style={{ width: "100%" }}
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
    );
  }

  return (
    <Form
      name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 20,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        amount: 1,
        price: +coin.price.toFixed(3),
        total: +coin.price.toFixed(3),
      }}
      autoComplete="off"
      validateMessages={validateMessage}
      form={form}
      onFinish={handleFormFinish}
    >
      <Flex align="center" justify="space-between">
        <CoinInfo coin={coin} hasSymbol={false} />
        {/* <Button
          onClick={() => {
            form.resetFields();
            setCoin(null);
          }}
        >
          Back
        </Button> */}
      </Flex>

      <Divider />

      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: "number",
            min: 1,
          },
        ]}
      >
        <InputNumber
          placeholder=". . ."
          onChange={handleAmountChange}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[
          {
            required: true,
            type: "number",
            min: 0,
          },
        ]}
      >
        <InputNumber
          onChange={handlePriceChange}
          placeholder=". . ."
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item label="Date" name="date" rules={[{ required: true }]}>
        <DatePicker placeholder=". . ." showTime style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Total"
        name="total"
        rules={[
          {
            required: true,
            type: "number",
            min: 0,
          },
        ]}
      >
        <InputNumber disabled style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 10,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Add asset
        </Button>
      </Form.Item>
    </Form>
  );
}
