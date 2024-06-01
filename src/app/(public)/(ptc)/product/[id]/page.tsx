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
import { getDataHeadingToTextProductTable } from "@/shared/ui/Text/lib/htt.product.lib";
import { ReviewAPI } from "@/entities/Review/api/review.api";
import { REVIEW_LIMIT, REVIEW_START_PAGE } from "@/entities/Review/data/review.data";
import { DetailedPageInfo } from "@/features/DetailedPageInfo";
import { SWITCH_SELECTOR_PRODUCT_OPTIONS } from "@/entities/Product/data/product.data";
import { SWITCH_SELECTOR_DESCRIPTION_OPTION } from "@/shared/ui/SwitchSelector";
import { DetailedPageDescription } from "@/shared/ui/DetailedPage";
import { IOptionsTab } from "@/features/DetailedPageInfo/model/detailedPageInfo.model";
import { ProductTable } from "@/features/ProductTable";
import { SupplierWNav } from "@/entities/Supplier/ui/WNav/SupplierWNav";
import { ESupplierSubscribeViewItem } from "@/entities/Supplier/data/view.supplier.data";
import { DetailedPageSupplier } from "@/shared/ui/DetailedPage/ui/DetailedPageSupplier/DetailedPageSupplier";
import { UserAPI } from "@/entities/Auth/api/auth.api";
import { ISupplier } from "@/entities/Supplier/model/supplier.model";
import { supplierApiToSupplier } from "@/entities/Supplier/lib/process.supplier.lib";

export default function ProductDetailPage() {
    // ROUTER
    const { id } = useParams();

    // STATE
    const [product, setProduct] = useState<IProduct>();
    const [productListGroup, setProductListGroup] = useState<IProduct[]>([]);
    const [supplier, setSupplier] = useState<ISupplier>()


    // API
    const { data: currencyList } = CurrencyAPI.useGetCurrenciesQuery()
    const { data: metrics } = MetricsAPI.useGetMetricsQuery()
    const { data: productAPI } = ProductAPI.useGetProductQuery(Array.isArray(id) ? id[0] : id, { refetchOnMountOrArgChange: true })
    const { data: productAPIListGroup } = ProductAPI.useGetProductsByGroupQuery(productAPI && productAPI.groupId ? productAPI.groupId : skipToken, { refetchOnMountOrArgChange: true })
    const { data: itemReviews } = ReviewAPI.useGetProductReviewsQuery({ itemId: String(id), limit: REVIEW_LIMIT ?? 0, page: REVIEW_START_PAGE })
    const { data: itemScore } = ReviewAPI.useGetProductAvgScoreQuery(String(id) ?? '')
    const { data: supplierAPI } = UserAPI.useGetUserDataQuery(product?.ownerId as string)
    const { data: supplierReviews } = ReviewAPI.useGetSellerReviewsQuery({ supplierId: product?.ownerId ?? '', limit: REVIEW_LIMIT ?? 0, page: REVIEW_START_PAGE })
    const { data: supplierRating } = ReviewAPI.useGetSupplierScoreQuery(product?.ownerId ?? '')



    //EFFECT
    useEffect(() => {
        if (supplierAPI)
            setSupplier(supplierApiToSupplier(supplierAPI))
    }, [supplierAPI])

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
        reviews: { optionTab: null, optionQuantity: (itemReviews && itemReviews.length > 0) ? itemReviews.length : null },
        supplier: {
            optionTab: <DetailedPageSupplier
                id={product.ownerId ?? ''}
                supplierReviews={supplierReviews?.length ?? 0}
                supplier={supplier!}
                supplierRating={supplierRating ?? 0}
            />
        }
    }

    return (
        <Wrapper1280>
            <div className={cl.wrapper}>
                <div className={cl.left}>
                    <DetailedPageHeader
                        id={product.id}
                        name={product.name ?? ''}
                        tableData={getDataHeadingToTextProductTable({ product, isDetailedPageHeader: true, itemRating: itemScore, itemReviews: itemReviews?.length })}
                    />
                    <CatalogImage imageList={product?.media.attachments} hasMaximize={true} />
                    <SupplierWNav
                        className={cl.supplierBlock}
                        classNameSupplier={cl.baseSupplier}
                        classNameNavs={cl.navSupplier}
                        id={product.ownerId}
                        hasImage
                        navs={[
                            ESupplierSubscribeViewItem.LARGE_OUTLINE
                        ]}
                    />
                    <DetailedPageInfo
                        defaultOption={SWITCH_SELECTOR_DESCRIPTION_OPTION}
                        options={SWITCH_SELECTOR_PRODUCT_OPTIONS}
                        optionsTab={PRODUCT_PAGE_OPTIONS_TAB} />
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
