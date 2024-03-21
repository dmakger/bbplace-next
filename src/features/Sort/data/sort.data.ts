import { IOption } from "@/shared/model/option.model";

// ==={ DATE_SORT }===

export const DEFAULT_DATE_SORT: IOption = {
    id: -1,
    name: 'По умолчанию',
    value: 'DESC'
}

export const DESC_DATE_SORT: IOption = {
    id: 0,
    name: 'По убыванию',
    value: 'DESC'
}

export const ASC_DATE_SORT: IOption = {
    id: 1,
    name: 'По возрастанию',
    value: 'ASC'
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
    value: 'DESC'
}

export const DESC_ALPHABETICAL_SORT: IOption = {
    id: 0,
    name: 'От А до Я',
    value: 'DESC'
}

export const ASC_ALPHABETICAL_SORT: IOption = {
    id: 1,
    name: 'От Я до А',
    value: 'ASC'
}

export const SORT_BY_ALPHABETICAL_OPTIONS: IOption[] = [
    DEFAULT_ALPHABETICAL_SORT,
    DESC_ALPHABETICAL_SORT,
    ASC_ALPHABETICAL_SORT
]



