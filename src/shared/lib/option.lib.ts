import { IOption } from "../model/option.model";

export const getValueOption = (option: IOption) => {
    if (option.value !== undefined)
        return `${option.value}`
    return option.name
}