import { CurrencyReducer } from "@/entities/Metrics/storage/currency.metrics.storage";
import { MetricsReducer } from "@/entities/Metrics/storage/metrics.metrics.storage";
import {combineReducers, configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    metrics: MetricsReducer,
    currencyList: CurrencyReducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false
            }).concat(
            ),
    })
}


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']