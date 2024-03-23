import { EParameters, PARAMETERS_TO_DATA } from "../data/metrics.metrics.data"
import { IMetrics, IPriceToMin } from "../model/metric.metrics.model";
import { IWholesale } from "../model/wholesale.metrics.model";

export const getDiapason = (wholesales: IWholesale[]) => {
    if (wholesales.length === 0)
        return [undefined, undefined]

    const priceList = wholesales.map(wholesale => {
        const price = priceToMinUnitsParameter(wholesale.price, wholesale.metrics)
        return price
    })



    // const entries = Object.entries(indexToPrice);
    // entries.sort((a, b) => a[1] - b[1]);
        
    // const indexMin = entries[0][1]
    // const indexMax = entries[entries.length-1][1]
    // console.log(entries, wholesales[indexMin], wholesales[indexMax]);
    // return [wholesales[indexMin], wholesales[indexMax]]
}


// Перевод [price] к минимумальным единицам по по [name] из [metrics]
export const priceToMinUnitsParameter = (price: number, metrics?: IMetrics): IPriceToMin => {    
    const metricsName = metrics ? metrics.name : undefined
    const parameter = getParameterByName(metricsName)
    let priceInMin = price
    if (parameter !== undefined && metricsName !== undefined) 
        priceInMin = price * PARAMETERS_TO_DATA[parameter][metricsName]
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
