import { IMetrics } from "@/entities/Metrics/model/metric.metrics.model";
import { IProduct, IProductAPI } from "./product.model";
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