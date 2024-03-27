import { ICurrency } from "@/entities/Metrics/model/currency.metrics.model"
import { IMetrics } from "@/entities/Metrics/model/metric.metrics.model"
import { ISize } from "@/entities/Metrics/model/size.metrics.model"
import { IWholesale } from "@/entities/Metrics/model/wholesale.metrics.model"

export type IMediaProduct = {
    attachments: string[]
    color: string
    article: string
    // currency?: ICurrency | string | number
    currency?: ICurrency
    priceUnits?: IMetrics,
    wholesalePrices: IWholesale[]
    sizes: ISize[]
}
