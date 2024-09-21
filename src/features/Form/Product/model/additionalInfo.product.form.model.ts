import { IOption } from "@/shared/model/option.model";

/**
 * ##### ФОРМА ТОВАРА  
 * Данные из группы `Дополнительная информация`
 */
export interface IPropsAdditionalInfoProductForm {
    packageType?: string
    delivery: IOption[]
    paymentConditions?: string
    deliveryTime?: string

    packagingLength: number
    packagingWidth: number
    packagingHeight: number

    vat: boolean
    isHasTestProbe: boolean
    warehouses: IOption[]
    brand: string
    gender: IOption

    expirationDate: string
    expirationDateMetric?: IOption
    weight?: number
    weightMetric?: IOption
    features: IOption[]
    composition: string
    equipment: IOption[]
}
