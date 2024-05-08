import { ICurrency } from "@/entities/Metrics/model/currency.metrics.model";
import { ICharacteristic } from "../model/characteristic.product.model";
import { IMediaProduct } from "../model/media.product.model";
import { IProduct, IProductAPI } from "../model/product.model";
import { IMetrics } from "@/entities/Metrics/model/metric.metrics.model";
import { currencyToObject } from "@/entities/Metrics/lib/currency.metrics.lib";
import { metricsToObject } from "@/entities/Metrics/lib/metrics/base.metrics.metrics.lib";
import { IProcessProductProps } from "../model/props.product.model";


export const productApiListToProductList = (productListAPI: IProductAPI[], metrics?: IMetrics[], currencyList?: ICurrency[]): IProduct[] => {
    return productListAPI.map(it => productApiToProduct({productAPI: it, metrics, currencyList}))
}


// PRODUCT API => PRODUCT 
// Из {IProductAPI} ===> {IProduct}
export const productApiToProduct = ({productAPI, metrics, currencyList, hasSupplier=false}: IProcessProductProps): IProduct => {
    const media = JSON.parse(productAPI.media) as IMediaProduct
    const characteristics = JSON.parse(productAPI.characteristics) as ICharacteristic
    
    return processProduct({
        ...productAPI, 
        media, 
        characteristics,
    }, metrics, currencyList)
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
export const processProduct = (product: IProduct, metrics?: IMetrics[], currencyList?: ICurrency[], hasSupplier?:boolean) => {
    let _product = {...product}
    _product = processProductWholesalePrices(_product, metrics, currencyList)
    _product.media.wholesalePrices = _product.media.wholesalePrices.map(it => ({...it, quantity: +it.quantity}))
    return _product
}

// ОБРАБОТКА WHOLESALE:
// 1. Если в {wholesalePrices}, {metrics} является id-шником, то превращает её в объект {IMetrics}
// 2. Если в {wholesalePrices} нет {metrics}, то добавляет его как объект {IMetrics}
// 3. Если {price} строка, то превращает её в {Float}
// 4. Превращает {currency} из (number | string) в {ICurrency}
const processProductWholesalePrices = (product: IProduct, metrics?: IMetrics[], currencyList?: ICurrency[]) => {
    const _product = {...product}
    if (!metrics)
        return _product
    let wholesalePricesWMetrics = [..._product.media.wholesalePrices]
    let priceUnits = metricsToObject(_product.media.priceUnits, metrics)
    let currency = currencyToObject(_product.media.currency, currencyList)
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
            priceUnits, currency,
            wholesalePrices: wholesalePricesWMetrics,
        }
    }
}


// // ДОБАВЛЕНИЕ В ПРОДУКТ {SUPPLIER}
// const 