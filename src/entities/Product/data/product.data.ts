import { IArgsRequest } from "@/api/model/request.model.api"
import { IOption } from "@/shared/model/option.model"
import { SWITCH_SELECTOR_CHARACTERISTIC_OPTION, SWITCH_SELECTOR_DESCRIPTION_OPTION, SWITCH_SELECTOR_REVIEWS_OPTION, SWITCH_SELECTOR_SUPPLIER_OPTION } from "@/shared/ui/SwitchSelector"

export const PRODUCT_START_PAGE: IArgsRequest['page'] = 0
export const PRODUCT_LIMIT: IArgsRequest['limit'] = 24
export const PRODUCT_BY_USER_LIMIT : IArgsRequest['limit'] = 3
// export const PRODUCT_LIMIT: IArgsRequest['limit'] = 3

export const PRODUCT_ARGS_REQUEST: IArgsRequest = {
    page: PRODUCT_START_PAGE,
    limit: PRODUCT_LIMIT
}


//SEX
export const MAN_SEX_CHARACTERISTIC: IOption = {id: 0, name: 'Мужской'}
export const WOMAN_SEX_CHARACTERISTIC: IOption = {id: 1, name: 'Женский'}
export const CHILD_SEX_CHARACTERISTIC: IOption = {id: 2, name: 'Детский'}
export const ALL_SEX_CHARACTERISTIC: IOption = {id: 3, name: 'Унисекс'}

export const SEX_OPTIONS = [
    MAN_SEX_CHARACTERISTIC,
    WOMAN_SEX_CHARACTERISTIC,
    CHILD_SEX_CHARACTERISTIC,
    ALL_SEX_CHARACTERISTIC
]

export const SWITCH_SELECTOR_PRODUCT_OPTIONS:IOption[] = [
    SWITCH_SELECTOR_DESCRIPTION_OPTION,
    SWITCH_SELECTOR_CHARACTERISTIC_OPTION,
    SWITCH_SELECTOR_REVIEWS_OPTION,
    SWITCH_SELECTOR_SUPPLIER_OPTION
]