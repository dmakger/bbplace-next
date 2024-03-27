import useAPI from "@/api/useApi";
import { metricsAPI } from "../api/metrics.metrics.api";
import { IMetrics } from "../model/metric.metrics.model";

export function useMetricsAll() {
	return useAPI<IMetrics[]>(['metricsList'], () => metricsAPI.all())
}
