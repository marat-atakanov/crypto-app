import { createContext, useState, useEffect } from "react";
import { fetchAssets, fetchData } from "../api";
import { formatAsset, mapAssets } from '../utils';


export const CryptoContext = createContext({
    assets: [],
    data: [],
    isLoading: false
})

export const CryptoContextProvider = ({children}) => {

    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])
    const [assets, setAssets] = useState([])

    useEffect(() => {
        const preload = async () => {
            try {
                setIsLoading(true)
                const { result } = await fetchData()
                const assets = await fetchAssets()
                setData(result)
                setAssets(assets.map(asset => formatAsset(asset, result)))
            } catch (e) {
                throw new Error(e)
            } finally {
                setIsLoading(false)
            }
        }

        preload()
    }, [])

    const addAsset = (newAsset) => {
        setAssets(prev => [...prev, formatAsset(newAsset, data)])
    }

    return (
        <CryptoContext.Provider value={{isLoading, assets, data, addAsset}}>{children}</CryptoContext.Provider>
    )
}