import { EParameters, PARAMETERS_TO_DATA } from "../../data/metrics.metrics.data"
import { IMetrics, IPriceToMin } from "../../model/metric.metrics.model";
import { IWholesale } from "../../model/wholesale.metrics.model";


// 
export const getDiapason = (wholesales: IWholesale[]) => {
    let min: IWholesale | undefined
    let max: IWholesale | undefined
    if (wholesales.length === 0)
        return [min, max]
    let minMetrics: IMetrics | undefined
    let minParameter: EParameters
    wholesales.map(it => {
        const metricsName = it.metrics?.name
        const parameter = getParameterByName(metricsName)
        if (parameter === undefined) return
        if ((it.metrics && parameter !== undefined && metricsName !== undefined) 
            && (minMetrics === undefined || minMetrics === undefined 
            || minParameter < parameter || (minParameter === parameter 
            && PARAMETERS_TO_DATA[parameter][metricsName] < PARAMETERS_TO_DATA[minParameter][minMetrics.name]))
        ) {
            minMetrics = it.metrics
            minParameter = parameter
        }
    })

    const priceList = wholesales.map(wholesale => {
        const price = priceToMinUnitsParameter(wholesale.price, wholesale.metrics, minParameter)
        return price
    })
    const priceInMinList = priceList.map(item => item.priceInMin);
    // Получение индекса минимального элемента по priceInMin
    const minIndex = priceInMinList.indexOf(Math.min(...priceInMinList));
    min = {...wholesales[minIndex], price: priceInMinList[minIndex], metrics: minMetrics}
    // Получение индекса максимального элемента по priceInMin
    const maxIndex = priceInMinList.indexOf(Math.max(...priceInMinList));
    max = {...wholesales[minIndex], price: priceInMinList[maxIndex], metrics: minMetrics}
    return [min, max]
}

// Перевод [price] к минимумальным единицам по по [name] из [metrics]
export const priceToMinUnitsParameter = (price: number, metrics?: IMetrics, parameter?: EParameters): IPriceToMin => {    
    const metricsName = metrics ? metrics.name : undefined
    const minPrice = parameter && metricsName ? PARAMETERS_TO_DATA[parameter][metricsName] : 1
    const maxParameter = getParameterByName(metricsName)
    let maxPrice = minPrice

    if (maxParameter && metricsName)
        maxPrice = PARAMETERS_TO_DATA[maxParameter][metricsName]
    let priceInMin = price * (maxPrice / minPrice)
    return {price, priceInMin, metrics, parameter}
}


// Получение {EParameters} по {name} из {metrics}
export const getParameterByName = (name?: string) => {
    if (!name) return 
    for (const param in PARAMETERS_TO_DATA) {
        const paramInt = parseInt(param) as EParameters
        if (Object.keys(PARAMETERS_TO_DATA[paramInt]).includes(name)) {
            return paramInt;
        }
    }
}
