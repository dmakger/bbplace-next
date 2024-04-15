import useAPI from "@/api/useApi";
import { countryAPI } from "../api/country.metrics.api";
import { ICountry } from "../model/country.metrics.model";

export function useCountryAll() {
    return useAPI<ICountry[]>(['countryList'], () => countryAPI.all())
}