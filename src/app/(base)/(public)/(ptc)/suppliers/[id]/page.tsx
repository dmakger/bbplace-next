'use client'

import cl from './_SupplierDetailPage.module.scss';
import { UserAPI } from "@/entities/Auth/api/auth.api";
import { ProductAPI } from "@/entities/Product/api/product.api";
import { PRODUCT_LIMIT } from "@/entities/Product/data/product.data";
import { productApiListToProductList } from "@/entities/Product/lib/product.lib";
import { IProduct } from "@/entities/Product/model/product.model";
import { EViewProduct } from "@/entities/Product/model/view.product.model";
import { ProductAutoList } from "@/entities/Product/ui/List/Auto/ProductAutoList";
import { ReviewAPI } from "@/entities/Review/api/review.api";
import { REVIEW_LIMIT, REVIEW_START_PAGE } from "@/entities/Review/data/review.data";
import { SupplierPageHeader } from "@/entities/Supplier/components/SupplierPageHeader/SupplierPageHeader";
import Wrapper1280 from "@/shared/ui/Wrapper/1280/Wrapper1280";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function SupplierPage() {

    //STATE
    const [supplierProducts, setSupplierProducts] = useState<IProduct[]>([])

    //PARAMS
    const params = useParams()
    const supplierId = params.id as string

    //API
    const { data: supplierRating } = ReviewAPI.useGetSupplierScoreQuery(supplierId as string)
    const { data: supplierReviews } = ReviewAPI.useGetSellerReviewsQuery({ supplierId: supplierId, limit: REVIEW_LIMIT ?? 0, page: REVIEW_START_PAGE })
    const { data: supplierProductsAPI } = ProductAPI.useGetProductsByUserQuery({ userId: supplierId, limit: PRODUCT_LIMIT })
    const { data: supplier } = UserAPI.useGetUserDataQuery(supplierId)    

    useEffect(() => {
        if(supplierProductsAPI)
            setSupplierProducts(productApiListToProductList(supplierProductsAPI))
    }, [supplierProductsAPI])

    return (
        <Wrapper1280 classNameContent={cl.content}>
            {supplier && (
                <SupplierPageHeader 
                    supplier={supplier}
                    supplierRating={supplierRating ?? 0}
                    supplierReviews = {supplierReviews?.length ?? 0} 
                    classNameSupplierWNav={cl.supplierWNav} />
            )}
            {supplierProducts && (
                <ProductAutoList products={supplierProducts} view={EViewProduct.AT_SUPPLIER_PAGE}/>
            )}
        </Wrapper1280>

    )
}