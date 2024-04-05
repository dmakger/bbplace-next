"use client"

import { useMetricsAll } from "@/entities/Metrics/hooks/useMetrics.hooks";
import { useActionCreators, useAppSelector } from "./hooks";
import { useCurrencyAll } from "@/entities/Metrics/hooks/useCurrency.hooks";
import { CategoryAPI } from "@/entities/Metrics/api/category.metrics.api";
import { MetricsAPI } from "@/entities/Metrics/api/metrics.metrics.api";
import { CurrencyAPI } from "@/entities/Metrics/api/currency.metrics.api";

export const Setters = () => {
    
    // RTK
    const actionCreators = useActionCreators()

    // ===={ API }====
    // category
    const {data: categoryList} = CategoryAPI.useGetCategoriesQuery()            
    if (categoryList)
        actionCreators.saveCategoryList(categoryList)

    // metrics
    const {data: metricsList} = MetricsAPI.useGetMetricsQuery()            
    if (metricsList)
        actionCreators.saveMetrics(metricsList)

    // currency
    const {data: currencyList} = CurrencyAPI.useGetCurrenciesQuery()          
    if (currencyList)
        actionCreators.saveCurrencyList(currencyList)
    

    return null;
}
