import { IOption } from "@/shared/model/option.model";

export enum ECatalogVariants{
    NONE,
    PRODUCTS,
    TENDERS,
    COMPANIES,
}

export interface ISortFilter {
    [key: string]: (string | IOption),
    // country: IOption,
    // minOrder: string,
    // status: IOption,
    // category: IOption,
    // application: IOption,
    // sortByDate: IOption,
    // [CORE_PARAMS.SORT_KEYS.DATE_START]: IOption,
    // sortByAlphabetical: IOption,
}