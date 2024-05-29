'use client'

import { CurrencyAPI } from "@/entities/Metrics/api/currency.metrics.api";
import { MetricsAPI } from "@/entities/Metrics/api/metrics.metrics.api";
import { ProductAPI } from "@/entities/Product/api/product.api";
import { productApiListToProductList, productApiToProduct } from "@/entities/Product/lib/product.lib";
import { IProduct } from "@/entities/Product/model/product.model";
import Wrapper1280 from "@/shared/ui/Wrapper/1280/Wrapper1280";
import { CatalogImage } from "@/widgets/CatalogImage/CatalogImage";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import cl from './_ProductDetailPage.module.scss'
import { WrapperBlock } from "@/shared/ui/Wrapper/Block/WrapperBlock";
import { BlockInfoProduct } from "@/features/Block/Info/Product/BlockInfoProduct";
import { skipToken } from "@reduxjs/toolkit/query";
import { OptionList } from "@/shared/ui/Option/ui/List/OptionList";
import { productListToOptionList } from "@/entities/Product/lib/option.product.lib";
import { DetailedPageHeader } from "@/features/DetailedPageHeader";
import { getDataHeadingToTextProductTable } from "@/widgets/Product/Table/HeadingToText/lib/htt.product.lib";
import { ReviewAPI } from "@/entities/Review/api/review.api";
import { REVIEW_LIMIT, REVIEW_START_PAGE } from "@/entities/Review/data/review.data";
import { DetailedPageInfo } from "@/features/DetailedPageInfo";
import { SWITCH_SELECTOR_PRODUCT_OPTIONS } from "@/entities/Product/data/product.data";
import { SWITCH_SELECTOR_DESCRIPTION_OPTION } from "@/shared/ui/SwitchSelector";
import { DetailedPageDescription } from "@/shared/ui/DetailedPage";
import { IOptionsTab } from "@/features/DetailedPageInfo/model/detailedPageInfo.model";
import { ProductTable } from "@/features/ProductTable";

export default function ProductDetailPage() {
    // ROUTER
    const { id } = useParams();

    // STATE
    const [product, setProduct] = useState<IProduct>();
    const [productListGroup, setProductListGroup] = useState<IProduct[]>([]);

    // API
    const { data: currencyList } = CurrencyAPI.useGetCurrenciesQuery()
    const { data: metrics } = MetricsAPI.useGetMetricsQuery()
    const { data: productAPI } = ProductAPI.useGetProductQuery(Array.isArray(id) ? id[0] : id, { refetchOnMountOrArgChange: true })
    const { data: productAPIListGroup } = ProductAPI.useGetProductsByGroupQuery(productAPI && productAPI.groupId ? productAPI.groupId : skipToken, { refetchOnMountOrArgChange: true })
    const { data: itemReviews } = ReviewAPI.useGetProductReviewsQuery({ itemId: String(id), limit: REVIEW_LIMIT ?? 0, page: REVIEW_START_PAGE })
    const { data: itemScore } = ReviewAPI.useGetProductAvgScoreQuery(String(id) ?? '')

    // EFFECT
    useEffect(() => {
        if (productAPI) {
            setProduct(productApiToProduct({ productAPI, metrics, currencyList }));
        }
    }, [productAPI, currencyList, metrics]);   

    useEffect(() => {
        if (productAPIListGroup) {
            setProductListGroup(productApiListToProductList(productAPIListGroup, metrics, currencyList));
        }
    }, [productAPIListGroup, currencyList, metrics]);
    
    // HTML
    if (!product) return

    //OPTIONS
    const PRODUCT_PAGE_OPTIONS_TAB: IOptionsTab = {
        description: { optionTab: <DetailedPageDescription description={product.characteristics.description} /> },
        characteristics: { optionTab: <ProductTable product={product} /> },
        reviews: { optionTab: null, optionQuantity: (itemReviews && itemReviews.length > 0) ? itemReviews.length : null},
        supplier: {optionTab: null}
    }

    return (
        <Wrapper1280>
            <div className={cl.wrapper}>
                <div className={cl.left}>
                    <DetailedPageHeader
                        id={product.id}
                        name={product.name ?? ''}
                        tableData={getDataHeadingToTextProductTable({product, isCreatedAtAndReviews: true, itemRating: itemScore, itemReviews: itemReviews?.length})}
                    />
                    <CatalogImage imageList={[...product?.media.attachments, ...product?.media.attachments, ...product?.media.attachments, ...product?.media.attachments, ...product?.media.attachments]} hasMaximize={true} />
                    <DetailedPageInfo 
                        defaultOption={SWITCH_SELECTOR_DESCRIPTION_OPTION}
                        options={SWITCH_SELECTOR_PRODUCT_OPTIONS}
                        optionsTab={PRODUCT_PAGE_OPTIONS_TAB}/>
                </div>
                <div className={cl.right}>
                    <WrapperBlock className={cl.wrapper}>
                        <BlockInfoProduct product={product} />
                        <div className={cl.line} />
                        <OptionList optionList={productListToOptionList(productListGroup)} activeIds={[product.id]} />
                    </WrapperBlock>
                </div>
            </div>
        </Wrapper1280>
    )
}
