import { axiosClassic } from "@/api/interceptors"
import { ICountry } from "../model/country.metrics.model"

class CountryAPI {
    private BASE_URL = 'metrics/api/Metrics'

    async all() {
        const response = await axiosClassic.get<ICountry[]>(
            `${this.BASE_URL}/GetCountries/`
        )
        return response.data
    }
}

export const countryAPI = new CountryAPI();