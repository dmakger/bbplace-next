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
import { SupplierWNav } from "@/entities/Supplier/ui/WNav/SupplierWNav";
import { ESupplierSubscribeViewItem } from "@/entities/Supplier/data/view.supplier.data";

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
        reviews: { optionTab: <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est provident neque, inventore a illo ipsum officiis quod reprehenderit ratione pariatur quidem, sapiente porro in aut amet voluptates hic, at voluptatibus repellat dolore. Delectus officia omnis pariatur sunt nemo numquam in eum, possimus harum deleniti enim eaque ut velit odit facilis? Illo necessitatibus iste beatae voluptate eveniet, suscipit neque, atque consequatur nihil similique animi! Reprehenderit obcaecati distinctio quas ullam necessitatibus facilis saepe consequatur corrupti, in odit. Culpa sequi sint ut repellat officiis odio quis dolore voluptate molestias maiores dicta voluptatem itaque reprehenderit necessitatibus perspiciatis, laborum totam earum odit ratione. Praesentium hic nulla, quisquam sint assumenda odit fugit dignissimos deserunt! Assumenda consequatur officia natus, aliquam sed dicta ipsam quo, sunt laboriosam ea, excepturi quia. Impedit quas explicabo repudiandae molestias animi quisquam provident cupiditate vel consequuntur odio? Rerum dolores porro quaerat perferendis quia architecto esse dolore odio consequatur temporibus molestiae expedita iure, quae suscipit ut quam? A deserunt illum, vero pariatur, nulla sequi debitis maxime quidem laboriosam aliquam iste? Delectus atque sapiente laboriosam hic recusandae ullam maxime, consequuntur impedit qui reprehenderit commodi dolores minus, incidunt tempora illum! Unde dolorum repellat corporis in necessitatibus recusandae, optio ipsam a et aspernatur voluptatibus iure impedit rerum labore delectus nostrum maxime quam, est, provident eos quidem! Possimus, voluptatem distinctio voluptas odit labore natus adipisci suscipit delectus, eveniet sunt rerum quod veritatis vitae, nihil ullam impedit aspernatur amet repellat nesciunt obcaecati iusto dicta officia culpa. At eum cumque, doloribus quaerat aspernatur odit officiis delectus culpa sint corporis numquam! Cumque natus facere sed, recusandae error minus in magni perferendis animi accusamus, odit, laborum cum nisi iste vitae facilis sit id fugiat eligendi possimus ut mollitia! Dolor obcaecati officiis, est, necessitatibus repellendus quo, tenetur eveniet soluta delectus fuga ipsa facere exercitationem esse quibusdam doloribus cumque blanditiis! Vel quod magni maxime repudiandae voluptate laboriosam minima repellat omnis distinctio provident, fugiat excepturi soluta voluptates maiores totam deserunt praesentium assumenda delectus ab atque id eaque obcaecati. Error, enim fuga? Quasi, minus eos quam ipsam, tempore libero ex non quisquam illum laudantium ea laborum repudiandae maiores ullam quas consequatur, eaque perspiciatis beatae quos minima voluptatum? Eligendi enim exercitationem totam, reiciendis eveniet blanditiis aperiam voluptatum pariatur voluptas esse accusantium, numquam recusandae perspiciatis id unde ipsum consequatur dicta, tempora tempore a ex vero sit odio? Non voluptatibus nihil dignissimos consequatur, dicta veniam ut, maiores dolor eos molestiae autem voluptas rem velit debitis adipisci iste, et possimus sequi aspernatur? Sed dolorum consequatur magni fugiat iusto inventore obcaecati nulla molestias fugit porro. A, praesentium vitae? Alias nulla quidem possimus laborum labore eius incidunt nisi? Laudantium quia obcaecati ab quae impedit voluptatibus, placeat odio quibusdam illum in reprehenderit totam hic error adipisci numquam reiciendis incidunt modi. Sit quam odit laudantium ex, officia iure dolorem perferendis quae asperiores ipsam quo vitae laborum suscipit quia nemo hic beatae ut aliquam atque deleniti ipsa ipsum. Laudantium laborum sunt nulla vitae rem corrupti magni, at aliquam similique ipsum obcaecati quibusdam et sed corporis sapiente odit sit, temporibus qui, cum quam quaerat sint ullam.</p>, optionQuantity: (itemReviews && itemReviews.length > 0) ? itemReviews.length : null},
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
                    <CatalogImage imageList={product?.media.attachments} hasMaximize={true} />
                    <SupplierWNav
                        className={cl.supplierBlock}
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
