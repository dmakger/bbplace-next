import { IOption } from "@/shared/model/option.model";
import { IMetrics } from "../model/metric.metrics.model";
import { ICurrency } from "../model/currency.metrics.model";


/**
 * Перевод списка валют в список option
 * @param currencies - Список валют
 */
export const currencyListToOptionList = (currencies: ICurrency[]) => {
    return currencies.map(currency => currencyToOption(currency))
}


/**
 * Перевод валюты в option
 * @param currency - Передоваемая валюта
 */
export const currencyToOption = (currency: ICurrency) => {
    const {id, name, ...params} = currency
    return {id, name, params} as IOption
}