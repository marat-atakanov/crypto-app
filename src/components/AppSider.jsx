import React, { useContext } from 'react'
import { Layout, Card, Statistic, List, Typography, Tag } from 'antd'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { capitalize } from '../utils';
import CountUp from 'react-countup';
import { CryptoContext } from '../context/CryptoContextProvider';

const siderStyle = {
    backgroundColor: "#d4a373",
    // border: "1px solid black",
    padding: "1rem",
    // overflow: 'auto',
    // height: 'calc(100% - 60px)',
    // position: 'static',
    // left: 0,
    // top: 0,
    // bottom: 0,
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center"
}


const formatter = (value) => (<CountUp end={value} duration={0.3} />)


export default function AppSider() {

    const { assets } = useContext(CryptoContext)

    return (
        <Layout.Sider width="25%" style={siderStyle}>
            {
                assets.map(asset => (
                    <Card key={asset.id} style={{ marginBottom: "1rem" }}>
                        <Statistic
                            title={capitalize(asset.id)}
                            value={asset.totalAmount}
                            precision={2}
                            valueStyle={{ color: asset.grow ? '#3f8600' : '#cf3333' }}
                            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                            suffix="$"
                            formatter={formatter}>
                        </Statistic>
                        <List
                            size="small"
                            dataSource={[
                                { title: "Total Profit", value: asset.totalProfit.toFixed(2) + " $" },
                                { title: "Asset Amount", value: asset.amount, plain: true },
                                // {title: "Difference", value: asset.growPercent + " %"},
                            ]}
                            renderItem={(item) =>
                                <List.Item>
                                    <span>{item.title}</span>
                                    <span>
                                        {
                                            item.plain
                                                ? <span>{item.value}</span>
                                                : (
                                                    <>
                                                        <Tag color={asset.grow ? "green" : "red"}>{asset.growPercent} %</Tag>
                                                        <Typography.Text type={asset.grow ? "success" : "danger"}>{item.value}</Typography.Text>
                                                    </>
                                                )
                                        }

                                    </span>
                                </List.Item>}
                        />
                    </Card>
                ))
            }
        </Layout.Sider>
    )
}