"use client"

import { useMetricsAll } from "@/entities/Metrics/hooks/useMetrics.hooks";
import { useActionCreators, useAppSelector } from "./hooks";
import { useCurrencyAll } from "@/entities/Metrics/hooks/useCurrency.hooks";

export const Setters = () => {
    
    // RTK
    const actionCreators = useActionCreators()

    // ===={ API }====
    // metrics
    const {data: metricsList} = useMetricsAll()            
    if (metricsList)
        actionCreators.saveMetrics(metricsList)

    // currency
    const {data: currencyList} = useCurrencyAll()            
    if (currencyList)
        actionCreators.saveCurrencyList(currencyList)
    

    return null;
}
