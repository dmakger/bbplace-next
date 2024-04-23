import { IOption } from "../model/option.model";

export const getValueOption = (option: IOption) => {
    if (option.value !== undefined)
        return `${option.value}`
    return option.name
}


export const getOptionByKeyAndValue = (key: string, value: string | number, options: IOption[]) => {
    for (let option of options) {
        if (option.name === key) {
            if (option.options === undefined)
                return option
            return option.options.find(it => it.value == value || it.name == value || it.id == value)
        }
    }
}