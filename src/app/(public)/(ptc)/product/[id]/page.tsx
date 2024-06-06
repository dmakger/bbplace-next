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
import { DetailedPageDescription, MobileOrderFooter } from "@/shared/ui/DetailedPage";
import { IOptionsTab } from "@/features/DetailedPageInfo/model/detailedPageInfo.model";
import { ProductTable } from "@/features/ProductTable";
import { SupplierWNav } from "@/entities/Supplier/ui/WNav/SupplierWNav";
import { ESupplierSubscribeViewItem } from "@/entities/Supplier/data/view.supplier.data";
import { DetailedPageSupplier } from "@/shared/ui/DetailedPage/ui/DetailedPageSupplier/DetailedPageSupplier";
import { UserAPI } from "@/entities/Auth/api/auth.api";
import { ISupplier } from "@/entities/Supplier/model/supplier.model";
import { supplierApiToSupplier } from "@/entities/Supplier/lib/process.supplier.lib";
import { IOption } from "@/shared/model/option.model";
import { Button, ButtonVariant } from "@/shared/ui/Button";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { getDiapason } from "@/entities/Metrics/lib/metrics/diapason.metrics.metrics.lib";
import { cls } from "@/shared/lib/classes.lib";
import { useInView } from "react-intersection-observer";

export default function ProductDetailPage() {
    // ROUTER
    const { id } = useParams();

    // STATE
    const [product, setProduct] = useState<IProduct>();
    const [productListGroup, setProductListGroup] = useState<IProduct[]>([]);
    const [supplier, setSupplier] = useState<ISupplier>()
    const [productSizes, setProductSizes] = useState<IOption[]>([])
    const [choosenSize, setChoosenSize] = useState<IOption[]>([])


    //REF
    const { ref, inView, } = useInView({
        threshold: 0,
    });

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

    useEffect(() => {
        let sizes: string[] = []
        if (product && product.media.sizes && product.media.sizes[0])
            if (typeof (product.media.sizes[0].size === 'string')) {
                sizes = product.media.sizes[0].size.split(',') ?? [];
            }
            else {
                sizes = [product.media.sizes[0].size];
            }

        const transformedOptions = sizes.map((item, index) => {
            return { id: index, name: item.toString() } as IOption;
        });
        setProductSizes(transformedOptions);

    }, [product])

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
                classNameVerified={cl.verifiedSupplier}
            />
        }
    }

    //FUNCTION
    const chooseSize = (it: IOption) => setChoosenSize([it]);

    return (
        <Wrapper1280>
            <div className={cl.wrapper}>
                <div className={cl.left}>
                    <DetailedPageHeader
                        id={product.id}
                        name={product.name ?? ''}
                        tableData={getDataHeadingToTextProductTable({ product, isDetailedPageHeader: true, itemRating: itemScore, itemReviews: itemReviews?.length })}
                    />
                    <CatalogImage imageList={[...product?.media.attachments, ...product?.media.attachments, ...product?.media.attachments]} hasMaximize={true} />
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
                        <BlockInfoProduct product={product} className={cls(cl.wholesaleProduct, inView ? cl.hidden : '')}  />
                        <OptionList title="Цвет: "
                            optionList={productListToOptionList(productListGroup)}
                            activeIds={[product.id]}
                            isOnHover />
                        {productSizes.length > 0 && <OptionList title="Размеры: "
                            optionList={productSizes}
                            activeIds={[choosenSize[0]?.id]}
                            onClickItem={chooseSize}
                            classNameItem={cl.optionItem}
                            isSizes
                        />}
                        <div className={cl.buttonContainer} ref={ref}>
                            <Button variant={ButtonVariant.BACKGROUND_RED}
                                href={DASHBOARD_PAGES.CURRENT_CHAT(product.ownerId ?? '')}
                                title="Заказать" />
                        </div>
                        
                        <MobileOrderFooter 
                            className={cls(cl.MobileOrderFooter, !inView ? cl.visible : '')} 
                            supplierId={product.ownerId ?? ''}
                            firstStart="От "
                            wholesalePrices={getDiapason(product.media.wholesalePrices, product.media.sizes)} />
                    </WrapperBlock>
                    
                </div>
            </div>
        </Wrapper1280>
    )
}
