import { ICategoriesWithSubcategories } from "@/entities/Metrics/model/category.metrics.model";
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

export const getOptionsFromCategoriesWithSubcategories = (categories:ICategoriesWithSubcategories[]) => {
    if(!categories) return;

    let optionsArray:IOption[] = [];

    optionsArray = categories.map(it => {
        return {
            id: it.id,
            name: it.name,
            options: getOptionsFromCategoriesWithSubcategories(it.subcategories)
        }
    })

    return optionsArray;
}


export const createOption = () => {
    
}