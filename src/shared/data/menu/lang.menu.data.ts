import { IOption } from "@/shared/model/option.model"

export const RUS_LANG_ITEM_DATA: IOption = {id: 1, name: "RUS", value: 'ru'}
export const EN_LANG_ITEM_DATA: IOption = {id: 2, name: "EN", value: 'en'}


export const LANG_LIST_DATA: IOption[] = [
    RUS_LANG_ITEM_DATA,
    EN_LANG_ITEM_DATA,
]

export const DEFAULT_LANGUAGE = RUS_LANG_ITEM_DATA;

export const IS_DEFAULT_LANG_STRING = typeof(DEFAULT_LANGUAGE.value) === 'string' ? DEFAULT_LANGUAGE.value : 'ru'
