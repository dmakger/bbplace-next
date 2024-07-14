import { IOption } from "../model/option.model";

export const SUPPLIER_ROLE_ITEM_DATA: IOption = {id: 1, name: 'Покупатель'}
export const SELLER_ROLE_ITEM_DATA: IOption = {id: 2, name: 'Продавец'}
export const SELLER_N_SUPPLIER_ROLE_ITEM_DATA: IOption = {id: 3, name: 'Обе'}

export const ROLES_LIST_DATA: IOption[] = [
    SUPPLIER_ROLE_ITEM_DATA,
    SELLER_ROLE_ITEM_DATA,
    SELLER_N_SUPPLIER_ROLE_ITEM_DATA
]