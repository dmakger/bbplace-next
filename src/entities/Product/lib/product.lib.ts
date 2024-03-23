import { ICharacteristic } from "../model/characteristic.product.model";
import { IMediaProduct } from "../model/media.product.model";
import { IProduct, IProductAPI } from "../model/product.model";
import { IMetrics } from "@/entities/Metrics/model/metric.metrics.model";


// PRODUCT API => PRODUCT 
// Из {IProductAPI} ===> {IProduct}
export const productApiToProduct = (productAPI: IProductAPI, metrics?: IMetrics[]): IProduct => {
    const media = JSON.parse(productAPI.media) as IMediaProduct
    const characteristics = JSON.parse(productAPI.characteristics) as ICharacteristic
    
    return processProduct({
        ...productAPI, 
        media, 
        characteristics,
    }, metrics)
}


// PRODUCT => PRODUCT API
// Из {IProduct} ===> {IProductAPI}
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
// Обработка
export const processProduct = (product: IProduct, metrics?: IMetrics[]) => {
    let _product = {...product}
    _product = processProductWholesalePrices(_product, metrics)
    return _product
}

// ОБРАБОТКА WHOLESALE:
// 1. Если в {wholesalePrices}, {metrics} является id-шником, то превращает её в объект {IMetrics}
// 2. Если в {wholesalePrices} нет {metrics}, то добавляет его как объект {IMetrics}
// 3. Если {price} строка, то превращает её в {Float}
const processProductWholesalePrices = (product: IProduct, metrics?: IMetrics[]) => {
    const _product = {...product}
    if (!metrics)
        return _product
    let wholesalePricesWMetrics = [..._product.media.wholesalePrices]
    let priceUnits = metricsToObject(_product.media.priceUnits, metrics)
    wholesalePricesWMetrics = wholesalePricesWMetrics.map(it => {
        const price = typeof it.price === 'string' ? parseFloat(it.price) : it.price
        const ans = {...it, price: price}
        if (it.metrics === undefined)
            return {...ans,  metrics: priceUnits}
        return {...ans, metrics: metricsToObject(it.metrics, metrics)}
    })    
    return {
        ..._product,
        media: {
            ..._product.media,
            wholesalePrices: wholesalePricesWMetrics,
        }
    }
}

// ИЗ {IMetrics | number | undefined} ==> {IMetrics | undefined}
export const metricsToObject = (metrics: IMediaProduct["priceUnits"], allMetrics: IMetrics[]) => {    
    if (typeof metrics !== "number") return metrics
    return allMetrics.find(it => it.id === metrics)
}