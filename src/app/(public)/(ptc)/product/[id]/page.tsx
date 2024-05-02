'use client'

import { ProductAPI } from "@/entities/Product/api/product.api";
import { productApiToProduct } from "@/entities/Product/lib/product.lib";
import { IProduct } from "@/entities/Product/model/product.model";
import Wrapper1280 from "@/shared/ui/Wrapper/1280/Wrapper1280";
import { CatalogImage } from "@/widgets/CatalogImage/CatalogImage";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductDetailPage() {
    // ROUTER
    const {id} = useParams();

    // API
    const {data: productAPI} = ProductAPI.useGetProductQuery(Array.isArray(id) ? id[0] : id)
    
    // STATE
    const [product, setProduct] = useState<IProduct>();

    // EFFECT
    useEffect(() => {
        if (productAPI) {
            setProduct(productApiToProduct({productAPI: productAPI}));
        }
    }, [productAPI]);
    
    return (
        <Wrapper1280>
            <CatalogImage imageList={product?.media.attachments} />
        </Wrapper1280>
    )
}
