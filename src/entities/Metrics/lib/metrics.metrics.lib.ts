import { IMediaProduct } from "@/entities/Product/model/media.product.model";
import { EParameters, PARAMETERS_TO_DATA } from "../data/metrics.metrics.data"
import { useMetricsAll } from "../hooks/useMetrics.hooks";
import { IMetrics } from "../model/metric.metrics.model"
import { IWholesale } from "../model/wholesale.metrics.model";
import { metricsToObject } from "@/entities/Product/lib/product.lib";


export const getMetricsById = (id: number) => {
    const {data: metricsList} = useMetricsAll()    
    if (metricsList === undefined) return
    return metricsList.find(it => it.id === id)!
}


export const getDiapason = (wholesales: IWholesale[], priceUnits: IMediaProduct["priceUnits"]) => {
    // let _priceUnits = metricsToObject(priceUnits)
    // console.log(_priceUnits, priceUnits);
    // if (priceUnits === undefined || typeof priceUnits === "number" || wholesales.length === 0) {
    //     console.log('bruh', priceUnits, wholesales);
    //     return [undefined, undefined]
    // }

    // 

    let namePriceUnits = priceUnits as unknown as (IMetrics | undefined)
    if (typeof namePriceUnits === "number")
        namePriceUnits = undefined
    
    const indexToPrice: Record<number, number> = {};
    wholesales.map((wholesale, index) => {
        const price = priceToMinUnitsParameter(wholesale.price, namePriceUnits ? namePriceUnits.name : namePriceUnits)
        // indexToPrice[index] = price / wholesale.quantity
        indexToPrice[index] = price
    })
    const entries = Object.entries(indexToPrice);
    entries.sort((a, b) => a[1] - b[1]);
    console.log(entries);
    

    // const sortedIndexToPrice: Record<number, number> = {};
    // entries.forEach(([key, value]) => {
    //     sortedIndexToPrice[parseInt(key)] = value;
    // });
    
    const indexMin = parseInt(entries[0][0])
    const indexMax = parseInt(entries[entries.length-1][0])
    return [wholesales[indexMin], wholesales[indexMax]]
}


// Перевод [price] к минимумальным единицам по по [name] из [metrics]
export const priceToMinUnitsParameter = (price: number, metricsName?: string) => {    
    const parameter = getParameterByName(metricsName)
    console.log(price, parameter, metricsName);
    if (parameter === undefined || metricsName === undefined) return price
    return price * PARAMETERS_TO_DATA[parameter][metricsName]
}


// Получение [EParameters] по [name] из [metrics]
export const getParameterByName = (name?: string) => {
    if (!name) return 
    for (const param in PARAMETERS_TO_DATA) {
        const paramInt = parseInt(param) as EParameters
        if (Object.keys(PARAMETERS_TO_DATA[paramInt]).includes(name)) {
            return paramInt;
        }
    }
}
