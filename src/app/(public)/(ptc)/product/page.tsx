"use client"

import { IArgsRequest } from "@/api/model/request.model.api";
import { useProductAll } from "@/entities/Product/hooks/useProduct.hooks";
import { HorizontalCard } from "@/entities/Product/ui/HorizontalCard";
import { VerticalCard } from "@/entities/Product/ui/VerticalCard";

export default function ProductPage() {
    const args: IArgsRequest = {page: 0, limit: 16}
    const { data: productList, setData: setProductList } = useProductAll(args)

    console.log(productList);
    
    return (
        <div>
            {productList?.map(it => (
                <HorizontalCard/>
            ))}
        </div>
    )
}
