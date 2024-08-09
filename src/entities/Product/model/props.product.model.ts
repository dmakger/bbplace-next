import { IMetrics } from "@/entities/Metrics/model/metric.metrics.model";
import { IBaseProduct, IBaseWCategoryProduct, IProduct, IProductAPI } from "./product.model";
import { ICurrency } from "@/entities/Metrics/model/currency.metrics.model";
import { ICountry } from "@/entities/Metrics/model/country.metrics.model";

export interface IProductProps {
    product: IProduct
    className?: string
}


export interface IProcessProductProps {
    productAPI: IProductAPI, 
    metrics?: IMetrics[], 
    currencyList?: ICurrency[],
    countries?: ICountry[]
    hasSupplier?: boolean
}

/**
 * Используется при вызове `/AddItem` в `ProductAPI`
 */
export interface IPropsCreateProduct extends IBaseWCategoryProduct {
    media: string
    characteristics: string
}


/**
 * Используется при вызове `/EditItem` в `ProductAPI`
 */
export interface IPropsUpdateProduct extends IBaseProduct {
    media: string
    characteristics: string
}
