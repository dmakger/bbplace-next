import { options } from "@/api/interceptors";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { ICurrency } from "../model/currency.metrics.model";


export const CurrencyAPI = createApi({
	reducerPath: 'currencyAPI',
  	baseQuery: fetchBaseQuery({
		baseUrl: options.baseURL + 'metrics/api/Metrics'
	}),
	endpoints: (build) => ({
		getCurrencies: build.query<ICurrency[], void>({
			query: () => ({
				url: `/GetCurrencies/`,
				method: 'GET',
			})
		}),
	})
})
