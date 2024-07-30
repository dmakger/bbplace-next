import { IOption } from "@/shared/model/option.model";

/**
 * ##### ФОРМА ТОВАРА  
 * Данные из группы `Основная информация`
 */
export interface IPropsAdditionalInfoProductForm {
    packageType: string
    delivery: string[]
    paymentConditions: string
    deliveryTime: string

    packagingLength: number
    packagingWidth: number
    packagingHeight: number

    vat: boolean
    isHasTestProbe: boolean
    warehouses: string[]
    brand: string
    gender: IOption

    expirationDate: string
    expirationDateMetric: IOption
    weight: number
    weightMetric: IOption
    features: string[]
    composition: string
    equipment: string[]
}
