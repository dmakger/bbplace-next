"use client"

import { IArgsRequest } from "@/api/model/request.model.api";
import { PRODUCT_LIMIT } from "@/entities/Product/data/product.data";
import { useProductAll } from "@/entities/Product/hooks/useProduct.hooks";
import { productApiToProduct } from "@/entities/Product/lib/product.lib";
import { EViewProduct } from "@/entities/Product/model/view.product.model";
import { Product } from "@/entities/Product/ui/Product";
import Wrapper1280 from "@/shared/ui/Wrapper/1280/Wrapper1280";
import { Setters } from "@/storage/Setters";
import { useAppSelector } from "@/storage/hooks";
import { useDispatch } from "react-redux";

export default function ProductPage() {
    // const args: IArgsRequest = {page: 13, limit: PRODUCT_LIMIT}
    const args: IArgsRequest = {page: 0, limit: PRODUCT_LIMIT}
    const { data: productList } = useProductAll(args)

    console.log(productList?.findIndex(it => it.id === 151));
    
    const metrics = useAppSelector(state => state.metrics);
    console.log('metrics', metrics);
    

    return (
        <Wrapper1280>
            {productList?.map(it => (
                <Product view={EViewProduct.HORIZONTAL} 
                         product={productApiToProduct(it)} 
                         key={it.id}/>
            ))}
        </Wrapper1280>
    )
}
