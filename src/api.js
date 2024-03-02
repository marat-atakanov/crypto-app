import { cryptoAssets, cryptoData } from "./data/data";

import axios from "axios";

export const fetchData = async () => {
    const coins = await axios.get("https://openapiv1.coinstats.app/coins", {headers: {
        "X-API-KEY": "R/EdahFBQZfAR/juFjKdkF2PY5lQjocHLVIAtiTfnzw="
    }})
    return coins.data
}

export const fetchAssets = () => {
    return new Promise (resolve => {
        setTimeout(()=>{return resolve(cryptoAssets)}, 3)
    })
}