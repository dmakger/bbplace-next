import { IOption } from "@/shared/model/option.model";
import { ICategory } from "../model/category.metrics.model";
import { ICountry } from "../model/country.metrics.model";


/**
 * Перевод списка стран в список option
 * @param countries - Список стран
 */
export const countryListToOptionList = (countries: ICountry[]) => {
    return countries.map(country => countryToOption(country))
}


/**
 * Перевод страны в option
 * @param country - Передоваемая страна
 */
export const countryToOption = (country: ICountry) => {
    const {id, name, ...params} = country
    return {id, name, params} as IOption
}


// ==========={ OPTION TO COUNTRY }===========
/**
 * Перевод списка `option` в список `стран`
 */
export const optionListToCountryList = (options: IOption[]) => {
    return options.map(opt => optionToCountry(opt))
}


/**
 * Перевод `option` в `страну`
 */
export const optionToCountry = (option: IOption) => {
    const {id, name, params} = option
    return {id, name, ...params} as ICountry
}