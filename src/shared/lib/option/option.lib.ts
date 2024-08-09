import { ICategoriesWithSubcategories, ICategory } from "@/entities/Metrics/model/category.metrics.model";
import { IOption } from "../../model/option.model";

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


export const categoryWithSubcategoriesListToOptionList = (categories: ICategoriesWithSubcategories[]) => {
    return categories.map(it => categoryToOption(it))
}


export const categoryWithSubcategoriesToOption = (category: ICategoriesWithSubcategories): IOption => {
    const {id, name, subcategories} = category
    return {id, name, options: categoryWithSubcategoriesListToOptionList(subcategories)} as IOption
}

export const categoryToOption = (category: ICategory): IOption => {
    const {id, name, ...params} = category
    return {id, name, params} as IOption
}

