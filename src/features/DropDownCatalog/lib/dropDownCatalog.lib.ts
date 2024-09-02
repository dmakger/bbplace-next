import { MAIN_PAGES } from "@/config/pages-url.config";
import { ICategory } from "@/entities/Metrics/model/category.metrics.model";
import { IMenuItem } from "@/shared/model/menu.model";

const unsuitableCategories = [0]

export const getCategoriesAsMenuItem = (categories: ICategory[]) => {
    if (categories === undefined) return [];

    let filteredCategories: IMenuItem[] = categories
        .filter(category => !unsuitableCategories.includes(category.id))
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(category => ({
            id: category.id,
            title: category.name,
            link: `${MAIN_PAGES.PRODUCTS_BY_CATEGORY(category.id).path}`,
        }));
    return filteredCategories;
}

export const updateCategoriesAsMenuItem = async (categories: ICategory[], setCategoriesAsOptions: Function) => {
    if (categories.length) {
        await setCategoriesAsOptions(getCategoriesAsMenuItem(categories));
    }
};