import { IOption } from "../model/option.model";

export const BUYER_ROLE_ITEM_DATA: IOption = {id: 1, name: 'Покупатель', value: 'buyer'}
export const SUPPLIER_ROLE_ITEM_DATA: IOption = {id: 2, name: 'Поставщик', value: 'supplier'}
export const BUYER_N_SUPPLIER_ROLE_ITEM_DATA: IOption = {id: 3, name: 'Обе', value: 'both'}

export const ROLES_LIST_DATA: IOption[] = [
    BUYER_ROLE_ITEM_DATA,
    SUPPLIER_ROLE_ITEM_DATA,
    BUYER_N_SUPPLIER_ROLE_ITEM_DATA
]