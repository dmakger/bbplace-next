import {isEqual} from "lodash";
import { ALL_SORT_FILTER__DATA, DEFAULT_SORT_FILTER__DATA, KEYS_API_SORT_FILTER__DATA } from "../data/sortFilter.data";
import { ISortFilter } from "../model/sortFilterSidebar.model";
import { getOptionByKeyAndValue, getValueOption } from "@/shared/lib/option.lib";
import { IOption } from "@/shared/model/option.model";
import { CORE_PARAMS } from "@/config/params/core.params.config";
import { ReadonlyURLSearchParams } from "next/navigation";
import { ICategory } from "@/entities/Metrics/model/category.metrics.model";
import { ICountry } from "@/entities/Metrics/model/country.metrics.model";
import { getCategoriesAsOption, getCountriesAsOption } from "@/features/Filter/lib/filter.lib";

export const getUpdatedDataSortFilter = (data: ISortFilter) => {
    const updatedData: Record<string, string> = {}
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            if (!isEqual(data[key], DEFAULT_SORT_FILTER__DATA[key])){
                if (KEYS_API_SORT_FILTER__DATA.includes(key))
                    updatedData[key] = `${(data[key] as IOption).id}`
                else
                    updatedData[key] = typeof data[key] === 'string' ? `${data[key]}` : getValueOption(data[key] as IOption)
            }
        }
    }
    return updatedData
}


export const toSortFilter = (searchParams: ReadonlyURLSearchParams, categories: ICategory[], countries: ICountry[]) => {
    const searchParamsDict = Object.fromEntries(searchParams.entries());
    const allOptions = getOptionsOfDataSortFilter(ALL_SORT_FILTER__DATA, categories, countries)
    const data = Object.keys(DEFAULT_SORT_FILTER__DATA).map(key => {
        const defaultValue = DEFAULT_SORT_FILTER__DATA[key];
        if (!searchParamsDict.hasOwnProperty(key))
            return {[key]: defaultValue}
        const newValue = searchParamsDict[key];
        if (typeof defaultValue === "string")
            return {[key]: newValue}        
        return {[key]: getOptionByKeyAndValue(key, newValue, allOptions)}
    }).filter(obj => Object.values(obj)[0] !== undefined) as any[]
    return data.reduce((result, obj) => ({ ...result, ...obj }), {}) as unknown as ISortFilter
}


export const getOptionsOfDataSortFilter = (data: IOption[], categories?: ICategory[], countries?: ICountry[]) => {
    return data.map(it => {
        if (it.name === CORE_PARAMS.CATEGORY && categories)
            return {...it, options: getCategoriesAsOption(categories)}
        if (it.name === CORE_PARAMS.COUNTRY && countries)
            return {...it, options: getCountriesAsOption(countries)}
        return it
    })
}