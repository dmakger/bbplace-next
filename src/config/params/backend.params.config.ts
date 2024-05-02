import { ASC_ALPHABETICAL_SORT } from "@/features/Sort"
import { ReadonlyURLSearchParams } from "next/navigation"
import { CORE_PARAMS } from "./core.params.config"

// ====={ ОБЩИЕ ПАРАМЕТРЫ }=====
class BackendParams {
    SORT_VALUES_END = {
        DEFAULT: "DESC",
        UP: "ASC",
        DOWN: "DESC",
    }
    SORT_KEYS = { 
        DATE_START: "SortBy",
        ALPHABETICAL: "SortBy",
    }

    SORT_VALUES = {
        DATE_START: {...this.SORT_VALUES_END},
        ALPHABETICAL: {...this.SORT_VALUES_END},
    }

    // FILTER
    SEARCH = "SearchQuery" 
    CATEGORY = "CategoryId" 
    COUNTRY = "Country" 
    STATUS = "Status" 
    APPLICATION = "application" 

    FILTER_VALUES = {
        COUNTRY: {
            DEFAULT: 'Все страны',
        },
        CATEGORY: {
            DEFAULT: 'Любая',
        },
        STATUS: {
            DEFAULT: 'Любой',
            IN_STOCK: 'В наличие',
            READY_TO_SEND: 'Готово к отправке',
            BY_ORDER: 'Под заказ',
        },
        APPLICATION: {
            DEFAULT: 'Продажа и покупка',
            SELL: 'Продажа',
            PURCHASE: 'Покупка',
        }
    }


    MIN_ORDER_QUANTITY = "MinOrderQuantity" 

}
export const BACKEND_PARAMS = new BackendParams()


export const SORT_FRONT_TO_BACK = {
    [CORE_PARAMS.SEARCH]: BACKEND_PARAMS.SEARCH, 
    [CORE_PARAMS.SORT_KEYS.DATE_START]: BACKEND_PARAMS.SORT_KEYS.DATE_START, 
    [CORE_PARAMS.CATEGORY]: BACKEND_PARAMS.CATEGORY, 
    [CORE_PARAMS.COUNTRY]: BACKEND_PARAMS.COUNTRY, 
    // [CORE_PARAMS.APPLICATION]: BACKEND_PARAMS.APPLICATION, 
    [CORE_PARAMS.MIN_ORDER_QUANTITY]: BACKEND_PARAMS.MIN_ORDER_QUANTITY, 
}


export const paramsToBack = (searchParams: ReadonlyURLSearchParams) => {
    const searchParamsDict = Object.fromEntries(searchParams.entries());
    // const newSearchParams = new URLSearchParams();
    const newSearchParams: Record<string, string> = {};

    for (const key in SORT_FRONT_TO_BACK) {
        if (key in searchParamsDict) {
            const backendKey = SORT_FRONT_TO_BACK[key];
            const value = searchParamsDict[key];
            newSearchParams[backendKey] = value
            // newSearchParams.set(backendKey, value);
        }
    }
    return newSearchParams
}