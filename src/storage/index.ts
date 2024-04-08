import { UserAPI } from "@/entities/Auth/api/auth.api";
import { CategoryAPI } from "@/entities/Metrics/api/category.metrics.api";
import { CurrencyAPI } from "@/entities/Metrics/api/currency.metrics.api";
import { MetricsAPI } from "@/entities/Metrics/api/metrics.metrics.api";
import { CategoryReducer } from "@/entities/Metrics/storage/category.metrics.storage";
import { CurrencyReducer } from "@/entities/Metrics/storage/currency.metrics.storage";
import { MetricsReducer } from "@/entities/Metrics/storage/metrics.metrics.storage";
import { ProductAPI } from "@/entities/Product/api/product.api";
import { PTCReducer } from "@/features/storage/PTC/ptc.storage";
import {combineReducers, configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    categoryList: CategoryReducer,
    metrics: MetricsReducer,
    currencyList: CurrencyReducer,
    ptc: PTCReducer,

    [UserAPI.reducerPath]: UserAPI.reducer,
    [ProductAPI.reducerPath]: ProductAPI.reducer,

    [CategoryAPI.reducerPath]: CategoryAPI.reducer,
    [MetricsAPI.reducerPath]: MetricsAPI.reducer,
    [CurrencyAPI.reducerPath]: CurrencyAPI.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false
            }).concat(
                UserAPI.middleware,
                ProductAPI.middleware,

                CategoryAPI.middleware,
                MetricsAPI.middleware,
                CurrencyAPI.middleware,
            ),
    })
}


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']