import { IOption } from "@/shared/model/option.model";

export const DEFAULT_SORT: IOption = {
    id: -1,
    name: 'По умолчанию',
    value: 'DESC'
}

export const DESC_SORT: IOption = {
    id: 0,
    name: 'По убыванию',
    value: 'DESC'
}

export const ASC_SORT: IOption = {
    id: 1,
    name: 'По возрастанию',
    value: 'ASC'
}

export const sortOptions:IOption[] = [
    DEFAULT_SORT,
    DESC_SORT,
    ASC_SORT
]