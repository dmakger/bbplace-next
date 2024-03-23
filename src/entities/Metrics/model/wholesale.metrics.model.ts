import { ICurrency } from "./currency.metrics.model"
import { IMetrics } from "./metric.metrics.model"

export interface IWholesale {
    price: number
    quantity: number,
    metrics?: IMetrics
    currency?: ICurrency
}