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
import cl from './_ProductDetailPage.module.scss';
import { WrapperBlock } from "@/shared/ui/Wrapper/Block/WrapperBlock";
import { skipToken } from "@reduxjs/toolkit/query";
import { DetailedPageHeader } from "@/features/DetailedPageHeader";
import { getDataHeadingToTextProductTable } from "@/shared/ui/Text/lib/htt.product.lib";
import { ReviewAPI } from "@/entities/Review/api/review.api";
import { REVIEW_LIMIT, REVIEW_START_PAGE } from "@/entities/Review/data/review.data";
import { DetailedPageInfo } from "@/features/DetailedPageInfo";
import { SWITCH_SELECTOR_PRODUCT_OPTIONS } from "@/entities/Product/data/product.data";
import { SWITCH_SELECTOR_DESCRIPTION_OPTION } from "@/shared/ui/SwitchSelector";
import { DetailedPageDescription, MobileOrderFooter } from "@/shared/ui/DetailedPage";
import { IDetailedProductOptionsTab } from "@/features/DetailedPageInfo/model/detailedPageInfo.model";
import { ProductTable } from "@/features/ProductTable";
import { SupplierWNav } from "@/entities/Supplier/ui/WNav/SupplierWNav";
import { ESupplierSubscribeViewItem } from "@/entities/Supplier/data/view.supplier.data";
import { DetailedPageSupplier } from "@/shared/ui/DetailedPage/ui/DetailedPageSupplier/DetailedPageSupplier";
import { UserAPI } from "@/entities/Auth/api/auth.api";
import { ISupplier } from "@/entities/Supplier/model/supplier.model";
import { supplierApiToSupplier } from "@/entities/Supplier/lib/process.supplier.lib";
import { IOption } from "@/shared/model/option.model";
import { getDiapason } from "@/entities/Metrics/lib/metrics/diapason.metrics.metrics.lib";
import { cls } from "@/shared/lib/classes.lib";
import { useInView } from "react-intersection-observer";
import { MainInfoProduct } from "@/features/Block/Info/Product";

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
    const { ref, inView } = useInView({
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
        let sizes: string[] = [];
        
        if (product?.media?.sizes?.length) {
            const firstSize = product.media.sizes[0];
    
            if (product.media.sizes.length < 2 && typeof firstSize.size === 'string') {
                sizes = firstSize.size.split(',').map(size => size.trim());
            } else if (typeof firstSize.size === 'number') {
                sizes = product.media.sizes.map(it => it.size.toString());
            }
        }
    
        const transformedOptions = sizes.map((item, index) => ({
            id: index,
            name: item
        } as IOption));
    
        setProductSizes(transformedOptions);
    
    }, [product]);

    // HTML
    if (!product) return

    //OPTIONS
    const PRODUCT_PAGE_OPTIONS_TAB: IDetailedProductOptionsTab = {
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

    //VARIABLE
    const productWholesalePrices = product.media.wholesalePrices;
    //FUNCTION
    const chooseSize = (it: IOption) => setChoosenSize([it]);

    return (
        <Wrapper1280>
            <div className={cls(cl.wrapper, !inView ? cl.paddingBottom : '')}>
                <div className={cl.left}>
                    <DetailedPageHeader
                        id={product.id}
                        name={product.name ?? ''}
                        tableData={getDataHeadingToTextProductTable({ product, isDetailedPageHeader: true, itemRating: itemScore, itemReviews: itemReviews?.length })}
                    />
                    <CatalogImage imageList={product?.media.attachments} hasMaximize={true} className={cl.slider}/>
                    <div className={cl.mainInfoProduct} ref={ref}>
                        <MainInfoProduct
                            className={cl.mobileInfo}
                            product={product}
                            productListGroup={productListGroup}
                            productSizes={productSizes}
                            chooseSize={chooseSize}
                            choosenSize={choosenSize}
                            inView={inView} />
                    </div>
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

                        <MainInfoProduct
                            product={product}
                            productListGroup={productListGroup}
                            productSizes={productSizes}
                            chooseSize={chooseSize}
                            choosenSize={choosenSize}
                        />

                    </WrapperBlock>
                    <MobileOrderFooter
                            classNamePriceQuantity={cl.mobilePriceQuantity}
                            className={cls(cl.MobileOrderFooter, !inView ? cl.visible : '')}
                            supplierId={product.ownerId ?? ''}
                            firstStart="От "
                            wholesalePrices={productWholesalePrices.length > 0 ? [getDiapason(productWholesalePrices, product.media.sizes)[0]] : []}
                        />
                </div>
            </div>
        </Wrapper1280>
    )
}
