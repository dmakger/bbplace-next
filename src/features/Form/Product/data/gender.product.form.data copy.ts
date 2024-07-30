import { IOption } from "@/shared/model/option.model";

/**
 * #### ФОРМА ТОВАРА  
 * Группа: `Пол / Гендер`  
 * Вариант: `Мужской`  
 */
export const MAN_GENDER__PRODUCT_FORM__DATA: IOption = {
    id: 1,
    name: "Мужской"
}


/**
 * #### ФОРМА ТОВАРА  
 * Группа: `Пол / Гендер`  
 * Вариант: `Женский`  
 */
export const WOMAN_GENDER__PRODUCT_FORM__DATA: IOption = {
    id: 2,
    name: "Женский"
}


/**
 * #### ФОРМА ТОВАРА  
 * Группа: `Пол / Гендер`  
 * Вариант: `Детский`  
 */
export const CHILD_GENDER__PRODUCT_FORM__DATA: IOption = {
    id: 3,
    name: "Детский"
}


/**
 * #### ФОРМА ТОВАРА  
 * Группа: `Пол / Гендер`  
 * Вариант: `Унисекс`  
 */
export const UNISEX_GENDER__PRODUCT_FORM__DATA: IOption = {
    id: 4,
    name: "Унисекс"
}



/**
 * #### ФОРМА ТОВАРА  
 * Группа: `Статус товара`  
 */
export const GENDER__PRODUCT_FORM__DATA: IOption[] = [
    MAN_GENDER__PRODUCT_FORM__DATA,
    WOMAN_GENDER__PRODUCT_FORM__DATA,
    CHILD_GENDER__PRODUCT_FORM__DATA,
    UNISEX_GENDER__PRODUCT_FORM__DATA,
]
