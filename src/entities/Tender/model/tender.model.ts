import { ICategory } from "@/entities/Metrics/model/category.metrics.model"
import { ICurrency } from "@/entities/Metrics/model/currency.metrics.model"
import { IMetrics } from "@/entities/Metrics/model/metric.metrics.model"
import { IAttachment } from "@/shared/model/attachment.model"

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
    category?: ICategory
    description: string
    shareContacts: boolean
    createdAt: string
    type?: ETenderType
}

export interface ITenderAttachments extends IAttachment { }

export interface ITenderAPI extends IBaseTender{
    currency: string,
    attachments: string,
    minOrderUnits?: string,
    quantityUnits?: string
}


export interface ISaleTenderAPI extends IBaseTender, Omit<ITenderAPI, 'quantityUnits'>{}

export interface IPurchaseTenderAPI extends IBaseTender, Omit<ITenderAPI, 'minOrderUnits'>{}

export interface ITender extends IBaseTender{
    currency: ICurrency,
    attachments: ITenderAttachments[],
    minOrderUnits?: IMetrics,
    quantityUnits?: IMetrics
}

export interface ISaleTender extends Omit<ITender, 'quantityUnits'>{
    price: number
    minOrder: number
    bulkDiscounts: boolean
}

export interface IPurchaseTender extends Omit<ITender, 'minOrderUnits'> {
    quantity: number
    maximumBudget: number
}

export interface ICommonTender extends ITender {
    currency: ICurrency,
    quantity?: number
    maximumBudget?: number
    price?: number
    minOrder?: number
}

export interface IProcessTender{
    tenderAPI: ITenderAPI, 
    metrics?: IMetrics[], 
    currencyList?: ICurrency[]
    getCategory?: Function
}
