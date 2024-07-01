import { IOption } from "@/shared/model/option.model";

export interface IResursiveSelectInputsArray{
    currentOptions: IOption[],
    defaultOption: IOption | undefined,
    placeholder: string,
    className?: string,
}