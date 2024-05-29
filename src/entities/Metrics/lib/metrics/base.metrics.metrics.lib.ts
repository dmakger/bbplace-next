import { IMediaProduct } from "@/entities/Product/model/media.product.model"
import { IMetrics } from "../../model/metric.metrics.model"

// ИЗ {IMetrics | number | undefined} ==> {IMetrics | undefined}
export const metricsToObject = (metrics: IMediaProduct["priceUnits"], allMetrics: IMetrics[]) => {    
    if (typeof metrics !== "number") return metrics
    return allMetrics.find(it => it.id === metrics)
}

export const metricsTenderToObject = (metrics: string, allMetrics: IMetrics[]) => {    
    return allMetrics.find(it => it.shortName === metrics)
}
