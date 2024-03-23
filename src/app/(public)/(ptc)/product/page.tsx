"use client"

import { IArgsRequest } from "@/api/model/request.model.api";
import { PRODUCT_LIMIT } from "@/entities/Product/data/product.data";
import { useProductAll } from "@/entities/Product/hooks/useProduct.hooks";
import { productApiToProduct } from "@/entities/Product/lib/product.lib";
import { EViewProduct } from "@/entities/Product/model/view.product.model";
import { Product } from "@/entities/Product/ui/Product";
import Wrapper1280 from "@/shared/ui/Wrapper/1280/Wrapper1280";
import { useAppSelector } from "@/storage/hooks";

export default function ProductPage() {
    // const args: IArgsRequest = {page: 209, limit: 1}
    const args: IArgsRequest = {page: 13, limit: PRODUCT_LIMIT}
    // const args: IArgsRequest = {page: 0, limit: PRODUCT_LIMIT}
    const { data: productList } = useProductAll(args)
    const metrics = useAppSelector(state => state.metrics);
    const currencyList = useAppSelector(state => state.currencyList);

    return (
        <Wrapper1280>
            {productList?.map(it => (
                <Product view={EViewProduct.HORIZONTAL} 
                         product={productApiToProduct(it, metrics, currencyList)} 
                         key={it.id}/>
            ))}
        </Wrapper1280>
    )
}
