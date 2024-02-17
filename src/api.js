import { cryptoAssets, cryptoData } from "./data";

export const fetchData = () => {
    return new Promise (resolve => {
        setTimeout(()=>{return resolve(cryptoData)}, 2)
    })
}

export const fetchAssets = () => {
    return new Promise (resolve => {
        setTimeout(()=>{return resolve(cryptoAssets)}, 3)
    })
}
