import { axiosClassic } from "@/api/interceptors"
import { ICurrency } from "../model/currency.metrics.model"

class CurrencyAPI {
    private BASE_URL = '/metrics/api/Metrics'

    async all() {      
      const response = await axiosClassic.get<ICurrency[]>(
        `${this.BASE_URL}/GetCurrencies/`
      )
      return response.data
    }
}

export const currencyAPI = new CurrencyAPI()
