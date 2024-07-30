import { IOption } from "@/shared/model/option.model";

/**
 * #### ФОРМА ТОВАРА  
 * Группа: `Статус товара`  
 * Вариант: `Готово к отправке`  
 */
export const READY_STATUS__PRODUCT_FORM__DATA: IOption = {
    id: 1,
    name: "Готово к отправке"
}


/**
 * #### ФОРМА ТОВАРА  
 * Группа: `Статус товара`  
 * Вариант: `В наличии`  
 */
export const AVAILABLE_STATUS__PRODUCT_FORM__DATA: IOption = {
    id: 2,
    name: "В наличии"
}


/**
 * #### ФОРМА ТОВАРА  
 * Группа: `Статус товара`  
 * Вариант: `Под заказ`  
 */
export const REQUEST_STATUS__PRODUCT_FORM__DATA: IOption = {
    id: 3,
    name: "Под заказ"
}


/**
 * #### ФОРМА ТОВАРА  
 * Группа: `Статус товара`  
 */
export const STATUS__PRODUCT_FORM__DATA: IOption[] = [
    READY_STATUS__PRODUCT_FORM__DATA,
    AVAILABLE_STATUS__PRODUCT_FORM__DATA,
    REQUEST_STATUS__PRODUCT_FORM__DATA,
]
