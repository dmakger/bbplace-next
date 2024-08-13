import { IOption } from "@/shared/model/option.model";

export interface IRecursiveSelectInputsArray {
    currentOptions: IOption[],
    defaultOption: IOption | undefined,
    placeholder: string,
    className?: string,
}

export enum ERecursiveSelectVariant {
    SINGLE = 'single',
    MULTIPLE = 'multiple'
}