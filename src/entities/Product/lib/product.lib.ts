import { getMetricsById } from "@/entities/Metrics/lib/metrics.metrics.lib";
import { ICharacteristic } from "../model/characteristic.product.model";
import { IMediaProduct } from "../model/media.product.model";
import { IProduct, IProductAPI } from "../model/product.model";


// PRODUCT API => PRODUCT 
export const productApiToProduct = (productAPI: IProductAPI): IProduct => {
    const media = JSON.parse(productAPI.media) as IMediaProduct
    const characteristics = JSON.parse(productAPI.characteristics) as ICharacteristic
    
    return processProduct({
        ...productAPI, 
        media, 
        characteristics,
    })
}


// PRODUCT => PRODUCT API
export const productToProductAPI = (product: IProduct): IProductAPI => {
    const media = JSON.stringify(product.media)
    const characteristics = JSON.stringify(product.characteristics)
    
    return {
        ...product, 
        media, 
        characteristics,
    }
}



// ============={ PROCESS }================
export const processProduct = (product: IProduct) => {
    const _product = {...product}
    const wholesalePricesWMetrics = _product.media.wholesalePrices
    let priceUnits = metricsToObject(_product.media.priceUnits)
    wholesalePricesWMetrics.map(it => {
        if (it.metrics === undefined)
            return priceUnits
        return metricsToObject(it.metrics)
    })
    _product.media.wholesalePrices = wholesalePricesWMetrics

    return _product
}


export const metricsToObject = (metrics: IMediaProduct["priceUnits"]) => {
    if (typeof metrics !== "number") return metrics
    return getMetricsById(metrics)
}