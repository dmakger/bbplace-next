import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { IMetrics } from "../model/metric.metrics.model";


const initialState: IMetrics[] = []

export const MetricsSlice = createSlice({
    name: 'metrics',
    initialState,
    reducers: {
        saveMetrics(state, action: PayloadAction<IMetrics[]>) {
            state.splice(0, state.length, ...action.payload);
        },
    }
})

export const MetricsReducer = MetricsSlice.reducer
