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
 * @param options - рекурсивный массив Options (имеющий свойство options), по элементам которого будем искать совпадение с id из массива ids
 * @param ids - массив id, по которому будет искаться Option 
 * @returns `foundOption` в случае нахождения option с таким id, и `undefined`, если option с таким id не существует
 */
export const findOptionsWSubcategoriesByIds = (options: IOption[], ids: number[]): IOption[] => {
    const foundOptions: IOption[] = [];

    const searchOptions = (options: IOption[], ids: number[]) => {
        for (const option of options) {
            if (ids.includes(option.id)) {
                foundOptions.push(option);
            }
            if (option.options?.length) {
                searchOptions(option.options, ids);
            }
        }
    };

    searchOptions(options, ids);
    return foundOptions;
};

/**
 * @param options - массив Options, по элементам которого будем искать совпадение с id из массива ids
 * @param ids - массив id, по которому будет искаться Option 
 * @returns `foundOption` в случае нахождения option с таким id, и `undefined`, если option с таким id не существует
 */
export const findOptionsByIds = (options: IOption[], ids: number[]): IOption[] | undefined => {
    return options.filter(option => ids.includes(option.id)) || undefined
};



export const categoryListToOptionList = (categories: ICategoriesWithSubcategories[]) => {
    return categories.map(it => categoryToOption(it))
}

export const categoryListToOptionWithSubcategoriesList = (categories: ICategoriesWithSubcategories[]) => {
    return categories.map(it => categoryWithSubcategoriesToOption(it))

}

export const categoryWithSubcategoriesToOption = (category: ICategoriesWithSubcategories): IOption => {
    const {id, name, subcategories} = category
    return {id, name, options: categoryListToOptionWithSubcategoriesList(subcategories)} as IOption
}



export const categoryToOption = (category: ICategory): IOption => {
    const {id, name, ...params} = category
    return {id, name, params} as IOption
}

