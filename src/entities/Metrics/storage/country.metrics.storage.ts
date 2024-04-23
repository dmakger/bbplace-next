import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { ICountry } from "../model/country.metrics.model";


const initialState: ICountry[] = []

export const CountrySlice = createSlice({
    name: 'categoryList',
    initialState,
    reducers: {
        saveCountryList(state, action: PayloadAction<ICountry[]>) {            
            state.splice(0, state.length, ...action.payload);
        },
    }
})

export const CountryReducer = CountrySlice.reducer
