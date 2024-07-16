import { IOption } from "@/shared/model/option.model";
import { ICategory } from "../model/category.metrics.model";


/**
 * Перевод списка категорий в список option
 * @param categories - Список категорий
 */
export const categoryListToOptionList = (categories: ICategory[]) => {
    return categories.map(category => categoryToOption(category))
}


/**
 * Перевод категории в option
 * @param category - Передоваемая категория
 */
export const categoryToOption = (category: ICategory) => {
    const {id, name, ...params} = category
    return {id, name, params} as IOption
}