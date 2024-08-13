import { IOption } from "@/shared/model/option.model";

/**
 * ##### ФОРМА ТОВАРА  
 * Данные из группы `Основная информация`
 */
export interface IPropsMainInfoProductForm {
    name: string
    categoryId: number
    status: IOption
    hasCertificate: boolean
    country?: IOption
    description: string
}
