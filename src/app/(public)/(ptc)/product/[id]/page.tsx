'use client'

import { CurrencyAPI } from "@/entities/Metrics/api/currency.metrics.api";
import { MetricsAPI } from "@/entities/Metrics/api/metrics.metrics.api";
import { getDiapason } from "@/entities/Metrics/lib/metrics/diapason.metrics.metrics.lib";
import { IPriceToMin } from "@/entities/Metrics/model/metric.metrics.model";
import { IWholesale } from "@/entities/Metrics/model/wholesale.metrics.model";
import { ProductAPI } from "@/entities/Product/api/product.api";
import { productApiToProduct } from "@/entities/Product/lib/product.lib";
import { IProduct } from "@/entities/Product/model/product.model";
import Wrapper1280 from "@/shared/ui/Wrapper/1280/Wrapper1280";
import { CatalogImage } from "@/widgets/CatalogImage/CatalogImage";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductDetailPage() {
    // ROUTER
    const {id} = useParams();

    // API
    const {data: currencyList} = CurrencyAPI.useGetCurrenciesQuery()          
    const {data: metrics} = MetricsAPI.useGetMetricsQuery() 
    const {data: productAPI} = ProductAPI.useGetProductQuery(Array.isArray(id) ? id[0] : id)
    
    // STATE
    const [product, setProduct] = useState<IProduct>();
    const [priceList, setPriceList] = useState<IWholesale[]>([]);

    // EFFECT
    useEffect(() => {
        if (productAPI) {
            setProduct(productApiToProduct({productAPI: productAPI, metrics, currencyList}));
        }
    }, [productAPI, currencyList, metrics]);

    useEffect(() => {
        if (product === undefined)
            return
        setPriceList(getDiapason(product.media.wholesalePrices, product.media.sizes))
    }, [product])

    console.log('zxc', product, priceList);        
    
    return (
        <Wrapper1280>
            <CatalogImage imageList={product?.media.attachments} />
        </Wrapper1280>
    )
}
