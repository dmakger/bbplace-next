"use client"

import { IArgsRequest } from "@/api/model/request.model.api";
import { PRODUCT_LIMIT } from "@/entities/Product/data/product.data";
import { useProductAll } from "@/entities/Product/hooks/useProduct.hooks";
import { productApiToProduct } from "@/entities/Product/lib/product.lib";
import { EViewProduct } from "@/entities/Product/model/view.product.model";
import { ProductHList } from "@/entities/Product/ui/Horizontal/ui/list/ProductHList";
import { ProductList } from "@/entities/Product/ui/List/ProductList";
import { Product } from "@/entities/Product/ui/Product";
import Wrapper1280 from "@/shared/ui/Wrapper/1280/Wrapper1280";
import { useAppSelector } from "@/storage/hooks";

export default function ProductPage() {
    return (
        <Wrapper1280>
            <ProductList />
        </Wrapper1280>
    )
}
