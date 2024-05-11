import { EParameters, PARAMETERS_TO_DATA } from "../../data/metrics.metrics.data"
import { IMetrics, IPriceToMin } from "../../model/metric.metrics.model";
import { ISize } from "../../model/size.metrics.model";
import { IWholesale } from "../../model/wholesale.metrics.model";

// Получение минимальной и максимальной цены
export const getMinMax = (wholesales: IWholesale[], sizes: ISize[]) => {
    const wholesalesUpdated = getDiapason(wholesales, sizes)

    if (wholesalesUpdated.length === 0)
        return [undefined, undefined]

    return [wholesalesUpdated.at(wholesalesUpdated.length-1), wholesalesUpdated.at(0)]
}

// Получение отсортированного диапазаона цен
export const getDiapason = (wholesales: IWholesale[], sizes: ISize[]) => {
    console.log('wholesales gd', wholesales, sizes);
    
    let minMetrics: IMetrics | undefined
    let minParameter: EParameters
    wholesales.map(it => {
        sizes.map(item => {
            const metricsName = it.metrics?.name || item.sizeUnit.name
            const parameter = getParameterByName(metricsName)
    
            if (parameter === undefined) return
            if ((it.metrics || item.sizeUnit && parameter !== undefined && metricsName !== undefined) 
                && (minMetrics === undefined || minMetrics === undefined 
                || minParameter < parameter || (minParameter === parameter 
                && PARAMETERS_TO_DATA[parameter][metricsName] < PARAMETERS_TO_DATA[minParameter][minMetrics.name]))
            ) {
                minMetrics = it.metrics || item.sizeUnit
                
                minParameter = parameter
            }
        })
    })
    console.log('zxc 909', wholesales);

    const wholesalesUpdated = wholesales.map((wholesale, index) => {
        return {
            wholesale: {...wholesale, price: priceToMinUnitsParameter(wholesale.price, wholesale.metrics, minParameter).priceInMin} as IWholesale,
            index
        }
    })
    wholesalesUpdated.sort((a, b) => b.wholesale.price - a.wholesale.price);
    return wholesalesUpdated.map(it => ({...it.wholesale, price: wholesales[it.index].price} as IWholesale))
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
