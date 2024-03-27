import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { options } from "@/api/interceptors";
import { IMetrics } from "../model/metric.metrics.model";

export const MetricsAPI = createApi({
	reducerPath: 'metricsAPI',
  	baseQuery: fetchBaseQuery({
		baseUrl: options.baseURL + 'metrics/api/Metrics'
	}),
	endpoints: (build) => ({
		getMetrics: build.query<IMetrics[], void>({
			query: () => ({
				url: `/GetMetrics/`,
				method: 'GET',
			})
		}),
	})
})
