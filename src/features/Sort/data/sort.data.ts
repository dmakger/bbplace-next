import { CORE_PARAMS } from "@/config/params/core.params.config";
import { IOption } from "@/shared/model/option.model";

// ==={ DATE_SORT }===

export const DEFAULT_DATE_SORT: IOption = {
    id: -1,
    name: 'По умолчанию',
    // value: 'DESC'
    value: CORE_PARAMS.SORT_VALUES.DATE_START.DOWN,
}

export const DESC_DATE_SORT: IOption = {
    id: 0,
    name: 'По убыванию',
    value: CORE_PARAMS.SORT_VALUES.DATE_START.DOWN,
}

export const ASC_DATE_SORT: IOption = {
    id: 1,
    name: 'По возрастанию',
    value: CORE_PARAMS.SORT_VALUES.DATE_START.UP,
}

export const SORT_BY_DATE_OPTIONS:IOption[] = [
    DEFAULT_DATE_SORT,
    DESC_DATE_SORT,
    ASC_DATE_SORT
]

// ==={ ALPHABETICAL_SORT }===

export const DEFAULT_ALPHABETICAL_SORT: IOption = {
    id: -1,
    name: 'По умолчанию',
    value: CORE_PARAMS.SORT_VALUES.ALPHABETICAL.DOWN,
}

export const DESC_ALPHABETICAL_SORT: IOption = {
    id: 0,
    name: 'От А до Я',
    value: CORE_PARAMS.SORT_VALUES.ALPHABETICAL.DOWN,
}

export const ASC_ALPHABETICAL_SORT: IOption = {
    id: 1,
    name: 'От Я до А',
    value: CORE_PARAMS.SORT_VALUES.ALPHABETICAL.UP,
}

export const SORT_BY_ALPHABETICAL_OPTIONS: IOption[] = [
    DEFAULT_ALPHABETICAL_SORT,
    DESC_ALPHABETICAL_SORT,
    ASC_ALPHABETICAL_SORT
]



