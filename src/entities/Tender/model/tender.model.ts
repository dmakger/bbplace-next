export interface IBaseTender {
    id: number
    name: string
    ownerId: string
    categoryId: number
    currency: string
    description: string
    shareContacts: boolean
    attachments: string
    createdAt: string
}

export interface ISaleTender extends IBaseTender {
    price: number
    minOrder: number
    minOrderUnits: string
    bulkDiscounts: boolean
}

export interface IPurchaseTender extends IBaseTender {
    quantity: number
    quantityUnits: string
    maximumBudget: number
}

export enum ETenderType {
    PURCHASE = 'Покупка',
    SALE = 'Продажа'
}

export interface ICommonTender extends IBaseTender {
    quantity?: number
    quantityUnits?: string
    maximumBudget?: number
    price?: number
    minOrder?: number
    minOrderUnits?: string
}

export interface ITenderCard{
    tender: ISaleTender | IPurchaseTender
    className?: string
}