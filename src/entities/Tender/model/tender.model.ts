import { ICurrency } from "@/entities/Metrics/model/currency.metrics.model"
import { IMetrics } from "@/entities/Metrics/model/metric.metrics.model"

export enum ETenderType {
    PURCHASE = 'Покупка',
    SALE = 'Продажа'
}

export interface ITenderByTwoObjectsAPI{
    purchaseRequests: IPurchaseTender[],
    saleRequests: ISaleTender[]
}

export interface IBaseTender {
    id: number
    name: string
    ownerId: string
    categoryId: number
    description: string
    shareContacts: boolean
    createdAt: string
    type: string
}

export interface ITenderAttachments{
    key: string,
    name: string
}

export interface ITenderAPI extends IBaseTender{
    currency: string,
    attachments: string,
    minorderunits?: string,
    quantityunits?: string
}

export interface ITender extends IBaseTender{
    currency: ICurrency,
    attachments: ITenderAttachments,
    minorderunits?: IMetrics,
    quantityunits?: IMetrics
}

export interface ISaleTender extends ITender{
    price: number
    minOrder: ICurrency
    bulkDiscounts: boolean
}

export interface IPurchaseTender extends ITender {
    quantity: number
    maximumBudget: number
}

export interface ICommonTender extends IBaseTender, ITender {
    currency: ICurrency,
    quantity?: number
    maximumbudget?: number
    price?: number
    minorder?: number
}

export interface IProcessTender{
    tenderAPI: ITenderAPI, 
    metrics?: IMetrics[], 
    currencyList?: ICurrency[]
}
