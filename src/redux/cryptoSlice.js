// import axios from "axios";
// import { cryptoData } from "../data";

// const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

// export const fetchCryptos = createAsyncThunk("fetchCryptos", async () => {
//     return await new Promise (resolve => {
//         setTimeout(()=>{return resolve(cryptoData)}, 2)
//     })
// })

// const cryptoSlice = createSlice({
//     name: "cryptoSlice",
//     initialState: {
//         result: null
//     },
//     reducer: {},
//     extraReducers: builder => {
//         builder.addCase(fetchCryptos.fulfilled, (state, action) => {
//             state.result = action.payload
//         })
//     }
// })

// export default cryptoSlice.reducer