import { EParameters } from "../data/metrics.metrics.data"

export interface IMetrics {
    id: number
    name: string
    shortName: string
}


export interface IPriceToMin {
    price: number
    priceInMin: number
    metrics?: IMetrics
    parameter?: EParameters
}