import { IOption } from "@/shared/model/option.model";

export interface IFilterValues {
    country?: IOption,
    status?: IOption,
    minOrder?: string
}