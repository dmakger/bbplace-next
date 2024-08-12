import { IMetrics } from "@/entities/Metrics/model/metric.metrics.model";
import { IBaseProduct, IProduct, IProductAPI } from "./product.model";
import { ICurrency } from "@/entities/Metrics/model/currency.metrics.model";

export interface IProductProps {
    product: IProduct
    className?: string
}


export interface IProcessProductProps {
    productAPI: IProductAPI, 
    metrics?: IMetrics[], 
    currencyList?: ICurrency[]
    hasSupplier?: boolean
}

/**
 * Используется при вызове `/AddItem`
 */
export interface IPropsCreateProduct extends IBaseProduct {
    media: string
    characteristics: string
}
