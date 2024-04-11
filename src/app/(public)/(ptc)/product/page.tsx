'use client'

import { PRODUCT_PARAMS } from "@/config/params/product.params.config";
import { getViewProductByParam } from "@/entities/Product/lib/params.product.lib";
import { ProductList } from "@/entities/Product/ui/List/ProductList";
import Wrapper1280 from "@/shared/ui/Wrapper/1280/Wrapper1280";
import { useSearchParams } from "next/navigation";

export default function ProductPage() {
    // ROUTER
    const searchParams = useSearchParams()
    const productView = PRODUCT_PARAMS.getView(searchParams.get(PRODUCT_PARAMS.VIEW__KEY))
    
    return (
        <Wrapper1280>
            <ProductList view={getViewProductByParam(productView)} />
        </Wrapper1280>
    )
}
