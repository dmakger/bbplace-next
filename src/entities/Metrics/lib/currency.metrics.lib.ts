import { IMediaProduct } from "@/entities/Product/model/media.product.model";
import { CURRENCY, NAME_CURRENCY } from "../data/currency.metrics.data";
import { ICurrency } from "../model/currency.metrics.model";

export const getCurrency = (x: string | undefined): string | undefined => {
    if (!x)
        return x
    if (CURRENCY.hasOwnProperty(x))
        return CURRENCY[x];
    if (NAME_CURRENCY.hasOwnProperty(x))
        return NAME_CURRENCY[x]
    return x
}


// ИЗ {ICurrency | string | number | undefined} ==> {ICurrency | undefined}
export const currencyToObject = (currency: IMediaProduct["currency"], currencyList: ICurrency[] | undefined) => {    
    if (!currencyList || typeof currency !== "string" && typeof currency !== "number") return currency;

    return currencyList.find(it => 
        [it.name, it.code, it.country, it.id].includes(currency)
    );
}