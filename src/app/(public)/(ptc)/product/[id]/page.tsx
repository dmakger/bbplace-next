'use client'

import { CurrencyAPI } from "@/entities/Metrics/api/currency.metrics.api";
import { MetricsAPI } from "@/entities/Metrics/api/metrics.metrics.api";
import { ProductAPI } from "@/entities/Product/api/product.api";
import { productApiToProduct } from "@/entities/Product/lib/product.lib";
import { IProduct } from "@/entities/Product/model/product.model";
import Wrapper1280 from "@/shared/ui/Wrapper/1280/Wrapper1280";
import { CatalogImage } from "@/widgets/CatalogImage/CatalogImage";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import cl from './_ProductDetailPage.module.scss'
import { WrapperBlock } from "@/shared/ui/Wrapper/Block/WrapperBlock";
import { BlockInfoProduct } from "@/features/Block/Info/Product/BlockInfoProduct";

export default function ProductDetailPage() {
    // ROUTER
    const {id} = useParams();

    // API
    const {data: currencyList} = CurrencyAPI.useGetCurrenciesQuery()          
    const {data: metrics} = MetricsAPI.useGetMetricsQuery() 
    const {data: productAPI} = ProductAPI.useGetProductQuery(Array.isArray(id) ? id[0] : id)
    
    // STATE
    const [product, setProduct] = useState<IProduct>();

    // EFFECT
    useEffect(() => {
        if (productAPI) {
            setProduct(productApiToProduct({productAPI: productAPI, metrics, currencyList}));
        }
    }, [productAPI, currencyList, metrics]);
    
    if (product === undefined)
        return

    return (
        <Wrapper1280>
            <div className={cl.wrapper}>
                <div className={cl.left}>
                    <CatalogImage imageList={product?.media.attachments} />
                </div>
                <div className={cl.right}>
                    <WrapperBlock className={cl.wrapper}>
                        <BlockInfoProduct product={product} />
                    </WrapperBlock>
                </div>
            </div>
        </Wrapper1280>
    )
}
