'use client'

import { EViewProductParams, VIEW_PRODUCT__KEY_PARAM } from "@/entities/Product/data/params.product.data";
import { getViewProductByParam } from "@/entities/Product/lib/params.product.lib";
import { ProductList } from "@/entities/Product/ui/List/ProductList";
import Wrapper1280 from "@/shared/ui/Wrapper/1280/Wrapper1280";
import { Pagination } from "@/widgets/Pagination/ui/Pagination";
import { useSearchParams } from "next/navigation";

export default function ProductPage() {
    // ROUTER
    const searchParams = useSearchParams()
    const productView = searchParams.get(VIEW_PRODUCT__KEY_PARAM) as EViewProductParams
    
    return (
        <Wrapper1280>
            <ProductList view={getViewProductByParam(productView)} />
        </Wrapper1280>
    )
}
