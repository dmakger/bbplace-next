import { IMetric } from "./metric.metrics.model"

export interface IWholesale {
    price: number
    quantity: number,
    metric?: IMetric
    currency?: string
}