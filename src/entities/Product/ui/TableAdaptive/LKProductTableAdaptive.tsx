"use client"

import { FC, SetStateAction, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_LKProductTableAdaptive.module.scss'
import { HandleSize } from "@/shared/ui/Handle/Size/HandleSize";
import { LKProductTable } from "@/features/Table/ui/Product/LK/ui/LKProductTable";
import { FetchProduct } from "../FetchProduct/FetchProduct";
import { IProduct } from "../../model/product.model";

interface LKProductTableAdaptiveProps{
    className?: string,
}

export const LKProductTableAdaptive:FC<LKProductTableAdaptiveProps> = ({className}) => {
    const [is768, setIs768] = useState(false)
    const [products, setProducts] = useState<IProduct[]>([])
    
    console.log('products qwe', products)

    return (
        <>
            <FetchProduct set={setProducts} propsProduct={{ limit: 24, page: 11 }} hasCategory={true} />
            {/* {is768 ? (
                <LKProductTable  />
            ) : ( */}
                <LKProductTable _products={products} />
            {/* )} */}
            <HandleSize set={setIs768} width={768} />
        </>
    )
}
