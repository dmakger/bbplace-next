'use client'

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
import { supplierApiToSupplier } from "@/entities/Supplier/lib/process.supplier.lib";
import { ISupplier } from "@/entities/Supplier/model/supplier.model";
import { EModalView } from "@/shared/data/modal.data";
import { Modal } from "@/shared/ui/Modal/Modal";
import Wrapper1280 from "@/shared/ui/Wrapper/1280/Wrapper1280";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { WrapperModalBottom } from "@/shared/ui/Wrapper/ModalBottom";
import { ProductLK } from "@/entities/Product/ui/LKProduct";
import { EProductLKVariants } from "@/entities/Product/ui/LKProduct/model/productLK.model";


export default function SupplierPage() {

    //STATE
    const [supplier, setSupplier] = useState<ISupplier>()
    const [supplierProducts, setSupplierProducts] = useState<IProduct[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false);

    //PARAMS
    const params = useParams()
    const supplierId = params.id as string

    //API
    const { data: supplierRating } = ReviewAPI.useGetSupplierScoreQuery(supplierId as string)
    const { data: supplierReviews } = ReviewAPI.useGetSellerReviewsQuery({ supplierId: supplierId, limit: REVIEW_LIMIT ?? 0, page: REVIEW_START_PAGE })
    const { data: supplierProductsAPI } = ProductAPI.useGetProductsByUserQuery({ userId: supplierId, limit: 200 })
    const { data: supplierAPI } = UserAPI.useGetUserDataQuery(supplierId)

    //EFFECT
    useEffect(() => {
        if (supplierAPI)
            setSupplier(supplierApiToSupplier(supplierAPI))
    }, [supplierAPI])

    useEffect(() => {
        if (supplierProductsAPI)
            setSupplierProducts(productApiListToProductList(supplierProductsAPI))
    }, [supplierProductsAPI])

    const closeTheModal = () => {
        setIsOpen(prevState => !prevState)
    }

    return (
        <Wrapper1280>
            {supplier && <SupplierPageHeader supplier={supplier}
                supplierRating={supplierRating ?? 0}
                supplierReviews={supplierReviews?.length ?? 0}
            />}
            {/* {supplierProducts && <ProductAutoList products={supplierProducts} view={EViewProduct.AT_SUPPLIER_PAGE} />} */}

            {supplierProducts[1] && <ProductLK product={supplierProducts[128]} setIsOpenModal={setIsOpen} variant={EProductLKVariants.GROUP_ITEM}/>}
            <Modal view={EModalView.BOTTOM}
             buttonNode _isOpen={isOpen}
             onClickOverlay={closeTheModal}
             >
                <WrapperModalBottom isOpen={isOpen} setIsOpen={setIsOpen} title="Выбор действия" />

            </Modal>
        </Wrapper1280>

    )
}
