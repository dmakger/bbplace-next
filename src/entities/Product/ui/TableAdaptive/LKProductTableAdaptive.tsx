"use client"

import { FC, SetStateAction, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_LKProductTableAdaptive.module.scss'
import { HandleSize } from "@/shared/ui/Handle/Size/HandleSize";
import { LKProductTable } from "@/features/Table/ui/Product/LK/ui/LKProductTable";
import { FetchProduct } from "../FetchProduct/FetchProduct";
import { IProduct } from "../../model/product.model";
import { ProductLK, ProductLKList } from "../LKProduct";
import { EProductLKVariants } from "../LKProduct/model/productLK.model";

interface LKProductTableAdaptiveProps{
    className?: string,
}

export const LKProductTableAdaptive:FC<LKProductTableAdaptiveProps> = ({className}) => {
    // STATE
    const [is768, setIs768] = useState(false)
    const [products, setProducts] = useState<IProduct[]>([])
    const [isOpenSettings, setIsOpenSettings] = useState<boolean>(false);
    const [isOpenGroup, setIsOpenGroup] = useState<boolean>(false);


    return (
        <>
            <FetchProduct set={setProducts} propsProduct={{ limit: 24, page: 11 }} hasCategory={true} />
            {/* {is768 ? (
                <LKProductTable  />
            ) : (
                <LKProductTable _products={products} />
            )} */}
            {products.length > 0 && (
                // <div className={cl.products}>
                //     {products.map(it => (
                //         <ProductLK product={it}
                //             // setIsOpenGroup={setIsOpenGroup}
                //             // setIsOpenSettings={setIsOpenSettings}
                //             variant={EProductLKVariants.DEFAULT} />
                //     ))}
                // </div>
                <ProductLKList products={products} variant={EProductLKVariants.DEFAULT} />
            )}
            
            <LKProductTable _products={products} />
            <HandleSize set={setIs768} width={768} />
        </>
    )
}
