"use client"

import { useMetricsAll } from "@/entities/Metrics/hooks/useMetrics.hooks";
import { useActionCreators, useAppSelector } from "./hooks";

export const Setters = () => {
    
    // RTK
    const actionCreators = useActionCreators()

    // API
    const {data: metricsList} = useMetricsAll()            
    if (metricsList)
        actionCreators.saveMetrics(metricsList)

	// SETTERS
	// useEffect(() => {
    //     console.log('metrics !!!', metricsList);
	// 	if (metricsList)
	// 		actionCreators.saveMetrics(metricsList)

	// }, [metricsList])
    
    return null;
}
