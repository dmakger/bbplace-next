import { IOption } from "@/shared/model/option.model";
import { IMetrics } from "../model/metric.metrics.model";


/**
 * Перевод списка метрик в список option
 * @param metrics - Список метрик
 */
export const metricListToOptionList = (metrics: IMetrics[]) => {
    return metrics.map(metric => metricToOption(metric))
}


/**
 * Перевод метрики в option
 * @param metric - Передоваемая метрика
 */
export const metricToOption = (metric: IMetrics) => {
    const {id, name, ...params} = metric
    return {id, name, params} as IOption
}