import { IOption } from "@/shared/model/option.model";

export interface ICatalogSort{
    title: string,
    options: IOption[],
    defaultOption: IOption,
    classNameTitle?: string,
    onClickOption: Function
}