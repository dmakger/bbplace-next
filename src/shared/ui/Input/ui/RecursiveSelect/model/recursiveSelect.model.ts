import { IOption } from "@/shared/model/option.model";

export interface IResursiveSelectInputs{
    currentOptions: IOption[],
    defaultOption: IOption | undefined,
    placeholder: string,
    className?: string,
}