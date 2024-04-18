import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { options } from "@/api/interceptors";
import { ICountry } from "../model/country.metrics.model";

export const CountryAPI = createApi({
	reducerPath: 'countryAPI',
  	baseQuery: fetchBaseQuery({
		baseUrl: options.baseURL + 'metrics/api/Metrics'
	}),
	endpoints: (build) => ({
		getCountries: build.query<ICountry[], void>({
			query: () => ({
				url: `/GetCountries/`,
				method: 'GET',
			})
		}),
	})
})
