import { TinAPI, UserAPI } from "@/entities/Auth/api/auth.api";
import { UserReducer } from "@/entities/Auth/storage/auth.storage";
import { FavouriteAPI } from "@/entities/Favourite/api/favourite.api";
import { FileAPI } from "@/entities/File/api/file.api";
import { CategoryAPI } from "@/entities/Metrics/api/category.metrics.api";
import { CountryAPI } from "@/entities/Metrics/api/country.metrics.api";
import { CurrencyAPI } from "@/entities/Metrics/api/currency.metrics.api";
import { MetricsAPI } from "@/entities/Metrics/api/metrics.metrics.api";
import { CategoryReducer } from "@/entities/Metrics/storage/category.metrics.storage";
import { CountryReducer } from "@/entities/Metrics/storage/country.metrics.storage";
import { CurrencyReducer } from "@/entities/Metrics/storage/currency.metrics.storage";
import { MetricsReducer } from "@/entities/Metrics/storage/metrics.metrics.storage";
import { ProductAPI } from "@/entities/Product/api/product.api";
import { ReviewAPI } from "@/entities/Review/api/review.api";
import { SupplierAPI } from "@/entities/Supplier/api/supplier.api";
import { SupportAPI } from "@/entities/Support";
import { TenderAPI } from "@/entities/Tender/api/tender.api";
import { SignalrReducer } from "@/features/Signalr/signalrSlice";
import { PTCReducer } from "@/features/storage/PTC/ptc.storage";
import {Action, combineReducers, configureStore, ThunkAction} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    categoryList: CategoryReducer,
    metrics: MetricsReducer,
    currencyList: CurrencyReducer,
    countryList: CountryReducer,
    ptc: PTCReducer,
    user: UserReducer,
    signalr: SignalrReducer,

    [UserAPI.reducerPath]: UserAPI.reducer,
    [TinAPI.reducerPath]: TinAPI.reducer,
    [FileAPI.reducerPath]: FileAPI.reducer,
    [ProductAPI.reducerPath]: ProductAPI.reducer,
    [SupplierAPI.reducerPath]: SupplierAPI.reducer,
    [ReviewAPI.reducerPath]: ReviewAPI.reducer,
    [TenderAPI.reducerPath]: TenderAPI.reducer,

    [CategoryAPI.reducerPath]: CategoryAPI.reducer,
    [MetricsAPI.reducerPath]: MetricsAPI.reducer,
    [CurrencyAPI.reducerPath]: CurrencyAPI.reducer,
    [CountryAPI.reducerPath]: CountryAPI.reducer,

    [FavouriteAPI.reducerPath]: FavouriteAPI.reducer,

    [SupportAPI.reducerPath]: SupportAPI.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false
            }).concat(
                UserAPI.middleware,
                TinAPI.middleware,
                FileAPI.middleware,
                ProductAPI.middleware,
                SupplierAPI.middleware,
                ReviewAPI.middleware,
                TenderAPI.middleware,

                CategoryAPI.middleware,
                MetricsAPI.middleware,
                CurrencyAPI.middleware,
                CountryAPI.middleware,
                
                FavouriteAPI.middleware,

                SupportAPI.middleware
            ),
    })
}


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;