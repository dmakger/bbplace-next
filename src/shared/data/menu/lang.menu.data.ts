import { IOption } from "@/shared/model/option.model"

export const RUS_LANG_ITEM_DATA: IOption = {id: 1, name: "RUS", value: 'ru'}
export const EN_LANG_ITEM_DATA: IOption = {id: 2, name: "EN", value: 'en'}
export const ZH_LANG_ITEM_DATA: IOption = {id: 3, name: "CHI", value: 'zh'}
export const AZ_LANG_ITEM_DATA: IOption = {id: 4, name: "AZ", value: 'az'}
export const UZB_LANG_ITEM_DATA: IOption = {id: 5, name: "UZB", value: 'uz'}
export const KAZ_LANG_ITEM_DATA: IOption = {id: 6, name: "KAZ", value: 'kk'}
export const KIR_LANG_ITEM_DATA: IOption = {id: 7, name: "KIR", value: 'ky'}
export const TGK_LANG_ITEM_DATA: IOption = {id: 8, name: "TGK", value: 'tg'}


export const LANG_LIST_DATA: IOption[] = [
    RUS_LANG_ITEM_DATA,
    EN_LANG_ITEM_DATA,
    ZH_LANG_ITEM_DATA,
    AZ_LANG_ITEM_DATA,
    UZB_LANG_ITEM_DATA,
    KAZ_LANG_ITEM_DATA,
    KIR_LANG_ITEM_DATA,
    TGK_LANG_ITEM_DATA
]

export const DEFAULT_LANGUAGE = RUS_LANG_ITEM_DATA;

export const IS_DEFAULT_LANG_STRING = typeof(DEFAULT_LANGUAGE.value) === 'string' ? DEFAULT_LANGUAGE.value : 'ru'
