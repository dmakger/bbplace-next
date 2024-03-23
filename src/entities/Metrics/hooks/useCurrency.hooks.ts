import useAPI from "@/api/useApi";
import { IMetrics } from "../model/metric.metrics.model";
import { currencyAPI } from "../api/currency.metrics.api";
import { ICurrency } from "../model/currency.metrics.model";

export function useCurrencyAll() {
	return useAPI<ICurrency[]>(['currencyList'], () => currencyAPI.all())
}
