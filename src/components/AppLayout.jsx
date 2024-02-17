import React, { useContext } from 'react'
import { Layout, Spin } from 'antd'
import AppHeader from './AppHeader'
import AppSider from './AppSider'
import AppContent from './AppContent'
import { CryptoContext } from '../context/CryptoContextProvider'

export default function AppLayout() {
    const { isLoading } = useContext(CryptoContext)
    return (
        <Layout>
            <AppHeader />

            {
                isLoading
                    ? <Spin size='large' fullscreen/>
                    : <Layout style={{paddingTop: 60}} hasSider>
                        <AppSider />
                        <AppContent />
                    </Layout>
            }
        </Layout>
    )
}
