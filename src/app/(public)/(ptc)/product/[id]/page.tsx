'use client'

import { ProductAPI } from "@/entities/Product/api/product.api";
import { productApiToProduct } from "@/entities/Product/lib/product.lib";
import { IProduct } from "@/entities/Product/model/product.model";
import Wrapper1280 from "@/shared/ui/Wrapper/1280/Wrapper1280";
import { ImageSlider } from "@/widgets/Slider/Image/list/ImageSlider";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductDetailPage() {
    // ROUTER
    const {id} = useParams();

    // API
    const {data: productAPI} = ProductAPI.useGetProductQuery(Array.isArray(id) ? id[0] : id)
    
    // STATE
    const [limit, setLimit] = useState(1);
    const [product, setProduct] = useState<IProduct>();

    // EFFECT
    useEffect(() => {
        if (productAPI) {
            setProduct(productApiToProduct({productAPI: productAPI}));
        }
    }, [productAPI]);

    console.log('qwe', product, productAPI);
    
    
    return (
        <Wrapper1280>
            <ImageSlider title={""} slides={product?.media.attachments} isLoading={false} limit={limit} amount={1} setLimit={setLimit} />
            {/* <ProductList view={getViewProductByParam(productView)} /> */}
        </Wrapper1280>
    )
}
