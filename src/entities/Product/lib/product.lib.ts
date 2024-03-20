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
    const wholesalePricesWMetrics = _product.media.wholesalePrices.filter(it => it.metrics !== undefined)
    // if (typeof _product.media.priceUnits === "number") {
    //     _product.media.priceUnits = metricsToObject(_product.media.priceUnits)
    // }
    if (wholesalePricesWMetrics.length > 0) {
        const metrics = wholesalePricesWMetrics[0].metrics
        _product.media.priceUnits = metricsToObject(metrics)
    }

    return _product
}


export const metricsToObject = (metrics: IMediaProduct["priceUnits"]) => {
    if (typeof metrics !== "number") return metrics
    return getMetricsById(metrics)
}