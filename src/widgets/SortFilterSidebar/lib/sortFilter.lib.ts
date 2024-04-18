import {isEqual} from "lodash";
import { DEFAULT_SORT_FILTER__DATA } from "../data/sortFilter.data";
import { ISortFilter } from "../model/sortFilterSidebar.model";
import { getOptionByValue, getValueOption } from "@/shared/lib/option.lib";
import { IOption } from "@/shared/model/option.model";
import { CORE_PARAMS } from "@/config/params/core.params.config";
import { ReadonlyURLSearchParams } from "next/navigation";

export const getUpdatedDataSortFilter = (data: ISortFilter) => {
    const updatedData: Record<string, string> = {}
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            // console.log('nigger 123', data[key], DEFAULT_SORT_FILTER__DATA[key]);
            if (!isEqual(data[key], DEFAULT_SORT_FILTER__DATA[key])){
                updatedData[key] = typeof data[key] === 'string' ? `${data[key]}` : getValueOption(data[key] as IOption)
            }
        }
    }
    return updatedData
}


export const toSortFilter = (searchParams: ReadonlyURLSearchParams) => {
    const searchParamsDict = Object.fromEntries(searchParams.entries());
    console.log('nigger oleg', searchParamsDict);
    const allOptions = getOptionsOfDataSortFilter(DEFAULT_SORT_FILTER__DATA)
    const data: ISortFilter = {}
    Object.keys(DEFAULT_SORT_FILTER__DATA).map(key => {
        const defaultValue = DEFAULT_SORT_FILTER__DATA[key];
        if (!searchParamsDict.hasOwnProperty(key))
            data[key] = defaultValue
        else {
            const newValue = searchParamsDict[key];
            if (typeof defaultValue === "string")
                data[key] = newValue
            else {
                
                const _result = getOptionByValue(newValue, allOptions)
                console.log('nigger else', _result, newValue, allOptions);
                if (_result !== undefined)
                    data[key] = _result
            }
        }
    })
    return data
}


export const getOptionsOfDataSortFilter = (data: ISortFilter) => {
    const result: IOption[] = []
    for (let key of Object.keys(data))
        if (typeof data[key] === "object")
            result.push(data[key] as IOption)
    return result
}