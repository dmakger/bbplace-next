import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { ICurrency } from "../model/currency.metrics.model";


const initialState: ICurrency[] = []

export const CurrencySlice = createSlice({
    name: 'currencyList',
    initialState,
    reducers: {
        saveCurrencyList(state, action: PayloadAction<ICurrency[]>) {            
            state.splice(0, state.length, ...action.payload);
        },
    }
})

export const CurrencyReducer = CurrencySlice.reducer
