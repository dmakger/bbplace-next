import { IMediaProduct } from "@/entities/Product/model/media.product.model";
import { CURRENCY } from "../../data/currency.metrics.data";
import { ICurrency } from "../../model/currency.metrics.model";

/**
 * Возвращает символ валюты по его коду. Если указан не существующий код вернёт `defaultValue` или `undefined`  
 * 1. `RUB` => `₽`
 * 2. `RUB1` => `undefined` или `defaultValue`
 */
export const getSymbolByCodeCurrency = (code: ICurrency['code'], defaultValue?: any) => {
    if (CURRENCY.hasOwnProperty(code))
        return CURRENCY[code];
    return defaultValue
}


// ИЗ {ICurrency | string | number | undefined} ==> {ICurrency | undefined}
export const currencyToObject = (currency: IMediaProduct["currency"], currencyList: ICurrency[] | undefined) => {    
    if (!currencyList || typeof currency !== "string" && typeof currency !== "number") return currency;

    return currencyList.find(it => 
        [it.name, it.code, it.country, it.id].includes(currency)
    );
}

export const currencyTenderToObject = (currency: string, currencyList: ICurrency[] | undefined) => {    
    if (!currencyList) return currency;

    return currencyList.find(it => 
        [it.name, it.code, it.country, it.id].includes(currency)
    );
}