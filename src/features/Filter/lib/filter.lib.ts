import { ICountry } from "@/entities/Metrics/model/country.metrics.model";
import { DEFAULT_CATEGORY_OPTION, DEFAULT_COUNTRY_OPTION } from "../data/filter.data";
import { IOption } from "@/shared/model/option.model";
import { ICategory } from "@/entities/Metrics/model/category.metrics.model";

export const getCountriesAsOption = (countries: ICountry[] | undefined) => {
    const result = [DEFAULT_COUNTRY_OPTION];
    if (countries === undefined) return result;

    let filteredCountries: IOption[] = countries
        .map(it => ({
            id: it.id,
            name: it.name,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
    return result.concat(filteredCountries);
}

const unsuitableCategories = [0]


export const getCategoriesAsOption = (categories: ICategory[]) => {
    if (categories === undefined) return [];

    let filteredCategories: IOption[] = categories
        .filter(category => !unsuitableCategories.includes(category.id))
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(category => ({
            id: category.id,
            name: category.name,
        }));

    filteredCategories = [DEFAULT_CATEGORY_OPTION, ...filteredCategories];

    return filteredCategories;
}

export const updateCategoriesAsOptions = async (categories: ICategory[], setCategoriesAsOptions: Function) => {
    if (categories.length) {
        await setCategoriesAsOptions(getCategoriesAsOption(categories));
    }
};