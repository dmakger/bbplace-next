import { ICategoriesWithSubcategories } from "@/entities/Metrics/model/category.metrics.model";
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

export const getOptionsFromCategoriesWithSubcategories = (categories: ICategoriesWithSubcategories[]) => {
    if (!categories) return;

    let optionsArray: IOption[] = [];

    optionsArray = categories.map(it => {
        return {
            id: it.id,
            name: it.name,
            options: getOptionsFromCategoriesWithSubcategories(it.subcategories)
        }
    })

    return optionsArray;
}

/**
 * @param options - массив Options, по элементам которого будем искать совпадение с id
 * @param id - id, по которому будет искаться Option 
 * @returns `foundOption` в случае нахождения option с такимм id, и `undefined`, если option с таким id не существует
 */
export const findOptionById = (options: IOption[], id: number): IOption | undefined => {
    for (const option of options) {
        if (option.id === id) return option;
        if (option.options?.length) {
            const foundOption: IOption | undefined = findOptionById(option.options, id)
            if (foundOption) return foundOption;
        }
    }
    return undefined
}