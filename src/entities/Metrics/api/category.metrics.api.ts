import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { ICategory } from "../model/category.metrics.model"
import { options } from "@/api/interceptors";

export const CategoryAPI = createApi({
	reducerPath: 'categoryAPI',
  	baseQuery: fetchBaseQuery({
		baseUrl: options.baseURL + 'metrics/api/Metrics'
	}),
	endpoints: (build) => ({
		getCategories: build.query<ICategory[], void>({
			query: () => ({
				url: `/GetCategories/`,
				method: 'GET',
			})
		}),
	})
})
