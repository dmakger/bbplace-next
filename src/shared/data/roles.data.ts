import { IOption } from "../model/option.model";

export const SUPPLIER_ROLE_ITEM_DATA: IOption = {id: 1, name: 'Покупатель', value: 'buyer'}
export const SELLER_ROLE_ITEM_DATA: IOption = {id: 2, name: 'Продавец', value: 'seller'}
export const SELLER_N_SUPPLIER_ROLE_ITEM_DATA: IOption = {id: 3, name: 'Обе', value: 'both'}

export const ROLES_LIST_DATA: IOption[] = [
    SUPPLIER_ROLE_ITEM_DATA,
    SELLER_ROLE_ITEM_DATA,
    SELLER_N_SUPPLIER_ROLE_ITEM_DATA
]