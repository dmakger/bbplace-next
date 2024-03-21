import { ICountry } from "@/entities/Metrics/model/country.metrics.model";
import { DEFAULT_CATEGORY_OPTION, DEFAULT_COUNTRY_OPTION } from "../data/filter.data";
import { IOption } from "@/shared/model/option.model";
import { ICategory } from "@/entities/Metrics/model/category.metrics.model";

export const getCountriesAsSelected = (countries: ICountry[] | undefined) => {
    const result = [DEFAULT_COUNTRY_OPTION];
    if (countries === undefined) return result;

    let filteredCountries: IOption[] = countries
        .map((it) => ({
            id: it.id,
            name: it.name,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
    return result.concat(filteredCountries);
}

const unsuitableCategories = [0]


export const getCategories = (categories: ICategory[]) => {
    if (categories === undefined)
        return []

    return categories
        .filter((category) => !unsuitableCategories.includes(category.id))
        .sort((a, b) => a.name.localeCompare(b.name))
}

export const getCategoriesAsSelected = (categories: ICategory[]) => {
    if (categories === undefined) return [];

    let filteredCategories: IOption[] = categories
        .filter((category) => !unsuitableCategories.includes(category.id))
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((category) => ({
            id: category.id,
            name: category.name,
        }));

    filteredCategories = [{ id: -1, name: 'Любая' }, ...filteredCategories];

    return filteredCategories;
}