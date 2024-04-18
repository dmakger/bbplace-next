import {isEqual} from "lodash";
import { DEFAULT_SORT_FILTER__DATA } from "../data/sortFilter.data";
import { ISortFilter } from "../model/sortFilterSidebar.model";
import { getValueOption } from "@/shared/lib/option.lib";
import { IOption } from "@/shared/model/option.model";
import { CORE_PARAMS } from "@/config/params/core.params.config";
import { ReadonlyURLSearchParams } from "next/navigation";

export const getUpdatedDataSortFilter = (data: ISortFilter) => {
    const updatedData: Record<string, string[]> = {}
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            // console.log('nigger 123', data[key], DEFAULT_SORT_FILTER__DATA[key]);
            if (!isEqual(data[key], DEFAULT_SORT_FILTER__DATA[key])){
                const value = typeof data[key] === 'string' ? `${data[key]}` : getValueOption(data[key] as IOption)
                const newKey = key.startsWith('sort') ? CORE_PARAMS.SORT : key
                if (!updatedData.hasOwnProperty(newKey))
                    updatedData[newKey] = []
                updatedData[newKey].push(value)
            }
        }
    }
    return updatedData
}


export const toSortFilter = (searchParams: ReadonlyURLSearchParams) => {
    // const params = new URLSearchParams(searchParams.toString())
    const searchParamsDict = Object.fromEntries(searchParams.entries());
    console.log('nigger oleg', searchParamsDict);
    
}