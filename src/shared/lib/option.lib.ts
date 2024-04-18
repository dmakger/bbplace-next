import { IOption } from "../model/option.model";

export const getValueOption = (option: IOption) => {
    if (option.value !== undefined)
        return `${option.value}`
    return option.name
}


export const getOptionByValue = (value: string | number, options: IOption[]) => {
    for (let option of options)
        if (option.value === value || option.name === value)
            return option
}