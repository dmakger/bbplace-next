import { ICountry } from "@/entities/Metrics/model/country.metrics.model";
import { DEFAULT_COUNTRY_OPTION } from "../data/filter.data";
import { IOption } from "@/shared/model/option.model";

export const getSelected = (countries: ICountry[] | undefined) => {
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